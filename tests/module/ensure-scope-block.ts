
import { RuleTester } from "eslint"
import rule from "../../lib/rules/js/ensure-scope-block"

export default (ruleTester: RuleTester) =>
  ruleTester.run("ensure-scope-block", rule, {
    valid: [
      {
        code: `
        if (b) {
          return
        }
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
        code: "<script>if (b) return</script>",
        errors: 1
      },
      {
        code: `
        if (b)
          console.log('当前值为 true')
        else
          console.log('当前值为 false')
        `,
        errors: 2
      },
      {
        code: `
        for (const item of arr)
          if (item.name === '张三') isFind = true
        `,
        errors: 2
      }
    ]
  })
