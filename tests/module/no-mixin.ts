
import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/no-mixin"

export default (ruleTester: RuleTester) =>
  ruleTester.run("no-mixin", rule, {
    valid: [
      {
        code: `
        import mixin from "mixin"
        export default {
          mixins: [mixin]
        }
        `
      },
    ],

    invalid: [
      {
        filename: "test.vue",
        code: `
        <script>
        import mixin from "mixin"
        export default {
          mixins: [mixin]
        }
        </script>
        `,
        errors: 1
      },
    ]
  })
