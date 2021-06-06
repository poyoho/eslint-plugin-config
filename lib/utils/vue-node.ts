import { AST } from "vue-eslint-parser"
import * as estree from "estree"
import * as esnode from "./node"
import * as tsnode from "./ts-node"
import * as getter from "./getter"
import { Rule } from "eslint"

export type VueObjectType = "mark" | "export" | "definition" | "instance" | null
export type VueComponentType = "component" | "mixin" | "extend" | "createApp" | "defineComponent" | null

export function getVueObjectType(context: Rule.RuleContext, node: estree.ObjectExpression): VueObjectType {
  if (!esnode.isObjectExpression(node)) {
    return null
  }
  const parent = getter.getParent(node)
  if (esnode.isExportDefaultDeclaration(parent)) {
    // export default {} in .vue || .jsx
    const filePath = context.getFilename()
    if (
      isVueComponentFile(parent, filePath) &&
      tsnode.skipTSAsExpression(parent.declaration) === node
    ) {
      return "export"
    }
  } else if (esnode.isCallExpression(parent)) {
    // Vue.component('xxx', {}) || component('xxx', {})
    if (
      getVueComponentDefinitionType(node) != null &&
      tsnode.skipTSAsExpression(parent.arguments.slice(-1)[0]) === node
    ) {
      return "definition"
    }
  } else if (esnode.isNewExpression(parent)) {
    // new Vue({})
    if (
      isVueInstance(parent) &&
      tsnode.skipTSAsExpression((parent as estree.NewExpression).arguments[0]) === node
    ) {
      return "instance"
    }
  }
  return null
}

function isVueFile(path: string) {
  return path.endsWith(".vue") || path.endsWith(".jsx") || path.endsWith(".tsx")
}

// 检查给定节点是否是基于 Vue 组件的关于文件名和默认导出类型在 .vue 中导出默认 {} || .jsx
function isVueComponentFile(node: estree.Node, path: string) {
  return (
    isVueFile(path) &&
    esnode.isExportDefaultDeclaration(node) &&
    (
      esnode.isObjectExpression(node.declaration) // export default {}
      || (
        esnode.isCallExpression(node.declaration)
          && esnode.isIdentifier(node.declaration.callee)
          && node.declaration.callee.name === "defineComponent"
      ) // export default defineComponent({})
    )
  )
}

// 检查给定节点是否是vue 实例
// new Vue({})
function isVueInstance(node: estree.NewExpression) {
  const callee = node.callee
  return Boolean(
    esnode.isNewExpression(node) &&
    esnode.isIdentifier(callee) &&
    callee.name === "Vue" &&
    node.arguments.length &&
    esnode.isObjectExpression(tsnode.skipTSAsExpression(node.arguments[0]))
  )
}

// 从给定节点获取 Vue 组件定义类型
// Vue.component('xxx', {}) || component('xxx', {})
function getVueComponentDefinitionType(node: estree.ObjectExpression): VueComponentType {
  const parent = getter.getParent(node)
  if (esnode.isCallExpression(parent)) {
    const callee = parent.callee
    if (esnode.isMemberExpression(callee)) {
      const calleeObject = tsnode.skipTSAsExpression(callee.object)

      if (esnode.isIdentifier(calleeObject)) {
        const propName = getter.getStaticPropertyName(callee)
        if (calleeObject.name === "Vue") {
          // for Vue.js 2.x
          // Vue.component('xxx', {}) || Vue.mixin({}) || Vue.extend('xxx', {})
          const maybeFullVueComponentForVue2 =
            propName && isObjectArgument(parent)

          return maybeFullVueComponentForVue2 &&
            (propName === "component" ||
              propName === "mixin" ||
              propName === "extend")
            ? propName
            : null
        }

        // for Vue.js 3.x
        // app.component('xxx', {}) || app.mixin({})
        const maybeFullVueComponent = propName && isObjectArgument(parent)

        return maybeFullVueComponent &&
          (propName === "component" || propName === "mixin")
          ? propName
          : null
      }
    }

    if (esnode.isIdentifier(callee)) {
      if (callee.name === "component") {
        // for Vue.js 2.x
        // component('xxx', {})
        const isDestructedVueComponent = isObjectArgument(parent)
        return isDestructedVueComponent ? "component" : null
      }
      if (callee.name === "createApp") {
        // for Vue.js 3.x
        // createApp({})
        const isAppVueComponent = isObjectArgument(parent)
        return isAppVueComponent ? "createApp" : null
      }
      if (callee.name === "defineComponent") {
        // for Vue.js 3.x
        // defineComponent({})
        const isDestructedVueComponent = isObjectArgument(parent)
        return isDestructedVueComponent ? "defineComponent" : null
      }
    }
  }

  return null

  function isObjectArgument(node: estree.CallExpression) {
    return (
      node.arguments.length > 0 &&
      esnode.isObjectExpression(tsnode.skipTSAsExpression(node.arguments.slice(-1)[0]))
    )
  }
}

export function isVIdentifier(node: AST.Node | undefined): node is AST.ESLintIdentifier {
  return node !== undefined && node.type === "Identifier"
}

export function isVAttribute(node: AST.Node | undefined): node is AST.VAttribute {
  return node !== undefined && node.type === "VAttribute"
}

