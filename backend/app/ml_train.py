import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Fetch data
stock = yf.Ticker("RELIANCE.NS")
data = stock.history(period="1y")

# Feature engineering
data["return"] = data["Close"].pct_change()
data["ema"] = data["Close"].ewm(span=10).mean()
data["sma"] = data["Close"].rolling(10).mean()
data["volatility"] = data["return"].rolling(10).std()
data["momentum"] = data["ema"] - data["sma"]

# Target: next-day direction
data["target"] = (data["Close"].shift(-1) > data["Close"]).astype(int)

data = data.dropna()

X = data[["return", "ema", "sma", "momentum", "volatility"]]
y = data["target"]

# Train-test split (time-safe)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, shuffle=False, test_size=0.2
)

# Model
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=7,
    min_samples_leaf=20,
    class_weight="balanced",
    random_state=42
)
model.fit(X_train, y_train)

# Evaluation
probs = model.predict_proba(X_test)[:, 1]
import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Fetch data
stock = yf.Ticker("RELIANCE.NS")
data = stock.history(period="1y")

# Feature engineering
data["return"] = data["Close"].pct_change()
data["ema"] = data["Close"].ewm(span=10).mean()
data["sma"] = data["Close"].rolling(10).mean()
data["volatility"] = data["return"].rolling(10).std()
data["momentum"] = data["ema"] - data["sma"]
data["volume_change"] = data["Volume"].pct_change()

# Target: next-day direction
data["target"] = (data["Close"].shift(-1) > data["Close"]).astype(int)

data = data.dropna()

X = data[["return", "ema", "sma", "momentum", "volatility", "volume_change"]]
y = data["target"]

# Train-test split (time-safe)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, shuffle=False, test_size=0.2
)

# Model
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=5,
    class_weight="balanced",
    random_state=42
)
model.fit(X_train, y_train)

# Evaluation
probs = model.predict_proba(X_test)[:, 1]
preds = (probs > 0.55).astype(int)

accuracy = accuracy_score(y_test, preds)

print("Model accuracy:", round(accuracy, 3))

from sklearn.metrics import confusion_matrix, classification_report

cm = confusion_matrix(y_test, preds)
print("\nConfusion Matrix:")
print(cm)

print("\nClassification Report:")
print(classification_report(y_test, preds, zero_division=0))

import joblib

joblib.dump(model, "app/model.pkl")
print("Model saved to app/model.pkl")

preds = (probs > 0.55).astype(int)

accuracy = accuracy_score(y_test, preds)

print("Model accuracy:", round(accuracy, 3))

from sklearn.metrics import confusion_matrix, classification_report

cm = confusion_matrix(y_test, preds)
print("\nConfusion Matrix:")
print(cm)

print("\nClassification Report:")
print(classification_report(y_test, preds, zero_division=0))

import joblib

joblib.dump(model, "app/model.pkl")
print("Model saved to app/model.pkl")
