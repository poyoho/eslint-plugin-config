import { Rule } from "eslint"
import { getDisableRecord, collectDisable, defineStatistics } from "."

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "eslint-disable统计",
      url: "https://poyoho.github.io/eslint-plugin-config/stat/disable.html"
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return defineStatistics(context, {
      Program(node) {
        if (!node.comments) {
          return
        }
        let flush = false
        const filename = context.getFilename()
        const record = getDisableRecord(filename)
        node.comments.forEach(comment => {
          if(/eslint-disable(-next-line)?\s{1}/.test(comment.value)) {
            const rules = /eslint-disable(-next-line)?\s{1}(.*)/g.exec(comment.value)
            if (!rules || rules.length < 3) {
              return
            }
            rules[2].split(/,\s*/).forEach(disableRule => {
              flush = true
              const count = record.get(disableRule) || 0
              record.set(disableRule, count+1)
            })
          }
        })
        flush && collectDisable(filename, record)
      },
    })
  }
}

export = rule
