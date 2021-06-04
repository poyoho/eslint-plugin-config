/**
 * 变量
 * $NAME 规则英文名
 * $HUMP 规则英文名驼峰
 * $DESC 描述
 * $TYPE 规则类型(vue/js/ts)
 * $PARSER eslint parser
 */
// 默认文档
const DOC =
`## $DESC ($NAME)

// full it

## 事例

此规则的**错误**代码示例：

\`\`\`html
// full it
\`\`\`

此规则的**正确**代码示例：

\`\`\`html
// full it
\`\`\``
// playgrond 引入
const PLAYMAIN_IMPORT = `import $HUMP from "../../tests/module/$NAME"`
// playground 插入
const PLAYMAIN_INSERT = `$HUMP(ruleTester)`
// 默认规则调用
const RULE_MODULE =
`
import { RuleTester } from "eslint"
import rule from "lib/rules/$TYPE/$NAME"

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
import noRouteQuery from "../../module/$NAME"

const ruleTester = new RuleTester({
  parser: $PARSER,
  parserOptions: { ecmaVersion: 2015 }
})

describe("$NAME", () => {
  noRouteQuery(ruleTester)
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

const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const { prompt } = require("enquirer")

function replaceModule(module, variables) {
  return module
    .replace(/\$NAME/g, variables.$NAME)
    .replace(/\$HUMP/g, variables.$HUMP)
    .replace(/\$DESC/g, variables.$DESC)
    .replace(/\$TYPE/g, variables.$TYPE)
    .replace(/\$PARSER/g, variables.$PARSER)
}

// 连字符 -> 驼峰化
function camelize(str) {
  return str.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ""))
}

// 驼峰 -> 连字符
function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, "-$1").toLowerCase()
}


async function input() {
  const $TYPE = (await prompt({
    type: "select",
    name: "$TYPE",
    message: "规则类型",
    choices: ["vue", "js", "ts"]
  })).$TYPE

  let $NAME = (await prompt({
    type: "input",
    name: "$NAME",
    message: "规则名称",
  })).$NAME

  const $DESC = (await prompt({
    type: "input",
    name: "$DESC",
    message: "规则描述",
  })).$DESC

  if(/[A-Z]/.test($NAME)) {
    $NAME = hyphenate($NAME)
    console.log(chalk.red("规则命名必须为驼峰"), $NAME)
  }

  let $PARSER = `""`
  if ($TYPE === "vue") {
    $PARSER = `require.resolve("vue-eslint-parser")`
  }

  return {
    $TYPE,
    $NAME,
    $DESC,
    $PARSER,
    $HUMP: camelize($NAME),
  }
}

function genDoc(variables) {
  console.log(chalk.blue("gen doc"))
  const doc = replaceModule(DOC, variables)
  // new doc
  fs.writeFileSync(
    path.join(__dirname, "..", "docs/rules/", variables.$NAME+".md"),
    doc,
    { encoding: "utf-8" }
  )
}

function genPlayMain(variables) {
  console.log(chalk.blue("replace playground/rules/"))
  const playmainImport = replaceModule(PLAYMAIN_IMPORT, variables)
  const playmainInsert = replaceModule(PLAYMAIN_INSERT, variables)
  // playground rules
  const playgroundRuleScriptPath = path.join(__dirname, "..", "playground/rules/vue.ts")
  const script = fs.readFileSync(playgroundRuleScriptPath, { encoding: "utf-8" })
    .replace("// ☠(dont't delete) RULE IMPORT", "// ☠(dont't delete) RULE IMPORT\n"+playmainImport)
    .replace("// ☠(dont't delete) RULE INSERT", "// ☠(dont't delete) RULE INSERT\n"+playmainInsert)
  fs.writeFileSync(
    playgroundRuleScriptPath,
    script,
    { encoding: "utf-8" }
  )
}

function genRuleModule(variables) {
  console.log(chalk.blue("gen default tests module"))
  const ruleModule = replaceModule(RULE_MODULE, variables)
  // rule module
  fs.writeFileSync(
    path.join(__dirname, "..", "tests/module/", variables.$NAME+".ts"),
    ruleModule,
    { encoding: "utf-8" }
  )
}

function genRuleTest(variables) {
  console.log(chalk.blue("gen default tests"))
  const ruleTest = replaceModule(RULE_TEST, variables)
  // rule test
  fs.writeFileSync(
    path.join(__dirname, "..", "tests/lib/rules/", variables.$NAME+".test.ts"),
    ruleTest,
    { encoding: "utf-8" }
  )
}

function genRule(variables) {
  console.log(chalk.blue("gen default rule"))
  const ruleDefault = replaceModule(RULE_DEFAULT, variables)
  // defalut rule
  fs.writeFileSync(
    path.join(__dirname, "..", `lib/rules/${variables.$TYPE}/`, variables.$NAME+".ts"),
    ruleDefault,
    { encoding: "utf-8" }
  )
}

function gen(variables) {
  genDoc(variables)
  genRuleModule(variables)
  genPlayMain(variables)
  genRuleTest(variables)
  genRule(variables)
}

async function main() {
  const variables = await input()
  gen(variables)
}

main()
