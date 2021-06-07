import { RuleTester } from "eslint"
import templateFunctionNaming from "../../module/template-function-naming"

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
describe("template-function-naming", () => {
  templateFunctionNaming(ruleTester)
})
