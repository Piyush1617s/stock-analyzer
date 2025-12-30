import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchStockHistory, fetchIndicators, fetchPrediction } from "../services/api";
import CandlestickChart from "../components/CandlestickChart";
import Card from "../components/Card";

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
  const [prediction, setPrediction] = useState<{
    prediction: "UP" | "DOWN";
    confidence: number;
  } | null>(null);

  useEffect(() => {
    if (!symbol) return;

    fetchStockHistory(symbol).then(setHistory);
    fetchIndicators(symbol).then(setIndicators);
    fetchPrediction(symbol).then(setPrediction);
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
    <Card title="AI Market Bias">
  {prediction ? (
    <p>
      Direction:{" "}
      <strong
        style={{
          color: prediction.prediction === "UP" ? "green" : "red",
        }}
      >
        {prediction.prediction}
      </strong>
      <br />
      Confidence: {(prediction.confidence * 100).toFixed(1)}%
    </p>
  ) : (
    <p>Loading AI signal...</p>
  )}
</Card>

  </div>
);
}
export default StockDetail;
