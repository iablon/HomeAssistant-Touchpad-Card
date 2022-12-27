import { html, LitElement,css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const vibrate = new Event('haptic', {bubbles: false});
const moreInfo = new Event('hass-more-info', { composed: true });
var clickTimer,holdTimer,holdInterval,falseCheck = true;

class MyElement extends LitElement {
    static get properties() {
        return {
          hass: {},
          config: {}
        };
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
        .channel_up{
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
        .channel_down{
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
        .source{
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
        .volume_up{
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
        .volume_down{
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

constructor(){
  super();
  this.t = [];
}

render() {
  this.t = Object.keys(this.config.icons).slice(2);
  return html`
    <the-tv class="${this.config.fancy_borders ? 'fancy-borders' : ''}" 
    style=" ${document.body.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('app-drawer-layout').querySelector('partial-panel-resolver').querySelector('ha-panel-lovelace').shadowRoot.querySelector('hui-root').shadowRoot.querySelector('ha-app-layout').className === '' ? 'touch-action: none;' : ''} height:${window.navigator.userAgent.includes("Home Assistant") ? '100vh' : window.navigator.brave != undefined ? '80vh' : '85vh' };">
      <div id="entity-area" @dblclick="${()=>this.moreInfoAction(this)}">
        ${this.tvIconOrSource()}
        <b >${ this.config.name }</b>
        ${this.baseButton('power')}
      <hr>
      </div>
      <div id="buttons">
        ${this.t.map(elm => this.baseButton(elm))}
      </div>
        ${this.touchpad()}
    </the-tv>
  `;
}

tvIconOrSource(){
  if(this.hass.states[this.config.entity].attributes.entity_picture != undefined)
    return html`<img src="${this.hass.states[this.config.entity].attributes.entity_picture}" style="margin-left:30px;">
    `;
  else 
    return html`<ha-icon icon="${this.config?.icons?.topicon}"></ha-icon>
    `;
}

baseButton(cssName){
  let button = document.createElement('button');
  button.classList.add(cssName);
  if(cssName === 'power')
    button.style.color = this.hass.states[this.config.entity].state === 'on' ? 'green' : 'red';
  let icon = document.createElement('ha-icon');
  icon.setAttribute('icon',this.config.icons[cssName]);
  button.appendChild(icon);
  button.addEventListener('click', e => { 
    e.stopImmediatePropagation();  
    clickTimer = setTimeout(() => { 
      if(falseCheck){ 
        this.feedback('light'); 
        this.execute({type: 'click',src: cssName});
      } 
      falseCheck=true;
    }, 210);
  });

  button.addEventListener('touchstart',e => {
    e.stopImmediatePropagation(); 
    holdTimer = setTimeout(() => { 
      this.feedback('light'); 
      if(cssName.match(/^(channel_up|channel_down|volume_up|volume_down)$/)) 
        holdInterval = setInterval(() => { 
          this.execute({type: 'repeat',src: cssName});
          this.feedback('selection')
        }, 450);
      else
        this.execute({type: 'hold',src: cssName});
      }, 600);
    });

  button.addEventListener('dblclick',e => {
    e.stopImmediatePropagation(); 
    falseCheck = false; 
    clearTimeout(clickTimer); 
    clickTimer = null; 
    this.execute({type: 'dblclick',src: cssName});
    this.feedback('success');  
  });

  button.addEventListener('touchend',e=>{
    e.stopImmediatePropagation(); 
    clearInterval(holdInterval); 
    clearTimeout(clickTimer);
    clearTimeout(holdTimer)
  });
  return button;
}

touchpad (){
    let touchpad = document.createElement('button');
    touchpad.classList.add('touch-area');

    touchpad.addEventListener('click', e => { 
      e.stopImmediatePropagation();  
      clickTimer = setTimeout(() => { 
        if(falseCheck){ 
          this.execute({type: 'click',src: 'touchpad'});
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
      this.execute({type: 'dblclick',src: 'touchpad'});
    });
    touchpad.addEventListener('touchstart' ,e => {
      e.stopImmediatePropagation();  
      this.touchStart(e); 
      holdTimer = setTimeout(() => { 
        this.feedback('medium'); 
        this.execute({type: 'hold',src: 'touchpad'});
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

execute(act){
  switch (act.type) {
    case 'click':
      switch (act.src) {
        case 'power':
          this.hass.callService('homeassistant','toggle',{entity_id: this.config.entity});
          break;
        case 'channel_up':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_CHUP',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
        case 'channel_down':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_CHDOWN',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
        case 'volume_up':
          this.hass.callService('media_player','volume_up',{entity_id: this.config.entity});
          break;
        case 'volume_down':
          this.hass.callService('media_player','volume_down',{entity_id: this.config.entity});
          break;
        case 'source':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_SOURCE',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
        case 'mute':
          this.hass.callService('media_player','volume_mute',{is_volume_muted: !this.hass.states[this.config.entity].attributes.is_volume_muted},{entity_id: this.config.entity});
          break;
        case 'touchpad':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_ENTER',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
      }
      break;
    case 'dblclick':
      switch(act.src){
        case 'power':
          console.log('db power');
          if(this.config.options.power.dblclick  !== 'no-action')
            if(this.config.options.power.dblclick.substring(0,this.config.options.power.dblclick.indexOf('.')) === 'script')
              this.hass.callService('script', this.config.options.power.dblclick.substring(this.config.options.power.dblclick.indexOf('.')+1))
            else
              this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.power.dblclick});
          break;
        case 'source':
          if(this.config.options.source.dblclick  !== 'no-action')
            if(this.config.options.source.dblclick.substring(0,this.config.options.source.dblclick.indexOf('.')) === 'script')
              this.hass.callService('script', this.config.options.source.dblclick.substring(this.config.options.source.dblclick.indexOf('.')+1))
            else
              this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.source.dblclick});
          break;
        case 'mute':
          if(this.config.options.mute.dblclick  !== 'no-action')
            if(this.config.options.mute.dblclick.substring(0,this.config.options.mute.dblclick.indexOf('.')) === 'script')
              this.hass.callService('script', this.config.options.mute.dblclick.substring(this.config.options.mute.dblclick.indexOf('.')+1))
            else
              this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.mute.dblclick});
          break;
        case 'touchpad':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_RETURN',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
      }
      break;
    case 'repeat':
      switch (act.src) {
        case 'volume_up':
          this.hass.callService('media_player','volume_up',{entity_id: this.config.entity});
          break;
        case 'volume_down':
          this.hass.callService('media_player','volume_down',{entity_id: this.config.entity});
          break;
        case 'channel_up':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_CHUP',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
        case 'channel_down':
          this.hass.callService('media_player','play_media',{media_content_id: 'KEY_CHDOWN',media_content_type: 'send_key'},{entity_id: this.config.entity});
          break;
      }
      break;
    case 'hold':
      switch(act.src){
      case 'power':
        if(this.config.options.power.hold  !== 'no-action')
          if(this.config.options.power.hold.substring(0,this.config.options.power.hold.indexOf('.')) === 'script')
            this.hass.callService('script', this.config.options.power.hold.substring(this.config.options.power.hold.indexOf('.')+1))
          else
            this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.power.hold});
        break;
      case 'source':
        if(this.config.options.source.hold  !== 'no-action')
          if(this.config.options.source.hold.substring(0,this.config.options.source.hold.indexOf('.')) === 'script')
            this.hass.callService('script', this.config.options.source.hold.substring(this.config.options.source.hold.indexOf('.')+1))
          else
            this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.source.hold});
        break;
      case 'mute':
        if(this.config.options.mute.hold  !== 'no-action')
          if(this.config.options.mute.hold.substring(0,this.config.options.mute.hold.indexOf('.')) === 'script')
            this.hass.callService('script', this.config.options.mute.hold.substring(this.config.options.mute.hold.indexOf('.')+1))
          else
            this.hass.callService('automation', 'trigger' ,{entity_id: this.config.options.mute.hold});
        break;
      case 'touchpad':
        this.hass.callService('media_player','play_media',{media_content_id: 'KEY_HOME',media_content_type: 'send_key'},{entity_id: this.config.entity});
        break;
        }
        break;
    }
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
    if (diffX > 0) {
      ha.callService("media_player","play_media",{media_content_id: "KEY_LEFT", media_content_type: "send_key"},{entity_id: this.config.entity});
    } else {
      ha.callService("media_player","play_media",{media_content_id: "KEY_RIGHT", media_content_type: "send_key"},{entity_id: this.config.entity});
    }  
  } else {
    if (diffY > 0) {
      ha.callService("media_player","play_media",{media_content_id: "KEY_UP", media_content_type: "send_key"},{entity_id: this.config.entity});
    } else {
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
    this.tabs = {power: false,source: false,mute:false,touchpad: false,otherIcon: false,settings:true,icon: false,dblclick: false,hold: false,volume: false,channel: false};
    this.targ = '';
  }

  static properties = {
    select: {state: true},
    tabs: {state: true},
  };

  setConfig(config) {
    this._config = config;
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
            <div class="otherIcon tab ${this.tabs.otherIcon ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:plus-minus-variant"></ha-icon></div>
            <div class="settings tab ${this.tabs.settings ? 'selected' : ''}" @click="${this.changeTab}"><ha-icon icon="mdi:tune"></ha-icon></div>
          </div>
          <div class="sub-tabs">
          ${this.subTabs()}
        </div>
      </tabbed-menu-container>
      `;
    }

  subTabs(){
    let normalCase =  html`
          <div class="sub-tabs-row ${this.tabs.settings ? 'hide' : 'show'}" >
            <div class="dblclick tab ${this.tabs.dblclick ? 'sub-selected' : ''}" @click="${this.changeTab}">Double click</div>
            <div class="hold tab ${this.tabs.hold ? 'sub-selected' : ''}" @click="${this.changeTab}">Hold</div>
            <div style="display:${Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0] === 'touchpad' ? 'none' : 'inline-block'};" class="icon tab ${this.tabs.icon ? 'sub-selected' : ''}" @click="${this.changeTab}">Icon</div>
          </div>
          <div class="content">
            ${this.putUpConfig()}
          </div>
    `;

    let otherIcon = html`
    <div class="sub-tabs-row show" >
      <div class="volume tab ${this.tabs.volume ? 'sub-selected' : ''}" @click="${this.changeTab}">Volume</div>
      <div class="channel tab ${this.tabs.channel ? 'sub-selected' : ''}" @click="${this.changeTab}">Channel</div>
    </div>
    <div class="content">
      ${this.putUpConfig()}
    </div>
`;

    if(Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0] !== 'otherIcon')
      return normalCase;
    else
      return otherIcon;
      
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
        case 'icon':
          return this.iconConfig(currSelection[0]); 
        case 'volume':
          return this.doubleIconConfig(currSelection[1]);
        case 'channel':
          return this.doubleIconConfig(currSelection[1]);
      }
  }

  doubleIconConfig(a){
    return html`
    ${this.iconConfig(a+'-up')}
    ${this.iconConfig(a+'-down')}`;
  }

  iconConfig(a){
    return html`
          <ha-icon-picker id="icon-selector" label="${a === 'topicon' ? 'Entity' : a} button icon" @opened-changed="${this.updateIt}" @value-changed="${this.updateIt}" .value="${a.includes('-') ? this._config.icons[a.replace('-','_')] : this._config.icons[a]}" ></ha-icon-picker>
        `;
  } 

  dblclickConfig(a){
    return html`
    <ha-select id="dblclick-service-selector"  .value="${ this._config.options[a].dblclick }" label="Script to invoke on double click" @selected="${this.updateIt }" @closed="${ev => ev.stopPropagation()}"  >
      <mwc-list-item .value="${'no-action'}">None</mwc-list-item>
      ${Object.keys(this.hass.states).filter(ent => ent.match(/automation|script/)).map(action => {
                            return html` <mwc-list-item .value="${action}">${action}</mwc-list-item> `;
                        })}
      </ha-select>`;
  }
  holdConfig(a){
    return html`
    <ha-select id="hold-service-selector" .value="${ this._config.options[a].hold}" label="Script to invoke on hold" @selected="${ this.updateIt }" @closed="${ev => ev.stopPropagation()}"  >
      <mwc-list-item .value="${'no-action'}">None</mwc-list-item>
      ${Object.keys(this.hass.states).filter(ent => ent.match(/automation|script/)).map(action => {
                        return html` <mwc-list-item .value="${action}">${action}</mwc-list-item> `;
                    })}
      </ha-select>`;

  }
  generalConfig(){
    if(this._config.hasOwnProperty('icons') & this._config.hasOwnProperty('name')){
      return html`
      <ha-textfield label="displayed name(Empty for default)" id="name" .value="${this.targ}"  @input="${this.updateIt}" @focus="${this.targ = this._config.name}" @blur="${this.updateIt}"></ha-textfield>
      ${this.iconConfig('topicon')}
      <ha-formfield style="padding:1rem;padding-left:0;" class="switch-wrapper" label="Fancy Borders"><ha-switch id="fancy-borders-selector" .checked="${this._config.fancy_borders}" @change="${this.updateIt}"></ha-switch></ha-formfield>
    `;
    }
  }
  changeTab(e){
      if(e.currentTarget.classList[0].match(/^(dblclick|hold|icon|volume|channel)$/))
        Object.keys(this.tabs).filter(val => val.match(/^(dblclick|hold|icon|volume|channel)$/)).forEach(va => this.tabs[va] = false);
      else if (e.currentTarget.classList[0].match(/^(power|mute|source|touchpad|otherIcon|settings)$/)){
        Object.keys(this.tabs).forEach(e => this.tabs[e] = false);
        if(e.currentTarget.classList[0] != 'settings' )
          if(e.currentTarget.classList[0] === 'otherIcon')
            this.tabs['volume'] = true;
          else
            this.tabs['dblclick'] = true;
      }
      this.tabs[e.currentTarget.classList[0]] = true;
      this.requestUpdate();
    }


  updateIt(e,ha = this.hass){
    if(e?.target.id === 'entity-selector'){
      this._config.entity = Object.keys(ha.states).filter(ent => ent.match('media_player[.]'))[e.detail.index] ;
    }
    if(this._config?.entity != undefined){
    if(!this._config.hasOwnProperty('name')){
      this._config.name = this._config?.name?.length > 10 ? this.config.name.slice(0,10) : this._config?.name || this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().length > 10 ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().slice(0,10) : this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase();      
    }
    if(!this._config.hasOwnProperty('options')){
      this._config.options = {
        power: {dblclick: 'no-action',hold: 'no-action'},
        source: {dblclick: 'no-action',hold: 'no-action'},
        mute: {dblclick: 'no-action',hold: 'no-action'},
        touchpad: {dblclick: 'no-action',hold: 'no-action'}
      }
    }
    if(this._config.hasOwnProperty('icons')){
      this._config.icons = {
        topicon: this._config.icons.topicon === undefined ? 'mdi:youtube-tv' : this._config.icons.topicon,
        power: this._config.icons.power === undefined ? 'mdi:power' : this._config.icons.power,
        channel_up: this._config.icons.channel_up === undefined ? 'mdi:arrow-up-bold-circle' : this._config.icons.channel_up,
        channel_down: this._config.icons.channel_down === undefined ? 'mdi:arrow-down-bold-circle' : this._config.icons.channel_down,
        source: this._config.icons.source === undefined ? 'mdi:logout-variant' : this._config.icons.source,
        mute: this._config.icons.mute ? 'mdi:volume-variant-off' : this._config.icons.mute,
        volume_up: this._config.icons.volume_up === undefined ? 'mdi:volume-high' : this._config.icons.volume_up,
        volume_down: this._config.icons.volume_down === undefined ? 'mdi:volume-medium' : this._config.icons.volume_down
      }
    }
    else{
      this._config.icons = {
        topicon: 'mdi:youtube-tv',
        power: 'mdi:power',
        channel_up: 'mdi:arrow-up-bold-circle',
        channel_down: 'mdi:arrow-down-bold-circle',
        source: 'mdi:logout-variant',
        mute: 'mdi:volume-variant-off',
        volume_up: 'mdi:volume-high',
        volume_down: 'mdi:volume-medium'
      }
    }

      if(e?.target.id === 'hold-service-selector'){
        if(this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].hold !== e.target.value)
          this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].hold = e.target.value === 'no-action' ? 'no-action' : e.target.value ;
        else
          return;
      }
      if(e?.target.id === 'dblclick-service-selector'){
        if(this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].dblclick != e.target.value)
          this._config.options[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]].dblclick = e.target.value === 'no-action' ? 'no-action' : e.target.value ;
        else
          return;
      }
      if(e?.target.id === 'icon-selector'){
        if(Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0] === 'otherIcon')
          this._config.icons[e.target.label.slice(0,e.target.label.indexOf(' ')).replace('-','_')] = e?.target?.value === undefined ? this._config.icons[e.target.label.slice(0,e.target.label.indexOf(' ')).replace('-','_')] : e?.target?.value;
        else if(Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0] === 'settings')
          this._config.icons['topicon'] = e?.target?.value === undefined ? this._config.icons['topicon'] : e?.target?.value;
        else
          this._config.icons[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]] = e?.target?.value === undefined ? this._config.icons[Object.keys(this.tabs).filter(e => this.tabs[e] === true)[0]] : e?.target?.value;
        
      }
      if(e?.target.id === 'name'){
        this.targ = e?.target.value;
        this._config.name = e?.target.value === '' ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().length > 10 ? this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase().slice(0,10) : this.hass.states[this._config?.entity].attributes.friendly_name.toUpperCase() : e?.target.value;
      }
      if(e?.target.id === 'fancy-borders-selector' )
        this._config.fancy_borders = !this._config.fancy_borders ;
    }
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
      .content > *{
        padding:0;
        width:100%;
      }
      * {
        
        padding: 0.4rem;
      }
      .selected {
        border-radius: 0.9rem 0.9rem 0 0;
        padding: 0.5rem 1.7rem;
        background-color: var(--mdc-theme-primary);
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
        background-color: var(--card-background-color);
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