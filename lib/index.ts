export = {
  rules: {
    // TODO 自动添加vue
    "vue/no-route-query": require("./rules/vue/no-route-query"),
    "vue/template-function-naming": require("./rules/vue/template-function-naming"),
    "vue/teamplate-export-order": require("./rules/vue/teamplate-export-order"),
    // TODO js ts jsx tsx
    "js/no-binocular-logic": require("./rules/ts/no-binocular-logic")
  },
  configs: {
    js: require("./configs/recommended-js"),
    ts: require("./configs/recommended-ts"),
    vue: require("./configs/recommended-vue"),
    vuets: require("./configs/recommended-vuets")
  },
}
