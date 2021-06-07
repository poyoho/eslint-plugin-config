
import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/no-mixin"

export default (ruleTester: RuleTester) =>
  ruleTester.run("no-mixin", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
