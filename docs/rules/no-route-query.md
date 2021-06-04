# 禁止使用 `this.$route.query` (no-route-query)

禁止使用`this.$route.query`

使用`this.$route.query`后维护页面的时候都不知道这个页面还可以接受参数

应该使用组件的props传route.query，因为修改涉及多个页面，需要手动修改，所以只发出建议。

## 实例

此规则的**错误**代码示例：

```js
{
  methods: {
    clickSubmit() {
      const { world } = this.$route.query
      fetchSubmit({
        hello: this.$route.query.hello,
        world,
      })
    }
  }
}
```

此规则的**正确**代码示例：

1. 组件声明props
```js
{
  props: {
    hello: {
      type: String,
      defalut: ""
    },
    world: {
      type: String,
      defalut: ""
    }
  },
  methods: {
    clickSubmit() {
      fetchSubmit({
        hello: this.hello,
        world,
      })
    }
  }
}
```

2. 路由上调用组件时传参

```js
{
  props: route => ({
    hello: route.query.hello,
    world: route.query.world,
  }),
}
```
