import { RuleTester } from "eslint"
import templateFunctionNaming from "../../module/template-function-naming"

const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: { ecmaVersion: 2015, sourceType: "module" }
})

describe("template-function-naming", () => {
  templateFunctionNaming(ruleTester)
})
