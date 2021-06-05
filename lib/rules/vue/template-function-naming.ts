import { Rule } from "eslint"
import * as estree from "estree"
import { AST } from "vue-eslint-parser"
import { makeMap } from "../../utils/makeMap"
import { isVIdentifier } from "../../utils/vue-node"
import { defineVueOptionFunction } from "../../utils/selector"

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
  "copy,cut,paste,"+
  "update,upload,enter,animation,download,touch,"

const isEventTag = /*#__PURE__*/ makeMap(EVENT_NAME)
const getEventName = (str: string) => (str+"A").replace(/(?=[A-Z])(.*)/, "")

// 校验只做一级，多级的函数已经使用对象封装过一次，可读性比散装的已经好了很多。
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
      "variFunctionNoEventTag": "方法命名-[操作行为]以行为标识做开头。"
    },
    fixable: "whitespace"
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    let methodsObjectExpression: estree.ObjectExpression
    const callFunction = new Map<string, estree.Identifier[]>()
    const variFunction = new Map<string, estree.Identifier[]>()
    return context.parserServices.defineTemplateBodyVisitor(
      {
        "VAttribute[directive=true][key.name.name='on'] > VExpressionContainer"(
          node: AST.VExpressionContainer & { parent: any }
        ) {
          if (!(node.expression && isVIdentifier(node.expression))) {
            return
          }
          const attrVal = node.expression.name
          const attrKey = node.parent.key.argument.name
          const callFunctionNodes = callFunction.get(attrVal)
          const variFunctionNode = variFunction.get(attrVal)
          // ⭐ 模板调用的函数 js不能调用 (调用位置)
          reportExecEventFunction(context, attrVal, methodsObjectExpression, callFunctionNodes, variFunctionNode)
          // ⭐ 命名不规范 (初始化 + 调用位置)
          reportVariFunctionNoEventTag(context, attrKey, attrVal, node, callFunctionNodes, variFunctionNode)
        },
      },
      {
        // vue option下定义函数
        ...defineVueOptionFunction(context, (node) => {
          const called = variFunction.get(node.name)
          called
            ? called.push(node)
            : variFunction.set(node.name, [node])
        }),
        // // 本模板执行函数 this.xxx() xxx()
        ["CallExpression>Identifier,"+
        'MemberExpression[object.type="ThisExpression"][property.type="Identifier"]>Identifier'](
          node: estree.Identifier ) {
          const called = callFunction.get(node.name)
          called
            ? called.push(node)
            : callFunction.set(node.name, [node])
        },
      } as Rule.RuleListener
    )
  }
}


function reportExecEventFunction(
  context: Rule.RuleContext,
  callName: string,
  methodsObjectExpression: estree.ObjectExpression,
  callFunctionNodes?: estree.Identifier[],
  variableNodes?: estree.Identifier[]) {
  if(!callFunctionNodes) {
    return
  }
  // 1. this.aaa() => this.doAaa
  // 2. aaa() => doAaa()
  // 报告 初始化者
  variableNodes &&
  variableNodes.forEach(variableNode => {
    context.report({
      messageId: "execEventFunction",
      loc: variableNode.loc!,
    })
  })
  // 报告 调用者
  callFunctionNodes.forEach(callNode => {
    context.report({
      messageId: "execEventFunction",
      loc: callNode.loc!,
    })
  })
}

// 修复定义函数没有按照 操作行为-行为名称 命名
function reportVariFunctionNoEventTag(
  context: Rule.RuleContext,
  attrKey: string,
  attrVal: string,
  teamplateNode: AST.Node,
  callFunctionNodes?: estree.Identifier[],
  variableNodes?: estree.Identifier[]
) {
  const eventName = getEventName(attrVal)
  if (isEventTag(eventName) || ( eventName === attrKey )) {
    return
  }
  const newAttrVal = attrKey + attrVal.replace(attrVal[0], attrVal[0].toUpperCase())
  const fix = (node: estree.Node) => (fixer: Rule.RuleFixer) => {
    if (/[-_A-Z]/.test(attrKey)) { // 事件名太复杂就不修复了
      return null
    }
    return fixer.replaceText(node, newAttrVal)
  }
  // 初始化函数
  variableNodes &&
  variableNodes.forEach(variNode => {
    context.report({
      messageId: "variFunctionNoEventTag",
      loc: variNode.loc!,
      fix: fix(variNode)
    })
  })

  // js调用位置
  callFunctionNodes &&
  callFunctionNodes.forEach(callNode => {
    context.report({
      messageId: "variFunctionNoEventTag",
      loc: callNode.loc!,
      fix: fix(callNode)
    })
  })

  // 模板调用位置
  ;(variableNodes || callFunctionNodes) &&
  context.report({
    messageId: "variFunctionNoEventTag",
    loc: teamplateNode.loc!,
    fix: fix(teamplateNode as estree.Node)
  })
}

export = rule
