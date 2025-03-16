import { useState, useEffect, useRef } from "react";

function useCoinData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const wsRef = useRef(null);

  // Define the coins you want to track
  const coins = [
    {
      id: "bitcoin",
      symbol: "btcusdt",
      name: "Bitcoin",
      image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
    },
    {
      id: "ethereum",
      symbol: "ethusdt",
      name: "Ethereum",
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      id: "binancecoin",
      symbol: "bnbusdt",
      name: "Binance Coin",
      image:
        "https://assets.coingecko.com/coins/images/825/large/binance-coin-logo.png",
    },
    {
      id: "solana",
      symbol: "solusdt",
      name: "Solana",
      image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
    },
  ];

  useEffect(() => {
    let reconnectTimer = null;

    const connectWebSocket = () => {
      if (wsRef.current) {
        wsRef.current.close();
      }

      const ws = new WebSocket(
        `wss://stream.binance.com:9443/ws/${coins
          .map((coin) => `${coin.symbol}@trade`)
          .join("/")}`
      );

      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ Connected to WebSocket");
        setLoading(false);
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          const updatedCoin = coins.find(
            (coin) => coin.symbol === message.s.toLowerCase()
          );

          if (updatedCoin) {
            setData((prevData) => {
              const newData = [...prevData];
              const index = newData.findIndex((c) => c.id === updatedCoin.id);

              const updatedData = {
                ...updatedCoin,
                current_price: parseFloat(message.p),
                price_change_percentage_24h: message.m ? -1 : 1,
              };

              if (index !== -1) {
                newData[index] = updatedData;
              } else {
                newData.push(updatedData);
              }

              return newData;
            });
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      ws.onclose = () => {
        console.log("❌ WebSocket Disconnected. Reconnecting in 5s...");
        reconnectTimer = setTimeout(connectWebSocket, 5000);
      };
    };

    connectWebSocket();

    return () => {
      clearTimeout(reconnectTimer);
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [coins]);

  return { data, loading };
}

export default useCoinData;
