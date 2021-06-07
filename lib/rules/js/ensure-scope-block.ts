import { Rule } from "eslint"
import * as estree from "estree"
import { isBlockStatement } from "../../utils/node"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "确保代码块的作用范围",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/ensure-scope-block.html"
    },
    messages: {
      "ensure-scope-block": "if、for等语句其主体必须包裹在一个代码块内。确保作用范围符合预期，且防止因后期维护原因，导致缩进改变而引起难以排查的 bug。"
    }
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
      "ForInStatement,ForStatement,ForOfStatement"(
        node: estree.ForInStatement | estree.ForStatement | estree.ForOfStatement) {
        if (!isBlockStatement(node.body)) {
          reportNoScopeBlock(context, node)
        }
      },
      IfStatement(node) {
        const ifCase = node.consequent
        const elseCase = node.alternate
        if (
          !isBlockStatement(ifCase) ||
          (elseCase && !isBlockStatement(elseCase))
        ) {
          reportNoScopeBlock(context, node)
        }
      }
    }
  }
}

function reportNoScopeBlock(
  context: Rule.RuleContext,
  node: estree.Node
) {
  context.report({
    messageId: "ensure-scope-block",
    loc: node.loc!,
  })
}

export = rule
