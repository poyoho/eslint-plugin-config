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
const modulesMap = new Map<string, Counter>()
export function collectModule(source: string, module: string | string[]) {
  if (typeof module !== "string") {
    module.forEach(ele => collectModule(source, ele))
    return
  }
  let record = modulesMap.get(source)
  if (!record) {
    record = new Map<string, number>()
  }
  const moduleCount = record.get(module)
  if (moduleCount) {
    record.set(module, moduleCount + 1)
  } else {
    record.set(module, 1)
  }
  modulesMap.set(source, record)
}

// 检测总行数
let lineCount = 0
const fileSet = new Set<string>()
export function defineStatistics(
  context: Rule.RuleContext,
  rule: Rule.RuleListener) {
  const filename = context.getFilename()
  if (!fileSet.has(filename)) {
    fileSet.add(filename)
    lineCount += context.getSourceCode().lines.length
  }
  return rule
}

// 输出结果
process.on("exit", () => {
  console.log("⭐ 检测总函数: ", lineCount)
  console.log("⭐ 检测总文件数: ", fileSet.size)
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
