import * as estree from "estree"

const MODULE_DECLARATION_NODES = [
  "ImportDeclaration",
  "ExportNamedDeclaration",
  "ExportDefaultDeclaration",
  "ExportAllDeclaration",
]

export function isArrowFunctionExpression(node: estree.Node | undefined): node is estree.ArrowFunctionExpression {
  return node !== undefined && node.type === "ArrowFunctionExpression"
}

export function isAssignmentExpression(node: estree.Node | undefined): node is estree.AssignmentExpression {
  return node !== undefined && node.type === "AssignmentExpression"
}

export function isBinaryExpression(node: estree.Node | undefined): node is estree.BinaryExpression {
  return node !== undefined && node.type === "BinaryExpression"
}

export function isBlockStatement(node: estree.Node | undefined): node is estree.BlockStatement {
  return node !== undefined && node.type === "BlockStatement"
}

export function isBooleanLiteral(node: estree.Node | undefined): node is estree.Literal {
  return isLiteral(node) && typeof node.value === "boolean"
}

export function isCallExpression(node: estree.Node | undefined): node is estree.CallExpression {
  return node !== undefined && node.type === "CallExpression"
}

export function isConditionalExpression(node: estree.Node | undefined): node is estree.ConditionalExpression {
  return node !== undefined && node.type === "ConditionalExpression"
}

export function isContinueStatement(node: estree.Node | undefined): node is estree.ContinueStatement {
  return node !== undefined && node.type === "ContinueStatement"
}

export function isExpressionStatement(node: estree.Node | undefined): node is estree.ExpressionStatement {
  return node !== undefined && node.type === "ExpressionStatement"
}

export function isFunctionDeclaration(node: estree.Node | undefined): node is estree.FunctionDeclaration {
  return node !== undefined && node.type === "FunctionDeclaration"
}

export function isFunctionExpression(node: estree.Node | undefined): node is estree.FunctionExpression {
  return node !== undefined && node.type === "FunctionExpression"
}

export function isIdentifier(node: estree.Node | undefined): node is estree.Identifier {
  return node !== undefined && node.type === "Identifier"
}

export function isIfStatement(node: estree.Node | undefined): node is estree.IfStatement {
  return node !== undefined && node.type === "IfStatement"
}

export function isLiteral(node: estree.Node | undefined): node is estree.Literal {
  return node !== undefined && node.type === "Literal"
}

export function isLogicalExpression(node: estree.Node | undefined): node is estree.LogicalExpression {
  return node !== undefined && node.type === "LogicalExpression"
}

export function isMemberExpression(node: estree.Node | undefined): node is estree.MemberExpression {
  return node !== undefined && node.type === "MemberExpression"
}

export function isModuleDeclaration(node: estree.Node | undefined): node is estree.ModuleDeclaration {
  return node !== undefined && MODULE_DECLARATION_NODES.includes(node.type)
}

export function isObjectExpression(node: estree.Node | undefined): node is estree.ObjectExpression {
  return node !== undefined && node.type === "ObjectExpression"
}

export function isReturnStatement(node: estree.Node | undefined): node is estree.ReturnStatement {
  return node !== undefined && node.type === "ReturnStatement"
}

export function isThrowStatement(node: estree.Node | undefined): node is estree.ThrowStatement {
  return node !== undefined && node.type === "ThrowStatement"
}

export function isVariableDeclaration(node: estree.Node | undefined): node is estree.VariableDeclaration {
  return node !== undefined && node.type === "VariableDeclaration"
}

export function isVariableDeclarator(node: estree.Node | undefined): node is estree.VariableDeclarator {
  return node !== undefined && node.type === "VariableDeclarator"
}

export function isProperty(node: estree.Node | undefined): node is estree.Property {
  return node !== undefined && node.type === "Property"
}

export function isMethodDefinition(node: estree.Node | undefined): node is estree.MethodDefinition {
  return node !== undefined && node.type === "MethodDefinition"
}

export function isTemplateLiteral(node: estree.Node | undefined): node is estree.TemplateLiteral {
  return node !== undefined && node.type === "TemplateLiteral"
}

export function isNewExpression(node: estree.Node | undefined): node is estree.NewExpression {
  return node !== undefined && node.type === "NewExpression"
}

export function isExportDefaultDeclaration(node: estree.Node | undefined): node is estree.ExportDefaultDeclaration {
  return node !== undefined && node.type === "ExportDefaultDeclaration"
}

export function isHasParent(node: estree.Node | undefined): node is estree.Node & { parent: estree.Node } {
  return (node as any).parent !== undefined
}

export function isForInStatement(node: estree.Node | undefined): node is estree.ForInStatement {
  return node !== undefined && node.type === "ForInStatement"
}

export function isForOfStatement(node: estree.Node | undefined): node is estree.ForOfStatement {
  return node !== undefined && node.type === "ForOfStatement"
}

export function isForStatement(node: estree.Node | undefined): node is estree.ForStatement {
  return node !== undefined && node.type === "ForStatement"
}

export function isImportSpecifier(node: estree.Node | undefined): node is estree.ImportSpecifier {
  return node !== undefined && node.type === "ImportSpecifier"
}

export function isImportDefaultSpecifier(node: estree.Node | undefined): node is estree.ImportDefaultSpecifier {
  return node !== undefined && node.type === "ImportDefaultSpecifier"
}

export function isImportNamespaceSpecifier(node: estree.Node | undefined): node is estree.ImportNamespaceSpecifier {
  return node !== undefined && node.type === "ImportNamespaceSpecifier"
}
