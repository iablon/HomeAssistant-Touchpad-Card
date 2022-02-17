import {fireEvent} from './local/fireEvent';
class touch extends HTMLElement {


  set hass(hass) {
    
    const entityId = this.config.entity;
    const speaker = this.config.speaker;
    const state = hass.states[entityId];
    const icon = state.attributes.icon;
    const name = state.attributes.friendly_name;
    

    if(!document.querySelector('ha-card')){
      //load css
    this.innerHTML = `<head><link rel="stylesheet" href="/local/style.css"></head>`;
      //card creation
    const card = document.createElement('ha-card');
      //card insertion
    this.appendChild(card);
      //entity area
    const entityArea = document.createElement('entity-area');
      //name and icon of tv
    entityArea.innerHTML += `<entity-data><ha-icon icon=${icon}></ha-icon>&ensp;<b style='font-size:15px;'>${name}</b></entity-data>`;
      //power button
    const powerBtn = document.createElement('button');
    powerBtn.className = 'power';
    powerBtn.innerHTML = `<ha-icon icon="mdi:power" ></ha-icon>`;
    entityArea.appendChild(powerBtn);
    powerBtn.addEventListener('click',event =>{toggleP(event,hass,entityId)});
    const hr = document.createElement('hr');
    entityArea.appendChild(hr);
      //entity area insertion
    card.appendChild(entityArea);
      //buttons
    const controlButtons = document.createElement('control-buttons');
        //channel + or speaker vol +
    const chpBtn = document.createElement('button');
    chpBtn.className = 'chp';
    chpBtn.innerHTML = '<ha-icon icon="mdi:server-plus"></ha-icon>';
    chpBtn.addEventListener('click',event =>{Fchp(event,hass,speaker)});
        //channel + or speaker vol + insertion
    controlButtons.appendChild(chpBtn);
        //channel - or speaker vol -
    const chmBtn = document.createElement('button');
    chmBtn.className = 'chm';
    chmBtn.innerHTML = '<ha-icon icon="mdi:server-minus"></ha-icon>';
    chmBtn.addEventListener('click',event =>{Fchm(event,hass,speaker)});
        //channel - or speaker vol - insertion
    controlButtons.appendChild(chmBtn);
        //src or other something
    const srcBtn = document.createElement('button');
    srcBtn.className = 'src';
    srcBtn.innerHTML = '<ha-icon icon="mdi:speaker-bluetooth"></ha-icon>';
    srcBtn.addEventListener('click', event =>{Fsrc(event,hass,speaker)});
        //src or other something insertion 
    controlButtons.appendChild(srcBtn);
        //mute 
    const muteBtn = document.createElement('button');
    muteBtn.className = 'mute';
    muteBtn.innerHTML = '<ha-icon icon="mdi:volume-variant-off"></ha-icon>';
    muteBtn.addEventListener('click', event =>{Fmute(event,hass,speaker)});
        //mute insertion 
    controlButtons.appendChild(muteBtn);
        //volume plus
    const volpBtn = document.createElement('button');
    volpBtn.className = 'volp';
    volpBtn.innerHTML = '<ha-icon icon="mdi:volume-high"></ha-icon>';
    volpBtn.addEventListener('click', event =>{Fvolp(event,hass,entityId)});
        //volume plus insertion 
    controlButtons.appendChild(volpBtn);
        //volume minus
    const volmBtn = document.createElement('button');
    volmBtn.className = 'volm';
    volmBtn.innerHTML = '<ha-icon icon="mdi:volume-low"></ha-icon>';
    volmBtn.addEventListener('click', event =>{Fvolm(event,hass,entityId)});
        //volume minus insertion 
    controlButtons.appendChild(volmBtn);
      //buttons insertion
    card.appendChild(controlButtons);
      //touchpad
    const touchArea = document.createElement('toucharea');
      //touchpad magic
      var holdtimer=null;
  var timer=null;
  touchArea.addEventListener('touchstart', event => {
    event.stopImmediatePropagation();
    touchStart(event);
    holdtimer = setTimeout(function(){
      //hold
      handleClicks(3,hass,entityId);
      
    }, 700);
  });
  //  click
  touchArea.addEventListener('click', event => {
    event.stopImmediatePropagation();
    if (event.detail === 1) {
      timer = setTimeout(function(){
        
          handleClicks(1,hass,entityId);
      }, 200);
    }
  });
//db click
  touchArea.addEventListener('dblclick', event => {
    event.stopImmediatePropagation();
    clearTimeout(timer);
    timer = null;
    handleClicks(2,hass,entityId);
  });

  touchArea.addEventListener('touchend', event => {
    clearTimeout(timer);
    clearTimeout(holdtimer);
    holdtimer = null;
  });
  touchArea.addEventListener('touchmove', event => {
    touchMove(event,hass,entityId);
    
  });
    
    
    card.appendChild(touchArea);
    
    
    }
    
    
  }
  
  setConfig(config) {
    this.config = config;
  }
  

}

function toggleP(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("homeassistant","toggle",{entity_id: ent});
}
function Fchp(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("media_player","volume_up",{entity_id: ent});
}
function Fchm(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("media_player","volume_down",{entity_id: ent});
}
function Fsrc(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("homeassistant","toggle",{entity_id: ent});
}
function Fmute(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("remote","send_command",{device: 'fenda',command: 'mute'},{entity_id: 'remote.bob_remote'});
}
function Fvolp(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("media_player","volume_up",{entity_id: ent});
}
function Fvolm(event,ha,ent){
  fireEvent(window,'haptic','light');
  event.stopImmediatePropagation();
  ha.callService("media_player","volume_down",{entity_id: ent});
}
function handleClicks(a,ha,ent){
  if(a === 3 ){
    //hold
    
    ha.callService("media_player","play_media",{media_content_id: "KEY_HOME", media_content_type: "send_key"},{entity_id: ent});
    fireEvent(window,'haptic','heavy');

  }
  if(a === 1 ){
    
    //click
    
    ha.callService("media_player","play_media",{media_content_id: "KEY_ENTER", media_content_type: "send_key"},{entity_id: ent});
    fireEvent(window,'haptic','selection');
  }
  if(a === 2){
    //double click
    ha.callService("media_player","play_media",{media_content_id: "KEY_RETURN", media_content_type: "send_key"},{entity_id: ent});
    fireEvent(window,'haptic','success');
  }
}



function touchStart(event){
  window.initialX = event.touches[0].clientX;
  window.initialY = event.touches[0].clientY;
}



function touchMove(event,ha,ent) {
  if( ! initialX || ! initialY){
    return;
  }
  
  var currentX = event.touches[0].clientX;
  var currentY = event.touches[0].clientY;
 
  var diffX = initialX - currentX;
  var diffY = initialY - currentY;
  
  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      ha.callService("media_player","play_media",{media_content_id: "KEY_LEFT", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','light');
    } else {
      // swiped right
      ha.callService("media_player","play_media",{media_content_id: "KEY_RIGHT", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','light');
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      ha.callService("media_player","play_media",{media_content_id: "KEY_UP", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','light');
    } else {
      // swiped down
      
      ha.callService("media_player","play_media",{media_content_id: "KEY_DOWN", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','light');
    }  
  }
  initialX = null;
  initialY = null;
}

customElements.define("touchpad-card", touch);
customCards = customCards || [];
customCards.push({
  type: 'touchpad-card',
  name: 'touchpad Card',
  description: 'Control your TV with ease',
});

