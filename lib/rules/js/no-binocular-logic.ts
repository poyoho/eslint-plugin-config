import { Rule } from "eslint"
import * as estree from "estree"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "禁止三目运算符参与逻辑处理",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/no-binocular-logic.html"
    },
    messages: {
      "cantLogicHandle": "三目运算符不能参与逻辑处理。"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    console.log("no-binocular-logic")
    return {
      "ExpressionStatement>ConditionalExpression"(node: estree.ConditionalExpression) {
        context.report({
          messageId: "cantLogicHandle",
          loc: node.loc!
        })
      }
    }
  }
}

export = rule
