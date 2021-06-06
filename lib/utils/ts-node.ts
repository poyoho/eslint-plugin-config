import * as estree from "estree"

export type TSNode = TSAsExpression

export type HasParentNode = estree.Node & {
  parent: estree.Node
}

export interface TSAsExpression {
  type: "TSAsExpression"
  expression: TSAsExpression
}

export function isTSAsExpression(node: any): node is TSAsExpression {
  return node !== undefined && node.type === "TSAsExpression"
}

// 如果给定节点是一个 `TSAsExpression` 节点，则检索 `TSAsExpression#expression` 值。否则，跳过它。
export function skipTSAsExpression(node: estree.Node): estree.Node {
  if (!node) {
    return node
  }
  if (isTSAsExpression(node)) {
    return skipTSAsExpression((node as any).expression)
  }
  return node
}
