export = {
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    extraFileExtensions: [".vue"],
    ecmaFeatures: { jsx: true }
  },
  plugins: [
    "vue",
  ],
  extends: [
    require.resolve("./basejs.js"), // 使用编译后的结果
    "plugin:vue/recommended" // vue推荐配置
  ],
  rules: {
    // 自定义插件库推荐配置
    "@poyoho/config/vue/no-route-query": "warn",
    "@poyoho/config/vue/template-function-naming": "warn",
    "@poyoho/config/vue/teamplate-export-order": "warn",
    "@poyoho/config/vue/no-mixin": "warn",
  },
}
