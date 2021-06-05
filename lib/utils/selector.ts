import { Rule } from "eslint"
import * as estree from "estree"
import { isArrowFunctionExpression, isFunctionExpression, isIdentifier, isObjectExpression } from "./node"

const optionMethods = 'ExportDefaultDeclaration Property[key.name="methods"]'
const optionSetup = 'ExportDefaultDeclaration Property[key.name="setup"]'

// 在setup / methods 定义函数
export function defineVueOptionFunction(
  context: Rule.RuleContext,
  cb: (node: estree.Identifier) => void,
): Rule.RuleListener {
  const cacheScope = cacheScopeVariables()
  const cacheFnDef: Record<string, estree.Identifier> = {}
  let cacheVarDef: Record<string, estree.Identifier> = {}
  return {
    // option.methods 定义函数
    [`${optionMethods} Property[value.type="FunctionExpression"] > Identifier`](
      node: estree.Identifier) {
      cb(node)
    },
    // option.methods 定义匿名函数
    [`${optionMethods} Property[value.type="ArrowFunctionExpression"] > Identifier`](
      node: estree.Identifier) {
      cb(node)
    },
    // setup里面的block 获取变量声明
    [`${optionSetup}>*>BlockStatement`]() {
      cacheVarDef = cacheScope<estree.Identifier>(context, isIdentifier)
    },
    // setup里面的函数定义
    [`${optionSetup} FunctionDeclaration>Identifier`](node: estree.Identifier) {
      cacheFnDef[node.name] = node
    },
    // return的时候定义变量
    [`${optionSetup} ReturnStatement Property`](
      node: estree.Property) {
      if (!isIdentifier(node.key)) {
        return
      }
      if ( // return 定义函数 定义匿名函数 使用变量
        isArrowFunctionExpression(node.value)||
        isFunctionExpression(node.value)
      ) {
        cb(node.key)
      } else if (isIdentifier(node.value)) {
        if (node.key.name === node.value.name) { // key === value (aaa)
          const cacheVar = cacheVarDef[node.key.name]
          const cacheFn = cacheFnDef[node.key.name]
          if (cacheFn) {
            cb(node.key)
            cb(node.value)
            cb(cacheFn)
          } else if (isArrowFunctionExpression(cacheVar)) {
            cb(node.key)
            cb(node.value)
            cb(cacheVar)
          }
        } else { // (a: bbb)起别名 返回值改名就可以了
          if (cacheFnDef[node.value.name] || isArrowFunctionExpression(cacheVarDef[node.value.name])) {
            cb(node.key)
          }
        }
      }
    },
  }
}

// 保存作用域下的变量
function cacheScopeVariables() {
  const _cache = new WeakMap()
  return <Node= estree.Node>(context: Rule.RuleContext, filter: (lastWrite: estree.Node) => boolean) => {
    const scope = context.getScope()
    let variables: Record<string, Node>
    if ((variables = _cache.get(scope))) {
      return variables
    }
    // 作用域下所有变量
    variables = scope.variables.reduce(
      (prev, next) => {
        // 最后一次修改变量
        const lastWrite = next.references.reduce((prev, next) => next.writeExpr || prev, {}) as estree.Node
        if (lastWrite.type && !isObjectExpression(lastWrite) && filter(lastWrite)) {
          prev[next.name] = lastWrite as any
        }
        return prev
      }, {} as Record<string, Node>
    )
    // 缓存当前作用域所有变量定义
    _cache.set(scope, variables)
    return variables
  }
}

