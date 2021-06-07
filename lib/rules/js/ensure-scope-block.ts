import { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "确保代码块的作用范围",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/ensure-scope-block.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
    }
  }
}

export = rule
