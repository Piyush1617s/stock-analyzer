import joblib
import pandas as pd
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
            "open": round(float(row["Open"]), 2),
            "high": round(float(row["High"]), 2),
            "low": round(float(row["Low"]), 2),
            "close": round(float(row["Close"]), 2),
        })

    return history

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

@app.get("/stock/{symbol}/indicators")
def get_stock_indicators(symbol: str, period: int = 10):
    ticker_map = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "INFY": "INFY.NS"
    }

    ticker = ticker_map.get(symbol.upper())
    if not ticker:
        return {}

    stock = yf.Ticker(ticker)
    data = stock.history(period="3mo")

    close_prices = data["Close"]

    sma = close_prices.rolling(window=period).mean()
    ema = close_prices.ewm(span=period, adjust=False).mean()

    indicators = []
    for i in range(len(data)):
        indicators.append({
            "date": data.index[i].strftime("%Y-%m-%d"),
            "close": round(float(close_prices.iloc[i]), 2),
            "sma": round(float(sma.iloc[i]), 2) if not sma.isna().iloc[i] else None,
            "ema": round(float(ema.iloc[i]), 2),
        })

    return indicators
@app.get("/stock/{symbol}/features")
def get_stock_features(symbol: str):
    ticker_map = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "INFY": "INFY.NS"
    }

    ticker = ticker_map.get(symbol.upper())
    if not ticker:
        return []

    stock = yf.Ticker(ticker)
    data = stock.history(period="6mo")

    close = data["Close"]

    returns = close.pct_change()
    ema = close.ewm(span=10, adjust=False).mean()
    sma = close.rolling(window=10).mean()
    volatility = returns.rolling(window=10).std()

    features = []
    for i in range(len(data)):
        features.append({
            "date": data.index[i].strftime("%Y-%m-%d"),
            "close": round(float(close.iloc[i]), 2),
            "return": round(float(returns.iloc[i]), 4) if not returns.isna().iloc[i] else None,
            "ema": round(float(ema.iloc[i]), 2),
            "sma": round(float(sma.iloc[i]), 2) if not sma.isna().iloc[i] else None,
            "momentum": round(float(ema.iloc[i] - sma.iloc[i]), 2) if not sma.isna().iloc[i] else None,
            "volatility": round(float(volatility.iloc[i]), 4) if not volatility.isna().iloc[i] else None,
        })

    return features

@app.get("/stock/{symbol}/predict")
def predict_direction(symbol: str):
    model = joblib.load("app/model.pkl")

    ticker_map = {
        "RELIANCE": "RELIANCE.NS",
        "TCS": "TCS.NS",
        "INFY": "INFY.NS"
    }

    ticker = ticker_map.get(symbol.upper())
    if not ticker:
        return {}

    stock = yf.Ticker(ticker)
    data = stock.history(period="3mo")

    data["return"] = data["Close"].pct_change()
    data["ema"] = data["Close"].ewm(span=10).mean()
    data["sma"] = data["Close"].rolling(10).mean()
    data["volatility"] = data["return"].rolling(10).std()
    data["momentum"] = data["ema"] - data["sma"]

    data = data.dropna()

    latest = data.iloc[-1][
        ["return", "ema", "sma", "momentum", "volatility"]
    ].values.reshape(1, -1)

    prob = model.predict_proba(latest)[0][1]
    prediction = "UP" if prob >= 0.5 else "DOWN"

    return {
        "prediction": prediction,
        "confidence": round(float(prob), 3)
    }
