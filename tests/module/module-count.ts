
import { RuleTester } from "eslint"
import rule from "../../lib/stat/eslint-disable"

export default (ruleTester: RuleTester) =>
  ruleTester.run("eslint-disable", rule, {
    valid: [
      {
        code: `
        import a from "b"
        import a from "../asd/asd"
        import a from "../../asd"
        import { g, h, i, j as jjj } from "c"
        `,

      }
    ],

    invalid: [
    ]
  })
