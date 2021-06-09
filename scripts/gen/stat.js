const fs = require("fs")
const path = require("path")
const chalk = require("chalk")
const util = require("../utils")
const teamplate = require("../teamplate/stat")

const __currentname = path.join(__dirname, "..", "..")

function genDoc(variables) {
  console.log(chalk.blue("gen doc"))
  const doc = util.replaceModule(teamplate.DOC, variables)
  const statRoute = util.replaceModule(teamplate.DOC_ROUTE, variables)
  const readme = util.replaceModule(teamplate.README_DOC, variables)
  // new doc
  fs.writeFileSync(
    path.join(__currentname, "/docs/stats/", variables.$NAME),
    doc,
    { encoding: "utf-8" }
  )

  // insert doc route
  util.updateFile(
    "docs/.vitepress/route/stats.js",
    (content) =>
      content.replace("// ☠(dont't delete) INSERT", "// ☠(dont't delete) INSERT\n"+statRoute)
  )

  // insert readme doc
  util.updateFile(
    "README.md",
    (content) =>
      content.replace("<!-- ☠don't delete STAT -->", "<!-- ☠don't delete STAT -->\n"+readme)
  )
}

function genPlayMain(variables) {
  console.log(chalk.blue("replace playground/runner/"))
  const playmainImport = util.replaceModule(teamplate.PLAYMAIN_IMPORT, variables)
  const playmainInsert = util.replaceModule(teamplate.PLAYMAIN_INSERT, variables)
  // playground runner
  util.updateFile(
    `playground/runner/${variables.$TYPE}.ts`,
    (content) => content
      .replace(/\/\/ ☠\(dont't delete\) RULE IMPORT\s*(\S*)/m, (s, s1) => s.replace(s1, `${playmainImport}\n// ${s1}`))
      .replace(/\/\/ ☠\(dont't delete\) RULE INSERT\s*(\S*)/m, (s, s1) => s.replace(s1, `${playmainInsert}\n// ${s1}`))
  )
}

function genRuleModule(variables) {
  console.log(chalk.blue("gen default tests module"))
  const ruleModule = util.replaceModule(teamplate.RULE_MODULE, variables)
  // rule module
  fs.writeFileSync(
    path.join(__currentname, "/tests/module/", variables.$NAME+".ts"),
    ruleModule,
    { encoding: "utf-8" }
  )
}

function genRuleTest(variables) {
  console.log(chalk.blue("gen default tests"))
  const ruleTest = util.replaceModule(teamplate.RULE_TEST, variables)
  // rule test
  fs.writeFileSync(
    path.join(__currentname, "/tests/lib/stats/", variables.$NAME+".test.ts"),
    ruleTest,
    { encoding: "utf-8" }
  )
}

function genRule(variables) {
  console.log(chalk.blue("gen default rule"))
  const ruleDefault = util.replaceModule(teamplate.RULE_DEFAULT, variables)
  const ruleExport = util.replaceModule(teamplate.RULE_EXPORT, variables)
  // defalut rule
  fs.writeFileSync(
    path.join(__currentname, `/lib/${variables.$TYPE}/`, variables.$NAME+".ts"),
    ruleDefault,
    { encoding: "utf-8" }
  )

  // insert rule expot
  util.updateFile(
    "lib/index.ts",
    (content) => content.replace("// ☠(dont't delete) STAT", "// ☠(dont't delete) STAT\n"+ruleExport)
  )
}

function gen(variables) {
  genDoc(variables)
  genRuleModule(variables)
  genPlayMain(variables)
  genRuleTest(variables)
  genRule(variables)
}

module.exports = {
  gen
}
