import { Rule } from "eslint"
import { defineVueMixinVisitor } from "../../visitors"

const MIXIN_MSG =
`
1. 改用组件引入\`mixin\`内容
\`\`\`html
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
\`\`\`

2. 将mixin内容改成无渲染组件

\`\`\`js
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
\`\`\`
`

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "禁止使用mixin",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/no-mixin.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return defineVueMixinVisitor(context, (node) => {
      context.report({
        message: MIXIN_MSG,
        loc: node.loc!,
      })
    })
  }
}

export = rule
