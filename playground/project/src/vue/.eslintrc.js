module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  plugins: ["@poyoho/config"],
  extends: [
    "plugin:@poyoho/config/vuets",
    "plugin:@poyoho/config/stat"
  ],
}
