import joblib
import numpy as np
from sklearn.ensemble import IsolationForest
from app.preprocess import preprocess_data

def train_models():
    X, y = preprocess_data()

    # Classical Model
    iso = IsolationForest(contamination=0.05, random_state=42)
    iso.fit(X)
    joblib.dump(iso, "models/isolation_forest.joblib")

    # Fake quantum weights (demo only)
    q_weights = np.random.random((3, 2))
    joblib.dump(q_weights, "models/qml_weights.joblib")

    print("✅ Classical + Quantum models trained & saved")

if __name__ == "__main__":
    train_models()
