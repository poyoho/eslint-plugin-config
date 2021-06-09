import { RuleTester } from "eslint"
import noBinocularLogic from "../../module/no-binocular-logic"

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

describe("no-binocular-logic", () => {
  noBinocularLogic(ruleTester)
})
