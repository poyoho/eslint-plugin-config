module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  parse: "",
  plugins: ["@poyoho/config"],
  extends: ["plugin:@poyoho/config/recommended-vue"],
  // rules: {
  //   "@poyoho/config/no-route-query": "error",
  // }
}
