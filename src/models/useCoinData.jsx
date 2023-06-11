// src/models/CoinModel.js
import { useState, useEffect } from "react";

function useCoinData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error!");
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
  };
}

export default useCoinData;
