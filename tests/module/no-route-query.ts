import { RuleTester } from "eslint"
import rule from "../../lib/rules/vue/no-route-query"

export default (ruleTester: RuleTester) =>
  ruleTester.run("no-route-query", rule, {
    valid: [
      {
        filename: "test.vue",
        code: `<script>
      console.log(this.aaa.query)
      </script>`
      },
      {
        filename: "test.vue",
        code: `<script>
      const email = this.$route
      </script>`
      },
      {
        filename: "test.vue",
        code: `<script>
      this
      </script>`
      },
      {
        filename: "test.vue",
        code: `
      <script>
      const a = this.$route
      const ad = () => {
        let a = {query: "123"}
        console.log(a.query)
      }
      </script>
      `
      },
      { // 改对象引用 再访问 应该报错但是没有报
        filename: "test.vue",
        code: `
      <script>
      function testBlock() {
        const a = {b: this.$route,e:this,f:{g: this.a.b.c}}
        a.c = {d: this.$route}
        console.log(a.b.query.aaa)
        console.log(a.c.d.query.aaa)
      }
      </script>
      `
      }
    ],

    invalid: [
      {
        filename: "test.vue",
        code: "<script>this.$route.query</script>",
        errors: 1
      },
      {
        filename: "test.vue",
        code: "<script>this.$route.query.a</script>",
        errors: 1
      },
      {
        filename: "test.vue",
        code: `
      <script>
      let a = 10
      a = this.$route
      const d = a.query
      </script>
      `,
        errors: 1
      },
      {
        filename: "test.vue",
        code: `
      <script>
      const b = this
      const e = b.$route.query
      </script>
      `,
        errors: 1
      }
    ]
  })
