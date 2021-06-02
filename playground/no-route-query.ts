import { RuleTester } from "eslint"
import rule from "../lib/rules/no-route-query"
const NodeMonkey = require("node-monkey")

// eslint rule 测试容器
const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 10 }})
// 使用浏览器console输出 guest/guest
NodeMonkey({
  server: {
    disableLocalOutput: true,
    host: "localhost",
    port: 999,
  },
  dataDir: "admin"
}, "ninja")

ruleTester.run("no-route-query", rule, {
  valid: [
    // { code: "() => this.hello.query.name"},
    // { code: "const email = this.$route"},
    // { code: "this"},
    {
      code: `() => {
        let a = 20
        a = this.$route
        a = 33
        console.log(a.query)
      }

      () => {
        let a = this.a
        a = {query: "123"}
        console.log(a.query)
      }
      `
    }
  ],

  invalid: [
  //   {
  //     code: "this.$route.query",
  //     errors: 1
  //   },
  //   {
  //     code: "this.$route.query.a",
  //     errors: 1
  //   },
  //   {
  //     code: `
  //     const route = this.$route
  //     const b = route.query.a
  //     `,
  //     errors: 1
  //   },
  ]
})
