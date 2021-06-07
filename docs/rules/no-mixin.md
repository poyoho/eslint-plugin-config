## 禁止使用mixin (no-mixin)

禁止使用mixin，使模板数据混乱。

可以使用vue的组件代替mixin。

## 事例

此规则的**错误**代码示例：

```html
<script>
import mixin from "mixin"
export default {
  mixin: [mixin]
}
</script>
```

此规则的**正确**代码示例：

1. 改用组件引入`mixin`内容
```html
<teamplate>
  <div class="test">
    <component />
  </div>
</teamplate>
<script>
import component from "component"
export default {
  components: {
    component
  }
}
</script>
```

2. 将mixin内容改成无渲染组件

```js
export default {
  name: "component",
  data() {
    return {}
  },
  props: [],
  methods: {},
  computed: {},
  watch: {},
  // ⭐ 注入灵魂
  render() {
    // 导出值 <div slot-scope="{ tags }">获取值
    return this.$scopedSlots.default({
        tags: this.value
    })

    // 不导出值
    return null
  }
}
```
