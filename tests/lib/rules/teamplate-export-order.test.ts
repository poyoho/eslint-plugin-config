import { RuleTester } from "eslint"
import teamplateExportOrder from "../../module/teamplate-export-order"

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

describe("teamplate-export-order", () => {
  teamplateExportOrder(ruleTester)
})
