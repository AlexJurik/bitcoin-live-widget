# Crypto Ticker Web Component

A lightweight, framework-agnostic web component that displays real-time cryptocurrency prices with live updates, price direction indicators, and theme support.

## Features

- Live cryptocurrency price updates from CoinDesk/Coinbase API
- Support for 400+ cryptocurrencies (BTC, ETH, SOL, DOGE, USDT, and more)
- Dynamic token icons loaded from CDN with fallback support
- Price direction indicators (up/down arrows with animations)
- Dark and light theme support
- Configurable refresh intervals
- Zero dependencies (vanilla JavaScript)
- Shadow DOM encapsulation for style isolation
- Framework-agnostic - works with any website or framework

## Installation

Install dependencies using your preferred package manager:

```bash
# Using npm
npm install

# Using pnpm
pnpm install

# Using bun
bun install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

## Build

Build the project for production:

```bash
npm run build
```

The built files will be generated in the `dist` directory.

Preview the production build:

```bash
npm run preview
```

## Using the Web Component

### 1. Include the Script

Add the script to your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/AlexJurik/bitcoin-live-widget@main/public/crypto-ticker.js"></script>
```

### 2. Add the Component

Use the component anywhere in your HTML:

```html
<crypto-ticker></crypto-ticker>
```

### 3. Configuration

Customize the component with attributes:

```html
<crypto-ticker
  token="BTC"
  currency="USD"
  refresh-interval="60"
  theme="dark"
></crypto-ticker>
```

## Available Attributes

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `token` | string | `"BTC"` | Cryptocurrency token symbol (BTC, ETH, SOL, etc.) |
| `currency` | string | `"USD"` | Display currency (USD, EUR, GBP, etc.) |
| `refresh-interval` | number | `30` | Update interval in seconds |
| `theme` | string | `"dark"` | Visual theme ("dark" or "light") |

## Examples

### Bitcoin with default settings
```html
<crypto-ticker></crypto-ticker>
```

### Ethereum with light theme
```html
<crypto-ticker token="ETH" theme="light"></crypto-ticker>
```

### Solana with custom refresh interval
```html
<crypto-ticker token="SOL" refresh-interval="60"></crypto-ticker>
```

### Multiple cryptocurrencies
```html
<crypto-ticker token="BTC"></crypto-ticker>
<crypto-ticker token="ETH"></crypto-ticker>
<crypto-ticker token="DOGE"></crypto-ticker>
```

## Technologies

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library for the demo page
- **shadcn/ui** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - For the web component (zero dependencies)

## API

The component uses the CoinDesk API to fetch real-time cryptocurrency prices:

- **Endpoint**: `https://data-api.coindesk.com/spot/v1/latest/tick`
- **Market**: Coinbase
- **No API key required**

## Browser Support

The web component works in all modern browsers that support:
- Custom Elements (Web Components)
- Shadow DOM
- ES6+ JavaScript
- Fetch API

## License

MIT

## Author

Alex Jurik - https://jurik.dev
