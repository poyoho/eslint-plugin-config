const chalk = require("chalk")
const { prompt } = require("enquirer")

// 连字符 -> 驼峰化
function camelize(str) {
  return str.replace(/[-_](\w)/g, (_, c) => (c ? c.toUpperCase() : ""))
}

// 驼峰 -> 连字符
function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, "-$1").toLowerCase()
}

async function variables() {
  const $TYPE = (await prompt({
    type: "select",
    name: "$TYPE",
    message: "规则类型",
    choices: ["vue", "js", "stat"]
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
  if (["vue", "stat"].includes($TYPE)) {
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

module.exports = {
  variables
}
