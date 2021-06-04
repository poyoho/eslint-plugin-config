# eslint-plugin-hhh

eslint plugin for myself

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `@poyoho/eslint-plugin-config`:

```
$ npm install eslint-plugin-config --save-dev
```


## Usage

Add `hhh` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@poyoho/config"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "@poyoho/config/rule-name": 2
    }
}
```

Or you can use the recommended configuration of rules:
```json
{
  "plugins": [
    "@poyoho/config"
  ],
  "extends": [
    "plugin:@poyoho/config/js",
    "plugin:@poyoho/config/ts",
    "plugin:@poyoho/config/vue",
    "plugin:@poyoho/config/vuets",
  ]
}
```

## Supported Rules

* [no-route-query](./docs/rules/no-route-query.md)
* [template-function-naming](./docs/rules/template-function-naming)





