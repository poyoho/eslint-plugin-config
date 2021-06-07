/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @poyoho/config/js/ensure-scope-block */
const b = Math.random() > 0.5
const arr = [{name: "1"}, {name: "3"}, {name: "2"}]
// 错误示例 1
if (b) console.log("111")
console.log("111")
console.log("111")

// 错误示例 2
if (b)
  console.log('当前值为 true')
else
  console.log('当前值为 false')

// 错误示例 3
let isFind = false
for (const item of arr)
  if (item.name === '张三') isFind = true

console.log(isFind)

const aa = []
const qqq = []
let e
for (const gg of aa)
  for (const qqqqqq in qqq)
    for (let i = 0;i<10;i++)
      if (i === 9)
        e = true

