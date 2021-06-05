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
        export default {
          methods: {
            // 回车-提交
            enterInputName () {},
          }
        }
        </script>`
      },
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @ggg="gggInputName">
        </div>
        </template>

        <script>
        export default {
          methods: {
            gggInputName () {},
          }
        }
        </script>`
      }
    ],

    invalid: [
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @enter="aaaInputName">
        </div>
        </template>

        <script>
        export default {
          methods: {
            // 回车-提交
            aaaInputName () {}, // ❌
          }
        }
        </script>
        `,
        errors: 1
      },
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @enter="enterInputName">
        </div>
        </template>

        <script>
        export default {
          methods: {
            enterInputName () {},
            hello() {
              this.enterInputName() // ❌
            }
          }
        }
        </script>
        `,
        errors: 1
      },
      {
        filename: "test.vue",
        code: `
        <template>
        <div>
            <input @enter="aaaInputName">
        </div>
        </template>

        <script>
        function aaaInputName () {} // ❌
        export default {
          methods: {
          }
        }
        </script>
        `,
        errors: 1
      }
    ]
  })
