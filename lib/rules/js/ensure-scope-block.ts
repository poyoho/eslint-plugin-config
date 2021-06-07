import { Rule } from "eslint"
import * as estree from "estree"
import { isBlockStatement, isIfStatement, isForInStatement, isForOfStatement, isForStatement } from "../../utils/node"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "确保代码块的作用范围",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/ensure-scope-block.html"
    },
    messages: {
      "if": "if语句其主体必须包裹在一个代码块内。确保作用范围符合预期，且防止因后期维护原因，导致缩进改变而引起难以排查的 bug。",
      "else": "else语句其主体必须包裹在一个代码块内。确保作用范围符合预期，且防止因后期维护原因，导致缩进改变而引起难以排查的 bug。",
      "for": "for语句其主体必须包裹在一个代码块内。确保作用范围符合预期，且防止因后期维护原因，导致缩进改变而引起难以排查的 bug。"
    },
    fixable: "whitespace",
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
      "ForInStatement,ForStatement,ForOfStatement"(
        node: estree.ForInStatement | estree.ForStatement | estree.ForOfStatement) {
        !isBlockStatement(node.body) &&
        reportNoScopeBlock(context, node.body, "for")
      },
      IfStatement(node) {
        const ifCase = node.consequent
        const elseCase = node.alternate

        !isBlockStatement(ifCase) &&
        reportNoScopeBlock(context, ifCase, "if")

        elseCase &&
        !isBlockStatement(elseCase) &&
        !isIfStatement(elseCase) && // 禁止套娃
        reportNoScopeBlock(context, elseCase, "else")
      }
    }
  }
}

function reportNoScopeBlock(
  context: Rule.RuleContext,
  node: estree.Node,
  messageId: string
) {
  context.report({
    messageId,
    loc: node.loc!,
    fix: (fixer) => {
      return fixer.replaceText(node, `{\n${context.getSourceCode().getText(node)}\n}`)
    }
  })
}

export = rule
