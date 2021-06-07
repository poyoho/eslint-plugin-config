
import { RuleTester } from "eslint"
import rule from "../../lib/rules/js/ensure-scope-block"

export default (ruleTester: RuleTester) =>
  ruleTester.run("ensure-scope-block", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
