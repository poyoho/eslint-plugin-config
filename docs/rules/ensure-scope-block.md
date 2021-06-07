## 确保代码块的作用范围 (ensure-scope-block)

`if`、`else`、`for`等语句其主体必须包裹在一个代码块内。确保作用范围符合预期，且防止因后期维护原因，导致缩进改变而引起难以排查的 bug。

## 事例

此规则的**错误**代码示例：

```js
// 错误示例 1
if (b) return

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
```

此规则的**正确**代码示例：

```js
// 正确示例 1
if (b) {
  return
}

// 正确示例 2
if (b) {
  console.log('当前值为 true')
} else {
  console.log('当前值为 false')
}

// 正确示例 3
let isFind = false
for (const item of arr) {
  if (item.name === '张三') {
    isFind = true
  }
}

console.log(isFind)
```
