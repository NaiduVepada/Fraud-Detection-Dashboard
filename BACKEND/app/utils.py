def send_alert(user_id: str, message: str):
    print(f"⚠️ ALERT sent to {user_id}: {message}")

def track_location(ip="192.168.1.1"):
    return {"lat": 17.385, "lon": 78.4867}  # Hyderabad demo coords
