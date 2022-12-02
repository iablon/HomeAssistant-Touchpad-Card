var fireEvent = function (node, type, detail, options) {
  options = options || {};
  detail = detail === null || detail === undefined ? {} : detail;
  var event = new Event(type, {
      bubbles: false
  });
  event.detail = detail;
  node.dispatchEvent(event);
  return event;
};

class touch extends HTMLElement {

  set hass(hass) {
    let card;
    const entityId = this.config.entity;
    const speaker = this.config.speaker;
    const state = hass.states[entityId];
    const vol_state = state.attributes.is_volume_muted;
    const name = state.attributes.friendly_name;
    const source = state.attributes.entity_picture;
    
    if(typeof(document.querySelector('ha-card')) === 'undefined' || document.querySelector('ha-card') === null){
      //load css
    this.innerHTML = `<head><link rel="stylesheet" href="/local/touchpad-card/style.css"></head>`;
      //card creation
    card = document.createElement('ha-card');
      //card insertion
    this.appendChild(card);
      //entity details area
    const entityArea = document.createElement('entity-area');
            //source image
          const sourceImage = document.createElement('source-img');
          sourceImage.style.cssText = `background: url(${source});display:none;background-size: contain;border-radius: 15px;height: 40px;width: 40px;touch-action: none;margin: 20px 0px 20px 20px;float: left;`;
      entityArea.appendChild(sourceImage);
          const tvName = document.createElement('b');
          tvName.innerText = `${name}`;
          tvName.style.cssText = 'margin: 30px auto auto 25px; position:relaive;display: inline-block; font-size: 23px;font-style:bold;text-shadow: 3px 3px 0px rgba(0,0,0,0.2);text-transform: uppercase;';
      entityArea.appendChild(tvName);
          const powerBtn = document.createElement('button');
          powerBtn.classList.add('power','off');
          //change color and make source image appear if on
          if(state.state === 'on'){
            powerBtn.classList.replace('off','on');
            sourceImage.style.display = 'block';
          }
          powerBtn.innerHTML = `<ha-icon icon="mdi:power" ></ha-icon>`;
      entityArea.appendChild(powerBtn);
          powerBtn.addEventListener('click',event => {
            fireEvent(window,'haptic','light');
            event.stopImmediatePropagation();
            hass.callService("homeassistant","toggle",{entity_id: entityId});
          });
          const divider = document.createElement('hr');
    entityArea.appendChild(divider);
      //entity details area insertion
    card.appendChild(entityArea);
      //control buttons area
    const controlButtons = document.createElement('control-buttons');
        //channel + or speaker vol +
    const chpBtn = document.createElement('button');
    chpBtn.className = 'chp';
    chpBtn.innerHTML = '<ha-icon icon="mdi:server-plus"></ha-icon>';
    
    chpBtn.addEventListener('click',event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("media_player","volume_up",{entity_id: speaker});
    });
        //channel + or speaker vol + insertion
    controlButtons.appendChild(chpBtn);
        //channel - or speaker vol -
    const chmBtn = document.createElement('button');
    chmBtn.className = 'chm';
    chmBtn.innerHTML = '<ha-icon icon="mdi:server-minus"></ha-icon>';
    chmBtn.addEventListener('click',event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("media_player","volume_down",{entity_id: speaker});
    });
        //channel - or speaker vol - insertion
    controlButtons.appendChild(chmBtn);
        //src or other something
    const srcBtn = document.createElement('button');
    srcBtn.className = 'src';
    srcBtn.innerHTML = '<ha-icon icon="mdi:speaker-bluetooth"></ha-icon>';
    srcBtn.addEventListener('click', event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("homeassistant","toggle",{entity_id: speaker});
    });
        //src or other something insertion 
    controlButtons.appendChild(srcBtn);
        //mute 
    const muteBtn = document.createElement('button');
    muteBtn.className = 'mute';
    muteBtn.innerHTML = '<ha-icon icon="mdi:volume-variant-off"></ha-icon>';
    muteBtn.addEventListener('click', event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("media_player","volume_mute",{is_volume_muted: !vol_state},{entity_id: entityId});
    });
        //mute insertion 
    controlButtons.appendChild(muteBtn);
        //volume plus
    const volpBtn = document.createElement('button');
    volpBtn.className = 'volp';
    volpBtn.innerHTML = '<ha-icon icon="mdi:volume-high"></ha-icon>';
    volpBtn.addEventListener('click', event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("media_player","volume_up",{entity_id: entityId});
    });
        //volume plus insertion 
    controlButtons.appendChild(volpBtn);
        //volume minus
    const volmBtn = document.createElement('button');
    volmBtn.className = 'volm';
    
    volmBtn.innerHTML = '<ha-icon icon="mdi:volume-low"></ha-icon>';
    volmBtn.addEventListener('click', event =>{
      fireEvent(window,'haptic','light');
      event.stopImmediatePropagation();
      hass.callService("media_player","volume_down",{entity_id: entityId}
    );});
        //volume minus insertion 
    controlButtons.appendChild(volmBtn);
      //buttons insertion
    card.appendChild(controlButtons);
      //touchpad
    const touchArea = document.createElement('touch-area');
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


function handleClicks(a,ha,ent){
  if(a === 3 ){
    //hold
    
    ha.callService("media_player","play_media",{media_content_id: "KEY_HOME", media_content_type: "send_key"},{entity_id: ent});
    fireEvent(window,'haptic','heavy');
    
  }
  if(a === 1 ){
    
    //click
    
    ha.callService("media_player","play_media",{media_content_id: "KEY_ENTER", media_content_type: "send_key"},{entity_id: ent});
    fireEvent(window,'haptic','light');
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
      fireEvent(window,'haptic','selection');
    } else {
      // swiped right
      ha.callService("media_player","play_media",{media_content_id: "KEY_RIGHT", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','selection');
    }  
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      ha.callService("media_player","play_media",{media_content_id: "KEY_UP", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','selection');
    } else {
      // swiped down
      
      ha.callService("media_player","play_media",{media_content_id: "KEY_DOWN", media_content_type: "send_key"},{entity_id: ent});
      fireEvent(window,'haptic','selection');
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



