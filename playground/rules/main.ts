import { RuleTester } from "eslint"
// import "./nodeMonkey"

// import noRouteQuery from "../../tests/module/no-route-query"
import teamplateFunctionNaming from "../../tests/module/template-function-naming"

// eslint rule 测试容器
const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: { ecmaVersion: 2015 }
})

// noRouteQuery(ruleTester)
teamplateFunctionNaming(ruleTester)
