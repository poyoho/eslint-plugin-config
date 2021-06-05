import { Rule } from "eslint"
import * as estree from "estree"
import { AST } from "vue-eslint-parser"
import { makeMap } from "../../utils/makeMap"
import { isVIdentifier } from "../../utils/vue-node"
import { isMemberExpression, isIdentifier } from "../../utils/node"

const EVENT_NAME =
  "abort,animationcancel,animationend,animationiteration,animationstart,auxclick,beforeinput,"+
  "blur,cancel,canplay,canplaythrough,change,click,close,compositionend,compositionstart,compositionupdate,"+
  "contextmenu,cuechange,dblclick,drag,dragend,dragenter,dragexit,dragleave,dragover,dragstart,"+
  "drop,durationchange,emptied,ended,error,focus,focusin,focusout,gotpointercapture,input,invalid,"+
  "keydown,keypress,keyup,load,loadeddata,loadedmetadata,loadstart,lostpointercapture,mousedown,"+
  "mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,pause,play,playing,pointercancel,"+
  "pointerdown,pointerenter,pointerleave,pointermove,pointerout,pointerover,pointerup,progress,"+
  "ratechange,reset,resize,scroll,securitypolicyviolation,seeked,seeking,select,selectionchange,"+
  "selectstart,stalled,submit,suspend,timeupdate,toggle,touchcancel,touchend,touchmove,touchstart,"+
  "transitioncancel,transitionend,transitionrun,transitionstart,volumechange,waiting,wheel," +
  "fullscreenchange,fullscreenerror,pointerlockchange,pointerlockerror,readystatechange,visibilitychange," +
  "copy,cut,paste"

const isEventTag = /*#__PURE__*/ makeMap(EVENT_NAME)
const getEventName = (str: string) => (str+"A").replace(/(?=[A-Z])(.*)/, "")


const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "vue template function naming",
      url: "https://poyoho.github.io/eslint-plugin-config/rules/template-function-naming.html"
    },
    messages: {
      "execEventFunction": "模板操作行为不能被其它方法直接调用。",
      "variFunctionNoEventTag": "方法命名-[操作行为](https://developer.mozilla.org/zh-CN/docs/Web/Events)以行为标识做开头。"
    }
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    console.log("template-function-naming")
    const callFunction = new Map<string, estree.Node>()
    const variFunctuin = new Map<string, estree.Node>()
    return context.parserServices.defineTemplateBodyVisitor(
      {
        "VAttribute[directive=true][key.name.name='on'] > VExpressionContainer"(
          node: AST.VExpressionContainer & { parent: any }
        ) {
          if (
            !(node.expression && isVIdentifier(node.expression))
          ) {
            return
          }
          let functionNode
          const attrVal = node.expression.name
          const eventName = getEventName(attrVal)
          const attrKey = node.parent.key.argument.name
          console.log(attrKey, attrVal, eventName)
          console.log("call", callFunction.keys(), "variable", variFunctuin.keys())
          // 本地定义报错 指定函数定义位置 、 外部定义不用报错
          if ((functionNode = callFunction.get(attrVal))) {
            // 模板script调用了事件函数 ❌loc(script 函数执行处)
            console.log("调用了事件函数", functionNode.loc)
            context.report({messageId: "execEventFunction", loc: functionNode.loc!})
          }
          // 不是由操作类型开头 (mdn定义的操作类型) / (组件定义的操作类型)
          if (!(isEventTag(eventName) || ( eventName === attrKey ))) {
            // ❌loc(call函数处+script函数定义处)
            (functionNode = variFunctuin.get(attrVal))
              && context.report({messageId: "variFunctionNoEventTag", loc: functionNode.loc!})
            context.report({messageId: "variFunctionNoEventTag", loc: node.loc!})
            console.log("不是由操作类型开头", node.loc, functionNode?.loc)

          }
        },
      },
      {
        // 本模板定义匿名函数
        "VariableDeclarator > ArrowFunctionExpression"(
          node: estree.ArrowFunctionExpression & {parent: estree.VariableDeclarator}
        ) {
          if (isIdentifier(node.parent.id)) {
            variFunctuin.set(node.parent.id.name, node)
          }
        },
        // 本模板定义函数
        FunctionDeclaration(node) {
          if (node.id) {
            variFunctuin.set(node.id.name, node)
          }
        },
        // options api函数定义
        'ExportDefaultDeclaration > ObjectExpression > Property[key.name = "methods"] > ObjectExpression > Property'(
          node: estree.Property) {
          if (isIdentifier(node.key)) {
            variFunctuin.set(node.key.name, node)
          }
        },
        // 本模板执行函数
        CallExpression(node) {
          let call = node.callee
          if (isMemberExpression(call)) {
            call = call.property
          }
          callFunction.set((call as estree.Identifier).name, node)
        }
      } as Rule.RuleListener
    )
  }
}

export = rule
