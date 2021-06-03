# eslint-plugin-hhh

eslint plugin for myself

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-hhh`:

```
$ npm install eslint-plugin-hhh --save-dev
```


## Usage

Add `hhh` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "hhh"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "hhh/rule-name": 2
    }
}
```

Or you can use the recommended configuration of rules:
```json
{
  "plugins": [
    "hhh"
  ],
  "extends": [
    "plugin:hhh/recommended"
  ]
}
```

## Supported Rules

* Fill in provided rules here





