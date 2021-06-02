import { Rule } from "eslint"
import * as estree from "estree"

// https://cn.eslint.org/docs/developer-guide/working-with-rules

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "disable this.$route.query",
      recommended: false
    },
    schema: [
      // fill in your schema
    ],
    type: "suggestion"
  },
  // ESLint 在遍历 JavaScript 代码的抽象语法树 AST (ESTree 定义的 AST) 时，用来访问节点的方法
  // 向下 遍历树时，ESLint 调用 visitor 函数
  // 在 向上 遍历树时，ESLint 调用 visitor:exit 函数
  create(context: Rule.RuleContext) {
    console.log(context)
    return {
      ThisExpression(node: estree.ThisExpression) {
        const thisExpression = node
        console.log("thisExpression", thisExpression)
      }
    }
  }

}

export default rule
