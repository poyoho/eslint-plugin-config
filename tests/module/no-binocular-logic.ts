
import { RuleTester } from "eslint"
import rule from "../../lib/rules/js/no-binocular-logic"

export default (ruleTester: RuleTester) =>
  ruleTester.run("no-binocular-logic", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
