import { RuleTester } from "eslint"
import rule from "lib/rules/vue/template-function-naming"

export default (ruleTester: RuleTester) =>
  ruleTester.run("template-function-naming", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
