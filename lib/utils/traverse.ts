import * as estree from "estree"
import { isMemberExpression } from "./node"

// 遍历Member获取完整访问路径
export function traverseMemberObject(node: estree.MemberExpression): estree.Node {
  if (isMemberExpression(node.object)) {
    return traverseMemberObject(node.object)
  }
  return node.object
}
