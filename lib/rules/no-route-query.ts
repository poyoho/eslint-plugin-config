import { Rule } from "eslint"
import * as estree from "estree"
import { isMemberExpression, isVariableDeclarator, isIdentifier } from "../utils/node"

type MemberExpressWithParent = estree.MemberExpression & Rule.NodeParentExtension

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
    docs: {
      description: "disable this.$route.query",
      recommended: false
    },
    schema: [
      // fill in your schema
    ],
    type: "suggestion"
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
      "BlockStatement>VariableDeclaration>MemberExpression"(node: estree.VariableDeclaration) { // 初始化
        console.log("block.var", node)
      },
      // eslint-disable-next-line max-len
      "BlockStatement>ExpressionStatement>AssignmentExpression[right.type='MemberExpression']"(node: estree.Node) { // 赋值
        const block = node as estree.BlockStatement
        console.log("block.assignment", block)
      },
      "MemberExpression[property.name = 'query']"(node: estree.MemberExpression) { // 匹配所有 member 如果
        console.log("member", node)
        // matchRouteQuery(context, node) // 使用了 this.&route.query
      }
    }
  }
}

export default rule
