import { Rule } from "eslint"

const rule: Rule.RuleModule = {
  meta: {
    docs: {
      description: "disable this.$route.query",
      recommended: false
    },
    schema: [
      // fill in your schema
    ]
  },
  create(context: Rule.RuleContext) {
    console.log("context", context)
    return {

    }
  }
}

export default rule