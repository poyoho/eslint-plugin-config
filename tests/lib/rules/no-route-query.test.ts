import { RuleTester } from "eslint"
import rule from "../../../lib/rules/no-route-query"

const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 10 }})

describe("ts", () => {
  ruleTester.run("no-route-query", rule, {
    valid: [
      { code: "this.hello"},
      { code: "this.world"},
      { code: "this.hhhhh"},
    ],

    invalid: [
      // {
      //   code: "this.$route.query",
      //   errors: 1
      // }
    ]
  })
})
