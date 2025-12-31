import { useEffect, useState } from "react";
import { fetchStocks } from "../services/api";
import StockTable from "../components/StockTable";

type Stock = {
  symbol: string;
  price: number | null;
};

function Home() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchStocks()
      .then((data) => {
        setStocks(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load stocks. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Stocks</h2>

      {loading && <p>Loading stocks...</p>}

      {!loading && error && (
        <p style={{ color: "red" }}>{error}</p>
      )}

      {!loading && !error && stocks.length === 0 && (
        <p>No stocks available.</p>
      )}

      {!loading && !error && stocks.length > 0 && (
        <StockTable stocks={stocks} />
      )}
    </div>
  );
}

export default Home;
