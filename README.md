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
* [ensure-scope-block](./docs/rules/ensure-scope-block.md)
* [no-binocular-logic](./docs/rules/no-binocular-logic.md)
* [no-mixin](./docs/rules/no-mixin.md)
* [no-route-query](./docs/rules/no-route-query.md)
* [teamplate-export-order](./docs/rules/teamplate-export-order.md)
* [template-function-naming](./docs/rules/template-function-naming.md)

## Supported Stats
<!-- ☠don't delete STAT -->
* [module-count](./docs/stats/module-count.md)
* [eslint-disable](./docs/stats/eslint-disable.md)

## feature

* write eslint formatter to export eslint result share to `sornaquba`
