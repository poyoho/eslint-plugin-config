import { Rule } from "eslint"
import * as estree from "estree"
import * as tsnode from "../utils/ts-node"
import { isArrowFunctionExpression, isFunctionExpression, isIdentifier } from "../utils/node"
import { getScopeVariables } from "../utils/getter"
import { VueObjectType, getVueObjectType, isVueFile } from "../utils/vue-node"

const optionMethodsProperty = 'ExportDefaultDeclaration Property[key.name="methods"]'
const optionWatchProperty = 'ExportDefaultDeclaration Property[key.name="watch"]'
const optionComputedProperty = 'ExportDefaultDeclaration Property[key.name="computed"]'
const optionMixinProperty = 'ExportDefaultDeclaration Property[key.name="mixins"]'
const optionDataBlock = 'ExportDefaultDeclaration Property[key.name="data"]>*>BlockStatement'
const optionSetupBlock = 'ExportDefaultDeclaration Property[key.name="setup"]>*>BlockStatement'

// 在setup / methods 定义函数
export function defineVueFnIdentifierVisitor(
  context: Rule.RuleContext,
  cb: (node: estree.Identifier) => void,
): Rule.RuleListener {
  const cacheFnDef: Record<string, estree.Identifier> = {}
  let cacheVarDef: Record<string, estree.Identifier> = {}
  if(!isVueFile(context.getFilename())) {
    return {}
  }
  return {
    // option.methods 定义函数 / 匿名函数 methods: { ⭐() {}, ⭐ => {} }
    [`${optionMethodsProperty} Property[value.type=/^(Arrow)?FunctionExpression$/] > Identifier`](
      node: estree.Identifier) {
      cb(node)
    },
    // setup里面的block 获取变量声明 setup() {⭐}
    [optionSetupBlock]() {
      cacheVarDef = getScopeVariables<estree.Identifier>(context, {
        filter: isIdentifier,
      })
    },
    // setup里面的函数定义 setup(){ function ⭐() {}}
    [`${optionSetupBlock} FunctionDeclaration>Identifier`](node: estree.Identifier) {
      cacheFnDef[node.name] = node
    },
    // return的时候定义变量 setup(){ return {⭐} }
    [`${optionSetupBlock}>ReturnStatement Property`](
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

// vue 暴露给模板的数据 ObjectExpression
export function defineVueExposeVisitor(
  context: Rule.RuleContext,
  cb: (node: estree.ObjectExpression) => void
): Rule.RuleListener {
  if(!isVueFile(context.getFilename())) {
    return {}
  }
  return {
    [`${optionSetupBlock}>ReturnStatement ObjectExpression`]( // setup() {return {⭐}}
      node: estree.ObjectExpression) {
      cb(node)
    },
    [`${optionMethodsProperty} ObjectExpression`]( // methods: {⭐}
      node: estree.ObjectExpression) {
      cb(node)
    },
    [`${optionDataBlock}>ReturnStatement ObjectExpression`]( // data() {return {⭐}}
      node: estree.ObjectExpression
    ){
      cb(node)
    },
    [`${optionWatchProperty} ObjectExpression`]( // watch: {⭐}
      node: estree.ObjectExpression
    ){
      cb(node)
    },
    [`${optionComputedProperty} ObjectExpression`]( // computed: {⭐}
      node: estree.ObjectExpression
    ){
      cb(node)
    }
  }
}

// vue 暴露给模板的数据 ObjectExpression
export function defineVueMixinVisitor(
  context: Rule.RuleContext,
  cb: (node: estree.Property) => void
): Rule.RuleListener {
  if(!isVueFile(context.getFilename())) {
    return {}
  }
  return {
    [optionMixinProperty] (node: estree.Property) {
      cb(node)
    }
  }
}

// 检查当前文件是否为 Vue 实例（new Vue）
export function execOnVueInstance (
  context: Rule.RuleContext,
  cb: (node: estree.ObjectExpression, type: VueObjectType) => void): Rule.RuleListener {
  return {
    "ObjectExpression:exit"(node: estree.ObjectExpression) {
      const type = getVueObjectType(context, node)
      if (!type || type !== "instance") return
      cb(node, type)
    }
  }
}

// 检查当前文件是否为Vue组件 (export default)
export function execOnVueComponent (
  context: Rule.RuleContext,
  cb: (node: estree.ObjectExpression, type: VueObjectType) => void): Rule.RuleListener {
  return {
    "ObjectExpression:exit"(node: estree.ObjectExpression) {
      const type = getVueObjectType(context, node)
      if (
        !type ||
        (type !== "export" && type !== "definition")
      )
        return
      cb(node, type)
    }
  }
}

// Check call `Vue.component` and call callback.
export function executeOnCallVueComponent(
  context: Rule.RuleContext,
  cb: (node: estree.CallExpression) => void): Rule.RuleListener {
  return {
    "CallExpression > MemberExpression > Identifier[name='component']": (
      node: estree.Identifier
    ) => {
      const callExpr = (node as any).parent.parent as estree.CallExpression
      const callee = callExpr.callee

      if (callee.type === "MemberExpression") {
        const calleeObject = tsnode.skipTSAsExpression(callee.object)

        if (
          calleeObject.type === "Identifier" &&
          // calleeObject.name === 'Vue' && // Any names can be used in Vue.js 3.x. e.g. app.component()
          callee.property === node &&
          callExpr.arguments.length >= 1
        ) {
          cb(callExpr)
        }
      }
    }
  }
}
