export = {
  rules: {
    // vue
    "vue/no-route-query": require("./rules/vue/no-route-query"),
    // js
    // ts
    "js/no-binocular-logic": require("./rules/ts/no-binocular-logic")
  },
  configs: {
    js: require("./configs/recommended-js"), // 推荐配置
    ts: require("./configs/recommended-ts"), // 推荐配置
    vue: require("./configs/recommended-vue"), // 推荐配置
    vuets: require("./configs/recommended-vuets") // 推荐配置
  },
}
