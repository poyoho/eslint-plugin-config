import { RuleTester } from "eslint"
import rule from "../../../lib/rules/vue/no-route-query"

const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 10 }})

describe("ts", () => {
  ruleTester.run("no-route-query", rule, {
    valid: [
      { code: "() => this.hello.query.name"},
      { code: "const email = this.$route"},
      { code: "this"},
      {
        code: `
        const a = this.$route
        const ad = () => {
          let a = {query: "123"}
          console.log(a.query)
        }
        `
      },
      {
        code: `
        function testBlock() {
          const a = {b: this}
          console.log(a.b.$route.query.aaa)
        }
        `
      }
    ],

    invalid: [
      {
        code: "this.$route.query",
        errors: 1
      },
      {
        code: "this.$route.query.a",
        errors: 1
      },
      {
        code: `
        let a = 10
        a = this.$route
        const d = a.query
        `,
        errors: 1
      },
      {
        code: `
        const b = this
        const e = b.$route.query
        `,
        errors: 1
      }
    ]
  })
})
