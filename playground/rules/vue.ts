/**
 * ❌❌❌❌
 * 在下次执行yarn gen:rule之前一定要还原修改
 */
import { RuleTester } from "eslint"
// import "./nodeMonkey"

import noMixin from "../../tests/module/no-mixin"
// // ☠(dont't delete) RULE IMPORT
// import teamplateExportOrder from "../../tests/module/teamplate-export-order"
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

noMixin(ruleTester)
// // ☠(dont't delete) RULE INSERT
// teamplateExportOrder(ruleTester)
// noRouteQuery(ruleTester)
// teamplateFunctionNaming(ruleTester)
