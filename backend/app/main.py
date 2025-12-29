from fastapi import FastAPI

app = FastAPI(title="Stock Analyzer API")

@app.get("/")
def root():
    return {"message": "Stock Analyzer Backend Running"}
