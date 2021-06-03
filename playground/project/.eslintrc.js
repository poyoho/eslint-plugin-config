module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  plugins: ["config"],
  rules: {
    "config/no-route-query": "error"
  },
}
