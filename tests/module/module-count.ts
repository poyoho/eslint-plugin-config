
import path from "path"
import { RuleTester } from "eslint"
import rule from "../../lib/stat/module-count"

export default (ruleTester: RuleTester) =>
  ruleTester.run("eslint-disable", rule, {
    valid: [
      {
        filename: path.join(__dirname, "./test.ts"),
        code: `
        import "./index.css"
        import * as ggg from "ggsimida"
        import a from "b"
        import a from "../asd"
        import a from "./services"
        import { g, h, i, j as jjj } from "c"
        ggg.aaa()
        ggg.aaa()
        ggg.ddd()
        console.log(ggg.abc)
        console.log(ggg)
        function abc(ggg) {
          ggg.bbb()
        }

        function abc() {
          ggg.ccc()
        }
        `,
      },
      {
        filename: path.join(__dirname, "/test2/test2.ts"),
        code: `
        import "../index.css"
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
