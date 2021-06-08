
import { RuleTester } from "eslint"
import rule from "../../lib/stat/module-count"

export default (ruleTester: RuleTester) =>
  ruleTester.run("eslint-disable", rule, {
    valid: [
      {
        filename: "test.ts",
        code: `
        import "./index.css"
        import * as ggg from "ggsimida"
        import a from "b"
        import a from "../asd"
        import a from "./services"
        import { g, h, i, j as jjj } from "c"
        `,
      },
      {
        filename: "../test2.ts",
        code: `
        import "./index.css"
        import a from "b"
        import a from "./asd"
        import a from "./services"
        import { g, h, i, j as jjj } from "c"
        `,
      },
    ],

    invalid: [
    ]
  })
