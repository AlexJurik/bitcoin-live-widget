/**
 * Crypto Price Ticker Web Component
 *
 * Usage:
 * 1. Include this script: <script src="crypto-ticker.js"></script>
 * 2. Add the component: <crypto-ticker></crypto-ticker>
 *
 * Optional attributes:
 * - refresh-interval: Update interval in seconds (default: 30)
 * - token: Display token (default: "BTC")
 * - currency: Display currency (default: "USD")
 * - theme: "dark" or "light" (default: "dark")
 *
 * Example:
 * <crypto-ticker refresh-interval="60" token="BTC" currency="USD" theme="dark"></crypto-ticker>
 */

class CryptoTicker extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.previousPrice = null;
    this.currentPrice = null;
    this.priceDirection = null;
    this.intervalId = null;
  }

  static get observedAttributes() {
    return ["refresh-interval", "token", "currency", "theme"];
  }

  get refreshInterval() {
    return parseInt(this.getAttribute("refresh-interval") || "30", 10) * 1000;
  }

  get token() {
    return this.getAttribute("token") || "BTC";
  }

  get currency() {
    return this.getAttribute("currency") || "USD";
  }

  get theme() {
    return this.getAttribute("theme") || "dark";
  }

  get icon() {
    return `https://cdn.jsdelivr.net/gh/spothq/cryptocurrency-icons@master/svg/color/${this.token.toLowerCase()}.svg`;
  }

  connectedCallback() {
    this.render();
    this.fetchPrice();
    this.intervalId = setInterval(
      () => this.fetchPrice(),
      this.refreshInterval,
    );
  }

  disconnectedCallback() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  async fetchPrice() {
    try {
      const instrument = `${this.token}-${this.currency}`;
      const response = await fetch(
        `https://data-api.coindesk.com/spot/v1/latest/tick?market=coinbase&instruments=${instrument}&apply_mapping=true`,
      );
      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();
      const tickData = data.Data?.[instrument];
      const newPrice = tickData?.PRICE;

      if (newPrice) {
        this.previousPrice = this.currentPrice;
        this.currentPrice = newPrice;

        if (this.previousPrice !== null) {
          if (this.currentPrice > this.previousPrice) {
            this.priceDirection = "up";
          } else if (this.currentPrice < this.previousPrice) {
            this.priceDirection = "down";
          } else {
            this.priceDirection = "neutral";
          }
        }

        this.updateDisplay();
      }
    } catch (error) {
      console.error("Crypto Ticker Error:", error);
      this.showError();
    }
  }

  formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }

  getStyles() {
    const isDark = this.theme === "dark";

    return `
      :host {
        display: inline-block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      .ticker {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 14px;
        border-radius: 9999px;
        background: ${
          isDark
            ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)"
            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)"
        };
        border: 1px solid ${isDark ? "rgba(100, 116, 139, 0.3)" : "rgba(100, 116, 139, 0.4)"};
        box-shadow: ${
          isDark
            ? "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(100, 116, 139, 0.1)"
            : "0 4px 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(100, 116, 139, 0.05)"
        };
        transition: all 0.3s ease;
      }

      .ticker:hover {
        transform: translateY(-1px);
        box-shadow: ${
          isDark
            ? "0 6px 24px rgba(0, 0, 0, 0.5), 0 0 50px rgba(100, 116, 139, 0.15)"
            : "0 6px 24px rgba(0, 0, 0, 0.15), 0 0 50px rgba(100, 116, 139, 0.1)"
        };
      }

      .token-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        object-fit: contain;
        background: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);
        font-weight: bold;
        font-size: 10px;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
        box-shadow: 0 2px 8px rgba(100, 116, 139, 0.4);
      }

      .price-container {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .price {
        font-size: 15px;
        font-weight: 600;
        font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
        color: ${isDark ? "#e2e8f0" : "#1e293b"};
        letter-spacing: -0.02em;
      }

      .direction {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 18px;
        height: 18px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: bold;
        transition: all 0.3s ease;
      }

      .direction.up {
        background: rgba(34, 197, 94, 0.2);
        color: #22c55e;
        animation: pulse-up 0.6s ease-out;
      }

      .direction.down {
        background: rgba(239, 68, 68, 0.2);
        color: #ef4444;
        animation: pulse-down 0.6s ease-out;
      }

      .direction.neutral {
        background: rgba(148, 163, 184, 0.2);
        color: #94a3b8;
      }

      .loading {
        color: ${isDark ? "#64748b" : "#94a3b8"};
        font-size: 13px;
      }

      .error {
        color: #ef4444;
        font-size: 13px;
      }

      @keyframes pulse-up {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
        50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
      }

      @keyframes pulse-down {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
        50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }

      @keyframes pulse-price {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .price.updating {
        animation: pulse-price 0.3s ease-out;
      }
    `;
  }

  getArrowSVG(direction) {
    if (direction === "up") {
      return `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1L9 6H1L5 1Z" fill="currentColor"/>
      </svg>`;
    } else if (direction === "down") {
      return `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 9L1 4H9L5 9Z" fill="currentColor"/>
      </svg>`;
    }
    return `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 5H9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="ticker">
        <img src="${this.icon}" class="token-icon" alt="${this.token} icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="token-icon" style="display: none;">${this.token}</div>
        <div class="price-container">
          <span class="price loading">Loading...</span>
        </div>
      </div>
    `;
  }

  updateDisplay() {
    const priceEl = this.shadowRoot.querySelector(".price");
    const container = this.shadowRoot.querySelector(".price-container");

    if (priceEl && this.currentPrice) {
      priceEl.textContent = this.formatPrice(this.currentPrice);
      priceEl.classList.remove("loading");
      priceEl.classList.add("updating");

      setTimeout(() => priceEl.classList.remove("updating"), 300);

      // Update or create direction indicator
      let directionEl = this.shadowRoot.querySelector(".direction");
      if (this.priceDirection) {
        if (!directionEl) {
          directionEl = document.createElement("span");
          directionEl.className = "direction";
          container.appendChild(directionEl);
        }
        directionEl.className = `direction ${this.priceDirection}`;
        directionEl.innerHTML = this.getArrowSVG(this.priceDirection);
      }
    }
  }

  showError() {
    const priceEl = this.shadowRoot.querySelector(".price");
    if (priceEl) {
      priceEl.textContent = "Error";
      priceEl.classList.add("error");
      priceEl.classList.remove("loading");
    }
  }
}

// Register the custom element
if (!customElements.get("crypto-ticker")) {
  customElements.define("crypto-ticker", CryptoTicker);
}

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = CryptoTicker;
}
