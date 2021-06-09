const fs = require("fs")
const chalk = require("chalk")
const path = require("path")
const input = require("./utils/input")
const genRule = require("./gen/rule")
const genStat = require("./gen/stat")

async function main() {
  const vars = await input.variables()
  if (["js", "vue"].includes(vars.$TYPE)) {
    genRule.gen(vars)
  } else if (["stat"].includes(vars.$TYPE)){
    genStat.gen(vars)
  }
}

main()
