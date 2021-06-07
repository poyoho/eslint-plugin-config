import * as estree from "estree"
import * as esnode from "./node"
import * as tsnode from "./ts-node"
import { Rule } from "eslint"

type HasPropertyNode = estree.Property | estree.AssignmentProperty | estree.MethodDefinition | estree.MemberExpression

// 保存作用域下的变量
const variablesCache = new WeakMap<Rule.RuleContext, Record<string, any>>()
export function getScopeVariables<Node = estree.Node>(
  context: Rule.RuleContext,
  opts: {
    filter?: (lastWrite: estree.Node) => boolean,
    format?: (lastWrite: estree.Node) => Node
  }
) {
  if (opts.filter === undefined) {
    opts.filter = () => true
  }
  if (opts.format === undefined) {
    opts.format = (x) => x as any
  }
  let variables: Record<string, Node>
  if ((variables = variablesCache.get(context) as Record<string, Node>)) {
    return variables
  }
  const scope = context.getScope()
  // 作用域下所有变量
  variables = scope.variables.reduce(
    (prev, next) => {
      // 最后一次修改变量
      const lastWrite = next.references.reduce((prev, next) => next.writeExpr || prev, {}) as estree.Node
      if (lastWrite.type && !esnode.isObjectExpression(lastWrite) && opts.filter!(lastWrite)) {
        prev[next.name] = opts.format!(lastWrite)
      }
      return prev
    }, {} as Record<string, Node>
  )
  // 缓存当前作用域所有变量定义
  variablesCache.set(context, variables)
  return variables
}

// 获取给定节点的字符串
function getStringLiteralValue(node: estree.Node, stringOnly?: boolean) {
  if (esnode.isLiteral(node)) {
    if (node.value === null) {
      return null
    }
    if (typeof node.value === "string") {
      return node.value
    }
    if (!stringOnly) {
      return String(node.value)
    }
    return null
  }
  if (esnode.isTemplateLiteral(node)) {
    if (node.expressions.length === 0 && node.quasis.length === 1) {
      return node.quasis[0].value.cooked!
    }
  }
  return null
}

// 获取给定节点的属性名称
export function getStaticPropertyName(node: HasPropertyNode): string | null {
  if (esnode.isProperty(node) || esnode.isMethodDefinition(node)) {
    const key = node.key

    if (!node.computed) {
      if (esnode.isIdentifier(key)) {
        return key.name
      }
    }
    return getStringLiteralValue(key)
  } else if (esnode.isMemberExpression(node)) {
    const property = node.property
    if (!node.computed) {
      if (esnode.isIdentifier(property)) {
        return property.name
      }
      return null
    }
    return getStringLiteralValue(property)
  }
  return null
}

// 获取给定节点的父节点。此方法返回一个忽略 X as F 的值
export function getParent(node: estree.Expression) {
  if (!esnode.isHasParent(node)) {
    return node
  }
  let parent = node.parent
  while (esnode.isHasParent(parent) && tsnode.isTSAsExpression(parent)) {
    parent = (parent as any).parent
  }
  return parent
}

// 遍历Member获取完整访问路径
export function traverseMemberObject(node: estree.MemberExpression): estree.Node {
  if (esnode.isMemberExpression(node.object)) {
    return traverseMemberObject(node.object)
  }
  return node.object
}

// 获取object.xxx的字面值
export function getObjectExpressionKey(context: Rule.RuleContext, property: estree.Property | estree.SpreadElement) {
  let sortKey: string
  const sourceCode = context.getSourceCode()
  if (esnode.isProperty(property)) {
    if (esnode.isIdentifier(property.key)) {
      sortKey = property.key.name
    } else if (esnode.isLiteral(property.key)) {
      sortKey = property.key.raw!.toString()
    } else {
      sortKey = sourceCode.getText(property.key)
    }
  } else {
    // ...[a, b, c]
    sortKey = sourceCode.getText(property)
  }
  return sortKey
}
