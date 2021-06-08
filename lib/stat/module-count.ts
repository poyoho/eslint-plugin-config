import { Rule } from "eslint"
import * as estree from "estree"
import path from "path"
import { collectModule, defineStatistics } from "."
import { isImportSpecifier, isImportDefaultSpecifier, isImportNamespaceSpecifier } from "../utils/node"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "模块使用统计",
      url: "https://poyoho.github.io/eslint-plugin-config/stat/disable.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return defineStatistics(context, {
      ImportDeclaration(node) {
        const pkgName = node.source // import source
        const imports = node.specifiers // import variables
        if (!pkgName.value) {
          return
        }
        // TODO source分析路径 ⭐[../../cde, ../cde, ./cde] 这两个包可能是同一个
        const absolutepath = pkgName.value.toString()
        imports.forEach(module => collectModule(absolutepath, formatModuleName(module)))
      },
    })
  }
}

// imports 分析 * as any / default / {a,b,c} / []
function formatModuleName(
  node: estree.ImportSpecifier | estree.ImportDefaultSpecifier | estree.ImportNamespaceSpecifier
) {
  if (isImportSpecifier(node)) {
    return node.imported.name
  } else if (isImportDefaultSpecifier(node)) {
    return "default"
  } else if (isImportNamespaceSpecifier(node)) {
    // TODO 找出gg使用的子模块
    return ["gg", "aa", "cc", "dd"]
  }
  return ""
}

export = rule
