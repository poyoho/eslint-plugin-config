## 模板导出资源顺序 (teamplate-export-order)

按照字典序排序导出资源。


## 事例

此规则的**错误**代码示例：

```html
<script>
export default {
  methods: {
    clickHello () {},
    enterInputName () {},

    clickWorld () {},
    enterInputEmail () {},
  },
  setup () {
    const varA = reactive()

    function clickHello() {}
    function enterInputName() {}

    const varB = reactive()

    function clickWorld() {}

    const varC = reactive()

    function enterInputEmail() {}

    return {
      clickHello,
      enterInputName,

      clickWorld,
      enterInputEmail,
    }
  }
}
</script>
```

此规则的**正确**代码示例：

```html
<script>
export default {
  methods: {
    clickHello () {},
    clickWorld () {},

    enterInputName () {},
    enterInputEmail () {},
  },
  setup () {
    const varA = reactive()

    function clickHello() {}
    function enterInputName() {}

    const varB = reactive()

    function clickWorld() {}

    const varC = reactive()

    function enterInputEmail() {}

    return {
      varA,
      varB,
      varC,

      clickHello,
      clickWorld,

      enterInputName,
      enterInputEmail,
    }
  }
}
</script>
```
