import { RuleTester } from "eslint"
import noRouteQuery from "../../module/no-binocular-logic"

const ruleTester = new RuleTester({
  parser: "",
  parserOptions: { ecmaVersion: 2015 }
})

describe("no-binocular-logic", () => {
  noRouteQuery(ruleTester)
})