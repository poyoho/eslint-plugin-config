import { Rule } from "eslint"
import * as estree from "estree"
import path from "path"
import { collectModule, defineStatistics } from "."
import {
  isImportSpecifier,
  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  isHasParent,
  isMemberExpression
} from "../utils/node"

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
        console.log(__dirname)
        const absolutepath = resolveModulePath(
          context,
          pkgName.value.toString()
        )
        if (imports.length > 0) {
          imports.forEach(module => collectModule(absolutepath, resolveModuleName(context, module)))
        } else {
          collectModule(absolutepath, "ALL")
        }
      },
    })
  }
}

// source分析路径 [../../cde, ../cde, ./cde] 这两个包可能是同一个
function resolveModulePath(
  context: Rule.RuleContext,
  relativePath: string,
) {
  const filename = context.getFilename()
  const isRelativePath = /^\.+\/?\S/
  const isRootAbsoultPath = /^\.?\//
  const getAbsolutPath = /.*[\\/]/
  // import from extern package
  if (!(
    isRelativePath.test(relativePath) ||
    isRootAbsoultPath.test(relativePath)
  )) {
    return relativePath
  }
  const currAbsPath = getAbsolutPath.exec(filename)![0]
  return path.resolve(currAbsPath, relativePath)
}

// imports 分析 * as any / default / {a,b,c}
function resolveModuleName(
  context: Rule.RuleContext,
  node: estree.ImportSpecifier | estree.ImportDefaultSpecifier | estree.ImportNamespaceSpecifier
) {
  const sourceCode = context.getSourceCode()
  if (isImportSpecifier(node)) {
    return node.imported.name
  } else if (isImportDefaultSpecifier(node)) {
    return "default"
  } else if (isImportNamespaceSpecifier(node)) {
    const collectSubModule = new Set<string>()
    const variables = context.getDeclaredVariables(node)
    for(const variable of variables) {
      for (const refs of variable.references) {
        if (isHasParent(refs.identifier) && isMemberExpression(refs.identifier.parent)) {
          collectSubModule.add(sourceCode.getText(refs.identifier.parent))
        } else {
          collectSubModule.add("*")
        }
      }
    }
    return Array.from(collectSubModule.values())
  }
  return ""
}

export = rule

