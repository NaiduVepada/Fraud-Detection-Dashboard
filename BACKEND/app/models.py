from fastapi import FastAPI, UploadFile, File
import pandas as pd
import os

app = FastAPI()

# Default CSV file name
DATA_FILE = "transactions.csv"


def load_data():
    """Load transactions CSV and convert numpy types to Python types."""
    if not os.path.exists(DATA_FILE):
        return []

    df = pd.read_csv(DATA_FILE)

    # Convert numpy types → Python int/float/str
    records = df.to_dict(orient="records")
    cleaned_records = []
    for record in records:
        cleaned = {}
        for k, v in record.items():
            if pd.isna(v):   # handle NaN
                cleaned[k] = None
            elif isinstance(v, (int, float)):
                cleaned[k] = v
            else:
                try:
                    cleaned[k] = int(v)
                except (ValueError, TypeError):
                    try:
                        cleaned[k] = float(v)
                    except (ValueError, TypeError):
                        cleaned[k] = str(v)
        cleaned_records.append(cleaned)

    return cleaned_records


@app.get("/")
def home():
    return {"message": "Fraud Detection API is running!"}


@app.get("/transactions")
def get_transactions():
    """Fetch all transactions from CSV"""
    return load_data()


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """Upload a new transactions CSV file"""
    contents = await file.read()
    with open(DATA_FILE, "wb") as f:
        f.write(contents)
    return {"message": f"File '{file.filename}' uploaded successfully!"}
