(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();function pp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Yc={exports:{}},bs={},qc={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ti=Symbol.for("react.element"),mp=Symbol.for("react.portal"),gp=Symbol.for("react.fragment"),vp=Symbol.for("react.strict_mode"),yp=Symbol.for("react.profiler"),wp=Symbol.for("react.provider"),_p=Symbol.for("react.context"),kp=Symbol.for("react.forward_ref"),Sp=Symbol.for("react.suspense"),xp=Symbol.for("react.memo"),Ep=Symbol.for("react.lazy"),su=Symbol.iterator;function Ip(e){return e===null||typeof e!="object"?null:(e=su&&e[su]||e["@@iterator"],typeof e=="function"?e:null)}var Xc={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Jc=Object.assign,Zc={};function sr(e,t,n){this.props=e,this.context=t,this.refs=Zc,this.updater=n||Xc}sr.prototype.isReactComponent={};sr.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};sr.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function ed(){}ed.prototype=sr.prototype;function $a(e,t,n){this.props=e,this.context=t,this.refs=Zc,this.updater=n||Xc}var Ha=$a.prototype=new ed;Ha.constructor=$a;Jc(Ha,sr.prototype);Ha.isPureReactComponent=!0;var ou=Array.isArray,td=Object.prototype.hasOwnProperty,Va={current:null},nd={key:!0,ref:!0,__self:!0,__source:!0};function rd(e,t,n){var r,i={},s=null,o=null;if(t!=null)for(r in t.ref!==void 0&&(o=t.ref),t.key!==void 0&&(s=""+t.key),t)td.call(t,r)&&!nd.hasOwnProperty(r)&&(i[r]=t[r]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];i.children=l}if(e&&e.defaultProps)for(r in a=e.defaultProps,a)i[r]===void 0&&(i[r]=a[r]);return{$$typeof:ti,type:e,key:s,ref:o,props:i,_owner:Va.current}}function Tp(e,t){return{$$typeof:ti,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Wa(e){return typeof e=="object"&&e!==null&&e.$$typeof===ti}function Cp(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var au=/\/+/g;function eo(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Cp(""+e.key):t.toString(36)}function Ui(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var o=!1;if(e===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(e.$$typeof){case ti:case mp:o=!0}}if(o)return o=e,i=i(o),e=r===""?"."+eo(o,0):r,ou(i)?(n="",e!=null&&(n=e.replace(au,"$&/")+"/"),Ui(i,t,n,"",function(u){return u})):i!=null&&(Wa(i)&&(i=Tp(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(au,"$&/")+"/")+e)),t.push(i)),1;if(o=0,r=r===""?".":r+":",ou(e))for(var a=0;a<e.length;a++){s=e[a];var l=r+eo(s,a);o+=Ui(s,t,n,l,i)}else if(l=Ip(e),typeof l=="function")for(e=l.call(e),a=0;!(s=e.next()).done;)s=s.value,l=r+eo(s,a++),o+=Ui(s,t,n,l,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return o}function gi(e,t,n){if(e==null)return e;var r=[],i=0;return Ui(e,r,"","",function(s){return t.call(n,s,i++)}),r}function Np(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var ke={current:null},Mi={transition:null},Rp={ReactCurrentDispatcher:ke,ReactCurrentBatchConfig:Mi,ReactCurrentOwner:Va};function id(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:gi,forEach:function(e,t,n){gi(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return gi(e,function(){t++}),t},toArray:function(e){return gi(e,function(t){return t})||[]},only:function(e){if(!Wa(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=sr;U.Fragment=gp;U.Profiler=yp;U.PureComponent=$a;U.StrictMode=vp;U.Suspense=Sp;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Rp;U.act=id;U.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=Jc({},e.props),i=e.key,s=e.ref,o=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,o=Va.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(l in t)td.call(t,l)&&!nd.hasOwnProperty(l)&&(r[l]=t[l]===void 0&&a!==void 0?a[l]:t[l])}var l=arguments.length-2;if(l===1)r.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];r.children=a}return{$$typeof:ti,type:e.type,key:i,ref:s,props:r,_owner:o}};U.createContext=function(e){return e={$$typeof:_p,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:wp,_context:e},e.Consumer=e};U.createElement=rd;U.createFactory=function(e){var t=rd.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:kp,render:e}};U.isValidElement=Wa;U.lazy=function(e){return{$$typeof:Ep,_payload:{_status:-1,_result:e},_init:Np}};U.memo=function(e,t){return{$$typeof:xp,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=Mi.transition;Mi.transition={};try{e()}finally{Mi.transition=t}};U.unstable_act=id;U.useCallback=function(e,t){return ke.current.useCallback(e,t)};U.useContext=function(e){return ke.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return ke.current.useDeferredValue(e)};U.useEffect=function(e,t){return ke.current.useEffect(e,t)};U.useId=function(){return ke.current.useId()};U.useImperativeHandle=function(e,t,n){return ke.current.useImperativeHandle(e,t,n)};U.useInsertionEffect=function(e,t){return ke.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return ke.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return ke.current.useMemo(e,t)};U.useReducer=function(e,t,n){return ke.current.useReducer(e,t,n)};U.useRef=function(e){return ke.current.useRef(e)};U.useState=function(e){return ke.current.useState(e)};U.useSyncExternalStore=function(e,t,n){return ke.current.useSyncExternalStore(e,t,n)};U.useTransition=function(){return ke.current.useTransition()};U.version="18.3.1";qc.exports=U;var H=qc.exports;const bp=pp(H);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Pp=H,Ap=Symbol.for("react.element"),Op=Symbol.for("react.fragment"),Dp=Object.prototype.hasOwnProperty,Lp=Pp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Up={key:!0,ref:!0,__self:!0,__source:!0};function sd(e,t,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(o=t.ref);for(r in t)Dp.call(t,r)&&!Up.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Ap,type:e,key:s,ref:o,props:i,_owner:Lp.current}}bs.Fragment=Op;bs.jsx=sd;bs.jsxs=sd;Yc.exports=bs;var d=Yc.exports,jo={},od={exports:{}},De={},ad={exports:{}},ld={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(x,A){var L=x.length;x.push(A);e:for(;0<L;){var Q=L-1>>>1,$=x[Q];if(0<i($,A))x[Q]=A,x[L]=$,L=Q;else break e}}function n(x){return x.length===0?null:x[0]}function r(x){if(x.length===0)return null;var A=x[0],L=x.pop();if(L!==A){x[0]=L;e:for(var Q=0,$=x.length,Tn=$>>>1;Q<Tn;){var at=2*(Q+1)-1,cr=x[at],Je=at+1,tn=x[Je];if(0>i(cr,L))Je<$&&0>i(tn,cr)?(x[Q]=tn,x[Je]=L,Q=Je):(x[Q]=cr,x[at]=L,Q=at);else if(Je<$&&0>i(tn,L))x[Q]=tn,x[Je]=L,Q=Je;else break e}}return A}function i(x,A){var L=x.sortIndex-A.sortIndex;return L!==0?L:x.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();e.unstable_now=function(){return o.now()-a}}var l=[],u=[],p=1,g=null,m=3,w=!1,_=!1,k=!1,R=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,c=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function h(x){for(var A=n(u);A!==null;){if(A.callback===null)r(u);else if(A.startTime<=x)r(u),A.sortIndex=A.expirationTime,t(l,A);else break;A=n(u)}}function y(x){if(k=!1,h(x),!_)if(n(l)!==null)_=!0,En(E);else{var A=n(u);A!==null&&In(y,A.startTime-x)}}function E(x,A){_=!1,k&&(k=!1,f(N),N=-1),w=!0;var L=m;try{for(h(A),g=n(l);g!==null&&(!(g.expirationTime>A)||x&&!xe());){var Q=g.callback;if(typeof Q=="function"){g.callback=null,m=g.priorityLevel;var $=Q(g.expirationTime<=A);A=e.unstable_now(),typeof $=="function"?g.callback=$:g===n(l)&&r(l),h(A)}else r(l);g=n(l)}if(g!==null)var Tn=!0;else{var at=n(u);at!==null&&In(y,at.startTime-A),Tn=!1}return Tn}finally{g=null,m=L,w=!1}}var I=!1,C=null,N=-1,K=5,D=-1;function xe(){return!(e.unstable_now()-D<K)}function en(){if(C!==null){var x=e.unstable_now();D=x;var A=!0;try{A=C(!0,x)}finally{A?It():(I=!1,C=null)}}else I=!1}var It;if(typeof c=="function")It=function(){c(en)};else if(typeof MessageChannel<"u"){var hi=new MessageChannel,Xs=hi.port2;hi.port1.onmessage=en,It=function(){Xs.postMessage(null)}}else It=function(){R(en,0)};function En(x){C=x,I||(I=!0,It())}function In(x,A){N=R(function(){x(e.unstable_now())},A)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(x){x.callback=null},e.unstable_continueExecution=function(){_||w||(_=!0,En(E))},e.unstable_forceFrameRate=function(x){0>x||125<x?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):K=0<x?Math.floor(1e3/x):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return n(l)},e.unstable_next=function(x){switch(m){case 1:case 2:case 3:var A=3;break;default:A=m}var L=m;m=A;try{return x()}finally{m=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(x,A){switch(x){case 1:case 2:case 3:case 4:case 5:break;default:x=3}var L=m;m=x;try{return A()}finally{m=L}},e.unstable_scheduleCallback=function(x,A,L){var Q=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?Q+L:Q):L=Q,x){case 1:var $=-1;break;case 2:$=250;break;case 5:$=1073741823;break;case 4:$=1e4;break;default:$=5e3}return $=L+$,x={id:p++,callback:A,priorityLevel:x,startTime:L,expirationTime:$,sortIndex:-1},L>Q?(x.sortIndex=L,t(u,x),n(l)===null&&x===n(u)&&(k?(f(N),N=-1):k=!0,In(y,L-Q))):(x.sortIndex=$,t(l,x),_||w||(_=!0,En(E))),x},e.unstable_shouldYield=xe,e.unstable_wrapCallback=function(x){var A=m;return function(){var L=m;m=A;try{return x.apply(this,arguments)}finally{m=L}}}})(ld);ad.exports=ld;var Mp=ad.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jp=H,Oe=Mp;function S(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ud=new Set,Ur={};function Sn(e,t){Yn(e,t),Yn(e+"Capture",t)}function Yn(e,t){for(Ur[e]=t,e=0;e<t.length;e++)ud.add(t[e])}var vt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),zo=Object.prototype.hasOwnProperty,zp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,lu={},uu={};function Fp(e){return zo.call(uu,e)?!0:zo.call(lu,e)?!1:zp.test(e)?uu[e]=!0:(lu[e]=!0,!1)}function Bp(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function $p(e,t,n,r){if(t===null||typeof t>"u"||Bp(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function Se(e,t,n,r,i,s,o){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=o}var de={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){de[e]=new Se(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];de[t]=new Se(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){de[e]=new Se(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){de[e]=new Se(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){de[e]=new Se(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){de[e]=new Se(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){de[e]=new Se(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){de[e]=new Se(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){de[e]=new Se(e,5,!1,e.toLowerCase(),null,!1,!1)});var Ga=/[\-:]([a-z])/g;function Ka(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Ga,Ka);de[t]=new Se(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Ga,Ka);de[t]=new Se(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Ga,Ka);de[t]=new Se(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){de[e]=new Se(e,1,!1,e.toLowerCase(),null,!1,!1)});de.xlinkHref=new Se("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){de[e]=new Se(e,1,!1,e.toLowerCase(),null,!0,!0)});function Qa(e,t,n,r){var i=de.hasOwnProperty(t)?de[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&($p(t,n,i,r)&&(n=null),r||i===null?Fp(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var xt=jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,vi=Symbol.for("react.element"),Nn=Symbol.for("react.portal"),Rn=Symbol.for("react.fragment"),Ya=Symbol.for("react.strict_mode"),Fo=Symbol.for("react.profiler"),cd=Symbol.for("react.provider"),dd=Symbol.for("react.context"),qa=Symbol.for("react.forward_ref"),Bo=Symbol.for("react.suspense"),$o=Symbol.for("react.suspense_list"),Xa=Symbol.for("react.memo"),Nt=Symbol.for("react.lazy"),fd=Symbol.for("react.offscreen"),cu=Symbol.iterator;function fr(e){return e===null||typeof e!="object"?null:(e=cu&&e[cu]||e["@@iterator"],typeof e=="function"?e:null)}var J=Object.assign,to;function kr(e){if(to===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);to=t&&t[1]||""}return`
`+to+e}var no=!1;function ro(e,t){if(!e||no)return"";no=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(u){var r=u}Reflect.construct(e,[],t)}else{try{t.call()}catch(u){r=u}e.call(t.prototype)}else{try{throw Error()}catch(u){r=u}e()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var i=u.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,a=s.length-1;1<=o&&0<=a&&i[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(i[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||i[o]!==s[a]){var l=`
`+i[o].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=o&&0<=a);break}}}finally{no=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?kr(e):""}function Hp(e){switch(e.tag){case 5:return kr(e.type);case 16:return kr("Lazy");case 13:return kr("Suspense");case 19:return kr("SuspenseList");case 0:case 2:case 15:return e=ro(e.type,!1),e;case 11:return e=ro(e.type.render,!1),e;case 1:return e=ro(e.type,!0),e;default:return""}}function Ho(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Rn:return"Fragment";case Nn:return"Portal";case Fo:return"Profiler";case Ya:return"StrictMode";case Bo:return"Suspense";case $o:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case dd:return(e.displayName||"Context")+".Consumer";case cd:return(e._context.displayName||"Context")+".Provider";case qa:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Xa:return t=e.displayName||null,t!==null?t:Ho(e.type)||"Memo";case Nt:t=e._payload,e=e._init;try{return Ho(e(t))}catch{}}return null}function Vp(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ho(t);case 8:return t===Ya?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function Yt(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function hd(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Wp(e){var t=hd(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function yi(e){e._valueTracker||(e._valueTracker=Wp(e))}function pd(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=hd(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Ji(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Vo(e,t){var n=t.checked;return J({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function du(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=Yt(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function md(e,t){t=t.checked,t!=null&&Qa(e,"checked",t,!1)}function Wo(e,t){md(e,t);var n=Yt(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Go(e,t.type,n):t.hasOwnProperty("defaultValue")&&Go(e,t.type,Yt(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function fu(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Go(e,t,n){(t!=="number"||Ji(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Sr=Array.isArray;function Fn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+Yt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function Ko(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(S(91));return J({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function hu(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(S(92));if(Sr(n)){if(1<n.length)throw Error(S(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:Yt(n)}}function gd(e,t){var n=Yt(t.value),r=Yt(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function pu(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function vd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qo(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?vd(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var wi,yd=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(wi=wi||document.createElement("div"),wi.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=wi.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Mr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Ir={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Gp=["Webkit","ms","Moz","O"];Object.keys(Ir).forEach(function(e){Gp.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Ir[t]=Ir[e]})});function wd(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Ir.hasOwnProperty(e)&&Ir[e]?(""+t).trim():t+"px"}function _d(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=wd(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Kp=J({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Yo(e,t){if(t){if(Kp[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(S(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(S(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(S(61))}if(t.style!=null&&typeof t.style!="object")throw Error(S(62))}}function qo(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Xo=null;function Ja(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Jo=null,Bn=null,$n=null;function mu(e){if(e=ii(e)){if(typeof Jo!="function")throw Error(S(280));var t=e.stateNode;t&&(t=Ls(t),Jo(e.stateNode,e.type,t))}}function kd(e){Bn?$n?$n.push(e):$n=[e]:Bn=e}function Sd(){if(Bn){var e=Bn,t=$n;if($n=Bn=null,mu(e),t)for(e=0;e<t.length;e++)mu(t[e])}}function xd(e,t){return e(t)}function Ed(){}var io=!1;function Id(e,t,n){if(io)return e(t,n);io=!0;try{return xd(e,t,n)}finally{io=!1,(Bn!==null||$n!==null)&&(Ed(),Sd())}}function jr(e,t){var n=e.stateNode;if(n===null)return null;var r=Ls(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(S(231,t,typeof n));return n}var Zo=!1;if(vt)try{var hr={};Object.defineProperty(hr,"passive",{get:function(){Zo=!0}}),window.addEventListener("test",hr,hr),window.removeEventListener("test",hr,hr)}catch{Zo=!1}function Qp(e,t,n,r,i,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(p){this.onError(p)}}var Tr=!1,Zi=null,es=!1,ea=null,Yp={onError:function(e){Tr=!0,Zi=e}};function qp(e,t,n,r,i,s,o,a,l){Tr=!1,Zi=null,Qp.apply(Yp,arguments)}function Xp(e,t,n,r,i,s,o,a,l){if(qp.apply(this,arguments),Tr){if(Tr){var u=Zi;Tr=!1,Zi=null}else throw Error(S(198));es||(es=!0,ea=u)}}function xn(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Td(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function gu(e){if(xn(e)!==e)throw Error(S(188))}function Jp(e){var t=e.alternate;if(!t){if(t=xn(e),t===null)throw Error(S(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return gu(i),e;if(s===r)return gu(i),t;s=s.sibling}throw Error(S(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,a=i.child;a;){if(a===n){o=!0,n=i,r=s;break}if(a===r){o=!0,r=i,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,r=i;break}if(a===r){o=!0,r=s,n=i;break}a=a.sibling}if(!o)throw Error(S(189))}}if(n.alternate!==r)throw Error(S(190))}if(n.tag!==3)throw Error(S(188));return n.stateNode.current===n?e:t}function Cd(e){return e=Jp(e),e!==null?Nd(e):null}function Nd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Nd(e);if(t!==null)return t;e=e.sibling}return null}var Rd=Oe.unstable_scheduleCallback,vu=Oe.unstable_cancelCallback,Zp=Oe.unstable_shouldYield,em=Oe.unstable_requestPaint,re=Oe.unstable_now,tm=Oe.unstable_getCurrentPriorityLevel,Za=Oe.unstable_ImmediatePriority,bd=Oe.unstable_UserBlockingPriority,ts=Oe.unstable_NormalPriority,nm=Oe.unstable_LowPriority,Pd=Oe.unstable_IdlePriority,Ps=null,rt=null;function rm(e){if(rt&&typeof rt.onCommitFiberRoot=="function")try{rt.onCommitFiberRoot(Ps,e,void 0,(e.current.flags&128)===128)}catch{}}var Qe=Math.clz32?Math.clz32:om,im=Math.log,sm=Math.LN2;function om(e){return e>>>=0,e===0?32:31-(im(e)/sm|0)|0}var _i=64,ki=4194304;function xr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ns(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,o=n&268435455;if(o!==0){var a=o&~i;a!==0?r=xr(a):(s&=o,s!==0&&(r=xr(s)))}else o=n&~i,o!==0?r=xr(o):s!==0&&(r=xr(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Qe(t),i=1<<n,r|=e[n],t&=~i;return r}function am(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function lm(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var o=31-Qe(s),a=1<<o,l=i[o];l===-1?(!(a&n)||a&r)&&(i[o]=am(a,t)):l<=t&&(e.expiredLanes|=a),s&=~a}}function ta(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Ad(){var e=_i;return _i<<=1,!(_i&4194240)&&(_i=64),e}function so(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ni(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Qe(t),e[t]=n}function um(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Qe(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function el(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Qe(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var F=0;function Od(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Dd,tl,Ld,Ud,Md,na=!1,Si=[],jt=null,zt=null,Ft=null,zr=new Map,Fr=new Map,bt=[],cm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yu(e,t){switch(e){case"focusin":case"focusout":jt=null;break;case"dragenter":case"dragleave":zt=null;break;case"mouseover":case"mouseout":Ft=null;break;case"pointerover":case"pointerout":zr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fr.delete(t.pointerId)}}function pr(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=ii(t),t!==null&&tl(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function dm(e,t,n,r,i){switch(t){case"focusin":return jt=pr(jt,e,t,n,r,i),!0;case"dragenter":return zt=pr(zt,e,t,n,r,i),!0;case"mouseover":return Ft=pr(Ft,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return zr.set(s,pr(zr.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Fr.set(s,pr(Fr.get(s)||null,e,t,n,r,i)),!0}return!1}function jd(e){var t=on(e.target);if(t!==null){var n=xn(t);if(n!==null){if(t=n.tag,t===13){if(t=Td(n),t!==null){e.blockedOn=t,Md(e.priority,function(){Ld(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ji(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ra(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Xo=r,n.target.dispatchEvent(r),Xo=null}else return t=ii(n),t!==null&&tl(t),e.blockedOn=n,!1;t.shift()}return!0}function wu(e,t,n){ji(e)&&n.delete(t)}function fm(){na=!1,jt!==null&&ji(jt)&&(jt=null),zt!==null&&ji(zt)&&(zt=null),Ft!==null&&ji(Ft)&&(Ft=null),zr.forEach(wu),Fr.forEach(wu)}function mr(e,t){e.blockedOn===t&&(e.blockedOn=null,na||(na=!0,Oe.unstable_scheduleCallback(Oe.unstable_NormalPriority,fm)))}function Br(e){function t(i){return mr(i,e)}if(0<Si.length){mr(Si[0],e);for(var n=1;n<Si.length;n++){var r=Si[n];r.blockedOn===e&&(r.blockedOn=null)}}for(jt!==null&&mr(jt,e),zt!==null&&mr(zt,e),Ft!==null&&mr(Ft,e),zr.forEach(t),Fr.forEach(t),n=0;n<bt.length;n++)r=bt[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<bt.length&&(n=bt[0],n.blockedOn===null);)jd(n),n.blockedOn===null&&bt.shift()}var Hn=xt.ReactCurrentBatchConfig,rs=!0;function hm(e,t,n,r){var i=F,s=Hn.transition;Hn.transition=null;try{F=1,nl(e,t,n,r)}finally{F=i,Hn.transition=s}}function pm(e,t,n,r){var i=F,s=Hn.transition;Hn.transition=null;try{F=4,nl(e,t,n,r)}finally{F=i,Hn.transition=s}}function nl(e,t,n,r){if(rs){var i=ra(e,t,n,r);if(i===null)go(e,t,r,is,n),yu(e,r);else if(dm(i,e,t,n,r))r.stopPropagation();else if(yu(e,r),t&4&&-1<cm.indexOf(e)){for(;i!==null;){var s=ii(i);if(s!==null&&Dd(s),s=ra(e,t,n,r),s===null&&go(e,t,r,is,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else go(e,t,r,null,n)}}var is=null;function ra(e,t,n,r){if(is=null,e=Ja(r),e=on(e),e!==null)if(t=xn(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Td(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return is=e,null}function zd(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(tm()){case Za:return 1;case bd:return 4;case ts:case nm:return 16;case Pd:return 536870912;default:return 16}default:return 16}}var Ut=null,rl=null,zi=null;function Fd(){if(zi)return zi;var e,t=rl,n=t.length,r,i="value"in Ut?Ut.value:Ut.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[s-r];r++);return zi=i.slice(e,1<r?1-r:void 0)}function Fi(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function xi(){return!0}function _u(){return!1}function Le(e){function t(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in e)e.hasOwnProperty(a)&&(n=e[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?xi:_u,this.isPropagationStopped=_u,this}return J(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=xi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=xi)},persist:function(){},isPersistent:xi}),t}var or={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},il=Le(or),ri=J({},or,{view:0,detail:0}),mm=Le(ri),oo,ao,gr,As=J({},ri,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:sl,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==gr&&(gr&&e.type==="mousemove"?(oo=e.screenX-gr.screenX,ao=e.screenY-gr.screenY):ao=oo=0,gr=e),oo)},movementY:function(e){return"movementY"in e?e.movementY:ao}}),ku=Le(As),gm=J({},As,{dataTransfer:0}),vm=Le(gm),ym=J({},ri,{relatedTarget:0}),lo=Le(ym),wm=J({},or,{animationName:0,elapsedTime:0,pseudoElement:0}),_m=Le(wm),km=J({},or,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Sm=Le(km),xm=J({},or,{data:0}),Su=Le(xm),Em={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Im={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Tm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Cm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Tm[e])?!!t[e]:!1}function sl(){return Cm}var Nm=J({},ri,{key:function(e){if(e.key){var t=Em[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Fi(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Im[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:sl,charCode:function(e){return e.type==="keypress"?Fi(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Fi(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rm=Le(Nm),bm=J({},As,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),xu=Le(bm),Pm=J({},ri,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:sl}),Am=Le(Pm),Om=J({},or,{propertyName:0,elapsedTime:0,pseudoElement:0}),Dm=Le(Om),Lm=J({},As,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Um=Le(Lm),Mm=[9,13,27,32],ol=vt&&"CompositionEvent"in window,Cr=null;vt&&"documentMode"in document&&(Cr=document.documentMode);var jm=vt&&"TextEvent"in window&&!Cr,Bd=vt&&(!ol||Cr&&8<Cr&&11>=Cr),Eu=" ",Iu=!1;function $d(e,t){switch(e){case"keyup":return Mm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Hd(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var bn=!1;function zm(e,t){switch(e){case"compositionend":return Hd(t);case"keypress":return t.which!==32?null:(Iu=!0,Eu);case"textInput":return e=t.data,e===Eu&&Iu?null:e;default:return null}}function Fm(e,t){if(bn)return e==="compositionend"||!ol&&$d(e,t)?(e=Fd(),zi=rl=Ut=null,bn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Bd&&t.locale!=="ko"?null:t.data;default:return null}}var Bm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tu(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Bm[e.type]:t==="textarea"}function Vd(e,t,n,r){kd(r),t=ss(t,"onChange"),0<t.length&&(n=new il("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var Nr=null,$r=null;function $m(e){tf(e,0)}function Os(e){var t=On(e);if(pd(t))return e}function Hm(e,t){if(e==="change")return t}var Wd=!1;if(vt){var uo;if(vt){var co="oninput"in document;if(!co){var Cu=document.createElement("div");Cu.setAttribute("oninput","return;"),co=typeof Cu.oninput=="function"}uo=co}else uo=!1;Wd=uo&&(!document.documentMode||9<document.documentMode)}function Nu(){Nr&&(Nr.detachEvent("onpropertychange",Gd),$r=Nr=null)}function Gd(e){if(e.propertyName==="value"&&Os($r)){var t=[];Vd(t,$r,e,Ja(e)),Id($m,t)}}function Vm(e,t,n){e==="focusin"?(Nu(),Nr=t,$r=n,Nr.attachEvent("onpropertychange",Gd)):e==="focusout"&&Nu()}function Wm(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Os($r)}function Gm(e,t){if(e==="click")return Os(t)}function Km(e,t){if(e==="input"||e==="change")return Os(t)}function Qm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xe=typeof Object.is=="function"?Object.is:Qm;function Hr(e,t){if(Xe(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!zo.call(t,i)||!Xe(e[i],t[i]))return!1}return!0}function Ru(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function bu(e,t){var n=Ru(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Ru(n)}}function Kd(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Kd(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Qd(){for(var e=window,t=Ji();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ji(e.document)}return t}function al(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function Ym(e){var t=Qd(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&Kd(n.ownerDocument.documentElement,n)){if(r!==null&&al(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=bu(n,s);var o=bu(n,r);i&&o&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==o.node||e.focusOffset!==o.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(o.node,o.offset)):(t.setEnd(o.node,o.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var qm=vt&&"documentMode"in document&&11>=document.documentMode,Pn=null,ia=null,Rr=null,sa=!1;function Pu(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;sa||Pn==null||Pn!==Ji(r)||(r=Pn,"selectionStart"in r&&al(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Rr&&Hr(Rr,r)||(Rr=r,r=ss(ia,"onSelect"),0<r.length&&(t=new il("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Pn)))}function Ei(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var An={animationend:Ei("Animation","AnimationEnd"),animationiteration:Ei("Animation","AnimationIteration"),animationstart:Ei("Animation","AnimationStart"),transitionend:Ei("Transition","TransitionEnd")},fo={},Yd={};vt&&(Yd=document.createElement("div").style,"AnimationEvent"in window||(delete An.animationend.animation,delete An.animationiteration.animation,delete An.animationstart.animation),"TransitionEvent"in window||delete An.transitionend.transition);function Ds(e){if(fo[e])return fo[e];if(!An[e])return e;var t=An[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Yd)return fo[e]=t[n];return e}var qd=Ds("animationend"),Xd=Ds("animationiteration"),Jd=Ds("animationstart"),Zd=Ds("transitionend"),ef=new Map,Au="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Xt(e,t){ef.set(e,t),Sn(t,[e])}for(var ho=0;ho<Au.length;ho++){var po=Au[ho],Xm=po.toLowerCase(),Jm=po[0].toUpperCase()+po.slice(1);Xt(Xm,"on"+Jm)}Xt(qd,"onAnimationEnd");Xt(Xd,"onAnimationIteration");Xt(Jd,"onAnimationStart");Xt("dblclick","onDoubleClick");Xt("focusin","onFocus");Xt("focusout","onBlur");Xt(Zd,"onTransitionEnd");Yn("onMouseEnter",["mouseout","mouseover"]);Yn("onMouseLeave",["mouseout","mouseover"]);Yn("onPointerEnter",["pointerout","pointerover"]);Yn("onPointerLeave",["pointerout","pointerover"]);Sn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Sn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Sn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Sn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Sn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Sn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zm=new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));function Ou(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,Xp(r,t,void 0,e),e.currentTarget=null}function tf(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var o=r.length-1;0<=o;o--){var a=r[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&i.isPropagationStopped())break e;Ou(i,a,u),s=l}else for(o=0;o<r.length;o++){if(a=r[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&i.isPropagationStopped())break e;Ou(i,a,u),s=l}}}if(es)throw e=ea,es=!1,ea=null,e}function W(e,t){var n=t[ca];n===void 0&&(n=t[ca]=new Set);var r=e+"__bubble";n.has(r)||(nf(t,e,2,!1),n.add(r))}function mo(e,t,n){var r=0;t&&(r|=4),nf(n,e,r,t)}var Ii="_reactListening"+Math.random().toString(36).slice(2);function Vr(e){if(!e[Ii]){e[Ii]=!0,ud.forEach(function(n){n!=="selectionchange"&&(Zm.has(n)||mo(n,!1,e),mo(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ii]||(t[Ii]=!0,mo("selectionchange",!1,t))}}function nf(e,t,n,r){switch(zd(t)){case 1:var i=hm;break;case 4:i=pm;break;default:i=nl}n=i.bind(null,t,n,e),i=void 0,!Zo||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function go(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var a=r.stateNode.containerInfo;if(a===i||a.nodeType===8&&a.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===i||l.nodeType===8&&l.parentNode===i))return;o=o.return}for(;a!==null;){if(o=on(a),o===null)return;if(l=o.tag,l===5||l===6){r=s=o;continue e}a=a.parentNode}}r=r.return}Id(function(){var u=s,p=Ja(n),g=[];e:{var m=ef.get(e);if(m!==void 0){var w=il,_=e;switch(e){case"keypress":if(Fi(n)===0)break e;case"keydown":case"keyup":w=Rm;break;case"focusin":_="focus",w=lo;break;case"focusout":_="blur",w=lo;break;case"beforeblur":case"afterblur":w=lo;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":w=ku;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":w=vm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":w=Am;break;case qd:case Xd:case Jd:w=_m;break;case Zd:w=Dm;break;case"scroll":w=mm;break;case"wheel":w=Um;break;case"copy":case"cut":case"paste":w=Sm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":w=xu}var k=(t&4)!==0,R=!k&&e==="scroll",f=k?m!==null?m+"Capture":null:m;k=[];for(var c=u,h;c!==null;){h=c;var y=h.stateNode;if(h.tag===5&&y!==null&&(h=y,f!==null&&(y=jr(c,f),y!=null&&k.push(Wr(c,y,h)))),R)break;c=c.return}0<k.length&&(m=new w(m,_,null,n,p),g.push({event:m,listeners:k}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",w=e==="mouseout"||e==="pointerout",m&&n!==Xo&&(_=n.relatedTarget||n.fromElement)&&(on(_)||_[yt]))break e;if((w||m)&&(m=p.window===p?p:(m=p.ownerDocument)?m.defaultView||m.parentWindow:window,w?(_=n.relatedTarget||n.toElement,w=u,_=_?on(_):null,_!==null&&(R=xn(_),_!==R||_.tag!==5&&_.tag!==6)&&(_=null)):(w=null,_=u),w!==_)){if(k=ku,y="onMouseLeave",f="onMouseEnter",c="mouse",(e==="pointerout"||e==="pointerover")&&(k=xu,y="onPointerLeave",f="onPointerEnter",c="pointer"),R=w==null?m:On(w),h=_==null?m:On(_),m=new k(y,c+"leave",w,n,p),m.target=R,m.relatedTarget=h,y=null,on(p)===u&&(k=new k(f,c+"enter",_,n,p),k.target=h,k.relatedTarget=R,y=k),R=y,w&&_)t:{for(k=w,f=_,c=0,h=k;h;h=Cn(h))c++;for(h=0,y=f;y;y=Cn(y))h++;for(;0<c-h;)k=Cn(k),c--;for(;0<h-c;)f=Cn(f),h--;for(;c--;){if(k===f||f!==null&&k===f.alternate)break t;k=Cn(k),f=Cn(f)}k=null}else k=null;w!==null&&Du(g,m,w,k,!1),_!==null&&R!==null&&Du(g,R,_,k,!0)}}e:{if(m=u?On(u):window,w=m.nodeName&&m.nodeName.toLowerCase(),w==="select"||w==="input"&&m.type==="file")var E=Hm;else if(Tu(m))if(Wd)E=Km;else{E=Wm;var I=Vm}else(w=m.nodeName)&&w.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(E=Gm);if(E&&(E=E(e,u))){Vd(g,E,n,p);break e}I&&I(e,m,u),e==="focusout"&&(I=m._wrapperState)&&I.controlled&&m.type==="number"&&Go(m,"number",m.value)}switch(I=u?On(u):window,e){case"focusin":(Tu(I)||I.contentEditable==="true")&&(Pn=I,ia=u,Rr=null);break;case"focusout":Rr=ia=Pn=null;break;case"mousedown":sa=!0;break;case"contextmenu":case"mouseup":case"dragend":sa=!1,Pu(g,n,p);break;case"selectionchange":if(qm)break;case"keydown":case"keyup":Pu(g,n,p)}var C;if(ol)e:{switch(e){case"compositionstart":var N="onCompositionStart";break e;case"compositionend":N="onCompositionEnd";break e;case"compositionupdate":N="onCompositionUpdate";break e}N=void 0}else bn?$d(e,n)&&(N="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(N="onCompositionStart");N&&(Bd&&n.locale!=="ko"&&(bn||N!=="onCompositionStart"?N==="onCompositionEnd"&&bn&&(C=Fd()):(Ut=p,rl="value"in Ut?Ut.value:Ut.textContent,bn=!0)),I=ss(u,N),0<I.length&&(N=new Su(N,e,null,n,p),g.push({event:N,listeners:I}),C?N.data=C:(C=Hd(n),C!==null&&(N.data=C)))),(C=jm?zm(e,n):Fm(e,n))&&(u=ss(u,"onBeforeInput"),0<u.length&&(p=new Su("onBeforeInput","beforeinput",null,n,p),g.push({event:p,listeners:u}),p.data=C))}tf(g,t)})}function Wr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function ss(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=jr(e,n),s!=null&&r.unshift(Wr(e,s,i)),s=jr(e,t),s!=null&&r.push(Wr(e,s,i))),e=e.return}return r}function Cn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Du(e,t,n,r,i){for(var s=t._reactName,o=[];n!==null&&n!==r;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===r)break;a.tag===5&&u!==null&&(a=u,i?(l=jr(n,s),l!=null&&o.unshift(Wr(n,l,a))):i||(l=jr(n,s),l!=null&&o.push(Wr(n,l,a)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var eg=/\r\n?/g,tg=/\u0000|\uFFFD/g;function Lu(e){return(typeof e=="string"?e:""+e).replace(eg,`
`).replace(tg,"")}function Ti(e,t,n){if(t=Lu(t),Lu(e)!==t&&n)throw Error(S(425))}function os(){}var oa=null,aa=null;function la(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ua=typeof setTimeout=="function"?setTimeout:void 0,ng=typeof clearTimeout=="function"?clearTimeout:void 0,Uu=typeof Promise=="function"?Promise:void 0,rg=typeof queueMicrotask=="function"?queueMicrotask:typeof Uu<"u"?function(e){return Uu.resolve(null).then(e).catch(ig)}:ua;function ig(e){setTimeout(function(){throw e})}function vo(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Br(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Br(t)}function Bt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Mu(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var ar=Math.random().toString(36).slice(2),tt="__reactFiber$"+ar,Gr="__reactProps$"+ar,yt="__reactContainer$"+ar,ca="__reactEvents$"+ar,sg="__reactListeners$"+ar,og="__reactHandles$"+ar;function on(e){var t=e[tt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[yt]||n[tt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Mu(e);e!==null;){if(n=e[tt])return n;e=Mu(e)}return t}e=n,n=e.parentNode}return null}function ii(e){return e=e[tt]||e[yt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function On(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(S(33))}function Ls(e){return e[Gr]||null}var da=[],Dn=-1;function Jt(e){return{current:e}}function G(e){0>Dn||(e.current=da[Dn],da[Dn]=null,Dn--)}function V(e,t){Dn++,da[Dn]=e.current,e.current=t}var qt={},me=Jt(qt),Te=Jt(!1),pn=qt;function qn(e,t){var n=e.type.contextTypes;if(!n)return qt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ce(e){return e=e.childContextTypes,e!=null}function as(){G(Te),G(me)}function ju(e,t,n){if(me.current!==qt)throw Error(S(168));V(me,t),V(Te,n)}function rf(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(S(108,Vp(e)||"Unknown",i));return J({},n,r)}function ls(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||qt,pn=me.current,V(me,e),V(Te,Te.current),!0}function zu(e,t,n){var r=e.stateNode;if(!r)throw Error(S(169));n?(e=rf(e,t,pn),r.__reactInternalMemoizedMergedChildContext=e,G(Te),G(me),V(me,e)):G(Te),V(Te,n)}var ct=null,Us=!1,yo=!1;function sf(e){ct===null?ct=[e]:ct.push(e)}function ag(e){Us=!0,sf(e)}function Zt(){if(!yo&&ct!==null){yo=!0;var e=0,t=F;try{var n=ct;for(F=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}ct=null,Us=!1}catch(i){throw ct!==null&&(ct=ct.slice(e+1)),Rd(Za,Zt),i}finally{F=t,yo=!1}}return null}var Ln=[],Un=0,us=null,cs=0,Ue=[],Me=0,mn=null,ft=1,ht="";function nn(e,t){Ln[Un++]=cs,Ln[Un++]=us,us=e,cs=t}function of(e,t,n){Ue[Me++]=ft,Ue[Me++]=ht,Ue[Me++]=mn,mn=e;var r=ft;e=ht;var i=32-Qe(r)-1;r&=~(1<<i),n+=1;var s=32-Qe(t)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,ft=1<<32-Qe(t)+i|n<<i|r,ht=s+e}else ft=1<<s|n<<i|r,ht=e}function ll(e){e.return!==null&&(nn(e,1),of(e,1,0))}function ul(e){for(;e===us;)us=Ln[--Un],Ln[Un]=null,cs=Ln[--Un],Ln[Un]=null;for(;e===mn;)mn=Ue[--Me],Ue[Me]=null,ht=Ue[--Me],Ue[Me]=null,ft=Ue[--Me],Ue[Me]=null}var Ae=null,Pe=null,Y=!1,We=null;function af(e,t){var n=je(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Fu(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ae=e,Pe=Bt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ae=e,Pe=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=mn!==null?{id:ft,overflow:ht}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=je(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ae=e,Pe=null,!0):!1;default:return!1}}function fa(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ha(e){if(Y){var t=Pe;if(t){var n=t;if(!Fu(e,t)){if(fa(e))throw Error(S(418));t=Bt(n.nextSibling);var r=Ae;t&&Fu(e,t)?af(r,n):(e.flags=e.flags&-4097|2,Y=!1,Ae=e)}}else{if(fa(e))throw Error(S(418));e.flags=e.flags&-4097|2,Y=!1,Ae=e}}}function Bu(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ae=e}function Ci(e){if(e!==Ae)return!1;if(!Y)return Bu(e),Y=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!la(e.type,e.memoizedProps)),t&&(t=Pe)){if(fa(e))throw lf(),Error(S(418));for(;t;)af(e,t),t=Bt(t.nextSibling)}if(Bu(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(S(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Pe=Bt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Pe=null}}else Pe=Ae?Bt(e.stateNode.nextSibling):null;return!0}function lf(){for(var e=Pe;e;)e=Bt(e.nextSibling)}function Xn(){Pe=Ae=null,Y=!1}function cl(e){We===null?We=[e]:We.push(e)}var lg=xt.ReactCurrentBatchConfig;function vr(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(S(309));var r=n.stateNode}if(!r)throw Error(S(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(o){var a=i.refs;o===null?delete a[s]:a[s]=o},t._stringRef=s,t)}if(typeof e!="string")throw Error(S(284));if(!n._owner)throw Error(S(290,e))}return e}function Ni(e,t){throw e=Object.prototype.toString.call(t),Error(S(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function $u(e){var t=e._init;return t(e._payload)}function uf(e){function t(f,c){if(e){var h=f.deletions;h===null?(f.deletions=[c],f.flags|=16):h.push(c)}}function n(f,c){if(!e)return null;for(;c!==null;)t(f,c),c=c.sibling;return null}function r(f,c){for(f=new Map;c!==null;)c.key!==null?f.set(c.key,c):f.set(c.index,c),c=c.sibling;return f}function i(f,c){return f=Wt(f,c),f.index=0,f.sibling=null,f}function s(f,c,h){return f.index=h,e?(h=f.alternate,h!==null?(h=h.index,h<c?(f.flags|=2,c):h):(f.flags|=2,c)):(f.flags|=1048576,c)}function o(f){return e&&f.alternate===null&&(f.flags|=2),f}function a(f,c,h,y){return c===null||c.tag!==6?(c=Io(h,f.mode,y),c.return=f,c):(c=i(c,h),c.return=f,c)}function l(f,c,h,y){var E=h.type;return E===Rn?p(f,c,h.props.children,y,h.key):c!==null&&(c.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Nt&&$u(E)===c.type)?(y=i(c,h.props),y.ref=vr(f,c,h),y.return=f,y):(y=Ki(h.type,h.key,h.props,null,f.mode,y),y.ref=vr(f,c,h),y.return=f,y)}function u(f,c,h,y){return c===null||c.tag!==4||c.stateNode.containerInfo!==h.containerInfo||c.stateNode.implementation!==h.implementation?(c=To(h,f.mode,y),c.return=f,c):(c=i(c,h.children||[]),c.return=f,c)}function p(f,c,h,y,E){return c===null||c.tag!==7?(c=dn(h,f.mode,y,E),c.return=f,c):(c=i(c,h),c.return=f,c)}function g(f,c,h){if(typeof c=="string"&&c!==""||typeof c=="number")return c=Io(""+c,f.mode,h),c.return=f,c;if(typeof c=="object"&&c!==null){switch(c.$$typeof){case vi:return h=Ki(c.type,c.key,c.props,null,f.mode,h),h.ref=vr(f,null,c),h.return=f,h;case Nn:return c=To(c,f.mode,h),c.return=f,c;case Nt:var y=c._init;return g(f,y(c._payload),h)}if(Sr(c)||fr(c))return c=dn(c,f.mode,h,null),c.return=f,c;Ni(f,c)}return null}function m(f,c,h,y){var E=c!==null?c.key:null;if(typeof h=="string"&&h!==""||typeof h=="number")return E!==null?null:a(f,c,""+h,y);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case vi:return h.key===E?l(f,c,h,y):null;case Nn:return h.key===E?u(f,c,h,y):null;case Nt:return E=h._init,m(f,c,E(h._payload),y)}if(Sr(h)||fr(h))return E!==null?null:p(f,c,h,y,null);Ni(f,h)}return null}function w(f,c,h,y,E){if(typeof y=="string"&&y!==""||typeof y=="number")return f=f.get(h)||null,a(c,f,""+y,E);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case vi:return f=f.get(y.key===null?h:y.key)||null,l(c,f,y,E);case Nn:return f=f.get(y.key===null?h:y.key)||null,u(c,f,y,E);case Nt:var I=y._init;return w(f,c,h,I(y._payload),E)}if(Sr(y)||fr(y))return f=f.get(h)||null,p(c,f,y,E,null);Ni(c,y)}return null}function _(f,c,h,y){for(var E=null,I=null,C=c,N=c=0,K=null;C!==null&&N<h.length;N++){C.index>N?(K=C,C=null):K=C.sibling;var D=m(f,C,h[N],y);if(D===null){C===null&&(C=K);break}e&&C&&D.alternate===null&&t(f,C),c=s(D,c,N),I===null?E=D:I.sibling=D,I=D,C=K}if(N===h.length)return n(f,C),Y&&nn(f,N),E;if(C===null){for(;N<h.length;N++)C=g(f,h[N],y),C!==null&&(c=s(C,c,N),I===null?E=C:I.sibling=C,I=C);return Y&&nn(f,N),E}for(C=r(f,C);N<h.length;N++)K=w(C,f,N,h[N],y),K!==null&&(e&&K.alternate!==null&&C.delete(K.key===null?N:K.key),c=s(K,c,N),I===null?E=K:I.sibling=K,I=K);return e&&C.forEach(function(xe){return t(f,xe)}),Y&&nn(f,N),E}function k(f,c,h,y){var E=fr(h);if(typeof E!="function")throw Error(S(150));if(h=E.call(h),h==null)throw Error(S(151));for(var I=E=null,C=c,N=c=0,K=null,D=h.next();C!==null&&!D.done;N++,D=h.next()){C.index>N?(K=C,C=null):K=C.sibling;var xe=m(f,C,D.value,y);if(xe===null){C===null&&(C=K);break}e&&C&&xe.alternate===null&&t(f,C),c=s(xe,c,N),I===null?E=xe:I.sibling=xe,I=xe,C=K}if(D.done)return n(f,C),Y&&nn(f,N),E;if(C===null){for(;!D.done;N++,D=h.next())D=g(f,D.value,y),D!==null&&(c=s(D,c,N),I===null?E=D:I.sibling=D,I=D);return Y&&nn(f,N),E}for(C=r(f,C);!D.done;N++,D=h.next())D=w(C,f,N,D.value,y),D!==null&&(e&&D.alternate!==null&&C.delete(D.key===null?N:D.key),c=s(D,c,N),I===null?E=D:I.sibling=D,I=D);return e&&C.forEach(function(en){return t(f,en)}),Y&&nn(f,N),E}function R(f,c,h,y){if(typeof h=="object"&&h!==null&&h.type===Rn&&h.key===null&&(h=h.props.children),typeof h=="object"&&h!==null){switch(h.$$typeof){case vi:e:{for(var E=h.key,I=c;I!==null;){if(I.key===E){if(E=h.type,E===Rn){if(I.tag===7){n(f,I.sibling),c=i(I,h.props.children),c.return=f,f=c;break e}}else if(I.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Nt&&$u(E)===I.type){n(f,I.sibling),c=i(I,h.props),c.ref=vr(f,I,h),c.return=f,f=c;break e}n(f,I);break}else t(f,I);I=I.sibling}h.type===Rn?(c=dn(h.props.children,f.mode,y,h.key),c.return=f,f=c):(y=Ki(h.type,h.key,h.props,null,f.mode,y),y.ref=vr(f,c,h),y.return=f,f=y)}return o(f);case Nn:e:{for(I=h.key;c!==null;){if(c.key===I)if(c.tag===4&&c.stateNode.containerInfo===h.containerInfo&&c.stateNode.implementation===h.implementation){n(f,c.sibling),c=i(c,h.children||[]),c.return=f,f=c;break e}else{n(f,c);break}else t(f,c);c=c.sibling}c=To(h,f.mode,y),c.return=f,f=c}return o(f);case Nt:return I=h._init,R(f,c,I(h._payload),y)}if(Sr(h))return _(f,c,h,y);if(fr(h))return k(f,c,h,y);Ni(f,h)}return typeof h=="string"&&h!==""||typeof h=="number"?(h=""+h,c!==null&&c.tag===6?(n(f,c.sibling),c=i(c,h),c.return=f,f=c):(n(f,c),c=Io(h,f.mode,y),c.return=f,f=c),o(f)):n(f,c)}return R}var Jn=uf(!0),cf=uf(!1),ds=Jt(null),fs=null,Mn=null,dl=null;function fl(){dl=Mn=fs=null}function hl(e){var t=ds.current;G(ds),e._currentValue=t}function pa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function Vn(e,t){fs=e,dl=Mn=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(Ie=!0),e.firstContext=null)}function Fe(e){var t=e._currentValue;if(dl!==e)if(e={context:e,memoizedValue:t,next:null},Mn===null){if(fs===null)throw Error(S(308));Mn=e,fs.dependencies={lanes:0,firstContext:e}}else Mn=Mn.next=e;return t}var an=null;function pl(e){an===null?an=[e]:an.push(e)}function df(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,pl(t)):(n.next=i.next,i.next=n),t.interleaved=n,wt(e,r)}function wt(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Rt=!1;function ml(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function ff(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function gt(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function $t(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,j&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,wt(e,n)}return i=r.interleaved,i===null?(t.next=t,pl(r)):(t.next=i.next,i.next=t),r.interleaved=t,wt(e,n)}function Bi(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,el(e,n)}}function Hu(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function hs(e,t,n,r){var i=e.updateQueue;Rt=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,a=i.shared.pending;if(a!==null){i.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var p=e.alternate;p!==null&&(p=p.updateQueue,a=p.lastBaseUpdate,a!==o&&(a===null?p.firstBaseUpdate=u:a.next=u,p.lastBaseUpdate=l))}if(s!==null){var g=i.baseState;o=0,p=u=l=null,a=s;do{var m=a.lane,w=a.eventTime;if((r&m)===m){p!==null&&(p=p.next={eventTime:w,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var _=e,k=a;switch(m=t,w=n,k.tag){case 1:if(_=k.payload,typeof _=="function"){g=_.call(w,g,m);break e}g=_;break e;case 3:_.flags=_.flags&-65537|128;case 0:if(_=k.payload,m=typeof _=="function"?_.call(w,g,m):_,m==null)break e;g=J({},g,m);break e;case 2:Rt=!0}}a.callback!==null&&a.lane!==0&&(e.flags|=64,m=i.effects,m===null?i.effects=[a]:m.push(a))}else w={eventTime:w,lane:m,tag:a.tag,payload:a.payload,callback:a.callback,next:null},p===null?(u=p=w,l=g):p=p.next=w,o|=m;if(a=a.next,a===null){if(a=i.shared.pending,a===null)break;m=a,a=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(p===null&&(l=g),i.baseState=l,i.firstBaseUpdate=u,i.lastBaseUpdate=p,t=i.shared.interleaved,t!==null){i=t;do o|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);vn|=o,e.lanes=o,e.memoizedState=g}}function Vu(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(S(191,i));i.call(r)}}}var si={},it=Jt(si),Kr=Jt(si),Qr=Jt(si);function ln(e){if(e===si)throw Error(S(174));return e}function gl(e,t){switch(V(Qr,t),V(Kr,e),V(it,si),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Qo(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Qo(t,e)}G(it),V(it,t)}function Zn(){G(it),G(Kr),G(Qr)}function hf(e){ln(Qr.current);var t=ln(it.current),n=Qo(t,e.type);t!==n&&(V(Kr,e),V(it,n))}function vl(e){Kr.current===e&&(G(it),G(Kr))}var q=Jt(0);function ps(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var wo=[];function yl(){for(var e=0;e<wo.length;e++)wo[e]._workInProgressVersionPrimary=null;wo.length=0}var $i=xt.ReactCurrentDispatcher,_o=xt.ReactCurrentBatchConfig,gn=0,X=null,se=null,ae=null,ms=!1,br=!1,Yr=0,ug=0;function fe(){throw Error(S(321))}function wl(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xe(e[n],t[n]))return!1;return!0}function _l(e,t,n,r,i,s){if(gn=s,X=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,$i.current=e===null||e.memoizedState===null?hg:pg,e=n(r,i),br){s=0;do{if(br=!1,Yr=0,25<=s)throw Error(S(301));s+=1,ae=se=null,t.updateQueue=null,$i.current=mg,e=n(r,i)}while(br)}if($i.current=gs,t=se!==null&&se.next!==null,gn=0,ae=se=X=null,ms=!1,t)throw Error(S(300));return e}function kl(){var e=Yr!==0;return Yr=0,e}function et(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ae===null?X.memoizedState=ae=e:ae=ae.next=e,ae}function Be(){if(se===null){var e=X.alternate;e=e!==null?e.memoizedState:null}else e=se.next;var t=ae===null?X.memoizedState:ae.next;if(t!==null)ae=t,se=e;else{if(e===null)throw Error(S(310));se=e,e={memoizedState:se.memoizedState,baseState:se.baseState,baseQueue:se.baseQueue,queue:se.queue,next:null},ae===null?X.memoizedState=ae=e:ae=ae.next=e}return ae}function qr(e,t){return typeof t=="function"?t(e):t}function ko(e){var t=Be(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=se,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var a=o=null,l=null,u=s;do{var p=u.lane;if((gn&p)===p)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:e(r,u.action);else{var g={lane:p,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=g,o=r):l=l.next=g,X.lanes|=p,vn|=p}u=u.next}while(u!==null&&u!==s);l===null?o=r:l.next=a,Xe(r,t.memoizedState)||(Ie=!0),t.memoizedState=r,t.baseState=o,t.baseQueue=l,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,X.lanes|=s,vn|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function So(e){var t=Be(),n=t.queue;if(n===null)throw Error(S(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=e(s,o.action),o=o.next;while(o!==i);Xe(s,t.memoizedState)||(Ie=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function pf(){}function mf(e,t){var n=X,r=Be(),i=t(),s=!Xe(r.memoizedState,i);if(s&&(r.memoizedState=i,Ie=!0),r=r.queue,Sl(yf.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||ae!==null&&ae.memoizedState.tag&1){if(n.flags|=2048,Xr(9,vf.bind(null,n,r,i,t),void 0,null),le===null)throw Error(S(349));gn&30||gf(n,t,i)}return i}function gf(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=X.updateQueue,t===null?(t={lastEffect:null,stores:null},X.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vf(e,t,n,r){t.value=n,t.getSnapshot=r,wf(t)&&_f(e)}function yf(e,t,n){return n(function(){wf(t)&&_f(e)})}function wf(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xe(e,n)}catch{return!0}}function _f(e){var t=wt(e,1);t!==null&&Ye(t,e,1,-1)}function Wu(e){var t=et();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:qr,lastRenderedState:e},t.queue=e,e=e.dispatch=fg.bind(null,X,e),[t.memoizedState,e]}function Xr(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=X.updateQueue,t===null?(t={lastEffect:null,stores:null},X.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function kf(){return Be().memoizedState}function Hi(e,t,n,r){var i=et();X.flags|=e,i.memoizedState=Xr(1|t,n,void 0,r===void 0?null:r)}function Ms(e,t,n,r){var i=Be();r=r===void 0?null:r;var s=void 0;if(se!==null){var o=se.memoizedState;if(s=o.destroy,r!==null&&wl(r,o.deps)){i.memoizedState=Xr(t,n,s,r);return}}X.flags|=e,i.memoizedState=Xr(1|t,n,s,r)}function Gu(e,t){return Hi(8390656,8,e,t)}function Sl(e,t){return Ms(2048,8,e,t)}function Sf(e,t){return Ms(4,2,e,t)}function xf(e,t){return Ms(4,4,e,t)}function Ef(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function If(e,t,n){return n=n!=null?n.concat([e]):null,Ms(4,4,Ef.bind(null,t,e),n)}function xl(){}function Tf(e,t){var n=Be();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wl(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Cf(e,t){var n=Be();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&wl(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Nf(e,t,n){return gn&21?(Xe(n,t)||(n=Ad(),X.lanes|=n,vn|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,Ie=!0),e.memoizedState=n)}function cg(e,t){var n=F;F=n!==0&&4>n?n:4,e(!0);var r=_o.transition;_o.transition={};try{e(!1),t()}finally{F=n,_o.transition=r}}function Rf(){return Be().memoizedState}function dg(e,t,n){var r=Vt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},bf(e))Pf(t,n);else if(n=df(e,t,n,r),n!==null){var i=we();Ye(n,e,r,i),Af(n,t,r)}}function fg(e,t,n){var r=Vt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(bf(e))Pf(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var o=t.lastRenderedState,a=s(o,n);if(i.hasEagerState=!0,i.eagerState=a,Xe(a,o)){var l=t.interleaved;l===null?(i.next=i,pl(t)):(i.next=l.next,l.next=i),t.interleaved=i;return}}catch{}finally{}n=df(e,t,i,r),n!==null&&(i=we(),Ye(n,e,r,i),Af(n,t,r))}}function bf(e){var t=e.alternate;return e===X||t!==null&&t===X}function Pf(e,t){br=ms=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Af(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,el(e,n)}}var gs={readContext:Fe,useCallback:fe,useContext:fe,useEffect:fe,useImperativeHandle:fe,useInsertionEffect:fe,useLayoutEffect:fe,useMemo:fe,useReducer:fe,useRef:fe,useState:fe,useDebugValue:fe,useDeferredValue:fe,useTransition:fe,useMutableSource:fe,useSyncExternalStore:fe,useId:fe,unstable_isNewReconciler:!1},hg={readContext:Fe,useCallback:function(e,t){return et().memoizedState=[e,t===void 0?null:t],e},useContext:Fe,useEffect:Gu,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,Hi(4194308,4,Ef.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Hi(4194308,4,e,t)},useInsertionEffect:function(e,t){return Hi(4,2,e,t)},useMemo:function(e,t){var n=et();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=et();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=dg.bind(null,X,e),[r.memoizedState,e]},useRef:function(e){var t=et();return e={current:e},t.memoizedState=e},useState:Wu,useDebugValue:xl,useDeferredValue:function(e){return et().memoizedState=e},useTransition:function(){var e=Wu(!1),t=e[0];return e=cg.bind(null,e[1]),et().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=X,i=et();if(Y){if(n===void 0)throw Error(S(407));n=n()}else{if(n=t(),le===null)throw Error(S(349));gn&30||gf(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,Gu(yf.bind(null,r,s,e),[e]),r.flags|=2048,Xr(9,vf.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=et(),t=le.identifierPrefix;if(Y){var n=ht,r=ft;n=(r&~(1<<32-Qe(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Yr++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=ug++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},pg={readContext:Fe,useCallback:Tf,useContext:Fe,useEffect:Sl,useImperativeHandle:If,useInsertionEffect:Sf,useLayoutEffect:xf,useMemo:Cf,useReducer:ko,useRef:kf,useState:function(){return ko(qr)},useDebugValue:xl,useDeferredValue:function(e){var t=Be();return Nf(t,se.memoizedState,e)},useTransition:function(){var e=ko(qr)[0],t=Be().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:mf,useId:Rf,unstable_isNewReconciler:!1},mg={readContext:Fe,useCallback:Tf,useContext:Fe,useEffect:Sl,useImperativeHandle:If,useInsertionEffect:Sf,useLayoutEffect:xf,useMemo:Cf,useReducer:So,useRef:kf,useState:function(){return So(qr)},useDebugValue:xl,useDeferredValue:function(e){var t=Be();return se===null?t.memoizedState=e:Nf(t,se.memoizedState,e)},useTransition:function(){var e=So(qr)[0],t=Be().memoizedState;return[e,t]},useMutableSource:pf,useSyncExternalStore:mf,useId:Rf,unstable_isNewReconciler:!1};function He(e,t){if(e&&e.defaultProps){t=J({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ma(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:J({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var js={isMounted:function(e){return(e=e._reactInternals)?xn(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=we(),i=Vt(e),s=gt(r,i);s.payload=t,n!=null&&(s.callback=n),t=$t(e,s,i),t!==null&&(Ye(t,e,i,r),Bi(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=we(),i=Vt(e),s=gt(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=$t(e,s,i),t!==null&&(Ye(t,e,i,r),Bi(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=we(),r=Vt(e),i=gt(n,r);i.tag=2,t!=null&&(i.callback=t),t=$t(e,i,r),t!==null&&(Ye(t,e,r,n),Bi(t,e,r))}};function Ku(e,t,n,r,i,s,o){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,o):t.prototype&&t.prototype.isPureReactComponent?!Hr(n,r)||!Hr(i,s):!0}function Of(e,t,n){var r=!1,i=qt,s=t.contextType;return typeof s=="object"&&s!==null?s=Fe(s):(i=Ce(t)?pn:me.current,r=t.contextTypes,s=(r=r!=null)?qn(e,i):qt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=js,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function Qu(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&js.enqueueReplaceState(t,t.state,null)}function ga(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},ml(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=Fe(s):(s=Ce(t)?pn:me.current,i.context=qn(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(ma(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&js.enqueueReplaceState(i,i.state,null),hs(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function er(e,t){try{var n="",r=t;do n+=Hp(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function xo(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function va(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var gg=typeof WeakMap=="function"?WeakMap:Map;function Df(e,t,n){n=gt(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){ys||(ys=!0,Ca=r),va(e,t)},n}function Lf(e,t,n){n=gt(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){va(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){va(e,t),typeof r!="function"&&(Ht===null?Ht=new Set([this]):Ht.add(this));var o=t.stack;this.componentDidCatch(t.value,{componentStack:o!==null?o:""})}),n}function Yu(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new gg;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=bg.bind(null,e,t,n),t.then(e,e))}function qu(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Xu(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=gt(-1,1),t.tag=2,$t(n,t,1))),n.lanes|=1),e)}var vg=xt.ReactCurrentOwner,Ie=!1;function ve(e,t,n,r){t.child=e===null?cf(t,null,n,r):Jn(t,e.child,n,r)}function Ju(e,t,n,r,i){n=n.render;var s=t.ref;return Vn(t,i),r=_l(e,t,n,r,s,i),n=kl(),e!==null&&!Ie?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,_t(e,t,i)):(Y&&n&&ll(t),t.flags|=1,ve(e,t,r,i),t.child)}function Zu(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Pl(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,Uf(e,t,s,r,i)):(e=Ki(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Hr,n(o,r)&&e.ref===t.ref)return _t(e,t,i)}return t.flags|=1,e=Wt(s,r),e.ref=t.ref,e.return=t,t.child=e}function Uf(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(Hr(s,r)&&e.ref===t.ref)if(Ie=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(Ie=!0);else return t.lanes=e.lanes,_t(e,t,i)}return ya(e,t,n,r,i)}function Mf(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},V(zn,be),be|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,V(zn,be),be|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,V(zn,be),be|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,V(zn,be),be|=r;return ve(e,t,i,n),t.child}function jf(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ya(e,t,n,r,i){var s=Ce(n)?pn:me.current;return s=qn(t,s),Vn(t,i),n=_l(e,t,n,r,s,i),r=kl(),e!==null&&!Ie?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,_t(e,t,i)):(Y&&r&&ll(t),t.flags|=1,ve(e,t,n,i),t.child)}function ec(e,t,n,r,i){if(Ce(n)){var s=!0;ls(t)}else s=!1;if(Vn(t,i),t.stateNode===null)Vi(e,t),Of(t,n,r),ga(t,n,r,i),r=!0;else if(e===null){var o=t.stateNode,a=t.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Fe(u):(u=Ce(n)?pn:me.current,u=qn(t,u));var p=n.getDerivedStateFromProps,g=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function";g||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==r||l!==u)&&Qu(t,o,r,u),Rt=!1;var m=t.memoizedState;o.state=m,hs(t,r,o,i),l=t.memoizedState,a!==r||m!==l||Te.current||Rt?(typeof p=="function"&&(ma(t,n,p,r),l=t.memoizedState),(a=Rt||Ku(t,n,a,r,m,l,u))?(g||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),o.props=r,o.state=l,o.context=u,r=a):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{o=t.stateNode,ff(e,t),a=t.memoizedProps,u=t.type===t.elementType?a:He(t.type,a),o.props=u,g=t.pendingProps,m=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Fe(l):(l=Ce(n)?pn:me.current,l=qn(t,l));var w=n.getDerivedStateFromProps;(p=typeof w=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==g||m!==l)&&Qu(t,o,r,l),Rt=!1,m=t.memoizedState,o.state=m,hs(t,r,o,i);var _=t.memoizedState;a!==g||m!==_||Te.current||Rt?(typeof w=="function"&&(ma(t,n,w,r),_=t.memoizedState),(u=Rt||Ku(t,n,u,r,m,_,l)||!1)?(p||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,_,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,_,l)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=_),o.props=r,o.state=_,o.context=l,r=u):(typeof o.componentDidUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),r=!1)}return wa(e,t,n,r,s,i)}function wa(e,t,n,r,i,s){jf(e,t);var o=(t.flags&128)!==0;if(!r&&!o)return i&&zu(t,n,!1),_t(e,t,s);r=t.stateNode,vg.current=t;var a=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&o?(t.child=Jn(t,e.child,null,s),t.child=Jn(t,null,a,s)):ve(e,t,a,s),t.memoizedState=r.state,i&&zu(t,n,!0),t.child}function zf(e){var t=e.stateNode;t.pendingContext?ju(e,t.pendingContext,t.pendingContext!==t.context):t.context&&ju(e,t.context,!1),gl(e,t.containerInfo)}function tc(e,t,n,r,i){return Xn(),cl(i),t.flags|=256,ve(e,t,n,r),t.child}var _a={dehydrated:null,treeContext:null,retryLane:0};function ka(e){return{baseLanes:e,cachePool:null,transitions:null}}function Ff(e,t,n){var r=t.pendingProps,i=q.current,s=!1,o=(t.flags&128)!==0,a;if((a=o)||(a=e!==null&&e.memoizedState===null?!1:(i&2)!==0),a?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),V(q,i&1),e===null)return ha(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(o=r.children,e=r.fallback,s?(r=t.mode,s=t.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=Bs(o,r,0,null),e=dn(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=ka(n),t.memoizedState=_a,e):El(t,o));if(i=e.memoizedState,i!==null&&(a=i.dehydrated,a!==null))return yg(e,t,o,r,a,i,n);if(s){s=r.fallback,o=t.mode,i=e.child,a=i.sibling;var l={mode:"hidden",children:r.children};return!(o&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=l,t.deletions=null):(r=Wt(i,l),r.subtreeFlags=i.subtreeFlags&14680064),a!==null?s=Wt(a,s):(s=dn(s,o,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,o=e.child.memoizedState,o=o===null?ka(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=e.childLanes&~n,t.memoizedState=_a,r}return s=e.child,e=s.sibling,r=Wt(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function El(e,t){return t=Bs({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ri(e,t,n,r){return r!==null&&cl(r),Jn(t,e.child,null,n),e=El(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function yg(e,t,n,r,i,s,o){if(n)return t.flags&256?(t.flags&=-257,r=xo(Error(S(422))),Ri(e,t,o,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=Bs({mode:"visible",children:r.children},i,0,null),s=dn(s,i,o,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&Jn(t,e.child,null,o),t.child.memoizedState=ka(o),t.memoizedState=_a,s);if(!(t.mode&1))return Ri(e,t,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var a=r.dgst;return r=a,s=Error(S(419)),r=xo(s,r,void 0),Ri(e,t,o,r)}if(a=(o&e.childLanes)!==0,Ie||a){if(r=le,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,wt(e,i),Ye(r,e,i,-1))}return bl(),r=xo(Error(S(421))),Ri(e,t,o,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Pg.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,Pe=Bt(i.nextSibling),Ae=t,Y=!0,We=null,e!==null&&(Ue[Me++]=ft,Ue[Me++]=ht,Ue[Me++]=mn,ft=e.id,ht=e.overflow,mn=t),t=El(t,r.children),t.flags|=4096,t)}function nc(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),pa(e.return,t,n)}function Eo(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Bf(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(ve(e,t,r.children,n),r=q.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&nc(e,n,t);else if(e.tag===19)nc(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(V(q,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ps(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Eo(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ps(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Eo(t,!0,n,null,s);break;case"together":Eo(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Vi(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function _t(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),vn|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(S(153));if(t.child!==null){for(e=t.child,n=Wt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Wt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function wg(e,t,n){switch(t.tag){case 3:zf(t),Xn();break;case 5:hf(t);break;case 1:Ce(t.type)&&ls(t);break;case 4:gl(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;V(ds,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(V(q,q.current&1),t.flags|=128,null):n&t.child.childLanes?Ff(e,t,n):(V(q,q.current&1),e=_t(e,t,n),e!==null?e.sibling:null);V(q,q.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Bf(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),V(q,q.current),r)break;return null;case 22:case 23:return t.lanes=0,Mf(e,t,n)}return _t(e,t,n)}var $f,Sa,Hf,Vf;$f=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Sa=function(){};Hf=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,ln(it.current);var s=null;switch(n){case"input":i=Vo(e,i),r=Vo(e,r),s=[];break;case"select":i=J({},i,{value:void 0}),r=J({},r,{value:void 0}),s=[];break;case"textarea":i=Ko(e,i),r=Ko(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=os)}Yo(n,r);var o;n=null;for(u in i)if(!r.hasOwnProperty(u)&&i.hasOwnProperty(u)&&i[u]!=null)if(u==="style"){var a=i[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ur.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in r){var l=r[u];if(a=i!=null?i[u]:void 0,r.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ur.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&W("scroll",e),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(t.updateQueue=u)&&(t.flags|=4)}};Vf=function(e,t,n,r){n!==r&&(t.flags|=4)};function yr(e,t){if(!Y)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function he(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function _g(e,t,n){var r=t.pendingProps;switch(ul(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return he(t),null;case 1:return Ce(t.type)&&as(),he(t),null;case 3:return r=t.stateNode,Zn(),G(Te),G(me),yl(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(Ci(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,We!==null&&(ba(We),We=null))),Sa(e,t),he(t),null;case 5:vl(t);var i=ln(Qr.current);if(n=t.type,e!==null&&t.stateNode!=null)Hf(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(S(166));return he(t),null}if(e=ln(it.current),Ci(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[tt]=t,r[Gr]=s,e=(t.mode&1)!==0,n){case"dialog":W("cancel",r),W("close",r);break;case"iframe":case"object":case"embed":W("load",r);break;case"video":case"audio":for(i=0;i<Er.length;i++)W(Er[i],r);break;case"source":W("error",r);break;case"img":case"image":case"link":W("error",r),W("load",r);break;case"details":W("toggle",r);break;case"input":du(r,s),W("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},W("invalid",r);break;case"textarea":hu(r,s),W("invalid",r)}Yo(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?r.textContent!==a&&(s.suppressHydrationWarning!==!0&&Ti(r.textContent,a,e),i=["children",a]):typeof a=="number"&&r.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&Ti(r.textContent,a,e),i=["children",""+a]):Ur.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&W("scroll",r)}switch(n){case"input":yi(r),fu(r,s,!0);break;case"textarea":yi(r),pu(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=os)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=vd(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=o.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=o.createElement(n,{is:r.is}):(e=o.createElement(n),n==="select"&&(o=e,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):e=o.createElementNS(e,n),e[tt]=t,e[Gr]=r,$f(e,t,!1,!1),t.stateNode=e;e:{switch(o=qo(n,r),n){case"dialog":W("cancel",e),W("close",e),i=r;break;case"iframe":case"object":case"embed":W("load",e),i=r;break;case"video":case"audio":for(i=0;i<Er.length;i++)W(Er[i],e);i=r;break;case"source":W("error",e),i=r;break;case"img":case"image":case"link":W("error",e),W("load",e),i=r;break;case"details":W("toggle",e),i=r;break;case"input":du(e,r),i=Vo(e,r),W("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=J({},r,{value:void 0}),W("invalid",e);break;case"textarea":hu(e,r),i=Ko(e,r),W("invalid",e);break;default:i=r}Yo(n,i),a=i;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?_d(e,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&yd(e,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Mr(e,l):typeof l=="number"&&Mr(e,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Ur.hasOwnProperty(s)?l!=null&&s==="onScroll"&&W("scroll",e):l!=null&&Qa(e,s,l,o))}switch(n){case"input":yi(e),fu(e,r,!1);break;case"textarea":yi(e),pu(e);break;case"option":r.value!=null&&e.setAttribute("value",""+Yt(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Fn(e,!!r.multiple,s,!1):r.defaultValue!=null&&Fn(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=os)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return he(t),null;case 6:if(e&&t.stateNode!=null)Vf(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(S(166));if(n=ln(Qr.current),ln(it.current),Ci(t)){if(r=t.stateNode,n=t.memoizedProps,r[tt]=t,(s=r.nodeValue!==n)&&(e=Ae,e!==null))switch(e.tag){case 3:Ti(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ti(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[tt]=t,t.stateNode=r}return he(t),null;case 13:if(G(q),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Y&&Pe!==null&&t.mode&1&&!(t.flags&128))lf(),Xn(),t.flags|=98560,s=!1;else if(s=Ci(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(S(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(S(317));s[tt]=t}else Xn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;he(t),s=!1}else We!==null&&(ba(We),We=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||q.current&1?oe===0&&(oe=3):bl())),t.updateQueue!==null&&(t.flags|=4),he(t),null);case 4:return Zn(),Sa(e,t),e===null&&Vr(t.stateNode.containerInfo),he(t),null;case 10:return hl(t.type._context),he(t),null;case 17:return Ce(t.type)&&as(),he(t),null;case 19:if(G(q),s=t.memoizedState,s===null)return he(t),null;if(r=(t.flags&128)!==0,o=s.rendering,o===null)if(r)yr(s,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=ps(e),o!==null){for(t.flags|=128,yr(s,!1),r=o.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,e=o.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return V(q,q.current&1|2),t.child}e=e.sibling}s.tail!==null&&re()>tr&&(t.flags|=128,r=!0,yr(s,!1),t.lanes=4194304)}else{if(!r)if(e=ps(o),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),yr(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Y)return he(t),null}else 2*re()-s.renderingStartTime>tr&&n!==1073741824&&(t.flags|=128,r=!0,yr(s,!1),t.lanes=4194304);s.isBackwards?(o.sibling=t.child,t.child=o):(n=s.last,n!==null?n.sibling=o:t.child=o,s.last=o)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=re(),t.sibling=null,n=q.current,V(q,r?n&1|2:n&1),t):(he(t),null);case 22:case 23:return Rl(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?be&1073741824&&(he(t),t.subtreeFlags&6&&(t.flags|=8192)):he(t),null;case 24:return null;case 25:return null}throw Error(S(156,t.tag))}function kg(e,t){switch(ul(t),t.tag){case 1:return Ce(t.type)&&as(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Zn(),G(Te),G(me),yl(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return vl(t),null;case 13:if(G(q),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(S(340));Xn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return G(q),null;case 4:return Zn(),null;case 10:return hl(t.type._context),null;case 22:case 23:return Rl(),null;case 24:return null;default:return null}}var bi=!1,pe=!1,Sg=typeof WeakSet=="function"?WeakSet:Set,T=null;function jn(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Z(e,t,r)}else n.current=null}function xa(e,t,n){try{n()}catch(r){Z(e,t,r)}}var rc=!1;function xg(e,t){if(oa=rs,e=Qd(),al(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,p=0,g=e,m=null;t:for(;;){for(var w;g!==n||i!==0&&g.nodeType!==3||(a=o+i),g!==s||r!==0&&g.nodeType!==3||(l=o+r),g.nodeType===3&&(o+=g.nodeValue.length),(w=g.firstChild)!==null;)m=g,g=w;for(;;){if(g===e)break t;if(m===n&&++u===i&&(a=o),m===s&&++p===r&&(l=o),(w=g.nextSibling)!==null)break;g=m,m=g.parentNode}g=w}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(aa={focusedElem:e,selectionRange:n},rs=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var _=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(_!==null){var k=_.memoizedProps,R=_.memoizedState,f=t.stateNode,c=f.getSnapshotBeforeUpdate(t.elementType===t.type?k:He(t.type,k),R);f.__reactInternalSnapshotBeforeUpdate=c}break;case 3:var h=t.stateNode.containerInfo;h.nodeType===1?h.textContent="":h.nodeType===9&&h.documentElement&&h.removeChild(h.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(S(163))}}catch(y){Z(t,t.return,y)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return _=rc,rc=!1,_}function Pr(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&xa(t,n,s)}i=i.next}while(i!==r)}}function zs(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Ea(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Wf(e){var t=e.alternate;t!==null&&(e.alternate=null,Wf(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[tt],delete t[Gr],delete t[ca],delete t[sg],delete t[og])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Gf(e){return e.tag===5||e.tag===3||e.tag===4}function ic(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Gf(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ia(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=os));else if(r!==4&&(e=e.child,e!==null))for(Ia(e,t,n),e=e.sibling;e!==null;)Ia(e,t,n),e=e.sibling}function Ta(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Ta(e,t,n),e=e.sibling;e!==null;)Ta(e,t,n),e=e.sibling}var ue=null,Ve=!1;function Tt(e,t,n){for(n=n.child;n!==null;)Kf(e,t,n),n=n.sibling}function Kf(e,t,n){if(rt&&typeof rt.onCommitFiberUnmount=="function")try{rt.onCommitFiberUnmount(Ps,n)}catch{}switch(n.tag){case 5:pe||jn(n,t);case 6:var r=ue,i=Ve;ue=null,Tt(e,t,n),ue=r,Ve=i,ue!==null&&(Ve?(e=ue,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):ue.removeChild(n.stateNode));break;case 18:ue!==null&&(Ve?(e=ue,n=n.stateNode,e.nodeType===8?vo(e.parentNode,n):e.nodeType===1&&vo(e,n),Br(e)):vo(ue,n.stateNode));break;case 4:r=ue,i=Ve,ue=n.stateNode.containerInfo,Ve=!0,Tt(e,t,n),ue=r,Ve=i;break;case 0:case 11:case 14:case 15:if(!pe&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&xa(n,t,o),i=i.next}while(i!==r)}Tt(e,t,n);break;case 1:if(!pe&&(jn(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(a){Z(n,t,a)}Tt(e,t,n);break;case 21:Tt(e,t,n);break;case 22:n.mode&1?(pe=(r=pe)||n.memoizedState!==null,Tt(e,t,n),pe=r):Tt(e,t,n);break;default:Tt(e,t,n)}}function sc(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Sg),t.forEach(function(r){var i=Ag.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function $e(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,o=t,a=o;e:for(;a!==null;){switch(a.tag){case 5:ue=a.stateNode,Ve=!1;break e;case 3:ue=a.stateNode.containerInfo,Ve=!0;break e;case 4:ue=a.stateNode.containerInfo,Ve=!0;break e}a=a.return}if(ue===null)throw Error(S(160));Kf(s,o,i),ue=null,Ve=!1;var l=i.alternate;l!==null&&(l.return=null),i.return=null}catch(u){Z(i,t,u)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Qf(t,e),t=t.sibling}function Qf(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if($e(t,e),Ze(e),r&4){try{Pr(3,e,e.return),zs(3,e)}catch(k){Z(e,e.return,k)}try{Pr(5,e,e.return)}catch(k){Z(e,e.return,k)}}break;case 1:$e(t,e),Ze(e),r&512&&n!==null&&jn(n,n.return);break;case 5:if($e(t,e),Ze(e),r&512&&n!==null&&jn(n,n.return),e.flags&32){var i=e.stateNode;try{Mr(i,"")}catch(k){Z(e,e.return,k)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,o=n!==null?n.memoizedProps:s,a=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&md(i,s),qo(a,o);var u=qo(a,s);for(o=0;o<l.length;o+=2){var p=l[o],g=l[o+1];p==="style"?_d(i,g):p==="dangerouslySetInnerHTML"?yd(i,g):p==="children"?Mr(i,g):Qa(i,p,g,u)}switch(a){case"input":Wo(i,s);break;case"textarea":gd(i,s);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var w=s.value;w!=null?Fn(i,!!s.multiple,w,!1):m!==!!s.multiple&&(s.defaultValue!=null?Fn(i,!!s.multiple,s.defaultValue,!0):Fn(i,!!s.multiple,s.multiple?[]:"",!1))}i[Gr]=s}catch(k){Z(e,e.return,k)}}break;case 6:if($e(t,e),Ze(e),r&4){if(e.stateNode===null)throw Error(S(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(k){Z(e,e.return,k)}}break;case 3:if($e(t,e),Ze(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Br(t.containerInfo)}catch(k){Z(e,e.return,k)}break;case 4:$e(t,e),Ze(e);break;case 13:$e(t,e),Ze(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Cl=re())),r&4&&sc(e);break;case 22:if(p=n!==null&&n.memoizedState!==null,e.mode&1?(pe=(u=pe)||p,$e(t,e),pe=u):$e(t,e),Ze(e),r&8192){if(u=e.memoizedState!==null,(e.stateNode.isHidden=u)&&!p&&e.mode&1)for(T=e,p=e.child;p!==null;){for(g=T=p;T!==null;){switch(m=T,w=m.child,m.tag){case 0:case 11:case 14:case 15:Pr(4,m,m.return);break;case 1:jn(m,m.return);var _=m.stateNode;if(typeof _.componentWillUnmount=="function"){r=m,n=m.return;try{t=r,_.props=t.memoizedProps,_.state=t.memoizedState,_.componentWillUnmount()}catch(k){Z(r,n,k)}}break;case 5:jn(m,m.return);break;case 22:if(m.memoizedState!==null){ac(g);continue}}w!==null?(w.return=m,T=w):ac(g)}p=p.sibling}e:for(p=null,g=e;;){if(g.tag===5){if(p===null){p=g;try{i=g.stateNode,u?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=g.stateNode,l=g.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=wd("display",o))}catch(k){Z(e,e.return,k)}}}else if(g.tag===6){if(p===null)try{g.stateNode.nodeValue=u?"":g.memoizedProps}catch(k){Z(e,e.return,k)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;p===g&&(p=null),g=g.return}p===g&&(p=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:$e(t,e),Ze(e),r&4&&sc(e);break;case 21:break;default:$e(t,e),Ze(e)}}function Ze(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Gf(n)){var r=n;break e}n=n.return}throw Error(S(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Mr(i,""),r.flags&=-33);var s=ic(e);Ta(e,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,a=ic(e);Ia(e,a,o);break;default:throw Error(S(161))}}catch(l){Z(e,e.return,l)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Eg(e,t,n){T=e,Yf(e)}function Yf(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var i=T,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||bi;if(!o){var a=i.alternate,l=a!==null&&a.memoizedState!==null||pe;a=bi;var u=pe;if(bi=o,(pe=l)&&!u)for(T=i;T!==null;)o=T,l=o.child,o.tag===22&&o.memoizedState!==null?lc(i):l!==null?(l.return=o,T=l):lc(i);for(;s!==null;)T=s,Yf(s),s=s.sibling;T=i,bi=a,pe=u}oc(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,T=s):oc(e)}}function oc(e){for(;T!==null;){var t=T;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:pe||zs(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!pe)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:He(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Vu(t,s,r);break;case 3:var o=t.updateQueue;if(o!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Vu(t,o,n)}break;case 5:var a=t.stateNode;if(n===null&&t.flags&4){n=a;var l=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var u=t.alternate;if(u!==null){var p=u.memoizedState;if(p!==null){var g=p.dehydrated;g!==null&&Br(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(S(163))}pe||t.flags&512&&Ea(t)}catch(m){Z(t,t.return,m)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function ac(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function lc(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{zs(4,t)}catch(l){Z(t,n,l)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(l){Z(t,i,l)}}var s=t.return;try{Ea(t)}catch(l){Z(t,s,l)}break;case 5:var o=t.return;try{Ea(t)}catch(l){Z(t,o,l)}}}catch(l){Z(t,t.return,l)}if(t===e){T=null;break}var a=t.sibling;if(a!==null){a.return=t.return,T=a;break}T=t.return}}var Ig=Math.ceil,vs=xt.ReactCurrentDispatcher,Il=xt.ReactCurrentOwner,ze=xt.ReactCurrentBatchConfig,j=0,le=null,ie=null,ce=0,be=0,zn=Jt(0),oe=0,Jr=null,vn=0,Fs=0,Tl=0,Ar=null,Ee=null,Cl=0,tr=1/0,ut=null,ys=!1,Ca=null,Ht=null,Pi=!1,Mt=null,ws=0,Or=0,Na=null,Wi=-1,Gi=0;function we(){return j&6?re():Wi!==-1?Wi:Wi=re()}function Vt(e){return e.mode&1?j&2&&ce!==0?ce&-ce:lg.transition!==null?(Gi===0&&(Gi=Ad()),Gi):(e=F,e!==0||(e=window.event,e=e===void 0?16:zd(e.type)),e):1}function Ye(e,t,n,r){if(50<Or)throw Or=0,Na=null,Error(S(185));ni(e,n,r),(!(j&2)||e!==le)&&(e===le&&(!(j&2)&&(Fs|=n),oe===4&&Pt(e,ce)),Ne(e,r),n===1&&j===0&&!(t.mode&1)&&(tr=re()+500,Us&&Zt()))}function Ne(e,t){var n=e.callbackNode;lm(e,t);var r=ns(e,e===le?ce:0);if(r===0)n!==null&&vu(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&vu(n),t===1)e.tag===0?ag(uc.bind(null,e)):sf(uc.bind(null,e)),rg(function(){!(j&6)&&Zt()}),n=null;else{switch(Od(r)){case 1:n=Za;break;case 4:n=bd;break;case 16:n=ts;break;case 536870912:n=Pd;break;default:n=ts}n=rh(n,qf.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function qf(e,t){if(Wi=-1,Gi=0,j&6)throw Error(S(327));var n=e.callbackNode;if(Wn()&&e.callbackNode!==n)return null;var r=ns(e,e===le?ce:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=_s(e,r);else{t=r;var i=j;j|=2;var s=Jf();(le!==e||ce!==t)&&(ut=null,tr=re()+500,cn(e,t));do try{Ng();break}catch(a){Xf(e,a)}while(!0);fl(),vs.current=s,j=i,ie!==null?t=0:(le=null,ce=0,t=oe)}if(t!==0){if(t===2&&(i=ta(e),i!==0&&(r=i,t=Ra(e,i))),t===1)throw n=Jr,cn(e,0),Pt(e,r),Ne(e,re()),n;if(t===6)Pt(e,r);else{if(i=e.current.alternate,!(r&30)&&!Tg(i)&&(t=_s(e,r),t===2&&(s=ta(e),s!==0&&(r=s,t=Ra(e,s))),t===1))throw n=Jr,cn(e,0),Pt(e,r),Ne(e,re()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(S(345));case 2:rn(e,Ee,ut);break;case 3:if(Pt(e,r),(r&130023424)===r&&(t=Cl+500-re(),10<t)){if(ns(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){we(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=ua(rn.bind(null,e,Ee,ut),t);break}rn(e,Ee,ut);break;case 4:if(Pt(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var o=31-Qe(r);s=1<<o,o=t[o],o>i&&(i=o),r&=~s}if(r=i,r=re()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Ig(r/1960))-r,10<r){e.timeoutHandle=ua(rn.bind(null,e,Ee,ut),r);break}rn(e,Ee,ut);break;case 5:rn(e,Ee,ut);break;default:throw Error(S(329))}}}return Ne(e,re()),e.callbackNode===n?qf.bind(null,e):null}function Ra(e,t){var n=Ar;return e.current.memoizedState.isDehydrated&&(cn(e,t).flags|=256),e=_s(e,t),e!==2&&(t=Ee,Ee=n,t!==null&&ba(t)),e}function ba(e){Ee===null?Ee=e:Ee.push.apply(Ee,e)}function Tg(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Xe(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Pt(e,t){for(t&=~Tl,t&=~Fs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Qe(t),r=1<<n;e[n]=-1,t&=~r}}function uc(e){if(j&6)throw Error(S(327));Wn();var t=ns(e,0);if(!(t&1))return Ne(e,re()),null;var n=_s(e,t);if(e.tag!==0&&n===2){var r=ta(e);r!==0&&(t=r,n=Ra(e,r))}if(n===1)throw n=Jr,cn(e,0),Pt(e,t),Ne(e,re()),n;if(n===6)throw Error(S(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,rn(e,Ee,ut),Ne(e,re()),null}function Nl(e,t){var n=j;j|=1;try{return e(t)}finally{j=n,j===0&&(tr=re()+500,Us&&Zt())}}function yn(e){Mt!==null&&Mt.tag===0&&!(j&6)&&Wn();var t=j;j|=1;var n=ze.transition,r=F;try{if(ze.transition=null,F=1,e)return e()}finally{F=r,ze.transition=n,j=t,!(j&6)&&Zt()}}function Rl(){be=zn.current,G(zn)}function cn(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ng(n)),ie!==null)for(n=ie.return;n!==null;){var r=n;switch(ul(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&as();break;case 3:Zn(),G(Te),G(me),yl();break;case 5:vl(r);break;case 4:Zn();break;case 13:G(q);break;case 19:G(q);break;case 10:hl(r.type._context);break;case 22:case 23:Rl()}n=n.return}if(le=e,ie=e=Wt(e.current,null),ce=be=t,oe=0,Jr=null,Tl=Fs=vn=0,Ee=Ar=null,an!==null){for(t=0;t<an.length;t++)if(n=an[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}an=null}return e}function Xf(e,t){do{var n=ie;try{if(fl(),$i.current=gs,ms){for(var r=X.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ms=!1}if(gn=0,ae=se=X=null,br=!1,Yr=0,Il.current=null,n===null||n.return===null){oe=1,Jr=t,ie=null;break}e:{var s=e,o=n.return,a=n,l=t;if(t=ce,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,p=a,g=p.tag;if(!(p.mode&1)&&(g===0||g===11||g===15)){var m=p.alternate;m?(p.updateQueue=m.updateQueue,p.memoizedState=m.memoizedState,p.lanes=m.lanes):(p.updateQueue=null,p.memoizedState=null)}var w=qu(o);if(w!==null){w.flags&=-257,Xu(w,o,a,s,t),w.mode&1&&Yu(s,u,t),t=w,l=u;var _=t.updateQueue;if(_===null){var k=new Set;k.add(l),t.updateQueue=k}else _.add(l);break e}else{if(!(t&1)){Yu(s,u,t),bl();break e}l=Error(S(426))}}else if(Y&&a.mode&1){var R=qu(o);if(R!==null){!(R.flags&65536)&&(R.flags|=256),Xu(R,o,a,s,t),cl(er(l,a));break e}}s=l=er(l,a),oe!==4&&(oe=2),Ar===null?Ar=[s]:Ar.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var f=Df(s,l,t);Hu(s,f);break e;case 1:a=l;var c=s.type,h=s.stateNode;if(!(s.flags&128)&&(typeof c.getDerivedStateFromError=="function"||h!==null&&typeof h.componentDidCatch=="function"&&(Ht===null||!Ht.has(h)))){s.flags|=65536,t&=-t,s.lanes|=t;var y=Lf(s,a,t);Hu(s,y);break e}}s=s.return}while(s!==null)}eh(n)}catch(E){t=E,ie===n&&n!==null&&(ie=n=n.return);continue}break}while(!0)}function Jf(){var e=vs.current;return vs.current=gs,e===null?gs:e}function bl(){(oe===0||oe===3||oe===2)&&(oe=4),le===null||!(vn&268435455)&&!(Fs&268435455)||Pt(le,ce)}function _s(e,t){var n=j;j|=2;var r=Jf();(le!==e||ce!==t)&&(ut=null,cn(e,t));do try{Cg();break}catch(i){Xf(e,i)}while(!0);if(fl(),j=n,vs.current=r,ie!==null)throw Error(S(261));return le=null,ce=0,oe}function Cg(){for(;ie!==null;)Zf(ie)}function Ng(){for(;ie!==null&&!Zp();)Zf(ie)}function Zf(e){var t=nh(e.alternate,e,be);e.memoizedProps=e.pendingProps,t===null?eh(e):ie=t,Il.current=null}function eh(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=kg(n,t),n!==null){n.flags&=32767,ie=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,ie=null;return}}else if(n=_g(n,t,be),n!==null){ie=n;return}if(t=t.sibling,t!==null){ie=t;return}ie=t=e}while(t!==null);oe===0&&(oe=5)}function rn(e,t,n){var r=F,i=ze.transition;try{ze.transition=null,F=1,Rg(e,t,n,r)}finally{ze.transition=i,F=r}return null}function Rg(e,t,n,r){do Wn();while(Mt!==null);if(j&6)throw Error(S(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(S(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(um(e,s),e===le&&(ie=le=null,ce=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Pi||(Pi=!0,rh(ts,function(){return Wn(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=ze.transition,ze.transition=null;var o=F;F=1;var a=j;j|=4,Il.current=null,xg(e,n),Qf(n,e),Ym(aa),rs=!!oa,aa=oa=null,e.current=n,Eg(n),em(),j=a,F=o,ze.transition=s}else e.current=n;if(Pi&&(Pi=!1,Mt=e,ws=i),s=e.pendingLanes,s===0&&(Ht=null),rm(n.stateNode),Ne(e,re()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(ys)throw ys=!1,e=Ca,Ca=null,e;return ws&1&&e.tag!==0&&Wn(),s=e.pendingLanes,s&1?e===Na?Or++:(Or=0,Na=e):Or=0,Zt(),null}function Wn(){if(Mt!==null){var e=Od(ws),t=ze.transition,n=F;try{if(ze.transition=null,F=16>e?16:e,Mt===null)var r=!1;else{if(e=Mt,Mt=null,ws=0,j&6)throw Error(S(331));var i=j;for(j|=4,T=e.current;T!==null;){var s=T,o=s.child;if(T.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(T=u;T!==null;){var p=T;switch(p.tag){case 0:case 11:case 15:Pr(8,p,s)}var g=p.child;if(g!==null)g.return=p,T=g;else for(;T!==null;){p=T;var m=p.sibling,w=p.return;if(Wf(p),p===u){T=null;break}if(m!==null){m.return=w,T=m;break}T=w}}}var _=s.alternate;if(_!==null){var k=_.child;if(k!==null){_.child=null;do{var R=k.sibling;k.sibling=null,k=R}while(k!==null)}}T=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,T=o;else e:for(;T!==null;){if(s=T,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Pr(9,s,s.return)}var f=s.sibling;if(f!==null){f.return=s.return,T=f;break e}T=s.return}}var c=e.current;for(T=c;T!==null;){o=T;var h=o.child;if(o.subtreeFlags&2064&&h!==null)h.return=o,T=h;else e:for(o=c;T!==null;){if(a=T,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:zs(9,a)}}catch(E){Z(a,a.return,E)}if(a===o){T=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,T=y;break e}T=a.return}}if(j=i,Zt(),rt&&typeof rt.onPostCommitFiberRoot=="function")try{rt.onPostCommitFiberRoot(Ps,e)}catch{}r=!0}return r}finally{F=n,ze.transition=t}}return!1}function cc(e,t,n){t=er(n,t),t=Df(e,t,1),e=$t(e,t,1),t=we(),e!==null&&(ni(e,1,t),Ne(e,t))}function Z(e,t,n){if(e.tag===3)cc(e,e,n);else for(;t!==null;){if(t.tag===3){cc(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(Ht===null||!Ht.has(r))){e=er(n,e),e=Lf(t,e,1),t=$t(t,e,1),e=we(),t!==null&&(ni(t,1,e),Ne(t,e));break}}t=t.return}}function bg(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=we(),e.pingedLanes|=e.suspendedLanes&n,le===e&&(ce&n)===n&&(oe===4||oe===3&&(ce&130023424)===ce&&500>re()-Cl?cn(e,0):Tl|=n),Ne(e,t)}function th(e,t){t===0&&(e.mode&1?(t=ki,ki<<=1,!(ki&130023424)&&(ki=4194304)):t=1);var n=we();e=wt(e,t),e!==null&&(ni(e,t,n),Ne(e,n))}function Pg(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),th(e,n)}function Ag(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(S(314))}r!==null&&r.delete(t),th(e,n)}var nh;nh=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Te.current)Ie=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return Ie=!1,wg(e,t,n);Ie=!!(e.flags&131072)}else Ie=!1,Y&&t.flags&1048576&&of(t,cs,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Vi(e,t),e=t.pendingProps;var i=qn(t,me.current);Vn(t,n),i=_l(null,t,r,e,i,n);var s=kl();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ce(r)?(s=!0,ls(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,ml(t),i.updater=js,t.stateNode=i,i._reactInternals=t,ga(t,r,e,n),t=wa(null,t,r,!0,s,n)):(t.tag=0,Y&&s&&ll(t),ve(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Vi(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Dg(r),e=He(r,e),i){case 0:t=ya(null,t,r,e,n);break e;case 1:t=ec(null,t,r,e,n);break e;case 11:t=Ju(null,t,r,e,n);break e;case 14:t=Zu(null,t,r,He(r.type,e),n);break e}throw Error(S(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:He(r,i),ya(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:He(r,i),ec(e,t,r,i,n);case 3:e:{if(zf(t),e===null)throw Error(S(387));r=t.pendingProps,s=t.memoizedState,i=s.element,ff(e,t),hs(t,r,null,n);var o=t.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=er(Error(S(423)),t),t=tc(e,t,r,n,i);break e}else if(r!==i){i=er(Error(S(424)),t),t=tc(e,t,r,n,i);break e}else for(Pe=Bt(t.stateNode.containerInfo.firstChild),Ae=t,Y=!0,We=null,n=cf(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Xn(),r===i){t=_t(e,t,n);break e}ve(e,t,r,n)}t=t.child}return t;case 5:return hf(t),e===null&&ha(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,o=i.children,la(r,i)?o=null:s!==null&&la(r,s)&&(t.flags|=32),jf(e,t),ve(e,t,o,n),t.child;case 6:return e===null&&ha(t),null;case 13:return Ff(e,t,n);case 4:return gl(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=Jn(t,null,r,n):ve(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:He(r,i),Ju(e,t,r,i,n);case 7:return ve(e,t,t.pendingProps,n),t.child;case 8:return ve(e,t,t.pendingProps.children,n),t.child;case 12:return ve(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,o=i.value,V(ds,r._currentValue),r._currentValue=o,s!==null)if(Xe(s.value,o)){if(s.children===i.children&&!Te.current){t=_t(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===r){if(s.tag===1){l=gt(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var p=u.pending;p===null?l.next=l:(l.next=p.next,p.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),pa(s.return,n,t),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===t.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(S(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),pa(o,n,t),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===t){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ve(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,Vn(t,n),i=Fe(i),r=r(i),t.flags|=1,ve(e,t,r,n),t.child;case 14:return r=t.type,i=He(r,t.pendingProps),i=He(r.type,i),Zu(e,t,r,i,n);case 15:return Uf(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:He(r,i),Vi(e,t),t.tag=1,Ce(r)?(e=!0,ls(t)):e=!1,Vn(t,n),Of(t,r,i),ga(t,r,i,n),wa(null,t,r,!0,e,n);case 19:return Bf(e,t,n);case 22:return Mf(e,t,n)}throw Error(S(156,t.tag))};function rh(e,t){return Rd(e,t)}function Og(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function je(e,t,n,r){return new Og(e,t,n,r)}function Pl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Dg(e){if(typeof e=="function")return Pl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===qa)return 11;if(e===Xa)return 14}return 2}function Wt(e,t){var n=e.alternate;return n===null?(n=je(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Ki(e,t,n,r,i,s){var o=2;if(r=e,typeof e=="function")Pl(e)&&(o=1);else if(typeof e=="string")o=5;else e:switch(e){case Rn:return dn(n.children,i,s,t);case Ya:o=8,i|=8;break;case Fo:return e=je(12,n,t,i|2),e.elementType=Fo,e.lanes=s,e;case Bo:return e=je(13,n,t,i),e.elementType=Bo,e.lanes=s,e;case $o:return e=je(19,n,t,i),e.elementType=$o,e.lanes=s,e;case fd:return Bs(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case cd:o=10;break e;case dd:o=9;break e;case qa:o=11;break e;case Xa:o=14;break e;case Nt:o=16,r=null;break e}throw Error(S(130,e==null?e:typeof e,""))}return t=je(o,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function dn(e,t,n,r){return e=je(7,e,r,t),e.lanes=n,e}function Bs(e,t,n,r){return e=je(22,e,r,t),e.elementType=fd,e.lanes=n,e.stateNode={isHidden:!1},e}function Io(e,t,n){return e=je(6,e,null,t),e.lanes=n,e}function To(e,t,n){return t=je(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Lg(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=so(0),this.expirationTimes=so(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=so(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Al(e,t,n,r,i,s,o,a,l){return e=new Lg(e,t,n,a,l),t===1?(t=1,s===!0&&(t|=8)):t=0,s=je(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},ml(s),e}function Ug(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Nn,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function ih(e){if(!e)return qt;e=e._reactInternals;e:{if(xn(e)!==e||e.tag!==1)throw Error(S(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ce(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(S(171))}if(e.tag===1){var n=e.type;if(Ce(n))return rf(e,n,t)}return t}function sh(e,t,n,r,i,s,o,a,l){return e=Al(n,r,!0,e,i,s,o,a,l),e.context=ih(null),n=e.current,r=we(),i=Vt(n),s=gt(r,i),s.callback=t??null,$t(n,s,i),e.current.lanes=i,ni(e,i,r),Ne(e,r),e}function $s(e,t,n,r){var i=t.current,s=we(),o=Vt(i);return n=ih(n),t.context===null?t.context=n:t.pendingContext=n,t=gt(s,o),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=$t(i,t,o),e!==null&&(Ye(e,i,o,s),Bi(e,i,o)),o}function ks(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function dc(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ol(e,t){dc(e,t),(e=e.alternate)&&dc(e,t)}function Mg(){return null}var oh=typeof reportError=="function"?reportError:function(e){console.error(e)};function Dl(e){this._internalRoot=e}Hs.prototype.render=Dl.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(S(409));$s(e,t,null,null)};Hs.prototype.unmount=Dl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;yn(function(){$s(null,e,null,null)}),t[yt]=null}};function Hs(e){this._internalRoot=e}Hs.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ud();e={blockedOn:null,target:e,priority:t};for(var n=0;n<bt.length&&t!==0&&t<bt[n].priority;n++);bt.splice(n,0,e),n===0&&jd(e)}};function Ll(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Vs(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function fc(){}function jg(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var u=ks(o);s.call(u)}}var o=sh(t,r,e,0,null,!1,!1,"",fc);return e._reactRootContainer=o,e[yt]=o.current,Vr(e.nodeType===8?e.parentNode:e),yn(),o}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var a=r;r=function(){var u=ks(l);a.call(u)}}var l=Al(e,0,!1,null,null,!1,!1,"",fc);return e._reactRootContainer=l,e[yt]=l.current,Vr(e.nodeType===8?e.parentNode:e),yn(function(){$s(t,l,n,r)}),l}function Ws(e,t,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var a=i;i=function(){var l=ks(o);a.call(l)}}$s(t,o,e,i)}else o=jg(n,t,e,i,r);return ks(o)}Dd=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=xr(t.pendingLanes);n!==0&&(el(t,n|1),Ne(t,re()),!(j&6)&&(tr=re()+500,Zt()))}break;case 13:yn(function(){var r=wt(e,1);if(r!==null){var i=we();Ye(r,e,1,i)}}),Ol(e,1)}};tl=function(e){if(e.tag===13){var t=wt(e,134217728);if(t!==null){var n=we();Ye(t,e,134217728,n)}Ol(e,134217728)}};Ld=function(e){if(e.tag===13){var t=Vt(e),n=wt(e,t);if(n!==null){var r=we();Ye(n,e,t,r)}Ol(e,t)}};Ud=function(){return F};Md=function(e,t){var n=F;try{return F=e,t()}finally{F=n}};Jo=function(e,t,n){switch(t){case"input":if(Wo(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=Ls(r);if(!i)throw Error(S(90));pd(r),Wo(r,i)}}}break;case"textarea":gd(e,n);break;case"select":t=n.value,t!=null&&Fn(e,!!n.multiple,t,!1)}};xd=Nl;Ed=yn;var zg={usingClientEntryPoint:!1,Events:[ii,On,Ls,kd,Sd,Nl]},wr={findFiberByHostInstance:on,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Fg={bundleType:wr.bundleType,version:wr.version,rendererPackageName:wr.rendererPackageName,rendererConfig:wr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Cd(e),e===null?null:e.stateNode},findFiberByHostInstance:wr.findFiberByHostInstance||Mg,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ai=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ai.isDisabled&&Ai.supportsFiber)try{Ps=Ai.inject(Fg),rt=Ai}catch{}}De.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=zg;De.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Ll(t))throw Error(S(200));return Ug(e,t,null,n)};De.createRoot=function(e,t){if(!Ll(e))throw Error(S(299));var n=!1,r="",i=oh;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Al(e,1,!1,null,null,n,!1,r,i),e[yt]=t.current,Vr(e.nodeType===8?e.parentNode:e),new Dl(t)};De.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(S(188)):(e=Object.keys(e).join(","),Error(S(268,e)));return e=Cd(t),e=e===null?null:e.stateNode,e};De.flushSync=function(e){return yn(e)};De.hydrate=function(e,t,n){if(!Vs(t))throw Error(S(200));return Ws(null,e,t,!0,n)};De.hydrateRoot=function(e,t,n){if(!Ll(e))throw Error(S(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=oh;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),t=sh(t,null,e,1,n??null,i,!1,s,o),e[yt]=t.current,Vr(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new Hs(t)};De.render=function(e,t,n){if(!Vs(t))throw Error(S(200));return Ws(null,e,t,!1,n)};De.unmountComponentAtNode=function(e){if(!Vs(e))throw Error(S(40));return e._reactRootContainer?(yn(function(){Ws(null,null,e,!1,function(){e._reactRootContainer=null,e[yt]=null})}),!0):!1};De.unstable_batchedUpdates=Nl;De.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Vs(n))throw Error(S(200));if(e==null||e._reactInternals===void 0)throw Error(S(38));return Ws(e,t,n,!1,r)};De.version="18.3.1-next-f1338f8080-20240426";function ah(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ah)}catch(e){console.error(e)}}ah(),od.exports=De;var Bg=od.exports,hc=Bg;jo.createRoot=hc.createRoot,jo.hydrateRoot=hc.hydrateRoot;const $g=()=>{};var pc={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lh=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},Hg=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=e[n++];t[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=e[n++],o=e[n++],a=e[n++],l=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(l>>10)),t[r++]=String.fromCharCode(56320+(l&1023))}else{const s=e[n++],o=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return t.join("")},uh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){const s=e[i],o=i+1<e.length,a=o?e[i+1]:0,l=i+2<e.length,u=l?e[i+2]:0,p=s>>2,g=(s&3)<<4|a>>4;let m=(a&15)<<2|u>>6,w=u&63;l||(w=64,o||(m=64)),r.push(n[p],n[g],n[m],n[w])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(lh(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):Hg(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){const s=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;const u=i<e.length?n[e.charAt(i)]:64;++i;const g=i<e.length?n[e.charAt(i)]:64;if(++i,s==null||a==null||u==null||g==null)throw new Vg;const m=s<<2|a>>4;if(r.push(m),u!==64){const w=a<<4&240|u>>2;if(r.push(w),g!==64){const _=u<<6&192|g;r.push(_)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class Vg extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Wg=function(e){const t=lh(e);return uh.encodeByteArray(t,!0)},Ss=function(e){return Wg(e).replace(/\./g,"")},ch=function(e){try{return uh.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gg(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kg=()=>Gg().__FIREBASE_DEFAULTS__,Qg=()=>{if(typeof process>"u"||typeof pc>"u")return;const e=pc.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},Yg=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&ch(e[1]);return t&&JSON.parse(t)},Ul=()=>{try{return $g()||Kg()||Qg()||Yg()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},dh=e=>{var t,n;return(n=(t=Ul())==null?void 0:t.emulatorHosts)==null?void 0:n[e]},qg=e=>{const t=dh(e);if(!t)return;const n=t.lastIndexOf(":");if(n<=0||n+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(n+1),10);return t[0]==="["?[t.substring(1,n-1),r]:[t.substring(0,n),r]},fh=()=>{var e;return(e=Ul())==null?void 0:e.config},hh=e=>{var t;return(t=Ul())==null?void 0:t[`_${e}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jg(e,t){if(e.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=t||"demo-project",i=e.iat||0,s=e.sub||e.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...e};return[Ss(JSON.stringify(n)),Ss(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _e(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Zg(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(_e())}function ev(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function tv(){const e=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof e=="object"&&e.id!==void 0}function nv(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function rv(){const e=_e();return e.indexOf("MSIE ")>=0||e.indexOf("Trident/")>=0}function iv(){try{return typeof indexedDB=="object"}catch{return!1}}function sv(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;t(((s=i.error)==null?void 0:s.message)||"")}}catch(n){t(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ov="FirebaseError";class Et extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=ov,Object.setPrototypeOf(this,Et.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,oi.prototype.create)}}class oi{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},i=`${this.service}/${t}`,s=this.errors[t],o=s?av(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Et(i,a,r)}}function av(e,t){return e.replace(lv,(n,r)=>{const i=t[r];return i!=null?String(i):`<${r}?>`})}const lv=/\{\$([^}]+)}/g;function uv(e){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t))return!1;return!0}function nr(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const i of n){if(!r.includes(i))return!1;const s=e[i],o=t[i];if(mc(s)&&mc(o)){if(!nr(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function mc(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ai(e){const t=[];for(const[n,r]of Object.entries(e))Array.isArray(r)?r.forEach(i=>{t.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):t.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return t.length?"&"+t.join("&"):""}function cv(e,t){const n=new dv(e,t);return n.subscribe.bind(n)}class dv{constructor(t,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{t(this)}).catch(r=>{this.error(r)})}next(t){this.forEachObserver(n=>{n.next(t)})}error(t){this.forEachObserver(n=>{n.error(t)}),this.close(t)}complete(){this.forEachObserver(t=>{t.complete()}),this.close()}subscribe(t,n,r){let i;if(t===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");fv(t,["next","error","complete"])?i=t:i={next:t,error:n,complete:r},i.next===void 0&&(i.next=Co),i.error===void 0&&(i.error=Co),i.complete===void 0&&(i.complete=Co);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(t){this.observers===void 0||this.observers[t]===void 0||(delete this.observers[t],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(t){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,t)}sendOne(t,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[t]!==void 0)try{n(this.observers[t])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(t){this.finalized||(this.finalized=!0,t!==void 0&&(this.finalError=t),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function fv(e,t){if(typeof e!="object"||e===null)return!1;for(const n of t)if(n in e&&typeof e[n]=="function")return!0;return!1}function Co(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Re(e){return e&&e._delegate?e._delegate:e}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function li(e){try{return(e.startsWith("http://")||e.startsWith("https://")?new URL(e).hostname:e).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ph(e){return(await fetch(e,{credentials:"include"})).ok}class wn{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hv{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new Xg;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){const n=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(mv(t))try{this.getOrInitializeService({instanceIdentifier:sn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(t=sn){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=sn){return this.instances.has(t)}getOptions(t=sn){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(t,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(t),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&t(s,r),()=>{i.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:pv(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=sn){return this.component?this.component.multipleInstances?t:sn:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function pv(e){return e===sn?void 0:e}function mv(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gv{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new hv(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var B;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(B||(B={}));const vv={debug:B.DEBUG,verbose:B.VERBOSE,info:B.INFO,warn:B.WARN,error:B.ERROR,silent:B.SILENT},yv=B.INFO,wv={[B.DEBUG]:"log",[B.VERBOSE]:"log",[B.INFO]:"info",[B.WARN]:"warn",[B.ERROR]:"error"},_v=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),i=wv[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class mh{constructor(t){this.name=t,this._logLevel=yv,this._logHandler=_v,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in B))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?vv[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,B.DEBUG,...t),this._logHandler(this,B.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,B.VERBOSE,...t),this._logHandler(this,B.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,B.INFO,...t),this._logHandler(this,B.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,B.WARN,...t),this._logHandler(this,B.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,B.ERROR,...t),this._logHandler(this,B.ERROR,...t)}}const kv=(e,t)=>t.some(n=>e instanceof n);let gc,vc;function Sv(){return gc||(gc=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xv(){return vc||(vc=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gh=new WeakMap,Pa=new WeakMap,vh=new WeakMap,No=new WeakMap,Ml=new WeakMap;function Ev(e){const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("success",s),e.removeEventListener("error",o)},s=()=>{n(Gt(e.result)),i()},o=()=>{r(e.error),i()};e.addEventListener("success",s),e.addEventListener("error",o)});return t.then(n=>{n instanceof IDBCursor&&gh.set(n,e)}).catch(()=>{}),Ml.set(t,e),t}function Iv(e){if(Pa.has(e))return;const t=new Promise((n,r)=>{const i=()=>{e.removeEventListener("complete",s),e.removeEventListener("error",o),e.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",s),e.addEventListener("error",o),e.addEventListener("abort",o)});Pa.set(e,t)}let Aa={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Pa.get(e);if(t==="objectStoreNames")return e.objectStoreNames||vh.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return Gt(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Tv(e){Aa=e(Aa)}function Cv(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(Ro(this),t,...n);return vh.set(r,t.sort?t.sort():[t]),Gt(r)}:xv().includes(e)?function(...t){return e.apply(Ro(this),t),Gt(gh.get(this))}:function(...t){return Gt(e.apply(Ro(this),t))}}function Nv(e){return typeof e=="function"?Cv(e):(e instanceof IDBTransaction&&Iv(e),kv(e,Sv())?new Proxy(e,Aa):e)}function Gt(e){if(e instanceof IDBRequest)return Ev(e);if(No.has(e))return No.get(e);const t=Nv(e);return t!==e&&(No.set(e,t),Ml.set(t,e)),t}const Ro=e=>Ml.get(e);function Rv(e,t,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(e,t),a=Gt(o);return r&&o.addEventListener("upgradeneeded",l=>{r(Gt(o.result),l.oldVersion,l.newVersion,Gt(o.transaction),l)}),n&&o.addEventListener("blocked",l=>n(l.oldVersion,l.newVersion,l)),a.then(l=>{s&&l.addEventListener("close",()=>s()),i&&l.addEventListener("versionchange",u=>i(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const bv=["get","getKey","getAll","getAllKeys","count"],Pv=["put","add","delete","clear"],bo=new Map;function yc(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(bo.get(t))return bo.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,i=Pv.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||bv.includes(n)))return;const s=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let u=l.store;return r&&(u=u.index(a.shift())),(await Promise.all([u[n](...a),i&&l.done]))[0]};return bo.set(t,s),s}Tv(e=>({...e,get:(t,n,r)=>yc(t,n)||e.get(t,n,r),has:(t,n)=>!!yc(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Ov(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Ov(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Oa="@firebase/app",wc="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt=new mh("@firebase/app"),Dv="@firebase/app-compat",Lv="@firebase/analytics-compat",Uv="@firebase/analytics",Mv="@firebase/app-check-compat",jv="@firebase/app-check",zv="@firebase/auth",Fv="@firebase/auth-compat",Bv="@firebase/database",$v="@firebase/data-connect",Hv="@firebase/database-compat",Vv="@firebase/functions",Wv="@firebase/functions-compat",Gv="@firebase/installations",Kv="@firebase/installations-compat",Qv="@firebase/messaging",Yv="@firebase/messaging-compat",qv="@firebase/performance",Xv="@firebase/performance-compat",Jv="@firebase/remote-config",Zv="@firebase/remote-config-compat",ey="@firebase/storage",ty="@firebase/storage-compat",ny="@firebase/firestore",ry="@firebase/ai",iy="@firebase/firestore-compat",sy="firebase",oy="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Da="[DEFAULT]",ay={[Oa]:"fire-core",[Dv]:"fire-core-compat",[Uv]:"fire-analytics",[Lv]:"fire-analytics-compat",[jv]:"fire-app-check",[Mv]:"fire-app-check-compat",[zv]:"fire-auth",[Fv]:"fire-auth-compat",[Bv]:"fire-rtdb",[$v]:"fire-data-connect",[Hv]:"fire-rtdb-compat",[Vv]:"fire-fn",[Wv]:"fire-fn-compat",[Gv]:"fire-iid",[Kv]:"fire-iid-compat",[Qv]:"fire-fcm",[Yv]:"fire-fcm-compat",[qv]:"fire-perf",[Xv]:"fire-perf-compat",[Jv]:"fire-rc",[Zv]:"fire-rc-compat",[ey]:"fire-gcs",[ty]:"fire-gcs-compat",[ny]:"fire-fst",[iy]:"fire-fst-compat",[ry]:"fire-vertex","fire-js":"fire-js",[sy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xs=new Map,ly=new Map,La=new Map;function _c(e,t){try{e.container.addComponent(t)}catch(n){kt.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function rr(e){const t=e.name;if(La.has(t))return kt.debug(`There were multiple attempts to register component ${t}.`),!1;La.set(t,e);for(const n of xs.values())_c(n,e);for(const n of ly.values())_c(n,e);return!0}function jl(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}function Ge(e){return e==null?!1:e.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Kt=new oi("app","Firebase",uy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cy{constructor(t,n,r){this._isDeleted=!1,this._options={...t},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new wn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Kt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lr=oy;function yh(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r={name:Da,automaticDataCollectionEnabled:!0,...t},i=r.name;if(typeof i!="string"||!i)throw Kt.create("bad-app-name",{appName:String(i)});if(n||(n=fh()),!n)throw Kt.create("no-options");const s=xs.get(i);if(s){if(nr(n,s.options)&&nr(r,s.config))return s;throw Kt.create("duplicate-app",{appName:i})}const o=new gv(i);for(const l of La.values())o.addComponent(l);const a=new cy(n,r,o);return xs.set(i,a),a}function wh(e=Da){const t=xs.get(e);if(!t&&e===Da&&fh())return yh();if(!t)throw Kt.create("no-app",{appName:e});return t}function Qt(e,t,n){let r=ay[e]??e;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=t.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${t}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${t}" contains illegal characters (whitespace or "/")`),kt.warn(o.join(" "));return}rr(new wn(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dy="firebase-heartbeat-database",fy=1,Zr="firebase-heartbeat-store";let Po=null;function _h(){return Po||(Po=Rv(dy,fy,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(Zr)}catch(n){console.warn(n)}}}}).catch(e=>{throw Kt.create("idb-open",{originalErrorMessage:e.message})})),Po}async function hy(e){try{const n=(await _h()).transaction(Zr),r=await n.objectStore(Zr).get(kh(e));return await n.done,r}catch(t){if(t instanceof Et)kt.warn(t.message);else{const n=Kt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});kt.warn(n.message)}}}async function kc(e,t){try{const r=(await _h()).transaction(Zr,"readwrite");await r.objectStore(Zr).put(t,kh(e)),await r.done}catch(n){if(n instanceof Et)kt.warn(n.message);else{const r=Kt.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});kt.warn(r.message)}}}function kh(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const py=1024,my=30;class gy{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new yy(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Sc();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>my){const o=wy(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){kt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Sc(),{heartbeatsToSend:r,unsentEntries:i}=vy(this._heartbeatsCache.heartbeats),s=Ss(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return kt.warn(n),""}}}function Sc(){return new Date().toISOString().substring(0,10)}function vy(e,t=py){const n=[];let r=e.slice();for(const i of e){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),xc(n)>t){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),xc(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class yy{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return iv()?sv().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await hy(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return kc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return kc(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function xc(e){return Ss(JSON.stringify({version:2,heartbeats:e})).length}function wy(e){if(e.length===0)return-1;let t=0,n=e[0].date;for(let r=1;r<e.length;r++)e[r].date<n&&(n=e[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _y(e){rr(new wn("platform-logger",t=>new Av(t),"PRIVATE")),rr(new wn("heartbeat",t=>new gy(t),"PRIVATE")),Qt(Oa,wc,e),Qt(Oa,wc,"esm2020"),Qt("fire-js","")}_y("");function Sh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const ky=Sh,xh=new oi("auth","Firebase",Sh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=new mh("@firebase/auth");function Sy(e,...t){Es.logLevel<=B.WARN&&Es.warn(`Auth (${lr}): ${e}`,...t)}function Qi(e,...t){Es.logLevel<=B.ERROR&&Es.error(`Auth (${lr}): ${e}`,...t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(e,...t){throw Fl(e,...t)}function qe(e,...t){return Fl(e,...t)}function zl(e,t,n){const r={...ky(),[t]:n};return new oi("auth","Firebase",r).create(t,{appName:e.name})}function fn(e){return zl(e,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function xy(e,t,n){const r=n;if(!(t instanceof r))throw r.name!==t.constructor.name&&ot(e,"argument-error"),zl(e,"argument-error",`Type of ${t.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Fl(e,...t){if(typeof e!="string"){const n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return xh.create(e,...t)}function P(e,t,...n){if(!e)throw Fl(t,...n)}function pt(e){const t="INTERNAL ASSERTION FAILED: "+e;throw Qi(t),new Error(t)}function St(e,t){e||pt(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ua(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.href)||""}function Ey(){return Ec()==="http:"||Ec()==="https:"}function Ec(){var e;return typeof self<"u"&&((e=self.location)==null?void 0:e.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Iy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ey()||tv()||"connection"in navigator)?navigator.onLine:!0}function Ty(){if(typeof navigator>"u")return null;const e=navigator;return e.languages&&e.languages[0]||e.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(t,n){this.shortDelay=t,this.longDelay=n,St(n>t,"Short delay should be less than long delay!"),this.isMobile=Zg()||nv()}get(){return Iy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bl(e,t){St(e.emulator,"Emulator should always be set here");const{url:n}=e.emulator;return t?`${n}${t.startsWith("/")?t.slice(1):t}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eh{static initialize(t,n,r){this.fetchImpl=t,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;pt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;pt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;pt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cy={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ny=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Ry=new ui(3e4,6e4);function $l(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function ur(e,t,n,r,i={}){return Ih(e,i,async()=>{let s={},o={};r&&(t==="GET"?o=r:s={body:JSON.stringify(r)});const a=ai({key:e.config.apiKey,...o}).slice(1),l=await e._getAdditionalHeaders();l["Content-Type"]="application/json",e.languageCode&&(l["X-Firebase-Locale"]=e.languageCode);const u={method:t,headers:l,...s};return ev()||(u.referrerPolicy="no-referrer"),e.emulatorConfig&&li(e.emulatorConfig.host)&&(u.credentials="include"),Eh.fetch()(await Th(e,e.config.apiHost,n,a),u)})}async function Ih(e,t,n){e._canInitEmulator=!1;const r={...Cy,...t};try{const i=new Py(e),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw Oi(e,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const a=s.ok?o.errorMessage:o.error.message,[l,u]=a.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Oi(e,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Oi(e,"email-already-in-use",o);if(l==="USER_DISABLED")throw Oi(e,"user-disabled",o);const p=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw zl(e,p,u);ot(e,p)}}catch(i){if(i instanceof Et)throw i;ot(e,"network-request-failed",{message:String(i)})}}async function by(e,t,n,r,i={}){const s=await ur(e,t,n,r,i);return"mfaPendingCredential"in s&&ot(e,"multi-factor-auth-required",{_serverResponse:s}),s}async function Th(e,t,n,r){const i=`${t}${n}?${r}`,s=e,o=s.config.emulator?Bl(e.config,i):`${e.config.apiScheme}://${i}`;return Ny.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class Py{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(t){this.auth=t,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(qe(this.auth,"network-request-failed")),Ry.get())})}}function Oi(e,t,n){const r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=qe(e,t,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ay(e,t){return ur(e,"POST","/v1/accounts:delete",t)}async function Is(e,t){return ur(e,"POST","/v1/accounts:lookup",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dr(e){if(e)try{const t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Oy(e,t=!1){const n=Re(e),r=await n.getIdToken(t),i=Hl(r);P(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Dr(Ao(i.auth_time)),issuedAtTime:Dr(Ao(i.iat)),expirationTime:Dr(Ao(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ao(e){return Number(e)*1e3}function Hl(e){const[t,n,r]=e.split(".");if(t===void 0||n===void 0||r===void 0)return Qi("JWT malformed, contained fewer than 3 sections"),null;try{const i=ch(n);return i?JSON.parse(i):(Qi("Failed to decode base64 JWT payload"),null)}catch(i){return Qi("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Ic(e){const t=Hl(e);return P(t,"internal-error"),P(typeof t.exp<"u","internal-error"),P(typeof t.iat<"u","internal-error"),Number(t.exp)-Number(t.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ei(e,t,n=!1){if(n)return t;try{return await t}catch(r){throw r instanceof Et&&Dy(r)&&e.auth.currentUser===e&&await e.auth.signOut(),r}}function Dy({code:e}){return e==="auth/user-disabled"||e==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ly{constructor(t){this.user=t,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(t){if(t){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(t=!1){if(!this.isRunning)return;const n=this.getInterval(t);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(t){(t==null?void 0:t.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(t,n){this.createdAt=t,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Dr(this.lastLoginAt),this.creationTime=Dr(this.createdAt)}_copy(t){this.createdAt=t.createdAt,this.lastLoginAt=t.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ts(e){var g;const t=e.auth,n=await e.getIdToken(),r=await ei(e,Is(t,{idToken:n}));P(r==null?void 0:r.users.length,t,"internal-error");const i=r.users[0];e._notifyReloadListener(i);const s=(g=i.providerUserInfo)!=null&&g.length?Ch(i.providerUserInfo):[],o=My(e.providerData,s),a=e.isAnonymous,l=!(e.email&&i.passwordHash)&&!(o!=null&&o.length),u=a?l:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Ma(i.createdAt,i.lastLoginAt),isAnonymous:u};Object.assign(e,p)}async function Uy(e){const t=Re(e);await Ts(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function My(e,t){return[...e.filter(r=>!t.some(i=>i.providerId===r.providerId)),...t]}function Ch(e){return e.map(({providerId:t,...n})=>({providerId:t,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jy(e,t){const n=await Ih(e,{},async()=>{const r=ai({grant_type:"refresh_token",refresh_token:t}).slice(1),{tokenApiHost:i,apiKey:s}=e.config,o=await Th(e,i,"/v1/token",`key=${s}`),a=await e._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:a,body:r};return e.emulatorConfig&&li(e.emulatorConfig.host)&&(l.credentials="include"),Eh.fetch()(o,l)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function zy(e,t){return ur(e,"POST","/v2/accounts:revokeToken",$l(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(t){P(t.idToken,"internal-error"),P(typeof t.idToken<"u","internal-error"),P(typeof t.refreshToken<"u","internal-error");const n="expiresIn"in t&&typeof t.expiresIn<"u"?Number(t.expiresIn):Ic(t.idToken);this.updateTokensAndExpiration(t.idToken,t.refreshToken,n)}updateFromIdToken(t){P(t.length!==0,"internal-error");const n=Ic(t);this.updateTokensAndExpiration(t,null,n)}async getToken(t,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(P(this.refreshToken,t,"user-token-expired"),this.refreshToken?(await this.refresh(t,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(t,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await jy(t,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(t,n,r){this.refreshToken=n||null,this.accessToken=t||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(t,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new Gn;return r&&(P(typeof r=="string","internal-error",{appName:t}),o.refreshToken=r),i&&(P(typeof i=="string","internal-error",{appName:t}),o.accessToken=i),s&&(P(typeof s=="number","internal-error",{appName:t}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(t){this.accessToken=t.accessToken,this.refreshToken=t.refreshToken,this.expirationTime=t.expirationTime}_clone(){return Object.assign(new Gn,this.toJSON())}_performRefresh(){return pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e,t){P(typeof e=="string"||typeof e>"u","internal-error",{appName:t})}class Ke{constructor({uid:t,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Ly(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Ma(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(t){const n=await ei(this,this.stsTokenManager.getToken(this.auth,t));return P(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(t){return Oy(this,t)}reload(){return Uy(this)}_assign(t){this!==t&&(P(this.uid===t.uid,this.auth,"internal-error"),this.displayName=t.displayName,this.photoURL=t.photoURL,this.email=t.email,this.emailVerified=t.emailVerified,this.phoneNumber=t.phoneNumber,this.isAnonymous=t.isAnonymous,this.tenantId=t.tenantId,this.providerData=t.providerData.map(n=>({...n})),this.metadata._copy(t.metadata),this.stsTokenManager._assign(t.stsTokenManager))}_clone(t){const n=new Ke({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(t){P(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=t,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(t){this.reloadListener?this.reloadListener(t):this.reloadUserInfo=t}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(t,n=!1){let r=!1;t.idToken&&t.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(t),r=!0),n&&await Ts(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ge(this.auth.app))return Promise.reject(fn(this.auth));const t=await this.getIdToken();return await ei(this,Ay(this.auth,{idToken:t})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(t=>({...t})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(t,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,a=n.tenantId??void 0,l=n._redirectEventId??void 0,u=n.createdAt??void 0,p=n.lastLoginAt??void 0,{uid:g,emailVerified:m,isAnonymous:w,providerData:_,stsTokenManager:k}=n;P(g&&k,t,"internal-error");const R=Gn.fromJSON(this.name,k);P(typeof g=="string",t,"internal-error"),Ct(r,t.name),Ct(i,t.name),P(typeof m=="boolean",t,"internal-error"),P(typeof w=="boolean",t,"internal-error"),Ct(s,t.name),Ct(o,t.name),Ct(a,t.name),Ct(l,t.name),Ct(u,t.name),Ct(p,t.name);const f=new Ke({uid:g,auth:t,email:i,emailVerified:m,displayName:r,isAnonymous:w,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:R,createdAt:u,lastLoginAt:p});return _&&Array.isArray(_)&&(f.providerData=_.map(c=>({...c}))),l&&(f._redirectEventId=l),f}static async _fromIdTokenResponse(t,n,r=!1){const i=new Gn;i.updateFromServerResponse(n);const s=new Ke({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await Ts(s),s}static async _fromGetAccountInfoResponse(t,n,r){const i=n.users[0];P(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?Ch(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),a=new Gn;a.updateFromIdToken(r);const l=new Ke({uid:i.localId,auth:t,stsTokenManager:a,isAnonymous:o}),u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Ma(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(l,u),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc=new Map;function mt(e){St(e instanceof Function,"Expected a class definition");let t=Tc.get(e);return t?(St(t instanceof e,"Instance stored in cache mismatched with class"),t):(t=new e,Tc.set(e,t),t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(t,n){this.storage[t]=n}async _get(t){const n=this.storage[t];return n===void 0?null:n}async _remove(t){delete this.storage[t]}_addListener(t,n){}_removeListener(t,n){}}Nh.type="NONE";const Cc=Nh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(e,t,n){return`firebase:${e}:${t}:${n}`}class Kn{constructor(t,n,r){this.persistence=t,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Yi(this.userKey,i.apiKey,s),this.fullPersistenceKey=Yi("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(t){return this.persistence._set(this.fullUserKey,t.toJSON())}async getCurrentUser(){const t=await this.persistence._get(this.fullUserKey);if(!t)return null;if(typeof t=="string"){const n=await Is(this.auth,{idToken:t}).catch(()=>{});return n?Ke._fromGetAccountInfoResponse(this.auth,n,t):null}return Ke._fromJSON(this.auth,t)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(t){if(this.persistence===t)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=t,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r="authUser"){if(!n.length)return new Kn(mt(Cc),t,r);const i=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let s=i[0]||mt(Cc);const o=Yi(r,t.config.apiKey,t.name);let a=null;for(const u of n)try{const p=await u._get(o);if(p){let g;if(typeof p=="string"){const m=await Is(t,{idToken:p}).catch(()=>{});if(!m)break;g=await Ke._fromGetAccountInfoResponse(t,m,p)}else g=Ke._fromJSON(t,p);u!==s&&(a=g),s=u;break}}catch{}const l=i.filter(u=>u._shouldAllowMigration);return!s._shouldAllowMigration||!l.length?new Kn(s,t,r):(s=l[0],a&&await s._set(o,a.toJSON()),await Promise.all(n.map(async u=>{if(u!==s)try{await u._remove(o)}catch{}})),new Kn(s,t,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nc(e){const t=e.toLowerCase();if(t.includes("opera/")||t.includes("opr/")||t.includes("opios/"))return"Opera";if(Ah(t))return"IEMobile";if(t.includes("msie")||t.includes("trident/"))return"IE";if(t.includes("edge/"))return"Edge";if(Rh(t))return"Firefox";if(t.includes("silk/"))return"Silk";if(Dh(t))return"Blackberry";if(Lh(t))return"Webos";if(bh(t))return"Safari";if((t.includes("chrome/")||Ph(t))&&!t.includes("edge/"))return"Chrome";if(Oh(t))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=e.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Rh(e=_e()){return/firefox\//i.test(e)}function bh(e=_e()){const t=e.toLowerCase();return t.includes("safari/")&&!t.includes("chrome/")&&!t.includes("crios/")&&!t.includes("android")}function Ph(e=_e()){return/crios\//i.test(e)}function Ah(e=_e()){return/iemobile/i.test(e)}function Oh(e=_e()){return/android/i.test(e)}function Dh(e=_e()){return/blackberry/i.test(e)}function Lh(e=_e()){return/webos/i.test(e)}function Vl(e=_e()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function Fy(e=_e()){var t;return Vl(e)&&!!((t=window.navigator)!=null&&t.standalone)}function By(){return rv()&&document.documentMode===10}function Uh(e=_e()){return Vl(e)||Oh(e)||Lh(e)||Dh(e)||/windows phone/i.test(e)||Ah(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mh(e,t=[]){let n;switch(e){case"Browser":n=Nc(_e());break;case"Worker":n=`${Nc(_e())}-${e}`;break;default:n=e}const r=t.length?t.join(","):"FirebaseCore-web";return`${n}/JsCore/${lr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $y{constructor(t){this.auth=t,this.queue=[]}pushCallback(t,n){const r=s=>new Promise((o,a)=>{try{const l=t(s);o(l)}catch(l){a(l)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(t){if(this.auth.currentUser===t)return;const n=[];try{for(const r of this.queue)await r(t),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Hy(e,t={}){return ur(e,"GET","/v2/passwordPolicy",$l(e,t))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=6;class Wy{constructor(t){var r;const n=t.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??Vy,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=t.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=t.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=t.forceUpgradeOnSignin??!1,this.schemaVersion=t.schemaVersion}validatePassword(t){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(t,n),this.validatePasswordCharacterOptions(t,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(t,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=t.length>=r),i&&(n.meetsMaxPasswordLength=t.length<=i)}validatePasswordCharacterOptions(t,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<t.length;i++)r=t.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(t,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(t.containsLowercaseLetter||(t.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(t.containsUppercaseLetter||(t.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(t.containsNumericCharacter||(t.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(t.containsNonAlphanumericCharacter||(t.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gy{constructor(t,n,r,i){this.app=t,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Rc(this),this.idTokenSubscription=new Rc(this),this.beforeStateQueue=new $y(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=xh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=t.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(t,n){return n&&(this._popupRedirectResolver=mt(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await Kn.create(this,t),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const t=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!t)){if(this.currentUser&&t&&this.currentUser.uid===t.uid){this._currentUser._assign(t),await this.currentUser.getIdToken();return}await this._updateCurrentUser(t,!0)}}async initializeCurrentUserFromIdToken(t){try{const n=await Is(this,{idToken:t}),r=await Ke._fromGetAccountInfoResponse(this,n,t);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(t){var s;if(Ge(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(t&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,a=r==null?void 0:r._redirectEventId,l=await this.tryRedirectSignIn(t);(!o||o===a)&&(l!=null&&l.user)&&(r=l.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return P(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(t){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,t,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(t){try{await Ts(t)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(t)}useDeviceLanguage(){this.languageCode=Ty()}async _delete(){this._deleted=!0}async updateCurrentUser(t){if(Ge(this.app))return Promise.reject(fn(this));const n=t?Re(t):null;return n&&P(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(t,n=!1){if(!this._deleted)return t&&P(this.tenantId===t.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(t),this.queue(async()=>{await this.directlySetCurrentUser(t),this.notifyAuthListeners()})}async signOut(){return Ge(this.app)?Promise.reject(fn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(t){return Ge(this.app)?Promise.reject(fn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(mt(t))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(t){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(t)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const t=await Hy(this),n=new Wy(t);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new oi("auth","Firebase",t())}onAuthStateChanged(t,n,r){return this.registerStateListener(this.authStateSubscription,t,n,r)}beforeAuthStateChanged(t,n){return this.beforeStateQueue.pushCallback(t,n)}onIdTokenChanged(t,n,r){return this.registerStateListener(this.idTokenSubscription,t,n,r)}authStateReady(){return new Promise((t,n)=>{if(this.currentUser)t();else{const r=this.onAuthStateChanged(()=>{r(),t()},n)}})}async revokeAccessToken(t){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:t,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await zy(this,r)}}toJSON(){var t;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(t=this._currentUser)==null?void 0:t.toJSON()}}async _setRedirectUser(t,n){const r=await this.getOrInitRedirectPersistenceManager(n);return t===null?r.removeCurrentUser():r.setCurrentUser(t)}async getOrInitRedirectPersistenceManager(t){if(!this.redirectPersistenceManager){const n=t&&mt(t)||this._popupRedirectResolver;P(n,this,"argument-error"),this.redirectPersistenceManager=await Kn.create(this,[mt(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(t){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===t?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===t?this.redirectUser:null}async _persistUserIfCurrent(t){if(t===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(t))}_notifyListenersIfCurrent(t){t===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const t=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==t&&(this.lastNotifiedUid=t,this.authStateSubscription.next(this.currentUser))}registerStateListener(t,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(P(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const l=t.addObserver(n,r,i);return()=>{o=!0,l()}}else{const l=t.addObserver(n);return()=>{o=!0,l()}}}async directlySetCurrentUser(t){this.currentUser&&this.currentUser!==t&&this._currentUser._stopProactiveRefresh(),t&&this.isProactiveRefreshEnabled&&t._startProactiveRefresh(),this.currentUser=t,t?await this.assertedPersistence.setCurrentUser(t):await this.assertedPersistence.removeCurrentUser()}queue(t){return this.operations=this.operations.then(t,t),this.operations}get assertedPersistence(){return P(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(t){!t||this.frameworks.includes(t)||(this.frameworks.push(t),this.frameworks.sort(),this.clientVersion=Mh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(t["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(t["X-Firebase-AppCheck"]=r),t}async _getAppCheckToken(){var n;if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return t!=null&&t.error&&Sy(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Gs(e){return Re(e)}class Rc{constructor(t){this.auth=t,this.observer=null,this.addObserver=cv(n=>this.observer=n)}get next(){return P(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wl={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ky(e){Wl=e}function Qy(e){return Wl.loadJS(e)}function Yy(){return Wl.gapiScript}function qy(e){return`__${e}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xy(e,t){const n=jl(e,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(nr(s,t??{}))return i;ot(i,"already-initialized")}return n.initialize({options:t})}function Jy(e,t){const n=(t==null?void 0:t.persistence)||[],r=(Array.isArray(n)?n:[n]).map(mt);t!=null&&t.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t==null?void 0:t.popupRedirectResolver)}function Zy(e,t,n){const r=Gs(e);P(/^https?:\/\//.test(t),r,"invalid-emulator-scheme");const i=!1,s=jh(t),{host:o,port:a}=e0(t),l=a===null?"":`:${a}`,u={url:`${s}//${o}${l}/`},p=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){P(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),P(nr(u,r.config.emulator)&&nr(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=u,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,li(o)?ph(`${s}//${o}${l}`):t0()}function jh(e){const t=e.indexOf(":");return t<0?"":e.substr(0,t+1)}function e0(e){const t=jh(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:bc(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:bc(o)}}}function bc(e){if(!e)return null;const t=Number(e);return isNaN(t)?null:t}function t0(){function e(){const t=document.createElement("p"),n=t.style;t.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",t.classList.add("firebase-emulator-warning"),document.body.appendChild(t)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",e):e())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zh{constructor(t,n){this.providerId=t,this.signInMethod=n}toJSON(){return pt("not implemented")}_getIdTokenResponse(t){return pt("not implemented")}_linkToIdToken(t,n){return pt("not implemented")}_getReauthenticationResolver(t){return pt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qn(e,t){return by(e,"POST","/v1/accounts:signInWithIdp",$l(e,t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const n0="http://localhost";class _n extends zh{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){const n=new _n(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):ot("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){const n=typeof t=="string"?JSON.parse(t):t,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new _n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(t){const n=this.buildRequest();return Qn(t,n)}_linkToIdToken(t,n){const r=this.buildRequest();return r.idToken=n,Qn(t,r)}_getReauthenticationResolver(t){const n=this.buildRequest();return n.autoCreate=!1,Qn(t,n)}buildRequest(){const t={requestUri:n0,returnSecureToken:!0};if(this.pendingToken)t.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),t.postBody=ai(n)}return t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gl{constructor(t){this.providerId=t,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(t){this.defaultLanguageCode=t}setCustomParameters(t){return this.customParameters=t,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci extends Gl{constructor(){super(...arguments),this.scopes=[]}addScope(t){return this.scopes.includes(t)||this.scopes.push(t),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At extends ci{constructor(){super("facebook.com")}static credential(t){return _n._fromParams({providerId:At.PROVIDER_ID,signInMethod:At.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return At.credentialFromTaggedObject(t)}static credentialFromError(t){return At.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return At.credential(t.oauthAccessToken)}catch{return null}}}At.FACEBOOK_SIGN_IN_METHOD="facebook.com";At.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt extends ci{constructor(){super("google.com"),this.addScope("profile")}static credential(t,n){return _n._fromParams({providerId:dt.PROVIDER_ID,signInMethod:dt.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return dt.credentialFromTaggedObject(t)}static credentialFromError(t){return dt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return dt.credential(n,r)}catch{return null}}}dt.GOOGLE_SIGN_IN_METHOD="google.com";dt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ot extends ci{constructor(){super("github.com")}static credential(t){return _n._fromParams({providerId:Ot.PROVIDER_ID,signInMethod:Ot.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return Ot.credentialFromTaggedObject(t)}static credentialFromError(t){return Ot.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!("oauthAccessToken"in t)||!t.oauthAccessToken)return null;try{return Ot.credential(t.oauthAccessToken)}catch{return null}}}Ot.GITHUB_SIGN_IN_METHOD="github.com";Ot.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt extends ci{constructor(){super("twitter.com")}static credential(t,n){return _n._fromParams({providerId:Dt.PROVIDER_ID,signInMethod:Dt.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return Dt.credentialFromTaggedObject(t)}static credentialFromError(t){return Dt.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return Dt.credential(n,r)}catch{return null}}}Dt.TWITTER_SIGN_IN_METHOD="twitter.com";Dt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(t){this.user=t.user,this.providerId=t.providerId,this._tokenResponse=t._tokenResponse,this.operationType=t.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){const s=await Ke._fromIdTokenResponse(t,r,i),o=Pc(r);return new ir({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);const i=Pc(r);return new ir({user:t,providerId:i,_tokenResponse:r,operationType:n})}}function Pc(e){return e.providerId?e.providerId:"phoneNumber"in e?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs extends Et{constructor(t,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Cs.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new Cs(t,n,r,i)}}function Fh(e,t,n,r){return(t==="reauthenticate"?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Cs._fromErrorAndOperation(e,s,t,r):s})}async function r0(e,t,n=!1){const r=await ei(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return ir._forOperation(e,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function i0(e,t,n=!1){const{auth:r}=e;if(Ge(r.app))return Promise.reject(fn(r));const i="reauthenticate";try{const s=await ei(e,Fh(r,i,t,e),n);P(s.idToken,r,"internal-error");const o=Hl(s.idToken);P(o,r,"internal-error");const{sub:a}=o;return P(e.uid===a,r,"user-mismatch"),ir._forOperation(e,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&ot(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function s0(e,t,n=!1){if(Ge(e.app))return Promise.reject(fn(e));const r="signIn",i=await Fh(e,r,t),s=await ir._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(s.user),s}function o0(e,t,n,r){return Re(e).onIdTokenChanged(t,n,r)}function a0(e,t,n){return Re(e).beforeAuthStateChanged(t,n)}function l0(e,t,n,r){return Re(e).onAuthStateChanged(t,n,r)}function u0(e){return Re(e).signOut()}const Ns="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bh{constructor(t,n){this.storageRetriever=t,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Ns,"1"),this.storage.removeItem(Ns),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(t,n){return this.storage.setItem(t,JSON.stringify(n)),Promise.resolve()}_get(t){const n=this.storage.getItem(t);return Promise.resolve(n?JSON.parse(n):null)}_remove(t){return this.storage.removeItem(t),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const c0=1e3,d0=10;class $h extends Bh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(t,n)=>this.onStorageEvent(t,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Uh(),this._shouldAllowMigration=!0}forAllChangedKeys(t){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&t(n,i,r)}}onStorageEvent(t,n=!1){if(!t.key){this.forAllChangedKeys((o,a,l)=>{this.notifyListeners(o,l)});return}const r=t.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);By()&&s!==t.newValue&&t.newValue!==t.oldValue?setTimeout(i,d0):i()}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((t,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:t,oldValue:n,newValue:r}),!0)})},c0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(t,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[t]||(this.listeners[t]=new Set,this.localCache[t]=this.storage.getItem(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(t,n){await super._set(t,n),this.localCache[t]=JSON.stringify(n)}async _get(t){const n=await super._get(t);return this.localCache[t]=JSON.stringify(n),n}async _remove(t){await super._remove(t),delete this.localCache[t]}}$h.type="LOCAL";const f0=$h;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hh extends Bh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(t,n){}_removeListener(t,n){}}Hh.type="SESSION";const Vh=Hh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h0(e){return Promise.all(e.map(async t=>{try{return{fulfilled:!0,value:await t}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ks{constructor(t){this.eventTarget=t,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){const n=this.receivers.find(i=>i.isListeningto(t));if(n)return n;const r=new Ks(t);return this.receivers.push(r),r}isListeningto(t){return this.eventTarget===t}async handleEvent(t){const n=t,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const a=Array.from(o).map(async u=>u(n.origin,s)),l=await h0(a);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:l})}_subscribe(t,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[t]||(this.handlersMap[t]=new Set),this.handlersMap[t].add(n)}_unsubscribe(t,n){this.handlersMap[t]&&n&&this.handlersMap[t].delete(n),(!n||this.handlersMap[t].size===0)&&delete this.handlersMap[t],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ks.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kl(e="",t=10){let n="";for(let r=0;r<t;r++)n+=Math.floor(Math.random()*10);return e+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class p0{constructor(t){this.target=t,this.handlers=new Set}removeMessageHandler(t){t.messageChannel&&(t.messageChannel.port1.removeEventListener("message",t.onMessage),t.messageChannel.port1.close()),this.handlers.delete(t)}async _send(t,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,l)=>{const u=Kl("",20);i.port1.start();const p=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(g){const m=g;if(m.data.eventId===u)switch(m.data.status){case"ack":clearTimeout(p),s=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(m.data.response);break;default:clearTimeout(p),clearTimeout(s),l(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:t,eventId:u,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(){return window}function m0(e){st().location.href=e}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wh(){return typeof st().WorkerGlobalScope<"u"&&typeof st().importScripts=="function"}async function g0(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function v0(){var e;return((e=navigator==null?void 0:navigator.serviceWorker)==null?void 0:e.controller)||null}function y0(){return Wh()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh="firebaseLocalStorageDb",w0=1,Rs="firebaseLocalStorage",Kh="fbase_key";class di{constructor(t){this.request=t}toPromise(){return new Promise((t,n)=>{this.request.addEventListener("success",()=>{t(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Qs(e,t){return e.transaction([Rs],t?"readwrite":"readonly").objectStore(Rs)}function _0(){const e=indexedDB.deleteDatabase(Gh);return new di(e).toPromise()}function ja(){const e=indexedDB.open(Gh,w0);return new Promise((t,n)=>{e.addEventListener("error",()=>{n(e.error)}),e.addEventListener("upgradeneeded",()=>{const r=e.result;try{r.createObjectStore(Rs,{keyPath:Kh})}catch(i){n(i)}}),e.addEventListener("success",async()=>{const r=e.result;r.objectStoreNames.contains(Rs)?t(r):(r.close(),await _0(),t(await ja()))})})}async function Ac(e,t,n){const r=Qs(e,!0).put({[Kh]:t,value:n});return new di(r).toPromise()}async function k0(e,t){const n=Qs(e,!1).get(t),r=await new di(n).toPromise();return r===void 0?null:r.value}function Oc(e,t){const n=Qs(e,!0).delete(t);return new di(n).toPromise()}const S0=800,x0=3;class Qh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ja(),this.db)}async _withRetries(t){let n=0;for(;;)try{const r=await this._openDb();return await t(r)}catch(r){if(n++>x0)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Wh()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ks._getInstance(y0()),this.receiver._subscribe("keyChanged",async(t,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(t,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await g0(),!this.activeServiceWorker)return;this.sender=new p0(this.activeServiceWorker);const t=await this.sender._send("ping",{},800);t&&(n=t[0])!=null&&n.fulfilled&&(r=t[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(t){if(!(!this.sender||!this.activeServiceWorker||v0()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:t},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const t=await ja();return await Ac(t,Ns,"1"),await Oc(t,Ns),!0}catch{}return!1}async _withPendingWrite(t){this.pendingWrites++;try{await t()}finally{this.pendingWrites--}}async _set(t,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ac(r,t,n)),this.localCache[t]=n,this.notifyServiceWorker(t)))}async _get(t){const n=await this._withRetries(r=>k0(r,t));return this.localCache[t]=n,n}async _remove(t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Oc(n,t)),delete this.localCache[t],this.notifyServiceWorker(t)))}async _poll(){const t=await this._withRetries(i=>{const s=Qs(i,!1).getAll();return new di(s).toPromise()});if(!t)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(t.length!==0)for(const{fbase_key:i,value:s}of t)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(t,n){this.localCache[t]=n;const r=this.listeners[t];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),S0)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(t,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[t]||(this.listeners[t]=new Set,this._get(t)),this.listeners[t].add(n)}_removeListener(t,n){this.listeners[t]&&(this.listeners[t].delete(n),this.listeners[t].size===0&&delete this.listeners[t]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Qh.type="LOCAL";const E0=Qh;new ui(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yh(e,t){return t?mt(t):(P(e._popupRedirectResolver,e,"argument-error"),e._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ql extends zh{constructor(t){super("custom","custom"),this.params=t}_getIdTokenResponse(t){return Qn(t,this._buildIdpRequest())}_linkToIdToken(t,n){return Qn(t,this._buildIdpRequest(n))}_getReauthenticationResolver(t){return Qn(t,this._buildIdpRequest())}_buildIdpRequest(t){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return t&&(n.idToken=t),n}}function I0(e){return s0(e.auth,new Ql(e),e.bypassAuthState)}function T0(e){const{auth:t,user:n}=e;return P(n,t,"internal-error"),i0(n,new Ql(e),e.bypassAuthState)}async function C0(e){const{auth:t,user:n}=e;return P(n,t,"internal-error"),r0(n,new Ql(e),e.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qh{constructor(t,n,r,i,s=!1){this.auth=t,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(t,n)=>{this.pendingPromise={resolve:t,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(t){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=t;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(l))}catch(u){this.reject(u)}}onError(t){this.reject(t)}getIdpTask(t){switch(t){case"signInViaPopup":case"signInViaRedirect":return I0;case"linkViaPopup":case"linkViaRedirect":return C0;case"reauthViaPopup":case"reauthViaRedirect":return T0;default:ot(this.auth,"internal-error")}}resolve(t){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(t),this.unregisterAndCleanUp()}reject(t){St(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(t),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N0=new ui(2e3,1e4);async function R0(e,t,n){if(Ge(e.app))return Promise.reject(qe(e,"operation-not-supported-in-this-environment"));const r=Gs(e);xy(e,t,Gl);const i=Yh(r,n);return new un(r,"signInViaPopup",t,i).executeNotNull()}class un extends qh{constructor(t,n,r,i,s){super(t,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,un.currentPopupAction&&un.currentPopupAction.cancel(),un.currentPopupAction=this}async executeNotNull(){const t=await this.execute();return P(t,this.auth,"internal-error"),t}async onExecution(){St(this.filter.length===1,"Popup operations only handle one event");const t=Kl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],t),this.authWindow.associatedEvent=t,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(qe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var t;return((t=this.authWindow)==null?void 0:t.associatedEvent)||null}cancel(){this.reject(qe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,un.currentPopupAction=null}pollUserCancellation(){const t=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(qe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(t,N0.get())};t()}}un.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0="pendingRedirect",qi=new Map;class P0 extends qh{constructor(t,n,r=!1){super(t,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let t=qi.get(this.auth._key());if(!t){try{const r=await A0(this.resolver,this.auth)?await super.execute():null;t=()=>Promise.resolve(r)}catch(n){t=()=>Promise.reject(n)}qi.set(this.auth._key(),t)}return this.bypassAuthState||qi.set(this.auth._key(),()=>Promise.resolve(null)),t()}async onAuthEvent(t){if(t.type==="signInViaRedirect")return super.onAuthEvent(t);if(t.type==="unknown"){this.resolve(null);return}if(t.eventId){const n=await this.auth._redirectUserForId(t.eventId);if(n)return this.user=n,super.onAuthEvent(t);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function A0(e,t){const n=L0(t),r=D0(e);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function O0(e,t){qi.set(e._key(),t)}function D0(e){return mt(e._redirectPersistence)}function L0(e){return Yi(b0,e.config.apiKey,e.name)}async function U0(e,t,n=!1){if(Ge(e.app))return Promise.reject(fn(e));const r=Gs(e),i=Yh(r,t),o=await new P0(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,t)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M0=10*60*1e3;class j0{constructor(t){this.auth=t,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(t){this.consumers.add(t),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,t)&&(this.sendToConsumer(this.queuedRedirectEvent,t),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(t){this.consumers.delete(t)}onEvent(t){if(this.hasEventBeenHandled(t))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(t,r)&&(n=!0,this.sendToConsumer(t,r),this.saveEventToCache(t))}),this.hasHandledPotentialRedirect||!z0(t)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=t,n=!0)),n}sendToConsumer(t,n){var r;if(t.error&&!Xh(t)){const i=((r=t.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(qe(this.auth,i))}else n.onAuthEvent(t)}isEventForConsumer(t,n){const r=n.eventId===null||!!t.eventId&&t.eventId===n.eventId;return n.filter.includes(t.type)&&r}hasEventBeenHandled(t){return Date.now()-this.lastProcessedEventTime>=M0&&this.cachedEventUids.clear(),this.cachedEventUids.has(Dc(t))}saveEventToCache(t){this.cachedEventUids.add(Dc(t)),this.lastProcessedEventTime=Date.now()}}function Dc(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(t=>t).join("-")}function Xh({type:e,error:t}){return e==="unknown"&&(t==null?void 0:t.code)==="auth/no-auth-event"}function z0(e){switch(e.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Xh(e);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function F0(e,t={}){return ur(e,"GET","/v1/projects",t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const B0=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,$0=/^https?/;async function H0(e){if(e.config.emulator)return;const{authorizedDomains:t}=await F0(e);for(const n of t)try{if(V0(n))return}catch{}ot(e,"unauthorized-domain")}function V0(e){const t=Ua(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith("chrome-extension://")){const o=new URL(e);return o.hostname===""&&r===""?n==="chrome-extension:"&&e.replace("chrome-extension://","")===t.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!$0.test(n))return!1;if(B0.test(e))return r===e;const i=e.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0=new ui(3e4,6e4);function Lc(){const e=st().___jsl;if(e!=null&&e.H){for(const t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let n=0;n<e.CP.length;n++)e.CP[n]=null}}function G0(e){return new Promise((t,n)=>{var i,s,o;function r(){Lc(),gapi.load("gapi.iframes",{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{Lc(),n(qe(e,"network-request-failed"))},timeout:W0.get()})}if((s=(i=st().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)t(gapi.iframes.getContext());else if((o=st().gapi)!=null&&o.load)r();else{const a=qy("iframefcb");return st()[a]=()=>{gapi.load?r():n(qe(e,"network-request-failed"))},Qy(`${Yy()}?onload=${a}`).catch(l=>n(l))}}).catch(t=>{throw Xi=null,t})}let Xi=null;function K0(e){return Xi=Xi||G0(e),Xi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q0=new ui(5e3,15e3),Y0="__/auth/iframe",q0="emulator/auth/iframe",X0={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},J0=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Z0(e){const t=e.config;P(t.authDomain,e,"auth-domain-config-required");const n=t.emulator?Bl(t,q0):`https://${e.config.authDomain}/${Y0}`,r={apiKey:t.apiKey,appName:e.name,v:lr},i=J0.get(e.config.apiHost);i&&(r.eid=i);const s=e._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${ai(r).slice(1)}`}async function ew(e){const t=await K0(e),n=st().gapi;return P(n,e,"internal-error"),t.open({where:document.body,url:Z0(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:X0,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=qe(e,"network-request-failed"),a=st().setTimeout(()=>{s(o)},Q0.get());function l(){st().clearTimeout(a),i(r)}r.ping(l).then(l,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tw={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},nw=500,rw=600,iw="_blank",sw="http://localhost";class Uc{constructor(t){this.window=t,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ow(e,t,n,r=nw,i=rw){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let a="";const l={...tw,width:r.toString(),height:i.toString(),top:s,left:o},u=_e().toLowerCase();n&&(a=Ph(u)?iw:n),Rh(u)&&(t=t||sw,l.scrollbars="yes");const p=Object.entries(l).reduce((m,[w,_])=>`${m}${w}=${_},`,"");if(Fy(u)&&a!=="_self")return aw(t||"",a),new Uc(null);const g=window.open(t||"",a,p);P(g,e,"popup-blocked");try{g.focus()}catch{}return new Uc(g)}function aw(e,t){const n=document.createElement("a");n.href=e,n.target=t;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lw="__/auth/handler",uw="emulator/auth/handler",cw=encodeURIComponent("fac");async function Mc(e,t,n,r,i,s){P(e.config.authDomain,e,"auth-domain-config-required"),P(e.config.apiKey,e,"invalid-api-key");const o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:lr,eventId:i};if(t instanceof Gl){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||"",uv(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(const[p,g]of Object.entries({}))o[p]=g}if(t instanceof ci){const p=t.getScopes().filter(g=>g!=="");p.length>0&&(o.scopes=p.join(","))}e.tenantId&&(o.tid=e.tenantId);const a=o;for(const p of Object.keys(a))a[p]===void 0&&delete a[p];const l=await e._getAppCheckToken(),u=l?`#${cw}=${encodeURIComponent(l)}`:"";return`${dw(e)}?${ai(a).slice(1)}${u}`}function dw({config:e}){return e.emulator?Bl(e,uw):`https://${e.authDomain}/${lw}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo="webStorageSupport";class fw{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Vh,this._completeRedirectFn=U0,this._overrideRedirectResult=O0}async _openPopup(t,n,r,i){var o;St((o=this.eventManagers[t._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await Mc(t,n,r,Ua(),i);return ow(t,s,Kl())}async _openRedirect(t,n,r,i){await this._originValidation(t);const s=await Mc(t,n,r,Ua(),i);return m0(s),new Promise(()=>{})}_initialize(t){const n=t._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(St(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(t);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(t){const n=await ew(t),r=new j0(t);return n.register("authEvent",i=>(P(i==null?void 0:i.authEvent,t,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[t._key()]={manager:r},this.iframes[t._key()]=n,r}_isIframeWebStorageSupported(t,n){this.iframes[t._key()].send(Oo,{type:Oo},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Oo];s!==void 0&&n(!!s),ot(t,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(t){const n=t._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=H0(t)),this.originValidationPromises[n]}get _shouldInitProactively(){return Uh()||bh()||Vl()}}const hw=fw;var jc="@firebase/auth",zc="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{constructor(t){this.auth=t,this.internalListeners=new Map}getUid(){var t;return this.assertAuthConfigured(),((t=this.auth.currentUser)==null?void 0:t.uid)||null}async getToken(t){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(t)}:null}addAuthTokenListener(t){if(this.assertAuthConfigured(),this.internalListeners.has(t))return;const n=this.auth.onIdTokenChanged(r=>{t((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(t,n),this.updateProactiveRefresh()}removeAuthTokenListener(t){this.assertAuthConfigured();const n=this.internalListeners.get(t);n&&(this.internalListeners.delete(t),n(),this.updateProactiveRefresh())}assertAuthConfigured(){P(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mw(e){switch(e){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function gw(e){rr(new wn("auth",(t,{options:n})=>{const r=t.getProvider("app").getImmediate(),i=t.getProvider("heartbeat"),s=t.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;P(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:a,clientPlatform:e,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Mh(e)},u=new Gy(r,i,s,l);return Jy(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((t,n,r)=>{t.getProvider("auth-internal").initialize()})),rr(new wn("auth-internal",t=>{const n=Gs(t.getProvider("auth").getImmediate());return(r=>new pw(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),Qt(jc,zc,mw(e)),Qt(jc,zc,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vw=5*60,yw=hh("authIdTokenMaxAge")||vw;let Fc=null;const ww=e=>async t=>{const n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>yw)return;const i=n==null?void 0:n.token;Fc!==i&&(Fc=i,await fetch(e,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function _w(e=wh()){const t=jl(e,"auth");if(t.isInitialized())return t.getImmediate();const n=Xy(e,{popupRedirectResolver:hw,persistence:[E0,f0,Vh]}),r=hh("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=ww(s.toString());a0(n,o,()=>o(n.currentUser)),o0(n,a=>o(a))}}const i=dh("auth");return i&&Zy(n,`http://${i}`),n}function kw(){var e;return((e=document.getElementsByTagName("head"))==null?void 0:e[0])??document}Ky({loadJS(e){return new Promise((t,n)=>{const r=document.createElement("script");r.setAttribute("src",e),r.onload=t,r.onerror=i=>{const s=qe("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",kw().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});gw("Browser");var Sw="firebase",xw="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Qt(Sw,xw,"app");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jh="firebasestorage.googleapis.com",Zh="storageBucket",Ew=2*60*1e3,Iw=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class te extends Et{constructor(t,n,r=0){super(Do(t),`Firebase Storage: ${n} (${Do(t)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,te.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Do(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ee;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ee||(ee={}));function Do(e){return"storage/"+e}function Yl(){const e="An unknown error occurred, please check the error payload for server response.";return new te(ee.UNKNOWN,e)}function Tw(e){return new te(ee.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function Cw(e){return new te(ee.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Nw(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new te(ee.UNAUTHENTICATED,e)}function Rw(){return new te(ee.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function bw(e){return new te(ee.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function Pw(){return new te(ee.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Aw(){return new te(ee.CANCELED,"User canceled the upload/download.")}function Ow(e){return new te(ee.INVALID_URL,"Invalid URL '"+e+"'.")}function Dw(e){return new te(ee.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Lw(){return new te(ee.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Zh+"' property when initializing the app?")}function Uw(){return new te(ee.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Mw(){return new te(ee.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function jw(e){return new te(ee.UNSUPPORTED_ENVIRONMENT,`${e} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function za(e){return new te(ee.INVALID_ARGUMENT,e)}function ep(){return new te(ee.APP_DELETED,"The Firebase app was deleted.")}function zw(e){return new te(ee.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Lr(e,t){return new te(ee.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function _r(e){throw new te(ee.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let r;try{r=ye.makeFromUrl(t,n)}catch{return new ye(t,"")}if(r.path==="")return r;throw Dw(t)}static makeFromUrl(t,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(y){y.path.charAt(y.path.length-1)==="/"&&(y.path_=y.path_.slice(0,-1))}const o="(/(.*))?$",a=new RegExp("^gs://"+i+o,"i"),l={bucket:1,path:3};function u(y){y.path_=decodeURIComponent(y.path)}const p="v[A-Za-z0-9_]+",g=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",w=new RegExp(`^https?://${g}/${p}/b/${i}/o${m}`,"i"),_={bucket:1,path:3},k=n===Jh?"(?:storage.googleapis.com|storage.cloud.google.com)":n,R="([^?#]*)",f=new RegExp(`^https?://${k}/${i}/${R}`,"i"),h=[{regex:a,indices:l,postModify:s},{regex:w,indices:_,postModify:u},{regex:f,indices:{bucket:1,path:2},postModify:u}];for(let y=0;y<h.length;y++){const E=h[y],I=E.regex.exec(t);if(I){const C=I[E.indices.bucket];let N=I[E.indices.path];N||(N=""),r=new ye(C,N),E.postModify(r);break}}if(r==null)throw Ow(t);return r}}class Fw{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bw(e,t,n){let r=1,i=null,s=null,o=!1,a=0;function l(){return a===2}let u=!1;function p(...R){u||(u=!0,t.apply(null,R))}function g(R){i=setTimeout(()=>{i=null,e(w,l())},R)}function m(){s&&clearTimeout(s)}function w(R,...f){if(u){m();return}if(R){m(),p.call(null,R,...f);return}if(l()||o){m(),p.call(null,R,...f);return}r<64&&(r*=2);let h;a===1?(a=2,h=0):h=(r+Math.random())*1e3,g(h)}let _=!1;function k(R){_||(_=!0,m(),!u&&(i!==null?(R||(a=2),clearTimeout(i),g(0)):R||(a=1)))}return g(0),s=setTimeout(()=>{o=!0,k(!0)},n),k}function $w(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hw(e){return e!==void 0}function Vw(e){return typeof e=="object"&&!Array.isArray(e)}function ql(e){return typeof e=="string"||e instanceof String}function Bc(e){return Xl()&&e instanceof Blob}function Xl(){return typeof Blob<"u"}function Fa(e,t,n,r){if(r<t)throw za(`Invalid value for '${e}'. Expected ${t} or greater.`);if(r>n)throw za(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fi(e,t,n){let r=t;return n==null&&(r=`https://${t}`),`${n}://${r}/v0${e}`}function tp(e){const t=encodeURIComponent;let n="?";for(const r in e)if(e.hasOwnProperty(r)){const i=t(r)+"="+t(e[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var hn;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(hn||(hn={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ww(e,t){const n=e>=500&&e<600,i=[408,429].indexOf(e)!==-1,s=t.indexOf(e)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(t,n,r,i,s,o,a,l,u,p,g,m=!0,w=!1){this.url_=t,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=a,this.errorCallback_=l,this.timeout_=u,this.progressCallback_=p,this.connectionFactory_=g,this.retry=m,this.isUsingEmulator=w,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((_,k)=>{this.resolve_=_,this.reject_=k,this.start_()})}start_(){const t=(r,i)=>{if(i){r(!1,new Di(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=a=>{const l=a.loaded,u=a.lengthComputable?a.total:-1;this.progressCallback_!==null&&this.progressCallback_(l,u)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const a=s.getErrorCode()===hn.NO_ERROR,l=s.getStatus();if(!a||Ww(l,this.additionalRetryCodes_)&&this.retry){const p=s.getErrorCode()===hn.ABORT;r(!1,new Di(!1,null,p));return}const u=this.successCodes_.indexOf(l)!==-1;r(!0,new Di(u,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,a=i.connection;if(i.wasSuccessCode)try{const l=this.callback_(a,a.getResponse());Hw(l)?s(l):s()}catch(l){o(l)}else if(a!==null){const l=Yl();l.serverResponse=a.getErrorText(),this.errorCallback_?o(this.errorCallback_(a,l)):o(l)}else if(i.canceled){const l=this.appDelete_?ep():Aw();o(l)}else{const l=Pw();o(l)}};this.canceled_?n(!1,new Di(!1,null,!0)):this.backoffId_=Bw(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&$w(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Di{constructor(t,n,r){this.wasSuccessCode=t,this.connection=n,this.canceled=!!r}}function Kw(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function Qw(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Yw(e,t){t&&(e["X-Firebase-GMPID"]=t)}function qw(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function Xw(e,t,n,r,i,s,o=!0,a=!1){const l=tp(e.urlParams),u=e.url+l,p=Object.assign({},e.headers);return Yw(p,t),Kw(p,n),Qw(p,s),qw(p,r),new Gw(u,e.method,p,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,o,a)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jw(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Zw(...e){const t=Jw();if(t!==void 0){const n=new t;for(let r=0;r<e.length;r++)n.append(e[r]);return n.getBlob()}else{if(Xl())return new Blob(e);throw new te(ee.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function e_(e,t,n){return e.webkitSlice?e.webkitSlice(t,n):e.mozSlice?e.mozSlice(t,n):e.slice?e.slice(t,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function t_(e){if(typeof atob>"u")throw jw("base-64");return atob(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Lo{constructor(t,n){this.data=t,this.contentType=n||null}}function n_(e,t){switch(e){case nt.RAW:return new Lo(np(t));case nt.BASE64:case nt.BASE64URL:return new Lo(rp(e,t));case nt.DATA_URL:return new Lo(i_(t),s_(t))}throw Yl()}function np(e){const t=[];for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(r<=127)t.push(r);else if(r<=2047)t.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<e.length-1&&(e.charCodeAt(n+1)&64512)===56320))t.push(239,191,189);else{const s=r,o=e.charCodeAt(++n);r=65536|(s&1023)<<10|o&1023,t.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?t.push(239,191,189):t.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(t)}function r_(e){let t;try{t=decodeURIComponent(e)}catch{throw Lr(nt.DATA_URL,"Malformed data URL.")}return np(t)}function rp(e,t){switch(e){case nt.BASE64:{const i=t.indexOf("-")!==-1,s=t.indexOf("_")!==-1;if(i||s)throw Lr(e,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case nt.BASE64URL:{const i=t.indexOf("+")!==-1,s=t.indexOf("/")!==-1;if(i||s)throw Lr(e,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=t_(t)}catch(i){throw i.message.includes("polyfill")?i:Lr(e,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class ip{constructor(t){this.base64=!1,this.contentType=null;const n=t.match(/^data:([^,]+)?,/);if(n===null)throw Lr(nt.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=o_(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=t.substring(t.indexOf(",")+1)}}function i_(e){const t=new ip(e);return t.base64?rp(nt.BASE64,t.rest):r_(t.rest)}function s_(e){return new ip(e).contentType}function o_(e,t){return e.length>=t.length?e.substring(e.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,n){let r=0,i="";Bc(t)?(this.data_=t,r=t.size,i=t.type):t instanceof ArrayBuffer?(n?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(n?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(t,n){if(Bc(this.data_)){const r=this.data_,i=e_(r,t,n);return i===null?null:new Lt(i)}else{const r=new Uint8Array(this.data_.buffer,t,n-t);return new Lt(r,!0)}}static getBlob(...t){if(Xl()){const n=t.map(r=>r instanceof Lt?r.data_:r);return new Lt(Zw.apply(null,n))}else{const n=t.map(o=>ql(o)?n_(nt.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return n.forEach(o=>{for(let a=0;a<o.length;a++)i[s++]=o[a]}),new Lt(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jl(e){let t;try{t=JSON.parse(e)}catch{return null}return Vw(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a_(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function l_(e,t){const n=t.split("/").filter(r=>r.length>0).join("/");return e.length===0?n:e+"/"+n}function sp(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u_(e,t){return t}class ge{constructor(t,n,r,i){this.server=t,this.local=n||t,this.writable=!!r,this.xform=i||u_}}let Li=null;function c_(e){return!ql(e)||e.length<2?e:sp(e)}function op(){if(Li)return Li;const e=[];e.push(new ge("bucket")),e.push(new ge("generation")),e.push(new ge("metageneration")),e.push(new ge("name","fullPath",!0));function t(s,o){return c_(o)}const n=new ge("name");n.xform=t,e.push(n);function r(s,o){return o!==void 0?Number(o):o}const i=new ge("size");return i.xform=r,e.push(i),e.push(new ge("timeCreated")),e.push(new ge("updated")),e.push(new ge("md5Hash",null,!0)),e.push(new ge("cacheControl",null,!0)),e.push(new ge("contentDisposition",null,!0)),e.push(new ge("contentEncoding",null,!0)),e.push(new ge("contentLanguage",null,!0)),e.push(new ge("contentType",null,!0)),e.push(new ge("metadata","customMetadata",!0)),Li=e,Li}function d_(e,t){function n(){const r=e.bucket,i=e.fullPath,s=new ye(r,i);return t._makeStorageReference(s)}Object.defineProperty(e,"ref",{get:n})}function f_(e,t,n){const r={};r.type="file";const i=n.length;for(let s=0;s<i;s++){const o=n[s];r[o.local]=o.xform(r,t[o.server])}return d_(r,e),r}function ap(e,t,n){const r=Jl(t);return r===null?null:f_(e,r,n)}function h_(e,t,n,r){const i=Jl(t);if(i===null||!ql(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(u=>{const p=e.bucket,g=e.fullPath,m="/b/"+o(p)+"/o/"+o(g),w=fi(m,n,r),_=tp({alt:"media",token:u});return w+_})[0]}function p_(e,t){const n={},r=t.length;for(let i=0;i<r;i++){const s=t[i];s.writable&&(n[s.server]=e[s.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c="prefixes",Hc="items";function m_(e,t,n){const r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[$c])for(const i of n[$c]){const s=i.replace(/\/$/,""),o=e._makeStorageReference(new ye(t,s));r.prefixes.push(o)}if(n[Hc])for(const i of n[Hc]){const s=e._makeStorageReference(new ye(t,i.name));r.items.push(s)}return r}function g_(e,t,n){const r=Jl(n);return r===null?null:m_(e,t,r)}class Ys{constructor(t,n,r,i){this.url=t,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(e){if(!e)throw Yl()}function v_(e,t){function n(r,i){const s=ap(e,i,t);return Zl(s!==null),s}return n}function y_(e,t){function n(r,i){const s=g_(e,t,i);return Zl(s!==null),s}return n}function w_(e,t){function n(r,i){const s=ap(e,i,t);return Zl(s!==null),h_(s,i,e.host,e._protocol)}return n}function eu(e){function t(n,r){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=Rw():i=Nw():n.getStatus()===402?i=Cw(e.bucket):n.getStatus()===403?i=bw(e.path):i=r,i.status=n.getStatus(),i.serverResponse=r.serverResponse,i}return t}function lp(e){const t=eu(e);function n(r,i){let s=t(r,i);return r.getStatus()===404&&(s=Tw(e.path)),s.serverResponse=i.serverResponse,s}return n}function __(e,t,n,r,i){const s={};t.isRoot?s.prefix="":s.prefix=t.path+"/",n.length>0&&(s.delimiter=n),r&&(s.pageToken=r),i&&(s.maxResults=i);const o=t.bucketOnlyServerUrl(),a=fi(o,e.host,e._protocol),l="GET",u=e.maxOperationRetryTime,p=new Ys(a,l,y_(e,t.bucket),u);return p.urlParams=s,p.errorHandler=eu(t),p}function k_(e,t,n){const r=t.fullServerUrl(),i=fi(r,e.host,e._protocol),s="GET",o=e.maxOperationRetryTime,a=new Ys(i,s,w_(e,n),o);return a.errorHandler=lp(t),a}function S_(e,t){const n=t.fullServerUrl(),r=fi(n,e.host,e._protocol),i="DELETE",s=e.maxOperationRetryTime;function o(l,u){}const a=new Ys(r,i,o,s);return a.successCodes=[200,204],a.errorHandler=lp(t),a}function x_(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}function E_(e,t,n){const r=Object.assign({},n);return r.fullPath=e.path,r.size=t.size(),r.contentType||(r.contentType=x_(null,t)),r}function I_(e,t,n,r,i){const s=t.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function a(){let h="";for(let y=0;y<2;y++)h=h+Math.random().toString().slice(2);return h}const l=a();o["Content-Type"]="multipart/related; boundary="+l;const u=E_(t,r,i),p=p_(u,n),g="--"+l+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+p+`\r
--`+l+`\r
Content-Type: `+u.contentType+`\r
\r
`,m=`\r
--`+l+"--",w=Lt.getBlob(g,r,m);if(w===null)throw Uw();const _={name:u.fullPath},k=fi(s,e.host,e._protocol),R="POST",f=e.maxUploadRetryTime,c=new Ys(k,R,v_(e,n),f);return c.urlParams=_,c.headers=o,c.body=w.uploadData(),c.errorHandler=eu(t),c}class T_{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=hn.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=hn.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=hn.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,r,i,s){if(this.sent_)throw _r("cannot .send() more than once");if(li(t)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw _r("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw _r("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw _r("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw _r("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class C_ extends T_{initXhr(){this.xhr_.responseType="text"}}function qs(){return new C_}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kn{constructor(t,n){this._service=t,n instanceof ye?this._location=n:this._location=ye.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new kn(t,n)}get root(){const t=new ye(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return sp(this._location.path)}get storage(){return this._service}get parent(){const t=a_(this._location.path);if(t===null)return null;const n=new ye(this._location.bucket,t);return new kn(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw zw(t)}}function N_(e,t,n){e._throwIfRoot("uploadBytes");const r=I_(e.storage,e._location,op(),new Lt(t,!0),n);return e.storage.makeRequestWithTokens(r,qs).then(i=>({metadata:i,ref:e}))}function R_(e){const t={prefixes:[],items:[]};return up(e,t).then(()=>t)}async function up(e,t,n){const i=await b_(e,{pageToken:n});t.prefixes.push(...i.prefixes),t.items.push(...i.items),i.nextPageToken!=null&&await up(e,t,i.nextPageToken)}function b_(e,t){t!=null&&typeof t.maxResults=="number"&&Fa("options.maxResults",1,1e3,t.maxResults);const n=t||{},r=__(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(r,qs)}function P_(e){e._throwIfRoot("getDownloadURL");const t=k_(e.storage,e._location,op());return e.storage.makeRequestWithTokens(t,qs).then(n=>{if(n===null)throw Mw();return n})}function A_(e){e._throwIfRoot("deleteObject");const t=S_(e.storage,e._location);return e.storage.makeRequestWithTokens(t,qs)}function O_(e,t){const n=l_(e._location.path,t),r=new ye(e._location.bucket,n);return new kn(e.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D_(e){return/^[A-Za-z]+:\/\//.test(e)}function L_(e,t){return new kn(e,t)}function cp(e,t){if(e instanceof tu){const n=e;if(n._bucket==null)throw Lw();const r=new kn(n,n._bucket);return t!=null?cp(r,t):r}else return t!==void 0?O_(e,t):e}function U_(e,t){if(t&&D_(t)){if(e instanceof tu)return L_(e,t);throw za("To use ref(service, url), the first argument must be a Storage instance.")}else return cp(e,t)}function Vc(e,t){const n=t==null?void 0:t[Zh];return n==null?null:ye.makeFromBucketSpec(n,e)}function M_(e,t,n,r={}){e.host=`${t}:${n}`;const i=li(t);i&&ph(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(e._overrideAuthToken=typeof s=="string"?s:Jg(s,e.app.options.projectId))}class tu{constructor(t,n,r,i,s,o=!1){this.app=t,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=Jh,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Ew,this._maxUploadRetryTime=Iw,this._requests=new Set,i!=null?this._bucket=ye.makeFromBucketSpec(i,this._host):this._bucket=Vc(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=ye.makeFromBucketSpec(this._url,t):this._bucket=Vc(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Fa("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Fa("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(Ge(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new kn(this,t)}_makeRequest(t,n,r,i,s=!0){if(this._deleted)return new Fw(ep());{const o=Xw(t,this._appId,r,i,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(t,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,r,i).getPromise()}}const Wc="@firebase/storage",Gc="0.14.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dp="storage";function j_(e,t,n){return e=Re(e),N_(e,t,n)}function z_(e){return e=Re(e),R_(e)}function Kc(e){return e=Re(e),P_(e)}function F_(e){return e=Re(e),A_(e)}function Uo(e,t){return e=Re(e),U_(e,t)}function B_(e=wh(),t){e=Re(e);const r=jl(e,dp).getImmediate({identifier:t}),i=qg("storage");return i&&$_(r,...i),r}function $_(e,t,n,r={}){M_(e,t,n,r)}function H_(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),r=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new tu(n,r,i,t,lr)}function V_(){rr(new wn(dp,H_,"PUBLIC").setMultipleInstances(!0)),Qt(Wc,Gc,""),Qt(Wc,Gc,"esm2020")}V_();const W_={apiKey:"YOUR_API_KEY",authDomain:"YOUR_AUTH_DOMAIN",projectId:"YOUR_PROJECT_ID",storageBucket:"YOUR_STORAGE_BUCKET",messagingSenderId:"YOUR_MESSAGING_SENDER_ID",appId:"YOUR_APP_ID"},fp=yh(W_),Ba=_w(fp),Mo=B_(fp),G_=new dt,K_="@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');",Qc=`
${K_}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;--s3:#21262d;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --green:#3fb950;--green-dim:rgba(63,185,80,.12);
  --red:#f85149;--red-dim:rgba(248,81,73,.12);
  --amber:#e3b341;--amber-dim:rgba(227,179,65,.12);
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
  --r:10px;--rl:14px;
  --sh:0 1px 3px rgba(0,0,0,.4),0 4px 16px rgba(0,0,0,.3);
  --shl:0 8px 32px rgba(0,0,0,.5);
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans)}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:var(--b2);border-radius:3px}
input,textarea{font-family:var(--sans);font-size:13px;background:var(--bg);color:var(--text);border:1px solid var(--b1);border-radius:var(--r);padding:9px 12px;width:100%;outline:none;transition:border-color .18s,box-shadow .18s}
input:focus,textarea:focus{border-color:var(--blue);box-shadow:0 0 0 3px var(--blue-dim)}
input::placeholder,textarea::placeholder{color:var(--t4)}
textarea{resize:vertical;min-height:72px;line-height:1.6}
button{cursor:pointer;font-family:var(--sans)}

.shell{display:flex;flex-direction:column;min-height:100vh;max-width:1200px;margin:0 auto;padding:0 20px 40px}

.topbar{display:flex;align-items:center;gap:14px;padding:16px 0;border-bottom:1px solid var(--b1);position:sticky;top:0;z-index:20;background:var(--bg)}
.tb-logo{width:36px;height:36px;border-radius:9px;background:linear-gradient(135deg,#2f81f7,#1a6fd4);display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 2px 8px rgba(47,129,247,.4);flex-shrink:0}
.tb-name{font-size:17px;font-weight:700;letter-spacing:-.3px}
.tb-sub{font-size:11px;color:var(--t3);font-family:var(--mono);margin-top:1px}
.tb-st{margin-left:auto;display:flex;align-items:center;gap:7px;font-size:11px;font-family:var(--mono);color:var(--t3)}
.pip{width:6px;height:6px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green)}
.pip.busy{background:var(--amber);box-shadow:0 0 6px var(--amber);animation:pp 1s infinite}
.pip.err{background:var(--red);box-shadow:0 0 6px var(--red)}
@keyframes pp{0%,100%{opacity:1}50%{opacity:.4}}

.mg{display:grid;grid-template-columns:310px 1fr;gap:20px;margin-top:20px;align-items:start}
@media(max-width:780px){.mg{grid-template-columns:1fr}}

.sb{display:flex;flex-direction:column;gap:14px;position:sticky;top:72px}

.tabs{display:flex;background:var(--bg);border:1px solid var(--b1);border-radius:9px;padding:3px;gap:2px}
.tab{flex:1;padding:7px 10px;border-radius:6px;border:none;background:none;font-size:12px;font-weight:500;color:var(--t3);transition:all .18s}
.tab.on{background:var(--s2);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.3)}
.tab:hover:not(.on){color:var(--t2)}

.panel{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);overflow:hidden}
.ph{padding:12px 16px;border-bottom:1px solid var(--b1);display:flex;align-items:center;justify-content:space-between}
.pt{font-size:11px;font-weight:600;letter-spacing:.8px;text-transform:uppercase;color:var(--t3)}
.pbadge{font-size:10px;font-family:var(--mono);padding:2px 8px;border-radius:20px;background:var(--blue-dim);color:var(--blue);border:1px solid var(--blue-glow)}
.pbadge.ok{background:var(--green-dim);color:var(--green);border-color:rgba(63,185,80,.3)}
.pbadge.err{background:var(--red-dim);color:var(--red);border-color:rgba(248,81,73,.3)}
.pb{padding:14px;display:flex;flex-direction:column;gap:10px}

.fl{display:flex;flex-direction:column;gap:5px}
.flb{font-size:11px;font-weight:500;color:var(--t3);letter-spacing:.3px}
.flh{font-size:10px;color:var(--t4);font-family:var(--mono);margin-top:2px}

/* SERVER CONFIG */
.srv-row{display:flex;gap:8px;align-items:flex-end}
.srv-row input{flex:1}
.test-btn{padding:9px 14px;border-radius:var(--r);border:1px solid var(--b2);background:var(--s3);color:var(--t2);font-size:12px;font-family:var(--mono);white-space:nowrap;transition:all .18s;flex-shrink:0}
.test-btn:hover{border-color:var(--blue);color:var(--blue)}
.test-btn:disabled{opacity:.4;cursor:not-allowed}
.srv-note{font-size:10px;font-family:var(--mono);color:var(--t4);line-height:1.6;padding:9px 11px;background:var(--bg);border:1px solid var(--b1);border-radius:8px}
.srv-note b{color:var(--amber)}
.srv-note a{color:var(--blue)}
.srv-st{display:flex;align-items:center;gap:6px;font-size:11px;font-family:var(--mono);padding:8px 11px;border-radius:8px;border:1px solid}
.srv-st.ok{background:var(--green-dim);border-color:rgba(63,185,80,.3);color:var(--green)}
.srv-st.err{background:var(--red-dim);border-color:rgba(248,81,73,.3);color:var(--red)}
.srv-st.chk{background:var(--amber-dim);border-color:rgba(227,179,65,.25);color:var(--amber)}

.dz{border:1.5px dashed var(--b2);border-radius:var(--r);padding:16px;text-align:center;cursor:pointer;transition:all .2s;background:var(--bg)}
.dz:hover,.dz.ov{border-color:var(--blue);background:var(--blue-dim)}
.dz-ico{font-size:22px;margin-bottom:4px;opacity:.7}
.dz-txt{font-size:11px;color:var(--t3);font-family:var(--mono);line-height:1.5}
.dz-txt em{color:var(--blue);font-style:normal}

.fchip{display:flex;align-items:center;gap:8px;background:var(--s2);border:1px solid var(--b1);border-radius:8px;padding:7px 10px}
.fchip-ico{font-size:15px;flex-shrink:0}
.fchip-nm{flex:1;font-size:11px;font-family:var(--mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--t2)}
.fchip-sz{font-size:10px;color:var(--t4);font-family:var(--mono);flex-shrink:0}
.fchip-rm{background:none;border:none;color:var(--t4);font-size:16px;line-height:1;padding:0 2px;transition:color .15s;flex-shrink:0}
.fchip-rm:hover{color:var(--red)}

.rw{display:flex;flex-direction:column;gap:12px}
.rr{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);overflow:hidden;transition:border-color .2s,box-shadow .2s}
.rr.st-active{border-color:var(--blue);box-shadow:0 0 0 1px var(--blue-dim)}
.rr.st-done{border-color:rgba(63,185,80,.35);box-shadow:0 0 0 1px var(--green-dim)}
.rr.st-sent{border-color:rgba(63,185,80,.55);box-shadow:0 0 0 1px var(--green-dim)}
.rr.st-error{border-color:rgba(248,81,73,.35)}
.rr.st-sending{border-color:var(--amber);box-shadow:0 0 0 1px var(--amber-dim)}
.rt{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--b1);background:var(--s2)}
.rnum{width:22px;height:22px;border-radius:6px;background:var(--s3);display:flex;align-items:center;justify-content:center;font-size:11px;font-family:var(--mono);color:var(--t3);flex-shrink:0}
.rnum.a{background:var(--blue-dim);color:var(--blue)}
.rnum.d{background:var(--green-dim);color:var(--green)}
.rnum.s{background:var(--amber-dim);color:var(--amber)}
.reml{flex:1;font-size:12px;color:var(--t2);font-family:var(--mono);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.reml.empty{color:var(--t4)}
.rst{font-size:10px;font-family:var(--mono);padding:3px 8px;border-radius:20px;flex-shrink:0;display:flex;align-items:center;gap:4px}
.rst.idle{background:var(--s3);color:var(--t4)}
.rst.active{background:var(--blue-dim);color:var(--blue)}
.rst.done{background:var(--green-dim);color:var(--green)}
.rst.sending{background:var(--amber-dim);color:var(--amber)}
.rst.sent{background:var(--green-dim);color:var(--green)}
.rst.error{background:var(--red-dim);color:var(--red)}
.rrm{background:none;border:none;color:var(--t4);font-size:18px;line-height:1;padding:0 2px;margin-left:2px;transition:color .15s}
.rrm:hover{color:var(--red)}
.rfs{padding:12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:9px}
.rfs .ff{grid-column:1/-1}
.rfoot{padding:9px 14px;border-top:1px solid var(--b1);background:var(--s2);display:flex;align-items:center;gap:7px;flex-wrap:wrap}

.sb-btn{padding:5px 11px;border-radius:6px;border:1px solid;font-size:11px;font-family:var(--mono);transition:all .18s;display:flex;align-items:center;gap:5px}
.sbprev{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbprev:hover{color:var(--text)}
.sbsend{border-color:rgba(63,185,80,.4);background:var(--green-dim);color:var(--green);font-weight:600}
.sbsend:hover:not(:disabled){background:rgba(63,185,80,.22);border-color:var(--green)}
.sbsend:disabled{opacity:.4;cursor:not-allowed}
.sbgmail{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbgmail:hover{border-color:var(--blue);color:var(--blue)}
.sbcopy{border-color:var(--b2);background:var(--s3);color:var(--t2)}
.sbcopy:hover{color:var(--text)}

.add-r{padding:12px;border:1.5px dashed var(--b2);border-radius:var(--rl);background:none;color:var(--t3);font-size:12px;font-family:var(--mono);transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px;width:100%}
.add-r:hover{border-color:var(--blue);color:var(--blue);background:var(--blue-dim)}

.abar{background:var(--s1);border:1px solid var(--b1);border-radius:var(--rl);padding:14px 16px;display:flex;align-items:center;gap:12px}
.pw{flex:1;display:flex;flex-direction:column;gap:6px}
.plbl{font-size:11px;font-family:var(--mono);color:var(--t3);display:flex;align-items:center;gap:6px}
.ptrk{height:4px;background:var(--b1);border-radius:99px;overflow:hidden}
.pfil{height:100%;background:linear-gradient(90deg,var(--blue),#58a6ff);border-radius:99px;transition:width .4s ease}
.pfil.done{background:var(--green)}

.lbtn{padding:11px 26px;background:var(--blue);border:none;border-radius:var(--r);font-family:var(--sans);font-size:14px;font-weight:600;color:#fff;transition:all .2s;display:flex;align-items:center;gap:8px;flex-shrink:0;box-shadow:0 2px 8px rgba(47,129,247,.3)}
.lbtn:hover:not(:disabled){background:#388bfd;box-shadow:0 4px 16px rgba(47,129,247,.45);transform:translateY(-1px)}
.lbtn:disabled{opacity:.4;cursor:not-allowed;transform:none;box-shadow:none}
.rbtn{padding:11px 14px;background:var(--s2);border:1px solid var(--b1);border-radius:var(--r);font-family:var(--sans);font-size:12px;color:var(--t3);transition:all .2s;flex-shrink:0}
.rbtn:hover{color:var(--text);border-color:var(--b2)}

.savebtn{width:100%;padding:10px;background:var(--s2);border:1px solid var(--b1);border-radius:var(--r);font-family:var(--sans);font-size:13px;font-weight:600;color:var(--text);transition:all .2s;display:flex;align-items:center;justify-content:center;gap:7px}
.savebtn:hover{background:var(--s3);border-color:var(--b2)}

.mbg{position:fixed;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:100;backdrop-filter:blur(4px);animation:fin .15s ease}
@keyframes fin{from{opacity:0}to{opacity:1}}
.modal{background:var(--s1);border:1px solid var(--b2);border-radius:16px;width:min(640px,96vw);max-height:90vh;display:flex;flex-direction:column;box-shadow:var(--shl);animation:sup .18s ease}
@keyframes sup{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.mhd{padding:16px 20px;border-bottom:1px solid var(--b1);display:flex;align-items:flex-start;gap:12px}
.mico{width:36px;height:36px;border-radius:9px;background:var(--blue-dim);border:1px solid var(--blue-glow);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.mto{font-size:11px;font-family:var(--mono);color:var(--t3)}
.mto span{color:var(--blue)}
.msub{font-size:15px;font-weight:600;margin-top:2px;letter-spacing:-.2px}
.mcls{margin-left:auto;background:none;border:none;color:var(--t3);font-size:22px;line-height:1;padding:0 4px;transition:color .15s}
.mcls:hover{color:var(--text)}
.mbdy{padding:20px;overflow-y:auto;flex:1;font-size:13px;line-height:1.75;color:var(--t2);white-space:pre-wrap;font-family:var(--mono)}
.mftr{padding:12px 20px;border-top:1px solid var(--b1);display:flex;align-items:center;gap:8px;background:var(--s2)}
.msnd{padding:9px 20px;background:var(--green);border:none;border-radius:8px;font-family:var(--sans);font-size:13px;font-weight:600;color:#000;transition:all .2s;display:flex;align-items:center;gap:6px}
.msnd:hover:not(:disabled){background:#4ade80;box-shadow:0 4px 16px rgba(63,185,80,.35)}
.msnd:disabled{opacity:.4;cursor:not-allowed}

.toast{position:fixed;bottom:24px;right:24px;z-index:200;background:var(--s2);border:1px solid var(--b2);border-radius:10px;padding:11px 15px;font-size:12px;font-family:var(--mono);box-shadow:var(--shl);display:flex;align-items:center;gap:9px;animation:tin .2s ease;max-width:300px}
@keyframes tin{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.toast.ok{border-color:rgba(63,185,80,.4);color:var(--green)}
.toast.err{border-color:rgba(248,81,73,.4);color:var(--red)}
.toast.inf{border-color:var(--blue-glow);color:var(--blue)}

.spin{display:inline-block;animation:sp .8s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.tc::after{content:'▌';animation:bl .7s step-end infinite;margin-left:1px}
@keyframes bl{0%,100%{opacity:1}50%{opacity:0}}
.slbl{font-size:11px;font-weight:600;letter-spacing:.5px;color:var(--t3);text-transform:uppercase;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.slbl::after{content:'';flex:1;height:1px;background:var(--b1)}
`,Q_=e=>e<1048576?(e/1024).toFixed(1)+" KB":(e/1048576).toFixed(1)+" MB",Y_=e=>{const t=e.split(".").pop().toLowerCase();return t==="pdf"?"📄":["doc","docx"].includes(t)?"📝":["jpg","jpeg","png","gif","webp"].includes(t)?"🖼️":"📎"};let q_=10;function X_({user:e,onSignOut:t}){var iu;const[n,r]=H.useState({name:"",replyTo:"",about:""}),[i,s]=H.useState("http://localhost:3001"),[o,a]=H.useState("idle"),[l,u]=H.useState([]),[p,g]=H.useState(!1),[m,w]=H.useState(!1),[_,k]=H.useState([{id:1,email:"",jobTitle:"",company:"",note:"",status:"idle",statusMsg:"",subject:"",body:""}]),[R,f]=H.useState(!1),[c,h]=H.useState(0),[y,E]=H.useState(""),[I,C]=H.useState(null),[N,K]=H.useState(null),[D,xe]=H.useState("profile"),[en,It]=H.useState(!1),[hi,Xs]=H.useState(!1),En=H.useRef(),In=H.useRef();H.useEffect(()=>{(async()=>{try{const v=await window.storage.get("hr_profile");v&&r(JSON.parse(v.value))}catch{}try{const v=await window.storage.get("hr_server");v&&s(v.value)}catch{}if(e)try{const v=Uo(Mo,`users/${e.uid}/attachments`),b=await z_(v),M=await Promise.all(b.items.map(async ne=>{const z=await Kc(ne);return{name:ne.name,size:0,url:z,storageRef:ne.fullPath}}));M.length&&u(M)}catch{}Xs(!0)})()},[e]);const x=(v,b="inf")=>{K({msg:v,type:b}),clearTimeout(In.current),In.current=setTimeout(()=>K(null),3200)},A=async()=>{try{await window.storage.set("hr_profile",JSON.stringify(n)),await window.storage.set("hr_server",i),It(!0),x("Profile saved","ok"),setTimeout(()=>It(!1),2500)}catch{x("Save failed","err")}},L=async()=>{a("checking");try{(await(await fetch(i.replace(/\/$/,"")+"/",{signal:AbortSignal.timeout(4e3)})).json()).status==="ok"?(a("ok"),x("Server connected ✓","ok")):(a("err"),x("Unexpected response","err"))}catch{a("err"),x("Cannot reach server — is it running?","err")}},Q=H.useCallback(async v=>{const b=Array.from(v),M=new Set(l.map(O=>O.name)),ne=b.filter(O=>!M.has(O.name));if(!ne.length)return;w(!0);const z=[];for(const O of ne)try{if(e){const lt=Uo(Mo,`users/${e.uid}/attachments/${O.name}`);await j_(lt,O);const mi=await Kc(lt);z.push({name:O.name,size:O.size,url:mi,storageRef:lt.fullPath})}else z.push({name:O.name,size:O.size,file:O})}catch{z.push({name:O.name,size:O.size,file:O})}u(O=>[...O,...z]),w(!1),x(`${z.length} file${z.length>1?"s":""} uploaded`,"ok")},[l,e]),$=(v,b,M)=>k(ne=>ne.map(z=>z.id===v?{...z,[b]:M}:z)),Tn=()=>k(v=>[...v,{id:q_++,email:"",jobTitle:"",company:"",note:"",status:"idle",statusMsg:"",subject:"",body:""}]),at=v=>k(b=>b.filter(M=>M.id!==v)),cr=async v=>{var mi;const b=l.map(Zs=>Zs.name).join(", "),M=`You are an expert professional email writer for job applications and HR outreach. Write a compelling, personalized email.

Sender: ${n.name||"the applicant"}
${n.about?`About sender: ${n.about}`:""}
Recipient: ${v.email}
${v.jobTitle?`Applying for: ${v.jobTitle}`:"Expressing interest in open opportunities"}
${v.company?`Company: ${v.company}`:""}
${v.note?`Notes: ${v.note}`:""}
${b?`Attachments mentioned: ${b}`:""}

Write email body (150-220 words). Be warm, confident, professional. Reference role/company specifically. End with clear CTA.

Respond ONLY with valid JSON (no markdown):
{"subject":"...","body":"..."}`,ne=await fetch(i.replace(/\/$/,"")+"/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:M})}),z=await ne.json();if(!ne.ok)throw new Error(z.error||"Generation failed");const lt=(((mi=z.content)==null?void 0:mi.map(Zs=>Zs.text||"").join(""))||"").replace(/```json|```/g,"").trim();return JSON.parse(lt)},Je=async v=>{const b=i.replace(/\/$/,""),M=await fetch(`${b}/send`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({to:v.email,subject:v.subject,body:v.body,fromName:n.name||void 0,replyTo:n.replyTo||void 0})}),ne=await M.json();if(!M.ok||ne.error)throw new Error(ne.error||"Send failed");return ne},tn=v=>{navigator.clipboard.writeText(`Subject: ${v.subject}

${v.body}`),x("Copied to clipboard","ok")},nu=v=>{const b=`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(v.email)}&su=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(v.body)}`;window.open(b,"_blank")},ru=async v=>{$(v.id,"status","sending");try{await Je(v),$(v.id,"status","sent"),x(`Sent → ${v.email}`,"ok")}catch(b){$(v.id,"status","done"),x(`Failed: ${b.message}`,"err")}},hp=async()=>{const v=_.filter(b=>b.email.trim());if(v.length){f(!0),h(0),k(b=>b.map(M=>({...M,status:"idle",statusMsg:"",subject:"",body:""})));for(let b=0;b<v.length;b++){const M=v[b].id;E(`Composing ${b+1}/${v.length}...`),k(z=>z.map(O=>O.id===M?{...O,status:"active"}:O));let ne;try{ne=await cr(v[b]),k(z=>z.map(O=>O.id===M?{...O,subject:ne.subject,body:ne.body}:O))}catch{k(z=>z.map(O=>O.id===M?{...O,status:"error"}:O)),h(Math.round((b+1)/v.length*100));continue}if(o==="ok"){E(`Sending to ${v[b].email}...`),k(z=>z.map(O=>O.id===M?{...O,status:"sending"}:O));try{await Je({...v[b],subject:ne.subject,body:ne.body}),k(z=>z.map(O=>O.id===M?{...O,status:"sent"}:O)),x(`Sent → ${v[b].email}`,"ok")}catch(z){k(O=>O.map(lt=>lt.id===M?{...lt,status:"done"}:lt)),x(`Send failed for ${v[b].email}: ${z.message}`,"err")}}else k(z=>z.map(O=>O.id===M?{...O,status:"done"}:O));h(Math.round((b+1)/v.length*100)),b<v.length-1&&await new Promise(z=>setTimeout(z,500))}E("Complete"),f(!1)}},pi=_.filter(v=>v.email.trim()).length,dr=_.filter(v=>["done","sent"].includes(v.status)).length,Js=_.filter(v=>v.status==="sent").length;return hi?d.jsxs(d.Fragment,{children:[d.jsx("style",{children:Qc}),d.jsxs("div",{className:"shell",children:[d.jsxs("div",{className:"topbar",children:[d.jsx("div",{className:"tb-logo",children:"✉️"}),d.jsxs("div",{children:[d.jsx("div",{className:"tb-name",children:"HR Outreach Agent"}),d.jsx("div",{className:"tb-sub",children:"ai-powered · direct send · professional"})]}),d.jsxs("div",{className:"tb-st",children:[d.jsx("div",{className:`pip ${R?"busy":o==="err"?"err":""}`}),R?"processing...":o==="ok"?"server connected":o==="err"?"server offline":"ready",e&&d.jsxs(d.Fragment,{children:[d.jsx("span",{style:{color:"var(--b2)",margin:"0 4px"},children:"|"}),e.photoURL&&d.jsx("img",{src:e.photoURL,alt:"",style:{width:22,height:22,borderRadius:"50%",border:"1px solid var(--b2)",flexShrink:0}}),d.jsx("span",{style:{maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:(iu=e.displayName)==null?void 0:iu.split(" ")[0]}),d.jsx("button",{onClick:t,style:{padding:"3px 9px",borderRadius:6,border:"1px solid var(--b2)",background:"var(--s3)",color:"var(--t3)",fontSize:10,fontFamily:"var(--mono)",cursor:"pointer",transition:"color .15s, border-color .15s"},children:"Sign out"})]})]})]}),d.jsxs("div",{className:"mg",children:[d.jsxs("div",{className:"sb",children:[d.jsxs("div",{className:"tabs",children:[d.jsx("button",{className:`tab ${D==="profile"?"on":""}`,onClick:()=>xe("profile"),children:"Profile"}),d.jsx("button",{className:`tab ${D==="server"?"on":""}`,onClick:()=>xe("server"),children:"Server"})]}),D==="profile"&&d.jsxs("div",{className:"panel",children:[d.jsxs("div",{className:"ph",children:[d.jsx("span",{className:"pt",children:"Your Identity"}),en&&d.jsx("span",{className:"pbadge ok",children:"Saved ✓"})]}),d.jsxs("div",{className:"pb",children:[d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"Full Name"}),d.jsx("input",{value:n.name,onChange:v=>r(b=>({...b,name:v.target.value})),placeholder:"Your full name"})]}),d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"Reply-To Email"}),d.jsx("input",{type:"email",value:n.replyTo,onChange:v=>r(b=>({...b,replyTo:v.target.value})),placeholder:"you@gmail.com"})]}),d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"About You"}),d.jsx("div",{className:"flh",children:"Used to personalize every email"}),d.jsx("textarea",{value:n.about,onChange:v=>r(b=>({...b,about:v.target.value})),placeholder:"Skills, experience, career goal, education...",style:{marginTop:6}})]}),d.jsx("button",{className:"savebtn",onClick:A,children:"💾 Save Profile"})]})]}),D==="server"&&d.jsxs("div",{className:"panel",children:[d.jsxs("div",{className:"ph",children:[d.jsx("span",{className:"pt",children:"Backend Server"}),o==="ok"&&d.jsx("span",{className:"pbadge ok",children:"Connected"}),o==="err"&&d.jsx("span",{className:"pbadge err",children:"Offline"})]}),d.jsxs("div",{className:"pb",children:[d.jsxs("div",{className:"srv-note",children:[d.jsx("b",{children:"Setup:"})," run the Node.js server locally",d.jsx("br",{}),"then connect it here to enable direct send."]}),o==="ok"&&d.jsx("div",{className:"srv-st ok",children:"✓ Server reachable — direct send enabled"}),o==="err"&&d.jsx("div",{className:"srv-st err",children:"✗ Cannot reach server at this URL"}),o==="checking"&&d.jsxs("div",{className:"srv-st chk",children:[d.jsx("span",{className:"spin",children:"⟳"})," Checking..."]}),d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"Server URL"}),d.jsxs("div",{className:"srv-row",children:[d.jsx("input",{value:i,onChange:v=>s(v.target.value),placeholder:"http://localhost:3001",style:{fontFamily:"var(--mono)",fontSize:12}}),d.jsx("button",{className:"test-btn",onClick:L,disabled:o==="checking",children:o==="checking"?d.jsx("span",{className:"spin",children:"⟳"}):"Test"})]})]}),d.jsxs("div",{className:"srv-note",style:{marginTop:4},children:["If server is ",d.jsx("b",{children:"offline"}),", emails are still generated — use Gmail link or Copy to send manually."]})]})]}),d.jsxs("div",{className:"panel",children:[d.jsxs("div",{className:"ph",children:[d.jsx("span",{className:"pt",children:"Attachments"}),l.length>0&&d.jsxs("span",{className:"pbadge",children:[l.length," file",l.length>1?"s":""]})]}),d.jsxs("div",{className:"pb",children:[d.jsxs("div",{className:`dz ${p?"ov":""}`,onClick:()=>En.current.click(),onDragOver:v=>{v.preventDefault(),g(!0)},onDragLeave:()=>g(!1),onDrop:v=>{v.preventDefault(),g(!1),Q(v.dataTransfer.files)},children:[d.jsx("div",{className:"dz-ico",children:m?d.jsx("span",{className:"spin",children:"⟳"}):"📁"}),d.jsx("div",{className:"dz-txt",children:m?d.jsx("em",{children:"Uploading..."}):d.jsxs(d.Fragment,{children:[d.jsx("em",{children:"Click to browse"})," or drag & drop",d.jsx("br",{}),"Resume · Cover Letter · Portfolio"]})})]}),d.jsx("input",{ref:En,type:"file",multiple:!0,style:{display:"none"},onChange:v=>Q(v.target.files)}),l.map(v=>d.jsxs("div",{className:"fchip",children:[d.jsx("span",{className:"fchip-ico",children:Y_(v.name)}),d.jsx("span",{className:"fchip-nm",children:v.name}),d.jsx("span",{className:"fchip-sz",children:Q_(v.size)}),d.jsx("button",{className:"fchip-rm",onClick:async()=>{if(v.storageRef)try{await F_(Uo(Mo,v.storageRef))}catch{}u(b=>b.filter(M=>M.name!==v.name))},children:"×"})]},v.name))]})]})]}),d.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[d.jsx("div",{className:"slbl",children:"Recipients"}),d.jsxs("div",{className:"rw",children:[_.map((v,b)=>d.jsxs("div",{className:`rr st-${v.status}`,children:[d.jsxs("div",{className:"rt",children:[d.jsx("div",{className:`rnum ${v.status==="active"||v.status==="sending"?"a":v.status==="done"||v.status==="sent"?"d":""}`,children:v.status==="done"||v.status==="sent"?"✓":v.status==="error"?"✗":b+1}),d.jsx("span",{className:`reml ${v.email?"":"empty"}`,children:v.email||"No email entered"}),d.jsxs("span",{className:`rst ${v.status}`,children:[(v.status==="active"||v.status==="sending")&&d.jsx("span",{className:"spin",children:"⟳"}),v.status==="idle"&&"pending",v.status==="active"&&d.jsx("span",{className:"tc",children:"composing"}),v.status==="sending"&&d.jsx("span",{className:"tc",children:"sending"}),v.status==="done"&&"ready",v.status==="sent"&&"sent ✓",v.status==="error"&&"failed"]}),!R&&_.length>1&&d.jsx("button",{className:"rrm",onClick:()=>at(v.id),children:"×"})]}),d.jsxs("div",{className:"rfs",children:[d.jsxs("div",{className:"fl ff",children:[d.jsx("label",{className:"flb",children:"HR Email *"}),d.jsx("input",{value:v.email,disabled:R,onChange:M=>$(v.id,"email",M.target.value),placeholder:"hr@company.com",type:"email"})]}),d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"Job Title"}),d.jsx("input",{value:v.jobTitle,disabled:R,onChange:M=>$(v.id,"jobTitle",M.target.value),placeholder:"e.g. Frontend Engineer"})]}),d.jsxs("div",{className:"fl",children:[d.jsx("label",{className:"flb",children:"Company"}),d.jsx("input",{value:v.company,disabled:R,onChange:M=>$(v.id,"company",M.target.value),placeholder:"e.g. Google"})]}),d.jsxs("div",{className:"fl ff",children:[d.jsxs("label",{className:"flb",children:["Extra Note ",d.jsx("span",{style:{color:"var(--t4)",fontWeight:400},children:"optional"})]}),d.jsx("input",{value:v.note,disabled:R,onChange:M=>$(v.id,"note",M.target.value),placeholder:"Referral, specific ask, special context..."})]})]}),(v.status==="done"||v.status==="sent")&&d.jsxs("div",{className:"rfoot",children:[d.jsx("button",{className:"sb-btn sbprev",onClick:()=>C(v),children:"👁 Preview"}),d.jsx("button",{className:"sb-btn sbcopy",onClick:()=>tn(v),children:"📋 Copy"}),d.jsx("button",{className:"sb-btn sbgmail",onClick:()=>nu(v),children:"↗ Gmail"}),v.status==="done"&&o==="ok"&&d.jsx("button",{className:"sb-btn sbsend",onClick:()=>ru(v),children:"⚡ Send Now"}),v.status==="sent"&&d.jsx("span",{style:{fontSize:11,fontFamily:"var(--mono)",color:"var(--green)"},children:"✓ Delivered"})]}),v.status==="error"&&d.jsx("div",{className:"rfoot",children:d.jsx("span",{style:{fontSize:11,fontFamily:"var(--mono)",color:"var(--red)"},children:"✗ Generation failed — check API key"})})]},v.id)),!R&&d.jsx("button",{className:"add-r",onClick:Tn,children:"+ Add Recipient"})]}),d.jsxs("div",{className:"abar",children:[R?d.jsxs("div",{className:"pw",children:[d.jsxs("div",{className:"plbl",children:[d.jsx("span",{className:"spin",children:"⟳"}),y]}),d.jsx("div",{className:"ptrk",children:d.jsx("div",{className:"pfil",style:{width:c+"%"}})})]}):Js>0?d.jsxs("div",{className:"pw",children:[d.jsxs("div",{className:"plbl",style:{color:"var(--green)"},children:["✓ ",Js," sent · ",dr-Js," ready to send"]}),d.jsx("div",{className:"ptrk",children:d.jsx("div",{className:"pfil done",style:{width:"100%"}})})]}):dr>0?d.jsxs("div",{className:"pw",children:[d.jsxs("div",{className:"plbl",style:{color:"var(--green)"},children:["✓ ",dr," email",dr>1?"s":""," generated"]}),d.jsx("div",{className:"ptrk",children:d.jsx("div",{className:"pfil done",style:{width:"100%"}})})]}):d.jsxs("div",{className:"pw",children:[d.jsxs("div",{className:"plbl",children:[pi," recipient",pi!==1?"s":""," queued · ",o==="ok"?"will auto-send via server":"connect server to auto-send"]}),d.jsx("div",{className:"ptrk",children:d.jsx("div",{className:"pfil",style:{width:`${pi>0?10:0}%`}})})]}),dr>0&&!R&&d.jsx("button",{className:"rbtn",onClick:()=>k(v=>v.map(b=>({...b,status:"idle",statusMsg:"",subject:"",body:""}))),children:"Reset"}),d.jsx("button",{className:"lbtn",disabled:R||!pi,onClick:hp,children:R?d.jsxs(d.Fragment,{children:[d.jsx("span",{className:"spin",children:"⚙"}),"Running..."]}):o==="ok"?d.jsx(d.Fragment,{children:"🚀 Generate & Send"}):d.jsx(d.Fragment,{children:"🚀 Generate Emails"})})]})]})]})]}),I&&d.jsx("div",{className:"mbg",onClick:v=>{v.target.className==="mbg"&&C(null)},children:d.jsxs("div",{className:"modal",children:[d.jsxs("div",{className:"mhd",children:[d.jsx("div",{className:"mico",children:"✉️"}),d.jsxs("div",{style:{flex:1,minWidth:0},children:[d.jsxs("div",{className:"mto",children:["To: ",d.jsx("span",{children:I.email}),I.company&&d.jsxs(d.Fragment,{children:[" · ",d.jsx("span",{children:I.company})]})]}),d.jsx("div",{className:"msub",children:I.subject})]}),d.jsx("button",{className:"mcls",onClick:()=>C(null),children:"×"})]}),d.jsx("div",{className:"mbdy",children:I.body}),d.jsxs("div",{className:"mftr",children:[d.jsx("button",{className:"sb-btn sbcopy",onClick:()=>tn(I),children:"📋 Copy"}),d.jsx("button",{className:"sb-btn sbgmail",onClick:()=>nu(I),children:"↗ Open in Gmail"}),I.status!=="sent"&&o==="ok"&&d.jsx("button",{className:"msnd",onClick:async()=>{const v={...I};C(null),await ru(v)},children:"⚡ Send Now"}),I.status==="sent"&&d.jsx("span",{style:{fontSize:12,fontFamily:"var(--mono)",color:"var(--green)"},children:"✓ Already sent"})]})]})}),N&&d.jsxs("div",{className:`toast ${N.type}`,children:[N.type==="ok"?"✓":N.type==="err"?"✗":"ℹ"," ",N.msg]})]}):d.jsxs(d.Fragment,{children:[d.jsx("style",{children:Qc}),d.jsx("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--mono)",fontSize:12,color:"var(--t3)"},children:"Loading..."})]})}const J_=`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0d1117;--s1:#161b22;--s2:#1c2128;
  --b1:#30363d;--b2:#3d444d;
  --blue:#2f81f7;--blue-dim:rgba(47,129,247,.14);--blue-glow:rgba(47,129,247,.28);
  --text:#e6edf3;--t2:#adbac7;--t3:#768390;--t4:#444c56;
  --sans:'Outfit',sans-serif;--mono:'Fira Code',monospace;
  --r:10px;--rl:14px;
}
html,body{height:100%;background:var(--bg);color:var(--text);font-family:var(--sans)}
.auth-bg{
  min-height:100vh;display:flex;align-items:center;justify-content:center;
  background:radial-gradient(ellipse at 60% 40%, rgba(47,129,247,.08) 0%, transparent 60%),
             radial-gradient(ellipse at 20% 80%, rgba(47,129,247,.05) 0%, transparent 50%),
             var(--bg);
}
.auth-card{
  background:var(--s1);border:1px solid var(--b1);border-radius:20px;
  padding:48px 40px;width:min(420px,94vw);text-align:center;
  box-shadow:0 20px 60px rgba(0,0,0,.5);
  animation:caup .3s ease;
}
@keyframes caup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
.auth-logo{
  width:56px;height:56px;border-radius:14px;
  background:linear-gradient(135deg,#2f81f7,#1a6fd4);
  display:flex;align-items:center;justify-content:center;
  font-size:24px;margin:0 auto 20px;
  box-shadow:0 4px 16px rgba(47,129,247,.4);
}
.auth-title{font-size:24px;font-weight:800;letter-spacing:-.5px;margin-bottom:8px}
.auth-sub{font-size:13px;color:var(--t3);line-height:1.6;margin-bottom:36px}
.google-btn{
  display:flex;align-items:center;justify-content:center;gap:12px;
  width:100%;padding:13px 20px;
  background:var(--s2);border:1px solid var(--b2);border-radius:var(--r);
  color:var(--text);font-family:var(--sans);font-size:14px;font-weight:600;
  cursor:pointer;transition:all .2s;
}
.google-btn:hover:not(:disabled){
  border-color:var(--blue);background:var(--blue-dim);
  box-shadow:0 0 0 3px var(--blue-glow);
}
.google-btn:disabled{opacity:.5;cursor:not-allowed}
.google-btn svg{flex-shrink:0}
.auth-err{
  margin-top:16px;padding:10px 14px;border-radius:var(--r);
  background:rgba(248,81,73,.1);border:1px solid rgba(248,81,73,.25);
  color:#f85149;font-size:12px;font-family:var(--mono);
}
.auth-footer{margin-top:24px;font-size:11px;color:var(--t4);line-height:1.6}
`;function Z_({onUser:e}){const[t,n]=H.useState(!1),[r,i]=H.useState(""),s=async()=>{n(!0),i("");try{const o=await R0(Ba,G_);e(o.user)}catch(o){i(o.message.replace("Firebase: ","")),n(!1)}};return d.jsxs(d.Fragment,{children:[d.jsx("style",{children:J_}),d.jsx("div",{className:"auth-bg",children:d.jsxs("div",{className:"auth-card",children:[d.jsx("div",{className:"auth-logo",children:"✉️"}),d.jsx("div",{className:"auth-title",children:"HR Outreach Agent"}),d.jsxs("div",{className:"auth-sub",children:["AI-powered personalized email outreach.",d.jsx("br",{}),"Sign in to save your files and profile."]}),d.jsxs("button",{className:"google-btn",onClick:s,disabled:t,children:[d.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 18 18",children:[d.jsx("path",{fill:"#4A90E2",d:"M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z"}),d.jsx("path",{fill:"#34A853",d:"M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z"}),d.jsx("path",{fill:"#FBBC05",d:"M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18l2.67-2.07z"}),d.jsx("path",{fill:"#EA4335",d:"M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.31z"})]}),t?"Signing in...":"Continue with Google"]}),r&&d.jsx("div",{className:"auth-err",children:r}),d.jsxs("div",{className:"auth-footer",children:["Your files are stored securely in Firebase Storage,",d.jsx("br",{}),"linked only to your Google account."]})]})})]})}window.storage||(window.storage={get:async e=>{const t=localStorage.getItem(e);return t?{value:t}:void 0},set:async(e,t)=>localStorage.setItem(e,t)});function e1(){const[e,t]=H.useState(void 0);return H.useEffect(()=>l0(Ba,r=>t(r||null)),[]),e===void 0?d.jsx("div",{style:{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"#0d1117",fontFamily:"'Fira Code', monospace",fontSize:12,color:"#444c56"},children:"Loading..."}):e?d.jsx(X_,{user:e,onSignOut:()=>u0(Ba)}):d.jsx(Z_,{onUser:t})}jo.createRoot(document.getElementById("root")).render(d.jsx(bp.StrictMode,{children:d.jsx(e1,{})}));
