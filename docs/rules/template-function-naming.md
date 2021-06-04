## 模板函数命名规范 (template-function-naming)

方法命名-[操作行为](https://developer.mozilla.org/zh-CN/docs/Web/Events)以行为标识做开头，且方法名前面写上对应注释，操作行为不能被其它方法直接调用。


## 事例

此规则的**错误**代码示例：

```html
<template>
  <div>
    <input @enter="enterInputName">
    <a @click="clickSubmit">提交</a>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击-提交
    clickSubmit () {},

    // 回车-提交
    enterInputName () {
      this.clickSubmit() // 错误写法
    },
  }
}
</script>
```

此规则的**正确**代码示例：

```html
<template>
  <div>
    <input @enter="enterInputName">
    <a @click="clickSubmit">提交</a>
  </div>
</template>

<script>
export default {
  methods: {
    // 点击-提交
    clickSubmit () {
      this.toSubmit()
    },

    // 回车-提交
    enterInputName () {
      this.toSubmit()
    },

    toSubmit () {}
  }
}
</script>
```
