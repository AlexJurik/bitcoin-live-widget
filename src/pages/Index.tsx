import { useEffect, useRef, useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";

const Index = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/crypto-ticker.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const scriptTag = `<script src="https://cdn.jsdelivr.net/gh/AlexJurik/bitcoin-live-widget@main/public/crypto-ticker.js"></script>`;
  const basicUsage = `<crypto-ticker></crypto-ticker>`;
  const advancedUsage = `<crypto-ticker
  refresh-interval="5"
  token="ETH"
  currency="USD"
  theme="dark"
></crypto-ticker>`;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Live Crypto Price
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="text-gradient-bitcoin">Crypto</span>{" "}
              <span className="text-foreground">Ticker</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A lightweight, framework-agnostic Web Component that displays live
              crypto prices. Drop it into any website with a single script tag.
            </p>

            {/* Live Demo */}
            <div className="flex flex-col items-center gap-6 pt-8">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">
                Live Demo
              </p>
              <div
                ref={tickerRef}
                className="flex flex-wrap justify-center gap-4"
                dangerouslySetInnerHTML={{
                  __html: `
                    <crypto-ticker theme="dark" token="BTC" refresh-interval="3"></crypto-ticker>
                    <crypto-ticker theme="light" token="ETH" currency="EUR" refresh-interval="3"></crypto-ticker>
                  `,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "Zero Dependencies",
              description:
                "Pure vanilla JavaScript Web Component. No frameworks, no build tools required.",
            },
            {
              icon: "🎨",
              title: "Themeable",
              description:
                "Supports dark and light themes out of the box. Fully customizable via CSS.",
            },
            {
              icon: "🔄",
              title: "Live Updates",
              description:
                "Auto-refreshes price data with configurable intervals. Shows price direction arrows.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Installation Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Quick Start</h2>
            <p className="text-muted-foreground">
              Get up and running in seconds
            </p>
          </div>

          {/* Step 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                1
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Include the script
              </h3>
            </div>
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-card border border-border overflow-x-auto">
                <code className="text-sm text-foreground font-mono">
                  {scriptTag}
                </code>
              </pre>
              <button
                onClick={() => copyToClipboard(scriptTag, "script")}
                className="absolute top-3 right-3 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {copied === "script" ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                2
              </span>
              <h3 className="text-lg font-semibold text-foreground">
                Add the component
              </h3>
            </div>
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-card border border-border overflow-x-auto">
                <code className="text-sm text-foreground font-mono">
                  {basicUsage}
                </code>
              </pre>
              <button
                onClick={() => copyToClipboard(basicUsage, "basic")}
                className="absolute top-3 right-3 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {copied === "basic" ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Advanced Usage */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Advanced Configuration
            </h3>
            <div className="relative group">
              <pre className="p-4 rounded-xl bg-card border border-border overflow-x-auto">
                <code className="text-sm text-foreground font-mono whitespace-pre">
                  {advancedUsage}
                </code>
              </pre>
              <button
                onClick={() => copyToClipboard(advancedUsage, "advanced")}
                className="absolute top-3 right-3 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                {copied === "advanced" ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Attributes Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Available Attributes
            </h3>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                      Attribute
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                      Default
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-mono text-sm text-primary">
                      token
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      BTC
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      The cryptocurrency token to display (BTC, ETH, LTC, etc.)
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-mono text-sm text-primary">
                      currency
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      USD
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      Display currency (USD, EUR, GBP)
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-mono text-sm text-primary">
                      refresh-interval
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      30
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      Update interval in seconds
                    </td>
                  </tr>
                  <tr className="bg-card">
                    <td className="px-4 py-3 font-mono text-sm text-primary">
                      theme
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      dark
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      Visual theme (dark or light)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <p>
                Powered by{" "}
                <a
                  href="https://docs.cdp.coinbase.com/exchange/introduction/welcome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Coinbase Exchange API
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <span className="hidden md:inline">•</span>
              <p>Public market data • No API key required</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
              <p>
                Created by cooperation{" "}
                <a
                  href="https://jurik.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Alexander Jurik
                  <ExternalLink className="w-3 h-3" />
                </a>
                ,{" "}
                <a
                  href="https://lovable.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Lovable
                  <ExternalLink className="w-3 h-3" />
                </a>{" "}
                and{" "}
                <a
                  href="https://claude.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  Claude
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <span className="hidden md:inline">•</span>
              <p>
                <a
                  href="https://github.com/AlexJurik/bitcoin-live-widget"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
              <span className="hidden md:inline">•</span>
              <p>MIT License</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
