import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/template-function-naming"

export default (ruleTester: RuleTester) =>
  ruleTester.run("template-function-naming", rule, {
    valid: [
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @enter="enterInputName">
        </div>
        </template>
        <script>
        function aaa() {}
        aaa()
        export default {
          methods: {
            enterInputName () {},
            bbb() {
              this.a.ccc()
            }
          }
        }
        </script>`
      },
      {
        filename: "test.vue",
        code: `
          <template>
          <div>
              <input @bbb="bbbInputName">
          </div>
          </template>
          <script>
          export default {
            methods: {
              bbbInputName () {},
            }
          }
          </script>`
      },
    ],
    invalid: [
      {
        filename: "test.vue",
        code: `
          <template>
          <div>
              <input @a-b-c="bbbInputName">
          </div>
          </template>

          <script>
          export default {
            methods: {
              bbbInputName () {},
            }
          }
          </script>`,
        errors: 2
      },
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @enter="aaaInputName" @update-user-name="bbbUserName">
        </div>
        </template>

        <script>
        export default {
          methods: {
            aaaInputName () {}, // ❌
            bbbUserName () {}, // ❌
          }
        }
        </script>
        `,
        errors: 4
      },
    ]
  })
