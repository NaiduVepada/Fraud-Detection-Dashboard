# BACKEND/app/main.py
from fastapi import FastAPI, Query
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend React app to fetch data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load CSV once
df = pd.read_csv("transactions.csv")

@app.get("/transactions")
def get_transactions(skip: int = Query(0, ge=0), limit: int = Query(20, ge=1)):
    # slice rows
    data = df.iloc[skip: skip + limit].to_dict(orient="records")
    return {
        "data": data,
        "total": len(df)  # so frontend knows how many total rows exist
    }
