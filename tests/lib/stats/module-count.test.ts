
import { RuleTester } from "eslint"
import moduleCount from "../../module/module-count"
import outData from "../../../lib/stat"

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

describe("module-count", () => {
  moduleCount(ruleTester)
  // TODO
})
