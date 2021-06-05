import { RuleTester } from "eslint"
import noRouteQuery from "../../module/teamplate-export-order"

const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: { ecmaVersion: 2015 }
})

describe("teamplate-export-order", () => {
  noRouteQuery(ruleTester)
})
