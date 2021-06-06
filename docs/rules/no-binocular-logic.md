## 三目运算符不参与复杂逻辑 (no-binocular-logic)

确保三目运算符不参与复杂逻辑。

## 事例

此规则的**错误**代码示例：

```js
isActive ? banner.show() && user.login() : banner.hide()
```

此规则的**正确**代码示例：

```js
if (isActive) {
  banner.show()
  user.login()
} else {
  banner.hide()
}
```
