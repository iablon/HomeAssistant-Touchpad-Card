import { html, LitElement,css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';

const vibrate = new Event('haptic', {bubbles: false});
const moreInfo = new Event('hass-more-info', { composed: true });

var clickTimer,holdTimer,holdInterval,falseCheck = false;

let bool=false;
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
    return button;
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


class ContentCardEditor extends LitElement {

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
      return html`
          <ha-select id="entity-selector" naturalMenuWidth fixedMenuPosition label="Entità" @selected="${this.updateIt}" @closed="${ev => ev.stopPropagation()}"  >
          ${Object.keys(this.hass.states).filter(ent => ent.match('media_player[.]')).map(entity => {
                            return html` <mwc-list-item .value="${entity}">${entity}</mwc-list-item> `;
                        })}
          </ha-select><br>
          <ha-formfield class="switch-wrapper"  label="Fancy Borders">
          <ha-switch id="fancy-borders-selector" .checked="${this._config.fancy_borders}" @change="${this.updateIt}"></ha-switch>
        </ha-formfield>
      `;
    }  

  updateIt(e,ha = this.hass){
    if(e.target.id === 'entity-selector'){
      bool = true;
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
    return css`
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