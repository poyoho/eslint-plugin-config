
import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/no-mixin"

export default (ruleTester: RuleTester) =>
  ruleTester.run("no-mixin", rule, {
    valid: [
      {
        code: `
        import mixin from "mixin"
        export default {
          mixin: [mixin]
        }
        `
      },
      {
        filename: "test.vue",
        code: `
        <script>
        import mixin from "mixin"
        export default {
          mixin: [mixin]
        }
        </script>
        `,
      },
    ],

    invalid: [
      // {
      //   filename: "test.vue",
      //   code: `
      //   <>
      //   import mixin from "mixin"
      //   export default {
      //     mixin: [mixin]
      //   }
      //   </>
      //   `,
      //   errors: 1
      // },
    ]
  })
