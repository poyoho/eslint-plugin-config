
import { RuleTester } from "eslint"
import rule from "../../lib/rules/js/no-binocular-logic"
export default (ruleTester: RuleTester) =>
  ruleTester.run("no-binocular-logic", rule, {
    valid: [
      {
        code: `const a = isAaa ? 10 : 20`,
      }
    ],

    invalid: [
      {
        filename: "test.vue",
        code: `
        <script>
        isActive
          ? banner.show()
          : banner.hide()
        </script>
        `,
        errors: 1
      },
      {
        code: `
        isActive
          ? banner.show()
          : banner.hide() && user.logout()
        `,
        errors: 1
      },
      {
        code: `
        isActive
          ? banner.show() && user.login()
          : banner.hide() && user.logout()
        `,
        errors: 1
      },
      {
        code: `
        isActive
          ? isAaaa
            ? banner.show() && banner.login()
            : banner.hide() && banner.logout()
          : isBbb
            ? apple.show() && apple.login()
            : apple.hide() && apple.logout()
        `,
        errors: 1
      },
    ]
  })
