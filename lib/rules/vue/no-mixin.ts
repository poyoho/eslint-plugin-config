import { Rule } from "eslint"
import { defineVueMixinVisitor } from "../../visitors"

const MIXIN_MSG =
`1. 改用组件引入\`mixin\`内容
2. 将mixin内容改成无渲染组件`

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
    return defineVueMixinVisitor(context, (node) => {
      context.report({
        message: MIXIN_MSG,
        loc: node.loc!,
      })
    })
  }
}

export = rule
