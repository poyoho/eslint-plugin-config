import { Rule } from "eslint"

type Counter = Map<string, number>
// eslint 禁用统计
const disableMap = new Map<string, Counter>()
export function getDisableRecord(filename: string) {
  return disableMap.get(filename) || new Map<string, number>()
}

export function collectDisable(filename: string, record: Counter) {
  disableMap.set(filename, record)
}

// 模块引用计数
const modulesMap = new Map<string, number>()
export function getMoudleCount(name: string) {
  return modulesMap.get(name)
}
export function collectModule(name: string, record: number) {
  modulesMap.set(name, record)
}

// 检测总行数
let lineCount = 0
export function collectFileLine(count: number) {
  lineCount += count
}

export function defineStatistics(
  context: Rule.RuleContext,
  cb: (filename: string) => Rule.RuleListener) {
  const filename = context.getFilename()
  collectFileLine(context.getSourceCode().lines.length)
  cb(filename)
}

// 输出结果
process.on("exit", () => {
  console.log("⭐ 检测总函数: ", lineCount)
  console.log("⭐ disable统计")
  const allCount = new Map<string, number>()
  disableMap.forEach((record, filename) => {
    console.log("filename", filename)
    console.log(record)
    record.forEach((v, k) => allCount.set(k, v))
  })
  console.log(allCount)
  console.log("⭐ 模块引用统计")
  console.log(modulesMap)
})
