
import { RuleTester } from "eslint"
import rule from "../../lib/stat/eslint-disable"

export default (ruleTester: RuleTester) =>
  ruleTester.run("eslint-disable", rule, {
    valid: [
    ],

    invalid: [
      {
        code: `
// eslint-disable-next-line simple-import-sort/imports
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable @typescript-eslint/no-unused-vars
// eslint-disable-next-line @poyoho/config/vue/no-route-query
        `,
        errors: 3
      }
    ]
  })
