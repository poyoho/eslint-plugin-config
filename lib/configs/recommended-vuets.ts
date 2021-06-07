import { Linter } from "eslint"

const config: Linter.Config = {
  parserOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"],
    ecmaFeatures: { jsx: true }
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    require.resolve("./basevue.js"), // 使用编译后的结果
    "plugin:@typescript-eslint/recommended" // ts默认配置
  ],
  rules: {
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
