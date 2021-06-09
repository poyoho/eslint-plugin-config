const fs = require("fs")
const chalk = require("chalk")
const path = require("path")
const { input } = require("./utils")
const genRule = require("./gen/rule")
const genStat = require("./gen/stat")

async function main() {
  const variables = await input()
  if (["js", "vue"].includes(variables.$TYPE)) {
    genRule(variables)
  } else if (["stat"].includes(variables.$TYPE)){
    genStat(variables)
  }
}

main()
