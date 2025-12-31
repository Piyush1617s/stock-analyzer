const API_BASE = import.meta.env.VITE_API_BASE_URL;

const TIMEOUT = 10000; // 10 seconds

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return await res.json();
  } finally {
    clearTimeout(id);
  }
}

// ---- PUBLIC API FUNCTIONS ----

export async function fetchStocks() {
  return fetchWithTimeout(`${API_BASE}/stocks`);
}

export async function fetchStockHistory(symbol: string) {
  return fetchWithTimeout(`${API_BASE}/stock/${symbol}/history`);
}

export async function fetchIndicators(symbol: string) {
  return fetchWithTimeout(`${API_BASE}/stock/${symbol}/indicators`);
}

export async function fetchPrediction(symbol: string) {
  return fetchWithTimeout(`${API_BASE}/stock/${symbol}/predict`);
}
