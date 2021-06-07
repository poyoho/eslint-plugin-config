export = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
  ],
  plugins: [
    "@poyoho/config",
    "simple-import-sort",
  ],
  rules: {
    // Require === and !==
    "eqeqeq": ["error", "always", {"null": "ignore"}],
    // 排序 eslint(sort-imports)不好用
    // https://github.com/lydell/eslint-plugin-simple-import-sort#example
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    // 分号
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
    "no-undef": "off"
  }
}
