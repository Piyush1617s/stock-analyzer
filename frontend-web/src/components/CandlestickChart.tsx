import { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  LineSeries,
} from "lightweight-charts";

type Candle = {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

type LinePoint = {
  time: string;
  value: number | null;
};

type Props = {
  candles: Candle[];
  sma: LinePoint[];
  ema: LinePoint[];
};

function CandlestickChart({ candles, sma, ema }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chart = createChart(ref.current, {
      width: ref.current.clientWidth,
      height: 420,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16a34a",
      downColor: "#dc2626",
      borderUpColor: "#16a34a",
      borderDownColor: "#dc2626",
      wickUpColor: "#16a34a",
      wickDownColor: "#dc2626",
    });

    const smaSeries = chart.addSeries(LineSeries, {
      color: "#2563eb",
      lineWidth: 2,
    });

    const emaSeries = chart.addSeries(LineSeries, {
      color: "#f59e0b",
      lineWidth: 2,
    });

    candleSeries.setData(candles);
    smaSeries.setData(sma.filter((p) => p.value !== null));
    emaSeries.setData(ema.filter((p) => p.value !== null));

    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [candles, sma, ema]);

  return <div ref={ref} />;
}

export default CandlestickChart;
