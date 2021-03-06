# eslint-plugin-config

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

If use in Vue, install `vue-eslint-parser`
```
$ npm install vue-eslint-parser --save-dev
```

If use in TS, install `@typescript-eslint/parser`
```
$ npm install @typescript-eslint/parser --save-dev
```


## Usage

Add `config` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

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

Or you can use the recommended statistics configuration:
```json
{
  "plugins": [
    "@poyoho/config"
  ],
  "extends": [
    "plugin:@poyoho/config/stat",
  ]
}
```
## Supported Rules
<!-- ☠don't delete RULE -->
* [ensure-scope-block](https://poyoho.github.io/eslint-plugin-config/rules/ensure-scope-block)
* [no-binocular-logic](https://poyoho.github.io/eslint-plugin-config/rules/no-binocular-logic)
* [no-mixin](https://poyoho.github.io/eslint-plugin-config/rules/no-mixin)
* [no-route-query](https://poyoho.github.io/eslint-plugin-config/rules/no-route-query)
* [teamplate-export-order](https://poyoho.github.io/eslint-plugin-config/rules/teamplate-export-order)
* [template-function-naming](https://poyoho.github.io/eslint-plugin-config/rules/template-function-naming)

## Supported Stats
<!-- ☠don't delete STAT -->
* [module-count](https://poyoho.github.io/eslint-plugin-config/stats/module-count)
* [eslint-disable](https://poyoho.github.io/eslint-plugin-config/stats/eslint-disable)

## feature

* write eslint formatter to export eslint result share to `sornaquba`
