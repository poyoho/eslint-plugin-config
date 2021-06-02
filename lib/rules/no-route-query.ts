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
    const variable: Record<string, string> = {}
    let blockVariable: Record<string, string> = {}
    let isBlock = false

    return {
      BlockStatement() { // 块级作用于开始
        console.log("block.start")
        isBlock = true
        blockVariable = {}
      },
      "BlockStatement:exit"() { // 块级作用域结束
        console.log("block.exit")
        isBlock = false
        blockVariable = {}
      },

      AssignmentExpression(node) { // 赋值
        console.log("AssignmentExpression", node)
      },

      // ThisExpression(node) {
      //   if (isVariableDeclarator(node.parent)) { // 用于被赋值 const x = this
      //     blockVariable[(node.parent.id as estree.Identifier).name] = "this"
      //   } else if (
      //     isMemberExpression(node.parent)
      //     && (node.parent.property as estree.Identifier).name === "$route"
      //   ) { // 获取成员值 this.$route
      //     const rootExpression = traverseMemberExpression(node.parent)
      //     const thisExpression = context.getSourceCode()
      //       .getTokens(rootExpression)
      //       .reduce((prev, next) => prev += next.value, "")
      //     console.log(rootExpression)
      //     if (isVariableDeclarator(rootExpression.parent)) { // 赋值
      //       // blockVariable[rootExpression.] = "this"
      //     } else if (thisExpression === "this.$route.query") {
      //       console.log("report")
      //     }
      //   }
      // },

      "MemberExpression[property.name = 'query']"(node: estree.MemberExpression) { // 匹配所有 member 如果
        console.log("use *.query")
        // console.log("member", node.object)
        // matchRouteQuery(context, node) // 使用了 this.&route.query
      }
    }
  }
}

// 遍历Member获取完整访问路径
function traverseMemberExpression(node: MemberExpressWithParent): estree.Node {
  if (isMemberExpression(node.parent)) {
    return traverseMemberExpression(node.parent)
  }
  return node
}

// 上报错误
function report(context: Rule.RuleContext, node: estree.Node) {
  context.report({
    message,
    loc: node.loc!
  })
}

export default rule
