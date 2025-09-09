from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # React frontend at localhost:3000
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/transactions")
def get_transactions():
    # Dummy dynamic transactions for now (replace with real DB/model later)
    data = [
        {"id": 1, "amount": 120, "hour": 10, "fraud": False},
        {"id": 2, "amount": 4500, "hour": 2, "fraud": True},
        {"id": 3, "amount": 300, "hour": 15, "fraud": False},
        {"id": 4, "amount": 7000, "hour": 1, "fraud": True},
        {"id": 5, "amount": 50, "hour": 18, "fraud": False},
        {"id": 6, "amount": 2000, "hour": 22, "fraud": True},
        {"id": 7, "amount": 999, "hour": 9, "fraud": False},
    return {"transactions": data} 
    ]