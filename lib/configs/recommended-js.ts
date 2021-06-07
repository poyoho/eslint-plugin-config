import { Linter } from "eslint"

const config: Linter.Config = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    "@poyoho/config"
  ],
  extends: [
  ],
  rules: {
    "@poyoho/config/js/no-binocular-logic": "warn",
  }
}

export = config
