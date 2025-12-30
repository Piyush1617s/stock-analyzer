import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockHistory } from "../services/api";
import CandlestickChart from "../components/CandlestickChart";

type OHLCPoint = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

function StockDetail() {
  const { symbol } = useParams();
  const [history, setHistory] = useState<OHLCPoint[]>([]);

  useEffect(() => {
    if (symbol) {
      fetchStockHistory(symbol).then(setHistory);
    }
  }, [symbol]);

  const candleData = history.map((h) => ({
    time: h.date,
    open: h.open,
    high: h.high,
    low: h.low,
    close: h.close,
  }));

  return (
    <div>
      <h2>{symbol}</h2>

      {history.length === 0 ? (
        <p>Loading candlestick chart...</p>
      ) : (
        <CandlestickChart data={candleData} />
      )}
    </div>
  );
}

export default StockDetail;
