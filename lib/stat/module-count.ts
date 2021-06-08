import { Rule } from "eslint"
import { getMoudleCount, collectModule } from "."

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
    console.log(context)
    return {
      ImportDeclaration(node) {
        console.log(node)
      },
    }
  }
}

export = rule
