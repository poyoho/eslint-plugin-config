import { Rule } from "eslint"
import { makeMap } from "lib/utils/makeMap"

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

const eventTag = /*#__PURE__*/ makeMap(EVENT_NAME)

const rule: Rule.RuleModule = {
  meta: {
    type: "suggestion",
    schema: [],
    docs: {
      description: "vue template function naming",
    },
  },
  // http://eslint.cn/docs/developer-guide/working-with-rules
  create(context: Rule.RuleContext) {
    return {
    }
  }
}

console.log(EVENT_NAME)

export = rule
