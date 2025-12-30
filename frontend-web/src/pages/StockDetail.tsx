import Card from "../components/Card";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockHistory, fetchIndicators } from "../services/api";
import CandlestickChart from "../components/CandlestickChart";

type OHLC = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type Indicator = {
  date: string;
  close: number;
  sma: number | null;
  ema: number;
};

function StockDetail() {
  const { symbol } = useParams();
  const [history, setHistory] = useState<OHLC[]>([]);
  const [indicators, setIndicators] = useState<Indicator[]>([]);

  useEffect(() => {
    if (!symbol) return;

    fetchStockHistory(symbol).then(setHistory);
    fetchIndicators(symbol).then(setIndicators);
  }, [symbol]);

  const candles = history.map((h) => ({
    time: h.date,
    open: h.open,
    high: h.high,
    low: h.low,
    close: h.close,
  }));

  const sma = indicators.map((i) => ({
    time: i.date,
    value: i.sma,
  }));

  const ema = indicators.map((i) => ({
    time: i.date,
    value: i.ema,
  }));

  return (
  <div>
    <h2 style={{ marginBottom: "16px" }}>{symbol}</h2>

    <Card title="Price Chart (Candlestick)">
      <CandlestickChart candles={candles} sma={sma} ema={ema} />
    </Card>

    <Card title="Indicators">
      <p>
        <span style={{ color: "#2563eb" }}>●</span> SMA (Simple Moving Average)
      </p>
      <p>
        <span style={{ color: "#f59e0b" }}>●</span> EMA (Exponential Moving Average)
      </p>
    </Card>
  </div>
);
}
export default StockDetail;
