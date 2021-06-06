
import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/teamplate-export-order"

export default (ruleTester: RuleTester) =>
  ruleTester.run("teamplate-export-order", rule, {
    valid: [
      {
        filename: "test.vue",
        code: `
        <script>
        export default defineComponent({
          setup(props) {
            const b = "hello world"
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
            var arr = [a, b, ...{A,B,C}];
            var gg = {a,b, ...a};
            if (a)
            b = 1

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
          data: () => {
            return {
            }
          },
          methods: {
            aaa() {

            }
          }
        })
        </script>
        `
      }
    ],

    invalid: [
    ]
  })
