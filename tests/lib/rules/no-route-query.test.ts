import { RuleTester } from "eslint"
import rule from "../../../lib/rules/no-route-query"

const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 10 }})

describe("ts", () => {
  // ruleTester.run("no-route-query", rule, {
  //   valid: [
  //     { code: "() => this.hello.query.name"},
  //     { code: "this.$route"},
  //     { code: "this"},
  //   ],

  //   invalid: [
  //     {
  //       code: "this.$route.query",
  //       errors: 1
  //     },
  //     {
  //       code: "this.$route.query.a",
  //       errors: 1
  //     },
  //     {
  //       code: `const route = this.$route
  //       const b = route.query.a
  //       `,
  //       errors: 1
  //     },
  //   ]
  // })
})