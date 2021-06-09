import { RuleTester } from "eslint"
import ensureScopeBlock from "../../module/ensure-scope-block"

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

describe("ensure-scope-block", () => {
  ensureScopeBlock(ruleTester)
})
