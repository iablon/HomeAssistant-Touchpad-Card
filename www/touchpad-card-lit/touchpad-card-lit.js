/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
 const t$1=window,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$3=Symbol(),n$3=new WeakMap;let o$3 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$3)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$3.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$3.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new o$3("string"==typeof t?t:t+"",void 0,s$3),i$1=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$3(n,t,s$3)},S$1=(s,n)=>{e$2?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$1.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$1=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */var s$2;const e$1=window,r$1=e$1.trustedTypes,h$1=r$1?r$1.emptyScript:"",o$2=e$1.reactiveElementPolyfillSupport,n$2={toAttribute(t,i){switch(i){case Boolean:t=t?h$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$1=(t,i)=>i!==t&&(i==i||t==t),l$2={attribute:!0,type:String,converter:n$2,reflect:!1,hasChanged:a$1};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$2){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$2}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$1(i));}else void 0!==i&&s.push(c$1(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$2){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$2).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$2;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$1)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$2||o$2({ReactiveElement:d$1}),(null!==(s$2=e$1.reactiveElementVersions)&&void 0!==s$2?s$2:e$1.reactiveElementVersions=[]).push("1.4.2");
 
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */
 var t;const i=window,s$1=i.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$1=`lit$${(Math.random()+"").slice(9)}$`,n$1="?"+o$1,l$1=`<${n$1}>`,h=document,r=(t="")=>h.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h.createTreeWalker(h,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a||d===f?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$1:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$1+y):s+o$1+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e?e.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$1)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$1),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$1),i=t.length-1;if(i>0){l.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r());}}}else if(8===l.nodeType)if(l.data===n$1)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$1,t+1));)c.push({type:7,index:h}),t+=o$1.length-1;}h++;}}static createElement(t,i){const s=h.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r()),this.O(r()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$1?s$1.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t=i.litHtmlVersions)&&void 0!==t?t:i.litHtmlVersions=[]).push("2.4.0");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};
 
 /**
  * @license
  * Copyright 2017 Google LLC
  * SPDX-License-Identifier: BSD-3-Clause
  */var l,o;class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}}s.finalized=!0,s._$litElement$=!0,null===(l=globalThis.litElementHydrateSupport)||void 0===l||l.call(globalThis,{LitElement:s});const n=globalThis.litElementPolyfillSupport;null==n||n({LitElement:s});(null!==(o=globalThis.litElementVersions)&&void 0!==o?o:globalThis.litElementVersions=[]).push("3.2.2");
 
 const vibrate = new Event('haptic', {bubbles: false});
 const moreInfo = new Event('hass-more-info', { composed: true });
 
 var clickTimer,holdTimer,holdInterval,falseCheck = false;
 const buttons = [
   {txt: 'power',icon: 'mdi:power',class: 'power',call_data: {domain: 'homeassistant',service: 'toggle'}},
   {txt: 'chup',repeatOnHold: true,icon: 'mdi:arrow-up-bold-circle',class: 'ch-plus',call_data: {domain: 'media_player',service: 'play_media'},key_data: {media_content_id: 'KEY_CHUP', media_content_type: 'send_key'}},
   {txt: 'option',icon: 'mdi:speaker-bluetooth',class: 'option',call_data: {domain: 'homeassistant',service: 'toggle'}},
   {txt: 'volumeup',repeatOnHold: true,icon: 'mdi:volume-high',class: 'vol-plus',call_data: {domain: 'media_player',service: 'volume_up'}},
   {txt: 'chdown',repeatOnHold: true,icon: 'mdi:arrow-down-bold-circle',class: 'ch-minus',call_data: {domain: 'media_player', service: 'play_media',key_data: {media_content_id: "KEY_CHDOWN", media_content_type: "send_key"}}},
   {txt: 'mute',icon: 'mdi:volume-variant-off',class: 'mute',call_data: {domain: 'media_player',service: 'volume_mute'}},
   {txt: 'volumedown',repeatOnHold: true,icon: 'mdi:volume-medium',class:'vol-minus',call_data:{domain: 'media_player',service: 'volume_down'}},
   {txt: 'touchpadd',class: 'touch-area',call_data: {domain: 'media_player', service: 'play_media',key_data: {media_content_type: "send_key"}}}
 ];
 
 class MyElement extends s {
     static get properties() {
         return {
           hass: {},
           config: {}
         };
     }
   
   render() {
     return y`
             <the-tv class="${this.config.fancy_borders ? 'fancy-borders' : ''}" style="height:${window.navigator.userAgent.includes("Home Assistant") ? '100vh' : window.navigator.brave != undefined ? '80vh' : '85vh' };">
               <div id="entity-area" @dblclick="${()=>this.moreInfoAction(this)}">
                 ${this.tvIconOrSource()}
                 <b>${ this.config.name != undefined ? this.config.name : this.hass.states[this.config.entity].attributes.friendly_name.toUpperCase()}</b>
                 ${this.makeMeButton(0)}
               <hr>
               </div>
                 ${this.buttonsContainer()}
                 ${this.makeMeButton(7)}
             </the-tv>
     `;
   }
 
   static get styles() {
     return i$1`
 
         img{
             background-size: contain;
             border-radius: 15px;
             height: 40px;
             width: 40px;
             touch-action: none;
             margin: 20px 0px 20px 20px;
             float: left;
         }
         ha-icon{
             pointer-events: none;
             touch-action: none;
         }
         #entity-area > ha-icon {
           float:left;
           margin:17px 0px 0px 20px;
           --mdc-icon-size: 45px ;
         }
         .touch-area{
             display: block;
             width: 93%;
             margin: 9vh auto 0px;
             border-radius: 30px;
             margin-bottom: 10px;
             height: 59vh; 
             background: #6d767e;
             border: 1px solid black;
             touch-action:none;
         }
         #entity-area{
             height : 10vh;
             width: 100%;
             margin : 0;
         }
         
         the-tv { 
             position: relative;
             background-color: #343a40; 
             height: 100vh;
             overflow: hidden;
             display: flex;
             flex-flow: column;
             margin:0 auto 0;
             max-height: 750px ;
             max-width: 458px;
             border: double 4px transparent;
             border-radius: 30px;
             touch-action:none;
 
         }
         .fancy-borders{
           background-image: linear-gradient(#343a40, #343a40), radial-gradient(circle at top left, #f00,#3020ff);
           background-origin: border-box;
           background-clip: padding-box, border-box;
         }
 
         #buttons{
             display: grid;
             grid-template-columns: auto auto auto; 
             grid-template-rows: auto auto; 
             gap: 0px auto; 
             width: 100%;
             margin: 8vh 0 2vh ;
             height: 55vh;
             --mdc-icon-size: 30px;
             max-width: 96%;
             padding-left: 13px;
             padding-right: 13px;
             grid-template-areas: 
                 "a b c"
                 "d e f";
         }
         b {
             margin: 30px auto auto 20px; 
             display: inline-block; 
             font-size: 23px; 
             text-shadow: rgba(0, 0, 0, 0.2) 3px 3px 0px; 
         }
         .power{
             background-color: transparent; 
             box-shadow: none;
             color: red;
             border-radius: 3rem;
             float: right;
             margin: 20px;
             --mdc-icon-size: 35px;
         }
         .ch-plus{
             grid-area: a;
             border-radius: 3rem 3rem 0rem 0rem;
             height: 100%;
             width: 24vw;
             max-width: 118px;
             margin-left: auto;
             margin-right: auto;
             box-shadow: none;
             background-color: #6d767e;
         }
         .ch-minus{
             grid-area: d;
             border-radius: 0rem 0rem 3rem 3rem;
             height: 100%;
             width: 24vw;
             max-width: 118px;
             box-shadow: none;
             margin-left: auto;
             margin-right: auto;
             background-color: #6d767e;
             
         }
         .option{
             grid-area: b;
             border-radius: 1.5rem;
             box-shadow: none;
             background-color: #6d767e;
             margin: auto;
             padding: 10px;
             height: fit-content;
         }
         .mute{
             grid-area: e;
             border-radius: 1.5rem;
             box-shadow: none;
             background-color: #6d767e;
             margin: auto;
             padding: 10px;
             height: fit-content;
         }
         .vol-plus{
             grid-area: c;
             border-radius: 3rem 3rem 0rem 0rem;
             height: 100%;
             width: 24vw;
             max-width: 118px;
             box-shadow: none;
             margin-left: auto;
             margin-right: auto;
             background-color: #6d767e;
         }
         .vol-minus{
             grid-area: f;
             border-radius: 0rem 0rem 3rem 3rem;
             height: 100%;
             width: 24vw;
             max-width: 118px;
             margin-left: auto;
             margin-right: auto;
             box-shadow: none;
             background-color: #6d767e;
         }
         hr{
             height:2px;
             width: 97%;
             border-width:0;
             color:#6d767e;
             background-color:#6d767e;
         }
         `;
 }
 
 static getConfigElement() {
   return document.createElement("content-card-editor");
 }
 
 tvIconOrSource(ha = this.hass){
   if(ha.states[this.config.entity].attributes.entity_picture != undefined)
     return y`<img src="${this.hass.states[this.config.entity].attributes.entity_picture}" style="margin-left:30px;">
     `;
   else 
     return y`<ha-icon icon='mdi:youtube-tv'></ha-icon>
     `;
 }
 
 buttonsContainer(){
   let container = document.createElement('div');
   container.setAttribute('id','buttons');
   for (let i = 1; i < 7; i++) {
     container.appendChild(this.makeMeButton(i));
   }
   return container;
 }
 
 
 makeMeButton (i,ha = this.hass){
   if(i==7){
     let touchpad = document.createElement('button');
     touchpad.classList.add(buttons[i].class);
 
     touchpad.addEventListener('click', e => { 
       e.stopImmediatePropagation();  
       clickTimer = setTimeout(() => { 
         if(falseCheck){ 
           console.log('click '+buttons[i].txt); 
           this.feedback('light'); 
         } 
         falseCheck=true; 
       }, 210);
     });
 
     touchpad.addEventListener('dblclick',e => {
       e.stopImmediatePropagation(); 
       this.feedback('success'); 
       falseCheck = false; 
       clearTimeout(clickTimer); 
       clickTimer = null; 
       console.log('dbclick '+buttons[i].txt); 
     });
     touchpad.addEventListener('touchstart' ,e => {
       e.stopImmediatePropagation();  
       this.touchStart(e); 
       holdTimer = setTimeout(() => { 
         this.feedback('medium'); 
         console.log('hold '+buttons[i].txt);
       }, 700);
     });
 
     touchpad.addEventListener('touchmove',e => {
       e.stopImmediatePropagation(); 
       this.touchMove(e);
     });
 
     touchpad.addEventListener('touchend', e => {
       e.stopImmediatePropagation(); 
       clearTimeout(clickTimer); 
       clearTimeout(holdTimer); 
     });
     return touchpad;
   }
 else {
     let button = document.createElement('button');
     let icon = document.createElement('ha-icon');
 
     icon.setAttribute('icon',buttons[i].icon);
 
     button.appendChild(icon);
 
     button.classList.add(buttons[i].class);
 
     button.addEventListener('click', e => { 
       e.stopImmediatePropagation();  
       clickTimer = setTimeout(() => { 
         if(falseCheck){ 
           this.feedback('light'); 
           console.log('click '+buttons[i].txt);
         } 
         falseCheck=true;
       }, 210);
     });
 
     button.addEventListener('touchstart',e => {
       e.stopImmediatePropagation(); 
       holdTimer = setTimeout(() => { 
         this.feedback('light'); 
         if(buttons[i].repeatOnHold) 
           holdInterval = setInterval(() => { 
             console.log('ripeto '+buttons[i].txt); 
             this.feedback('selection');
           }, 450); 
         }, 600);
       });
 
     button.addEventListener('dblclick',e => {
       e.stopImmediatePropagation(); 
       falseCheck = false; 
       clearTimeout(clickTimer); 
       clickTimer = null; 
       this.feedback('success');  
       console.log('dbclick '+buttons[i].txt); 
     });
 
     button.addEventListener('touchend',e=>{
       e.stopImmediatePropagation(); 
       clearInterval(holdInterval); 
       clearTimeout(clickTimer);
       clearTimeout(holdTimer);
     });
     return button;
 }
 }
 
 moreInfoAction(node){
   moreInfo.detail = {entityId: this.config.entity};
   node.dispatchEvent(moreInfo);
 }
 feedback(type){
   vibrate.detail = type;
   window.dispatchEvent(vibrate);
 }
 touchStart(e){
   window.initialX = e.touches[0].clientX;
   window.initialY = e.touches[0].clientY;
 }
 touchMove(e,ha = this.hass) {
   if( ! initialX || ! initialY){
     return;
   }
   
   var currentX = e.touches[0].clientX;
   var currentY = e.touches[0].clientY;
 
   var diffX = initialX - currentX;
   var diffY = initialY - currentY;
   
   if (Math.abs(diffX) > Math.abs(diffY)) {
     // sliding horizontally
     if (diffX > 0) {
       // swiped left
       console.log('left');
       //ha.callService("media_player","play_media",{media_content_id: "KEY_LEFT", media_content_type: "send_key"},{entity_id: this.config.entity});
     } else {
       // swiped right
       console.log('right');
       //ha.callService("media_player","play_media",{media_content_id: "KEY_RIGHT", media_content_type: "send_key"},{entity_id: this.config.entity});
     }  
   } else {
     // sliding vertically
     if (diffY > 0) {
       // swiped up
       console.log('up');
       //ha.callService("media_player","play_media",{media_content_id: "KEY_UP", media_content_type: "send_key"},{entity_id: this.config.entity});
     } else {
       // swiped down
       console.log('down');
       //ha.callService("media_player","play_media",{media_content_id: "KEY_DOWN", media_content_type: "send_key"},{entity_id: this.config.entity});
     }  
   }
   initialX = null;
   initialY = null;
 }
 setConfig(config) {
   if(!config.entity)
     throw new Error('You need to define an entity');
     this.config = config;
 }
 }
 
 
 class ContentCardEditor extends s {
 
   static get properties() {
     return {
       hass: {},
       _config: {},
     };
   }
 
   setConfig(config) {
     this._config = config;
   }
 
     render(){
       return y`
           <ha-select id="entity-selector" naturalMenuWidth fixedMenuPosition label="Entità" @selected="${this.updateIt}" @closed="${ev => ev.stopPropagation()}"  >
           ${Object.keys(this.hass.states).filter(ent => ent.match('media_player[.]')).map(entity => {
                             return y` <mwc-list-item .value="${entity}">${entity}</mwc-list-item> `;
                         })}
           </ha-select><br>
           <ha-formfield class="switch-wrapper"  label="Fancy Borders">
           <ha-switch id="fancy-borders-selector" .checked="${this._config.fancy_borders}" @change="${this.updateIt}"></ha-switch>
         </ha-formfield>
       `;
     }  
 
   updateIt(e,ha = this.hass){
     if(e.target.id === 'entity-selector'){
       this._config.entity = Object.keys(ha.states).filter(ent => ent.match('media_player[.]'))[e.detail.index] ;
     }
     if(e.target.id === 'fancy-borders-selector' )
       this._config.fancy_borders = !this._config.fancy_borders ;
     const event = new Event("config-changed", {
       bubbles: true,
       composed: true
     });
     event.detail = {config: this._config};
     this.dispatchEvent(event); 
   }
 
   static get styles(){
     return i$1`
       * {
         padding: 0.5rem;
       }
     `;
   }
 }
 
 customElements.define("content-card-editor", ContentCardEditor);
 
 customElements.define('my-tv-card', MyElement);
 window.customCards = window.customCards || [];
 window.customCards.push({
   type: "my-tv-card",
   name: "Touchpad remote for tv",
   preview: false, 
   description: "A Confortable remote to control your tv"
 });
 