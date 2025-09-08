import pandas as pd
from sklearn.preprocessing import StandardScaler
import joblib
import os

def preprocess_data(file_path="transactions_sample.csv"):
    df = pd.read_csv(file_path)
    X = df[["amount", "hour", "device_trust"]]
    y = df["fraud"]

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    os.makedirs("models", exist_ok=True)
    joblib.dump(scaler, "models/scaler.joblib")
    return X_scaled, y

if __name__ == "__main__":
    X, y = preprocess_data()
    print("✅ Data preprocessed & scaler saved")
