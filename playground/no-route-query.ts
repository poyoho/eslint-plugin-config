import { RuleTester } from "eslint"
import rule from "../lib/rules/no-route-query"
const NodeMonkey = require("node-monkey")

// eslint rule 测试容器
const ruleTester = new RuleTester({parserOptions: { ecmaVersion: 10 }})
// 使用浏览器console输出 guest/guest
NodeMonkey({
  server: {
    disableLocalOutput: false,
    host: "localhost",
    port: 999,
  },
  dataDir: "admin"
}, "ninja")
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
    { // 改对象引用 再访问
      code: `
      function testBlock() {
        const a = {b: this.$route,e:this,f:{g: this.a.b.c}}
        a.c = {d: this.$route}
        console.log(a.b.query.aaa)
        console.log(a.c.d.query.aaa)
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
