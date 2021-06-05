import { AST } from "vue-eslint-parser"

export function isVIdentifier(node: AST.Node | undefined): node is AST.ESLintIdentifier {
  return node !== undefined && node.type === "Identifier"
}

export function isVAttribute(node: AST.Node | undefined): node is AST.VAttribute {
  return node !== undefined && node.type === "VAttribute"
}
