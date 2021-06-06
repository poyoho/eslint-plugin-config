import { Rule } from "eslint"
import * as estree from "estree"
import { isMemberExpression } from "../../utils/node"
import { getScopeVariables, traverseMemberObject } from "../../utils/getter"
const message = `
【message】
使用this.$route.query后维护页面参数会特别困难
建议使用组件的props传route.query

【usage】
1. 组件声明props
[prop]: {
  type: String
  default: ""
}
2. 路由上调用组件时传参
{
  props: route => ({
    [prop]: route.query[prop],
  }),
}
`
const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "disable this.$route.query",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/no-route-query.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
      // *.query
      "MemberExpression[property.name = 'query']"(node: estree.MemberExpression) {
        let leftUsed = node.object as estree.Node
        if (isMemberExpression(leftUsed)) {
          leftUsed = traverseMemberObject(leftUsed)
        }
        const sourceCode = context.getSourceCode()
        const leftVal = sourceCode.getText(node.object)
        if (leftVal === "this.$route") { // this.$route.query
          context.report({message, loc: node.loc!})
        } else { // [variable = this.$route].query
          const variables = getScopeVariables<string>(context, {
            format: (x) => sourceCode.getText(x)
          })
          const leftVariable = leftVal.split(".")[0]
          if (leftVal.replace(leftVariable, variables[leftVariable]) === "this.$route") {
            context.report({message, loc: node.loc!})
          }
          console.log("*.query", leftVal, variables)
        }
      }
    }
  }
}

export = rule
