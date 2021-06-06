import { RuleTester } from "eslint"
// import "./nodeMonkey"

// ☠(dont't delete) RULE IMPORT
import teamplateExportOrder from "../../tests/module/teamplate-export-order"
// import noRouteQuery from "../../tests/module/no-route-query"
// import teamplateFunctionNaming from "../../tests/module/template-function-naming"

// eslint rule 测试容器
const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"],
    ecmaFeatures: {
      jsx: true
    }
  },
})

// ☠(dont't delete) RULE INSERT
teamplateExportOrder(ruleTester)
// noRouteQuery(ruleTester)
// teamplateFunctionNaming(ruleTester)
