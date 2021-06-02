import { Rule } from "eslint"
import * as estree from "estree"

// 提示位置
export interface IssueLocation {
  column: number
  line: number
  endColumn: number
  endLine: number
  message?: string
}

// 编码信息
export interface EncodedMessage {
  message: string
  cost?: number
  secondaryLocations: IssueLocation[]
}

//因为`ReportDescriptor`可能包含`message`或`messageId` 属性，
//通过使用以下类型别名来强制存在 `message` 属性。
export type ReportDescriptor = Rule.ReportDescriptor & { message: string }


// `context.report`支持次要位置和成本。执行规则时在问题消息中编码这些额外信息。
export function report(
  context: Rule.RuleContext,
  reportDescriptor: ReportDescriptor,
  secondaryLocations: IssueLocation[] = [],
  cost?: number,
) {
  const { message } = reportDescriptor
  if (context.options[context.options.length - 1] === "sonar-runtime") {
    const encodedMessage: EncodedMessage = { secondaryLocations, message, cost }
    reportDescriptor.message = JSON.stringify(encodedMessage)
  }
  context.report(reportDescriptor)
}

// 标准化位置信息 将`estree.SourceLocation` 转换成 `IssueLocation`
export function normalizeLocation(
  startLoc: estree.SourceLocation,
  endLoc: estree.SourceLocation = startLoc,
  message = "",
): IssueLocation {
  return {
    line: startLoc.start.line,
    column: startLoc.start.column,
    endLine: endLoc.end.line,
    endColumn: endLoc.end.column,
    message,
  }
}
