from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf

app = FastAPI(title="Stock Analyzer API")

# Allow frontend to talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Stock Analyzer Backend Running"}

@app.get("/stocks")
def get_stocks():
    symbols = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "INFY": "INFY.NS"
    }

    stocks = []

    for name, ticker in symbols.items():
        stock = yf.Ticker(ticker)
        data = stock.history(period="1d")

        if not data.empty:
            price = round(float(data["Close"].iloc[-1]), 2)
        else:
            price = None

        stocks.append({
            "symbol": name,
            "price": price
        })

    return stocks

@app.get("/stock/{symbol}/history")
def get_stock_history(symbol: str):
    ticker_map = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "INFY": "INFY.NS"
    }

    ticker = ticker_map.get(symbol.upper())
    if not ticker:
        return []

    stock = yf.Ticker(ticker)
    data = stock.history(period="1mo")

    history = []
    for date, row in data.iterrows():
        history.append({
            "date": date.strftime("%Y-%m-%d"),
            "close": round(float(row["Close"]), 2)
        })

    return history
