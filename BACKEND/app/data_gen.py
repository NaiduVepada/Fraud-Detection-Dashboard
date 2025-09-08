import pandas as pd
import numpy as np

def generate_data(n=1000):
    data = []
    for i in range(n):
        amount = np.random.randint(100, 20000)
        hour = np.random.randint(0, 24)
        device_trust = np.random.choice([0, 1], p=[0.3, 0.7])
        fraud = 1 if (amount > 10000 and hour > 22 and device_trust == 0) else 0
        data.append([amount, hour, device_trust, fraud])
    df = pd.DataFrame(data, columns=["amount", "hour", "device_trust", "fraud"])
    df.to_csv("transactions_sample.csv", index=False)

if __name__ == "__main__":
    generate_data(2000)
    print("✅ transactions_sample.csv generated")
