// src/views/MarketUpdateView.js
import { Link } from "react-router-dom";
import { numberWithCommas } from "./numberWIthCommas";

function MarketUpdate({ data, loading, currentPage, onPageChange }) {
  const paginationButtons = [];

  for (let i = 1; i <= 5; i++) {
    paginationButtons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={i === currentPage ? "activePagi" : ""}
      >
        {i}
      </button>
    );
  }

  const scrollMarket = () => {
    window.scrollTo({
      top: window.pageYOffset - 800,
      behavior: "smooth",
    });
  };

  const scrollTop = () => {
    window.scrollTo({ top: (0, 0), behavior: "smooth" });
  };

  return (
    <section id="market" className="market-section">
      <div className="container">
        <div className="market-content">
          <h2>Market Update</h2>
          <div className="market-content__coin-list">
            <div className="market-content__coin-list__top">
              <p>Coin</p>
              <p>Price</p>
              <p>24h Change</p>
              <p>Market Cap</p>
            </div>
            <div
              //   onLoad={() => setApiLoad(false)}
              className="market-content__coin-list__row"
            >
              {loading ? (
                <span className="loader"></span>
              ) : (
                data.map((item) => (
                  <Link
                    onClick={scrollTop}
                    to={`/coin/${item.id}`}
                    className="coin-row"
                    key={item.id}
                  >
                    <span>
                      <img src={item.image} alt={item.name} /> {item.name}
                    </span>
                    <p>{"$ " + item.current_price.toFixed(2)}</p>
                    <p
                      className={
                        "slider-coin__price " +
                        (item.price_change_percentage_24h >= 0
                          ? "green-text"
                          : "red-text")
                      }
                    >
                      {item.price_change_percentage_24h?.toFixed(2) + " %"}
                    </p>
                    <p>{"$ " + numberWithCommas(item.market_cap)}</p>
                  </Link>
                ))
              )}
            </div>
          </div>
          <div
            onClick={scrollMarket}
            className="market-content__coin-list__pagination"
          >
            {paginationButtons}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarketUpdate;
