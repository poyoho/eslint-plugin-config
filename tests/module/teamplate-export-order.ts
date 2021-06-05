
import { RuleTester } from "eslint"
import rule from "lib/rules/vue/teamplate-export-order"

export default (ruleTester: RuleTester) =>
  ruleTester.run("teamplate-export-order", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
