import { RuleTester } from "eslint"
import noRouteQuery from "../../module/no-route-query"

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

describe("no-route-query", () => {
  noRouteQuery(ruleTester)
})
