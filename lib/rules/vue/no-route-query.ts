import { Rule } from "eslint"
import * as estree from "estree"
import { isMemberExpression, isObjectExpression } from "../../utils/node"
import { traverseMemberObject } from "../../utils/traverse"

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
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    const scopeVariabler = cacheScopeVariables()
    return {
      // *.query
      "MemberExpression[property.name = 'query']"(node: estree.MemberExpression) {
        let leftUsed = node.object as estree.Node
        if (isMemberExpression(leftUsed)) {
          leftUsed = traverseMemberObject(leftUsed)
        }
        const leftVal = context.getSourceCode().getText(node.object)
        if (leftVal === "this.$route") { // this.$route.query
          context.report({message, loc: node.loc!})
        } else { // [variable = this.$route].query
          const variables = scopeVariabler(context)
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

// 缓存作用域内的变量
function cacheScopeVariables() {
  const _cache = new WeakMap()
  return (context: Rule.RuleContext) => {
    const scope = context.getScope()
    let variables: Record<string, string>
    if ((variables = _cache.get(scope))) {
      return variables
    }
    // 作用域下所有变量
    variables = scope.variables.reduce(
      (prev, next) => {
        // 最后一次修改变量
        const lastWrite = next.references.reduce((prev, next) => next.writeExpr || prev, {}) as estree.Node
        if (lastWrite.type) {
          if (!isObjectExpression(lastWrite)) {
            prev[next.name] = context.getSourceCode().getText(lastWrite)
          }
        }
        return prev
      }, {} as Record<string, string>
    )
    // 缓存当前作用域所有变量定义
    _cache.set(scope, variables)
    return variables
  }
}

export = rule
