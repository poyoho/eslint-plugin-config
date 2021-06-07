export = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
  ],
  plugins: [
    "@poyoho/config"
  ],
  rules: {
    // Require === and !==
    "eqeqeq": ["error", "always", {"null": "ignore"}],
    // 排序
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreDeclarationSort": false,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
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
    "no-undef": "off"
  }
}
