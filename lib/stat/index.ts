type DisableRecord = Map<string, number>
const disableMap = new Map<string, DisableRecord>()
export function getDisableRecord(filename: string) {
  return disableMap.get(filename) || new Map<string, number>()
}

export function collectDisable(filename: string, record: DisableRecord) {
  disableMap.set(filename, record)
}

// 输出结果
process.on("exit", () => {
  console.log("⭐ disable统计")
  const allCount = new Map<string, number>()
  disableMap.forEach((record, filename) => {
    console.log("filename", filename)
    console.log(record)
    record.forEach((v, k) => allCount.set(k, v))
  })
  console.log(allCount)
})
