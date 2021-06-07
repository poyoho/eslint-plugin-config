export = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: [
    "sonarjs",
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
    "no-undef": "off",
    /* Best Practices: 规则涉及最佳实践 */
    // 强制数组方法的回调函数中有 return 语句
    "array-callback-return": "error",
    // 限制函数圈复杂度不超过 10
    "complexity": ["error", 10],
    // 限制函数认知复杂度不超过 15
    "sonarjs/cognitive-complexity": ["error", 15],
    // 要求函数使用一致的 return 语句【总是指定返回值或返回 undefined 无论是隐式或显式】
    "consistent-return": ["error", { treatUndefinedAsUnspecified: true }],
    // 禁止在 else 前有 return
    "no-else-return": "error",
    // 禁止使用不带 await 表达式的 async 函数
    "require-await": "error",

    /* Stylistic Issues: 规则涉及风格指南 */
    // 要求或禁止使用拖尾逗号
    "comma-dangle": ["error", {
      // 数组中， 最后一个元素与闭括号在不同的行时，允许（但不要求）使用拖尾逗号
      "arrays": "only-multiline",
      // 对象中， 最后一个属性与闭括号在不同的行时，允许（但不要求）使用拖尾逗号
      "objects": "only-multiline",
      // import声明，禁止使用拖尾逗号
      "imports": "never",
      // exports声明，禁止使用拖尾逗号
      "exports": "never",
      // function声明与调用，禁止使用拖尾逗号
      "functions": "never",
    }],
    // 强制块语句的最大可嵌套深度
    "max-depth": ["error", 3],
    // 强制函数最大行数
    "max-lines-per-function": ["error", 50],
    // 强制每一行中所允许的最大语句数量
    "max-statements-per-line": ["error", { max: 3 }],
    // 强制函数定义中最多允许的参数数量
    "max-params": ["error", { max: 3 }],
    // 强制回调函数最大嵌套深度
    "max-nested-callbacks": ["error", { max: 2 }],
    // 禁止 if 语句作为唯一语句出现在 else 语句块中
    "no-lonely-if": "error",
    // 禁止使用嵌套的三元表达
    "no-nested-ternary": "error",

    /*  ECMAScript 6: 规则涉及ES6，即 ES2015 */
    // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    "no-confusing-arrow": "error",
    // 禁止使用var，要求使用 let 或 const
    "no-var": "error",
  }
}
