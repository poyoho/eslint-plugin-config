const fs = require("fs")
const path = require("path")

const __currentname = path.join(__dirname, "..", "..")

/**
 * 变量
 * $NAME 规则英文名
 * $HUMP 规则英文名驼峰
 * $DESC 描述
 * $TYPE 规则类型(vue/js/ts)
 * $PARSER eslint parser
 */
function replaceModule(module, variables) {
  return module
    .replace(/\$NAME/g, variables.$NAME)
    .replace(/\$HUMP/g, variables.$HUMP)
    .replace(/\$DESC/g, variables.$DESC)
    .replace(/\$TYPE/g, variables.$TYPE)
    .replace(/\$PARSER/g, variables.$PARSER)
}

// 更新文件内容
function updateFile(filePath, format) {
  filePath = path.join(__currentname, filePath)
  let content = fs.readFileSync(filePath, { encoding: "utf-8" })
  fs.writeFileSync(
    filePath,
    format(content),
    { encoding: "utf-8" }
  )
}

module.exports = {
  replaceModule,
  updateFile
}
