import { Linter } from "eslint"

const config: Linter.Config = {
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"],
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    "@poyoho/config",
    "vue",
    "@typescript-eslint"
  ],
  extends: [
    "plugin:vue/recommended", // vue推荐配置
    "plugin:@typescript-eslint/recommended" // ts默认配置
  ],
  rules: { // 自定义插件库推荐配置
    "@poyoho/config/vue/no-route-query": "warn",
    "@poyoho/config/vue/template-function-naming": "warn",
    "@poyoho/config/vue/teamplate-export-order": "warn",
    "@poyoho/config/js/no-binocular-logic": "warn",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        "no-unused-vars": "off",
      }
    },
    {
      files: ["shims-tsx.d.ts"],
      rules: {
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off"
      }
    },
    {
      files: ["*"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "off",
      }
    }
  ]
}

export = config
