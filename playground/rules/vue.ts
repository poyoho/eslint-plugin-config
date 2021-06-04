import { RuleTester } from "eslint"
// import "./nodeMonkey"

// ☠(dont't delete) RULE IMPORT
// import noRouteQuery from "../../tests/module/no-route-query"
import teamplateFunctionNaming from "../../tests/module/template-function-naming"

// eslint rule 测试容器
const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: { ecmaVersion: 2015 }
})

// ☠(dont't delete) RULE INSERT
// noRouteQuery(ruleTester)
teamplateFunctionNaming(ruleTester)
