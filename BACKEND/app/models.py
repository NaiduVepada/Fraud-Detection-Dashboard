from pydantic import BaseModel

class Transaction(BaseModel):
    amount: float
    hour: int
    device_trust: int
