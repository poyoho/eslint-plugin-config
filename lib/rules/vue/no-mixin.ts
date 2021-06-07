import { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "禁止使用mixin",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/no-mixin.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
    }
  }
}

export = rule
