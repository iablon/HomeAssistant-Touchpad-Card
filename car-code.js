class touchpad extends HTMLElement {
  // Whenever the state changes, a new `hass` object is set. Use this to
  // update your content.
  set hass(hass) {
    // Initialize the content if it's not there yet.
    if (!this.content) {
      this.innerHTML = `
        <ha-card header="Example-card">
          <div id="externaldiv" class="card-content"></div>
        </ha-card>
      `;
      this.content = this.querySelector('externaldiv');
    }

    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';

    this.content.innerHTML = `
      The state of ${entityId} is ${stateStr}!
    `;
  }

  // The user supplied configuration. Throw an exception and Lovelace will
  // render an error card.
  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('touchpad-card', touchpad);
