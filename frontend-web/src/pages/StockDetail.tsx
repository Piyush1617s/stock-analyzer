import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockHistory } from "../services/api";
import PriceChart from "../components/PriceChart";

type HistoryPoint = {
  date: string;
  close: number;
};

function StockDetail() {
  const { symbol } = useParams();
  const [history, setHistory] = useState<HistoryPoint[]>([]);

  useEffect(() => {
    if (symbol) {
      fetchStockHistory(symbol).then(setHistory);
    }
  }, [symbol]);

  const labels = history.map((h) => h.date);
  const prices = history.map((h) => h.close);

  return (
    <div>
      <h2>{symbol}</h2>
      {history.length === 0 ? (
        <p>Loading chart...</p>
      ) : (
        <PriceChart labels={labels} prices={prices} />
      )}
    </div>
  );
}

export default StockDetail;
