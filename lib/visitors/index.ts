import { Rule } from "eslint"
import path from "path"
import { AST } from "vue-eslint-parser"

interface ASTListener {
  VAttribute: AST.VAttribute | AST.VDirective
  "VAttribute:exit": AST.VAttribute | AST.VDirective
  VDirectiveKey: AST.VDirectiveKey
  "VDirectiveKey:exit": AST.VDirectiveKey
  VElement: AST.VElement
  "VElement:exit": AST.VElement
  VEndTag: AST.VEndTag
  "VEndTag:exit": AST.VEndTag
  VExpressionContainer: AST.VExpressionContainer
  "VExpressionContainer:exit": AST.VExpressionContainer
  VIdentifier: AST.VIdentifier
  "VIdentifier:exit": AST.VIdentifier
  VLiteral: AST.VLiteral
  "VLiteral:exit": AST.VLiteral
  VStartTag: AST.VStartTag
  "VStartTag:exit": AST.VStartTag
  VText: AST.VText
  "VText:exit": AST.VText
  VForExpression: AST.VForExpression
  "VForExpression:exit": AST.VForExpression
  VOnExpression: AST.VOnExpression
  "VOnExpression:exit": AST.VOnExpression
  VSlotScopeExpression: AST.VSlotScopeExpression
  "VSlotScopeExpression:exit": AST.VSlotScopeExpression
  VFilterSequenceExpression: AST.VFilterSequenceExpression
  "VFilterSequenceExpression:exit": AST.VFilterSequenceExpression
  VFilter: AST.VFilter
  "VFilter:exit": AST.VFilter
}
type ASTListen = {[T in keyof ASTListener]?: (node: ASTListener[T]) => void}
export interface TemplateListener extends Rule.NodeListener, ASTListen {
  [key: string]: ((node: any) => void) | undefined
}
type Visitors = TemplateListener | Rule.RuleListener

// 组合visitors
export function compositingVisitors(visitor: Visitors, ...visitors: Visitors[]) {
  for (const v of visitors) {
    for (const key in v) {
      const val = v[key] as Function
      if (visitor[key]) {
        const o = visitor[key] as Function
        visitor[key] = (...args: any[]) => {
          o && o.apply(o, args)
          val && val.apply(val, args)
        }
      } else {
        visitor[key] = v[key]
      }
    }
  }
  return visitor
}

export function defineTemplateBodyVisitor(
  context: Rule.RuleContext,
  templateBodyVisitor: TemplateListener,
  scriptVisitor: Rule.RuleListener
) {
  if (context.parserServices.defineTemplateBodyVisitor == null) {
    const filename = context.getFilename()
    if (path.extname(filename) === ".vue") {
      context.report({
        loc: { line: 1, column: 0 },
        message:
          "Use the latest vue-eslint-parser. " +
          "See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error."
      })
    }
    return {}
  }
  return context.parserServices.defineTemplateBodyVisitor(
    templateBodyVisitor,
    scriptVisitor
  )
}

export * from "./vue"
