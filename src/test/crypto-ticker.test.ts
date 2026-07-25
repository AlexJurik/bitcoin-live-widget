import { afterEach, describe, expect, it, vi } from "vitest";
import { waitFor } from "@testing-library/react";
import tickerSource from "../../public/crypto-ticker.js?raw";

describe("crypto-ticker", () => {
  afterEach(() => {
    document.body.replaceChildren();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("displays a price returned by the public market-data API", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ price: "64358.08" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    window.eval(tickerSource);
    const ticker = document.createElement("crypto-ticker");
    document.body.appendChild(ticker);

    await waitFor(() => {
      expect(fetchMock.mock.calls[0]).toEqual([
        "https://api.exchange.coinbase.com/products/BTC-USD/ticker",
      ]);
    });

    await waitFor(() => {
      expect(ticker.shadowRoot?.querySelector(".price")).toHaveTextContent(
        "$64,358.08",
      );
    });
  });
});
