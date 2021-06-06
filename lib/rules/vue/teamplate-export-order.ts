import { Rule } from "eslint"
import * as estree from "estree"
import { isIdentifier, isLiteral, isProperty } from "../../utils/node"
import { compositingVisitors, defineVueExposeVisitor } from "../../visitors"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "模板导出资源顺序",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/teamplate-export-order.html"
    },
    messages: {
      "NoDictionaryOrder": "导出不是字典序"
    }
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    const sourceCode = context.getSourceCode()
    return compositingVisitors(
      defineVueExposeVisitor(context, (node) => {
        const sortNodeMap = new Map<string, estree.Property | estree.SpreadElement>()
        const nowSort: string[] = []
        let sortKey: string
        node.properties.forEach(property => {
          if (isProperty(property)) {
            if (isIdentifier(property.key)) {
              sortKey = property.key.name
            } else if (isLiteral(property.key)) {
              sortKey = property.key.value!.toString()
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
        const sortKeys = Array.from(sortNodeMap.keys()).sort()
        const sortKeyStringify = JSON.stringify(sortKeys)
        if (JSON.stringify(nowSort) !== sortKeyStringify) { // 不是字典序
          reportNoDictionaryOrder(context, node, sortKeys, sortNodeMap)
        }
      }),
    )
  }
}

function reportNoDictionaryOrder(
  context: Rule.RuleContext,
  node: estree.ObjectExpression,
  sortKeys: string[],
  sortNodeMap: Map<string, estree.Property | estree.SpreadElement>,
) {
  context.report({
    messageId: "NoDictionaryOrder",
    loc: node.loc!,
    fix: (fixer) => {
      return null
    }
  })
}

export = rule
