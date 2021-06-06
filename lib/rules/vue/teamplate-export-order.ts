import { Rule } from "eslint"
import * as estree from "estree"
import { isIdentifier, isLiteral, isProperty } from "../../utils/node"
import { defineVueExposeVisitor } from "../../visitors"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "模板导出资源顺序",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/teamplate-export-order.html"
    },
    fixable: "code",
    messages: {
      "NoDictionaryOrder": "导出不是字典序"
    }
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    const sourceCode = context.getSourceCode()
    return defineVueExposeVisitor(context, (node) => {
      const sortNodeMap = new Map<string, estree.Property | estree.SpreadElement>()
      const nowSort: string[] = []
      node.properties.forEach(property => {
        let sortKey: string
        if (isProperty(property)) {
          if (isIdentifier(property.key)) {
            sortKey = property.key.name
          } else if (isLiteral(property.key)) {
            sortKey = property.key.raw!.toString()
          } else {
            sortKey = sourceCode.getText(property.key)
          }
        } else {
          // ...[a, b, c]
          sortKey = sourceCode.getText(property)
        }
        sortNodeMap.set(sortKey, property)
        nowSort.push(sortKey)
      })
      const sortedKeys = Array.from(sortNodeMap.keys()).sort() // TODO 带符号权重的字典序
      const sortedKeyStringify = JSON.stringify(sortedKeys)
      if (JSON.stringify(nowSort) !== sortedKeyStringify) { // 不是字典序
        console.log(sortedKeys)
        reportNoDictionaryOrder(
          context,
          node,
          sortedKeys.map(key => sourceCode.getText(sortNodeMap.get(key)!))
        )
      }
    })
  }
}

function reportNoDictionaryOrder(
  context: Rule.RuleContext,
  node: estree.ObjectExpression,
  sortedCode: string[]
) {
  context.report({
    messageId: "NoDictionaryOrder",
    loc: node.loc!,
    fix: (fixer) => {
      return node.properties.map((property, i) => fixer.replaceText(property, sortedCode[i]))
    }
  })
}

export = rule
