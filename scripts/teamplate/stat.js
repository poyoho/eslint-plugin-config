/**
 * 变量
 * $NAME 规则英文名
 * $HUMP 规则英文名驼峰
 * $DESC 描述
 * $TYPE 规则类型(vue/js/ts)
 * $PARSER eslint parser
 */
const README_DOC = `* [$NAME](./docs/stats/$NAME)`
// 默认文档
const DOC =
`## $DESC ($NAME)

// full it

## 统计

此规则的**统计**代码示例：

\`\`\`js
// full it
\`\`\`
`
// 文档路由
const DOC_ROUTE =
` {
    text: "$NAME",
    link: "/stats/$NAME"
  },`
// playgrond 引入
const PLAYMAIN_IMPORT = `import $HUMP from "../../tests/module/$NAME"`
// playground 插入
const PLAYMAIN_INSERT = `$HUMP(ruleTester)`
// 默认规则调用
const RULE_MODULE =
`import { RuleTester } from "eslint"
import rule from "../../lib/stats/$TYPE/$NAME"

export default (ruleTester: RuleTester) =>
  ruleTester.run("$NAME", rule, {
    valid: [
    ],

    invalid: [
    ]
  })
`
// 默认规则test
const RULE_TEST =
 `import { RuleTester } from "eslint"
import $HUMP from "../../module/$NAME"
import outData from "../../../lib/stat"

const ruleTester = new RuleTester({
  parser: require.resolve("vue-eslint-parser"),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parser: require.resolve("@typescript-eslint/parser"),
    extraFileExtensions: [".vue"],
    ecmaFeatures: {
      jsx: true
    }
  },
})

describe("$NAME", () => {
  $HUMP(ruleTester)
  // full it
})`
// 默认规则
const RULE_DEFAULT =
`import { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "$DESC",
      url: "https://poyoho.github.io/eslint-plugin-config/stats/$NAME.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
    }
  }
}

export = rule
`
// 导出新规则
const RULE_EXPORT = `    "$TYPE/$NAME": require("./stats/$TYPE/$NAME"),`
