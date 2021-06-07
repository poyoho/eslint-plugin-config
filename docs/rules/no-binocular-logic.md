## 禁止三目运算符参与逻辑处理 (no-binocular-logic)

确保三目运算符不参与复杂逻辑。

## 事例

此规则的**错误**代码示例：

```js
isActive
  ? banner.show()
  : banner.hide()
```

此规则的**正确**代码示例：

```js
if (isActive) {
  banner.show()
} else {
  banner.hide()
}
```
