
import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/teamplate-export-order"

export default (ruleTester: RuleTester) =>
  ruleTester.run("teamplate-export-order", rule, {
    valid: [
      {
        filename: "test.vue",
        code: `
        <script>
        export default {
          setup(props) {
            return {
              a,
              b,
              c,
            }
          }
        }
        </script>
        `
      }
    ],

    invalid: [
      {
        filename: "test.vue",
        code: `
        <script>
        export default defineComponent({
          setup(props) {
            const a = reactive({
              bb: () => {
                  return {a,b,c}
                }
            })
            function bb() {
              return {
                a,b,c
                }
            }
            const cc = () => {
              return {
                  a,b,c
                }
            }
            return {
              ...b,
              [aaa]: reactive(aaa),
              ...c,
              "aaa": 1,
              ...a,
              99: 123,
              a,
              dd: bb,
              [asd.asd]: 123,
              ee: cc,
              bb,
              props,
              cc,
            }
          },
        })
        </script>
        `,
        output: `
        <script>
        export default defineComponent({
          setup(props) {
            const a = reactive({
              bb: () => {
                  return {a,b,c}
                }
            })
            function bb() {
              return {
                a,b,c
                }
            }
            const cc = () => {
              return {
                  a,b,c
                }
            }
            return {
              "aaa": 1,
              ...a,
              ...b,
              ...c,
              99: 123,
              a,
              [aaa]: reactive(aaa),
              [asd.asd]: 123,
              bb,
              cc,
              dd: bb,
              ee: cc,
              props,
            }
          },
        })
        </script>
        `,
        errors: 1
      }
    ]
  })
