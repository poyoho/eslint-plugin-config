/**
 * @fileoverview disable this.$route.query
 * @author poyoho
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-route-query"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-route-query", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "this.$route.query",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
