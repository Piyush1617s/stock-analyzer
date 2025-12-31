const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function fetchStocks() {
  const response = await fetch(`${API_BASE}/stocks`);
  return response.json();
}

export async function fetchStockHistory(symbol: string) {
  const response = await fetch(
    `${API_BASE}/stock/${symbol}/history`
  );
  return response.json();
}

export async function fetchIndicators(symbol: string) {
  const res = await fetch(
    `${API_BASE}/stock/${symbol}/indicators`
  );
  return res.json();
}

export async function fetchPrediction(symbol: string) {
  const res = await fetch(
    `${API_BASE}/stock/${symbol}/predict`
  );
  return res.json();
}
