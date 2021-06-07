export = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  extends: [
    require.resolve("./base.js"), // 使用编译后的结果
  ],
  rules: {
    "@poyoho/config/js/no-binocular-logic": "warn",
    "@poyoho/config/js/ensure-scope-block": "warn",
  }
}
