import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
);

type Props = {
  labels: string[];
  prices: number[];
};

function PriceChart({ labels, prices }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Closing Price",
        data: prices,
        borderColor: "#2563eb",
        tension: 0.3,
      },
    ],
  };

  return <Line data={data} />;
}

export default PriceChart;
