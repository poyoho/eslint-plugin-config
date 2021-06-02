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
    { code: "this.hello"},
    // { code: "this.world"},
    // { code: "this.hhhhh"},
  ],

  invalid: [
    // {
    //   code: "this.$route.query",
    //   errors: 1
    // }
  ]
})
