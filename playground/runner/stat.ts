/**
 * ❌❌❌❌
 * 在下次执行yarn gen:rule之前一定要还原修改
 */
import { RuleTester } from "eslint"
// import "./nodeMonkey"

// ☠(dont't delete) RULE IMPORT
import moduleCount from "../../tests/module/module-count"
// import eslintDisable from "../../tests/module/eslint-disable"

// eslint rule 测试容器
const ruleTester = new RuleTester({
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
})

// ☠(dont't delete) RULE INSERT
moduleCount(ruleTester)
// eslintDisable(ruleTester)
