
import { RuleTester } from "eslint"
import rule from "../../lib/rules/js/ensure-scope-block"

export default (ruleTester: RuleTester) =>
  ruleTester.run("ensure-scope-block", rule, {
    valid: [
      {
        filename: "test.vue",
        code: `
        <script>
        if (b) {
          console.log("111")
        }
        </script>
        `
      },
      {
        code: `
        if (b) {
          console.log('当前值为 true')
        } else {
          console.log('当前值为 false')
        }
        `
      },
      {
        code: `
        for (const item of arr) {
          if (item.name === '张三') {
            isFind = true
          }
        }`
      }
    ],

    invalid: [
      {
        filename: "test.vue",
        code: "<script>if (b) console.log('1')</script>",
        errors: 1,
        output: "<script>if (b) {\nconsole.log('1')\n}</script>"
      },
      {
        code: [
          `if (b) console.log('a')`,
          `else if (c) console.log('b')`,
          `else console.log('c')`].join("\n"),
        errors: 3,
        output: [
          `if (b) {\nconsole.log('a')\n}`,
          `else if (c) {\nconsole.log('b')\n}`,
          `else {\nconsole.log('c')\n}`
        ].join("\n"),
      },
      {
        code: [
          `for (const item of a)`,
          `for (const item in b)`,
          `for (const i = 0;i<c;i++)`,
          `if (item.name === 'd')`,
          `e = true`
        ].join("\n"),
        errors: 4,
        output: [
          `for (const item of a)`,
          `{`,
          `for (const item in b)`,
          `for (const i = 0;i<c;i++)`,
          `if (item.name === 'd')`,
          `e = true`,
          `}`
        ].join("\n"),
      }
    ]
  })
