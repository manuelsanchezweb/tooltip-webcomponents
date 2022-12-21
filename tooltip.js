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
    // Create the shadow root
    this.attachShadow({ mode: "open" });

    // Create the style element and add your styles to it
    const style = document.createElement("style");
    style.textContent = `
      .tooltip {
        display: inline-flex;
        position: relative;
        padding: 15px;
        color: gray;
      }
      
      .tooltip__message {
        position: absolute;
        z-index: 1;
        background: white;
        border: 1px solid black;
        font-size: 0.8rem;
        line-height: 1rem;
        padding: 15px 10px;
        width: max-content;
        max-width: 200px;
        display: none;
      }
      
      .tooltip:hover .tooltip__message,
      .tooltip:focus .tooltip__message {
        display: block;
      }

      .tooltip:focus {
        outline: none !important;
      }
      
      .tooltip__message::after {
        content: "";
        position: absolute;
        z-index: 2000;
        background: black;
        width: 15px;
        height: 15px;
      }

      .tooltip--top {
        top: -40px;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .tooltip--top::after {
        clip-path: polygon(50% 100%, 0 0, 100% 0);
        transform: translateX(-50%);
        left: 50%;
        bottom: -15px;
      }
      
      .tooltip--bottom {
        bottom: -80px;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      
      .tooltip--bottom::after {
        clip-path: polygon(100% 100%, 0 100%, 50% 0);
        transform: translateX(-50%);
        left: 50%;
        top: -15px;
      }
      
      .tooltip--left {
        left: -200px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .tooltip--left::after {
        clip-path: polygon(0 100%, 100% 50%, 0 0);
        transform: translateY(-50%);
        right: -15px;
        top: 50%;
      }
      
      .tooltip--right {
        right: -200px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .tooltip--right::after {
        clip-path: polygon(100% 100%, 0 50%, 100% 0);
        transform: translateY(-50%);
        left: -15px;
        top: 50%;
      }
      
      @media screen and (max-width: 520px) {
        .tooltip__message {
          position: fixed;
          width: 90%;
          height: 30%;
          transform: translate(-50%, -50%) !important;
          left: 50% !important;
          top: 50% !important;
          display: none;
        }
      
        .tooltip__message:after {
          display: none;
        }
      
        .tooltip:hover::before,
        .tooltip:focus::after {
          content: "";
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-color: rgba(0, 0, 0, 0.5);
          pointer-events: none;
        }
      }
    `;

    // Add the style element to the shadow root
    this.shadowRoot.appendChild(style);

    // Create the content element
    const content = document.createElement("div");
    content.innerHTML = `
          <div class="tooltip" role="tooltip" tabindex="0">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-info"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <div class="tooltip__message tooltip--${this._direction}">
                  ${this._message}
              </div>
          </div>
        `;

    // Add the content element to the shadow root
    this.shadowRoot.appendChild(content);
  }
}

window.customElements.define("tooltip-icon", TooltipIcon);
