class TooltipIcon extends HTMLElement {
  constructor() {
    super();
    this._message = "Este es el mensaje por defecto";
    this._direction = "top"; // Direction by default
  }

  static get observedAttributes() {
    return ["message", "direction"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "message") {
      this._message = newValue;
    }
    if (name === "direction") {
      this._direction = newValue;
    }
  }

  connectedCallback() {
    this.innerHTML = `
        <div class="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <div class="tooltip__message tooltip--${this._direction}">
                ${this._message}
            </div>
        </div>
      `;
  }
}

window.customElements.define("tooltip-icon", TooltipIcon);
