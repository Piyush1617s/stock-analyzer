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

  useEffect(() => {
    fetchStocks().then((data) => {
      setStocks(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2>Stocks</h2>
      {loading ? <p>Loading...</p> : <StockTable stocks={stocks} />}
    </div>
  );
}

export default Home;
