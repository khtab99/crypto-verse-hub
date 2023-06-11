import React, { useState } from "react";
import useMarketData from "../models/MarketModel";
import MarketUpdate from "./../components/MarketUpdate";

function MarketUpdateController() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading } = useMarketData(currentPage);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <MarketUpdate
      data={data}
      loading={loading}
      currentPage={currentPage}
      onPageChange={onPageChange}
    />
  );
}

export default MarketUpdateController;
