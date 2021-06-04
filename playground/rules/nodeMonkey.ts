const NodeMonkey = require("node-monkey")
// 使用浏览器console输出 guest/guest
NodeMonkey({
  server: {
    disableLocalOutput: false,
    host: "localhost",
    port: 999,
  },
  dataDir: "admin"
}, "ninja")
