export async function fetchStocks() {
  const response = await fetch("http://127.0.0.1:8000/stocks");
  return response.json();
}

export async function fetchStockHistory(symbol: string) {
  const response = await fetch(
    `http://127.0.0.1:8000/stock/${symbol}/history`
  );
  return response.json();
}

export async function fetchIndicators(symbol: string) {
  const res = await fetch(
    `http://127.0.0.1:8000/stock/${symbol}/indicators`
  );
  return res.json();
}
