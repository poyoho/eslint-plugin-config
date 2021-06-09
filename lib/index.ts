export = {
  rules: {
    // ☠(dont't delete) VUE RULE
    "vue/no-mixin": require("./rules/vue/no-mixin"),
    "vue/no-route-query": require("./rules/vue/no-route-query"),
    "vue/template-function-naming": require("./rules/vue/template-function-naming"),
    "vue/teamplate-export-order": require("./rules/vue/teamplate-export-order"),
    // ☠(dont't delete) JS RULE
    "js/ensure-scope-block": require("./rules/js/ensure-scope-block"),
    "js/no-binocular-logic": require("./rules/js/no-binocular-logic"),
    // ☠(dont't delete) STAT
    "stat/eslint-disable": require("./stat/eslint-disable"),
    "stat/module-count": require("./stat/module-count"),
  },
  configs: {
    js: require("./configs/recommended-js"),
    ts: require("./configs/recommended-ts"),
    vue: require("./configs/recommended-vue"),
    vuets: require("./configs/recommended-vuets"),
    stat: require("./configs/stat")
  },
}
