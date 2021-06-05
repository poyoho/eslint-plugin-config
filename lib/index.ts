export = {
  rules: {
    // vue
    "vue/no-route-query": require("./rules/vue/no-route-query"),
    "vue/template-function-naming": require("./rules/vue/template-function-naming"),
    // js ts jsx tsx
    "js/no-binocular-logic": require("./rules/ts/no-binocular-logic")
  },
  configs: {
    js: require("./configs/recommended-js"),
    ts: require("./configs/recommended-ts"),
    vue: require("./configs/recommended-vue"),
    vuets: require("./configs/recommended-vuets")
  },
}
