import { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "禁止在三目运算符进行逻辑运算",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/no-binocular-logic.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
    }
  }
}

export = rule
