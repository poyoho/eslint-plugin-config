export = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    extraFileExtensions: [".vue"],
    ecmaFeatures: { jsx: true }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: ["@poyoho/config", "vue"],
  extends: [
    "plugin:vue/recommended" // vue推荐配置
  ],
  rules: {
    // 自定义插件库推荐配置
    "@poyoho/config/vue/no-route-query": "warn",
    "@poyoho/config/vue/template-function-naming": "warn",
    "@poyoho/config/vue/teamplate-export-order": "warn",

    "@poyoho/config/js/no-binocular-logic": "warn",
    "@poyoho/config/js/ensure-scope-block": "warn",

    // 格式化配置
    semi: ["error", "never"],
    // @fixable 一个缩进必须用四个空格替代
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true,
      },
    ],
    // 行最大长度为120
    "max-len": [
      "warn",
      {
        code: 120,
      },
    ],
  },
  // Require === and !==
  // eqeqeq: ["error", "always"]
}
