import { html, LitElement,css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {classMap} from './node_modules/lit/directives/class-map.js';
import {styleMap} from './node_modules/lit/directives/style-map.js';

const vibrate = new Event('haptic', {bubbles: false});
const moreInfo = new Event('hass-more-info', { composed: true });

var clickTimer,holdTimer,holdInterval,falseCheck = true;
let bool=false;
const editTabs = {
  power: true,
  source: false,
  
}
const buttons = [
  {txt: 'power',icon: 'mdi:power',class: 'power',call_data: {domain: 'homeassistant',service: 'toggle'}},
  {txt: 'chup',repeatOnHold: true,icon: 'mdi:arrow-up-bold-circle',class: 'ch-plus',call_data: {domain: 'media_player',service: 'play_media'},key_data: {media_content_id: 'KEY_CHUP', media_content_type: 'send_key'}},
  {txt: 'option',icon: 'mdi:speaker-bluetooth',class: 'option',call_data: {domain: 'media_player', service: 'play_media',key_data: {media_content_id: "KEY_SOURCE", media_content_type: "send_key"}}},
  {txt: 'volumeup',repeatOnHold: true,icon: 'mdi:volume-high',class: 'vol-plus',call_data: {domain: 'media_player',service: 'volume_up'}},
  {txt: 'chdown',repeatOnHold: true,icon: 'mdi:arrow-down-bold-circle',class: 'ch-minus',call_data: {domain: 'media_player', service: 'play_media',key_data: {media_content_id: "KEY_CHDOWN", media_content_type: "send_key"}}},
  {txt: 'mute',icon: 'mdi:volume-variant-off',class: 'mute',vol: true,call_data: {domain: 'media_player',service: 'volume_mute'}},
  {txt: 'volumedown',repeatOnHold: true,icon: 'mdi:volume-medium',class:'vol-minus',call_data:{domain: 'media_player',service: 'volume_down'}},
  {txt: 'touchpadd',class: 'touch-area',call_data: {domain: 'media_player', service: 'play_media',key_data: {media_content_type: "send_key"}}}
];

class MyElement extends LitElement {
    static get properties() {
        return {
          hass: {},
          config: {}
        };
    }
  
  render() {
    return html`
            <the-tv class="${this.config.fancy_borders ? 'fancy-borders' : ''}" style="height:${window.navigator.userAgent.includes("Home Assistant") ? '100vh' : window.navigator.brave != undefined ? '80vh' : '85vh' };">
              <div id="entity-area" @dblclick="${()=>this.moreInfoAction(this)}">
                ${this.tvIconOrSource()}
                <b >${ this.config.name }</b>
                ${this.makeMeButton(0)}
              <hr>
              </div>
                ${this.buttonsContainer()}
                ${this.makeMeButton(7)}
            </the-tv>
    `;
  }

  static get styles() {
    return css`

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
    return html`<img src="${this.hass.states[this.config.entity].attributes.entity_picture}" style="margin-left:30px;">
    `;
  else 
    return html`<ha-icon icon='mdi:youtube-tv'></ha-icon>
    `;
}

buttonsContainer(){
  let container = document.createElement('div');
  container.setAttribute('id','buttons')
  for (let i = 1; i < 7; i++) {
    container.appendChild(this.makeMeButton(i));
  }
  return container;
}


makeMeButton (i){
  if(i==7){
    let touchpad = document.createElement('button');
    touchpad.classList.add(buttons[i].class);

    touchpad.addEventListener('click', e => { 
      e.stopImmediatePropagation();  
      clickTimer = setTimeout(() => { 
        if(falseCheck){ 
          console.log('click '+buttons[i].txt); 
          this.execute(8);
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
      this.execute(9);
    });
    touchpad.addEventListener('touchstart' ,e => {
      e.stopImmediatePropagation();  
      this.touchStart(e); 
      holdTimer = setTimeout(() => { 
        this.feedback('medium'); 
        console.log('hold '+buttons[i].txt);
        this.execute(10);
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

    if(buttons[i].class === 'power')
      button.style.color = this.hass.states[this.config.entity].state === 'on' ? 'green' : 'red';

    button.appendChild(icon);

    button.classList.add(buttons[i].class);

    button.addEventListener('click', e => { 
      e.stopImmediatePropagation();  
      clickTimer = setTimeout(() => { 
        if(falseCheck){ 
          this.feedback('light'); 
          console.log('click '+buttons[i].txt);
          this.execute(i);
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
            this.execute(i);
            this.feedback('selection')
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
      clearTimeout(holdTimer)
    });

    setTimeout(() => {
      window.scrollTo(0,document.body.scrollHeight);
    }, 1000);
    return button;
}
}
execute(i){
  let context = buttons[i >= 7 ? 7 : i];
  if(context.call_data.key_data != undefined)
    if(i == 8)
      this.hass.callService(context.call_data.domain,context.call_data.service,{media_content_id: 'KEY_ENTER', media_content_type: context.call_data.key_data.media_content_type},{entity_id: this.config.entity});
    else if(i == 9)
      this.hass.callService(context.call_data.domain,context.call_data.service,{media_content_id: 'KEY_RETURN', media_content_type: context.call_data.key_data.media_content_type},{entity_id: this.config.entity});
    else if(i == 10)
      this.hass.callService(context.call_data.domain,context.call_data.service,{media_content_id: 'KEY_HOME', media_content_type: context.call_data.key_data.media_content_type},{entity_id: this.config.entity});
    else
      this.hass.callService(context.call_data.domain,context.call_data.service,{media_content_id: context.key_data.media_content_id, media_content_type: context.call_data.key_data.media_content_type},{entity_id: this.config.entity});
  else
    if(context.vol != undefined)
      this.hass.callService(context.call_data.domain,context.call_data.service,{is_volume_muted: !this.hass.states[this.config.entity].attributes.is_volume_muted},{entity_id: this.config.entity});
    else
      this.hass.callService(context.call_data.domain,context.call_data.service,{entity_id: this.config.entity});
}
moreInfoAction(node){
  moreInfo.detail = {entityId: this.config.entity};
  node.dispatchEvent(moreInfo);
}
feedback(type){
  vibrate.detail = type;
  window.dispatchEvent(vibrate)
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
      ha.callService("media_player","play_media",{media_content_id: "KEY_LEFT", media_content_type: "send_key"},{entity_id: this.config.entity});
    } else {
      // swiped right
      console.log('right');
      ha.callService("media_player","play_media",{media_content_id: "KEY_RIGHT", media_content_type: "send_key"},{entity_id: this.config.entity});
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      console.log('up');
      ha.callService("media_player","play_media",{media_content_id: "KEY_UP", media_content_type: "send_key"},{entity_id: this.config.entity});
      //
    } else {
      // swiped down
      console.log('down');
      ha.callService("media_player","play_media",{media_content_id: "KEY_DOWN", media_content_type: "send_key"},{entity_id: this.config.entity});
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
class ContentCardEditor extends LitElement {

  static get properties() {
    return {
      hass: {},
      _config: {},
    };
  }
  constructor (){
    super();
    this.updateIt();
    this.tabs = {power: false,source: false,mute:false,touchpad: false,settings:true,dblclick: false,hold: false};
    this.targ = 'settings' ;

  }

  static properties = {
    select: {state: true},
    tabs: {state: true},
  };

  setConfig(config) {
    this._config = config;
    console.log(this._config);
  }

    render(){
      return html`
          <ha-select id="entity-selector"  .value="${this._config?.entity }"  label="Entità" @selected="${this.updateIt}" @closed="${ev => ev.stopPropagation()}"  >
          ${Object.keys(this.hass.states).filter(ent => ent.match('media_player[.]')).map(entity => {
                            return html` <mwc-list-item .value="${entity}">${entity}</mwc-list-item> `;
                        })}
          </ha-select>
        ${this._config?.entity != undefined ? this.makeMeTabMenu() : null}
      `;
    }  


    makeMeTabMenu(){
      return html`
        <tabbed-menu-container >
          <div class="tab-row" >
            <div class="power tab ${this.tabs.power ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:power"></ha-icon></div>
            <div class="source tab ${this.tabs.source ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:logout-variant"></ha-icon></div>
            <div class="mute tab ${this.tabs.mute ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:volume-mute"></ha-icon></div>
            <div class="touchpad tab ${this.tabs.touchpad ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:trackpad"></ha-icon></div>
            <div class="settings tab ${this.tabs.settings ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:tune"></ha-icon></div>
          </div>
          <div class="sub-tabs">
          ${this.subTabs()}
        </div>
      </tabbed-menu-container>
      `;
    }

  subTabs(){
    return html`
          <div class="sub-tabs-row ${this.tabs.settings ? 'hide' : 'show'}" >
            <div class="dblclick tab ${this.tabs.dblclick ? 'sub-selected' : ''}" @click="${this.changeTab}">Double click</div>
            <div class="hold tab ${this.tabs.hold ? 'sub-selected' : ''}" @click="${this.changeTab}">Hold</div>
          </div>
          <div class="content">
            ${this.putUpConfig()}
          </div>
    `;
  }

  putUpConfig(){
    let currSelection = Object.keys(this.tabs).filter(e => this.tabs[e] === true);
    if(currSelection[0] === 'settings')
      return this.generalConfig();
    else
      switch(currSelection[1]){
        case 'dblclick':
          return this.dblclickConfig(currSelection[0]);
        case 'hold':
          return this.holdConfig(currSelection[0]);
      }
  
  }

  dblclickConfig(a){
    return html`
    <ha-select id="dblclick-service-selector"  .value="${ this._config.options[a].dblclick }" label="Double click action" @selected="${this.updateIt }" @closed="${ev => ev.stopPropagation()}"  >
      <mwc-list-item .value="${'no-action'}">No action</mwc-list-item>
      ${Object.keys(this.hass.services.script).map(script => {
                        return html` <mwc-list-item .value="${script}">script.${script}</mwc-list-item> `;
                    })}
      </ha-select>`;
  }
  holdConfig(a){
    return html`
    <ha-select id="hold-service-selector" id="name" .value="${ this._config.options[a].hold}" label="Hold action" @selected="${ this.updateIt }" @closed="${ev => ev.stopPropagation()}"  >
      <mwc-list-item .value="${'no-action'}">No action</mwc-list-item>
      ${Object.keys(this.hass.services.script).map(script => {
                        return html` <mwc-list-item .value="${script}">script.${script}</mwc-list-item> `;
                    })}
      </ha-select>`;

  }
  generalConfig(){
    return html`
    <ha-textfield  label="displayed name(Empty for default)" id="name" .value="${this._config.name}" @input="${this.updateIt}" ></ha-textfield>
    <ha-formfield class="switch-wrapper" label="Fancy Borders"><ha-switch id="fancy-borders-selector" .checked="${this._config.fancy_borders}" @change="${this.updateIt}"></ha-switch></ha-formfield><br>
  `;
  }

  changeTab(e){
    console.log(this.tabs);
      if(e.currentTarget.classList[0].match(/^(dblclick|hold)$/))
        Object.keys(this.tabs).filter(val => val.match(/^(dblclick|hold)$/)).forEach(va => this.tabs[va] = false);
      else if (e.currentTarget.classList[0].match(/^(power|mute|source|touchpad|settings)$/)){
        Object.keys(this.tabs).forEach(e => this.tabs[e] = false);
        if(e.currentTarget.classList[0] != 'settings')
          this.tabs['dblclick'] = true;
      }
      this.tabs[e.currentTarget.classList[0]] = true;
      //console.log(this.tabs);
      //console.log(this.hass.services.script['prova_notify']);
      //this.hass.callService('script','prova_notify')
      this.requestUpdate();
    }


  updateIt(e,ha = this.hass){
    console.log(e?.target.id);
    if(e?.target.id === 'entity-selector'){
      this._config.entity = Object.keys(ha.states).filter(ent => ent.match('media_player[.]'))[e.detail.index] ;
    }
    if(this._config?.entity != undefined){
    if(!this._config.hasOwnProperty('options') || !this._config.hasOwnProperty('name')){
      this._config.name = this._config?.name?.length > 10 ? this.config.name.slice(0,10) : this._config?.name || this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().length > 10 ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().slice(0,10) : this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase();      
      this._config.options = {
        power: {dblclick: 'no-action',hold: 'no-action'},
        source: {dblclick: 'no-action',hold: 'no-action'},
        mute: {dblclick: 'no-action',hold: 'no-action'},
        touchpad: {dblclick: 'no-action',hold: 'no-action'}
      }
    }

      if(e?.target.id === 'hold-service-selector'){
        if(this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].hold != e.detail.index > 0 ? Object.keys(ha.services.script)[e.detail.index-1] : 'no-action')
          this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].hold = e.detail.index > 0 ? Object.keys(ha.services.script)[e.detail.index-1] : 'no-action' ;
        else
          return;
      }
      if(e?.target.id === 'dblclick-service-selector'){
        if(this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].dblclick != e.detail.index > 0 ? Object.keys(ha.services.script)[e.detail.index-1] : 'no-action')
          this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].dblclick = e.detail.index > 0 ? Object.keys(ha.services.script)[e.detail.index-1] : 'no-action' ;
        else
          return;
      }

      if(e?.target.id === 'name')
        this._config.name = e?.target.value === '' ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().length > 10 ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().slice(0,10) : this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase() : e?.target.value;

      if(e?.target.id === 'fancy-borders-selector' )
        this._config.fancy_borders = !this._config.fancy_borders ;
    }
    console.log('aggiorno');
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true
    });
    event.detail = {config: this._config};
    this.dispatchEvent(event); 
    this.requestUpdate();
  }

  static get styles(){
    return css`
      * {
        padding: 0.5rem;
      }
      .selected {
        border-radius: 0.9rem 0.9rem 0 0;
        padding: 0.5rem 2rem;
        background-color: #242e42
      }
      .sub-selected {
        color: white;
        padding-bottom:0;
        border-bottom: 3px solid var(--mdc-theme-primary);
        border-top: 0;
      }
      .sub-tabs-row :not(.sub-selected){
        color: gray;
      }
      .tab-row{
        margin-bottom: 0px;
        padding-bottom:0;
        padding-left:0.6rem;
      }
      ha-icon {
        color: gray;
      }
      .selected ha-icon {
        color: white
      }
      .tab-row .tab{
        
        display: inline-block;
        margin-bottom: 0px;
      }
      .sub-tabs-row .tab{
        display: inline-block;
        padding-left: 1rem;
        padding-right: 1rem;
      }
      .sub-tabs-row{
        padding-top:0;
        padding-bottom:0;
        text-align: center;
        margin:0 auto auto auto;
      }
      .content{
        display:block;
      }
      .sub-tabs {

        border-top: 3px solid var(--mdc-theme-primary);
        padding:0;
        border-radius: 0.2rem ;
        background-color: #242e42;
      }
      .hide{
        display: none;
      }
      .show{
        display: block;
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