export = {
  rules: {
    // ☠(dont't delete) VUE RULE
    "vue/no-route-query": require("./rules/vue/no-route-query"),
    "vue/template-function-naming": require("./rules/vue/template-function-naming"),
    "vue/teamplate-export-order": require("./rules/vue/teamplate-export-order"),
    // ☠(dont't delete) JS RULE
    "js/no-binocular-logic": require("./rules/js/no-binocular-logic"),
    "js/no-binocular-logic": require("./rules/js/no-binocular-logic")
  },
  configs: {
    js: require("./configs/recommended-js"),
    ts: require("./configs/recommended-ts"),
    vue: require("./configs/recommended-vue"),
    vuets: require("./configs/recommended-vuets")
  },
}
