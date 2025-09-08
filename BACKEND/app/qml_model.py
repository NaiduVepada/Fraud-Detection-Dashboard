import pennylane as qml
from pennylane import numpy as np

dev = qml.device("default.qubit", wires=2)

@qml.qnode(dev)
def circuit(weights, x):
    qml.AngleEmbedding(x, wires=[0, 1])
    qml.BasicEntanglerLayers(weights, wires=[0, 1])
    return qml.expval(qml.PauliZ(0))

def predict(weights, x):
    return (circuit(weights, x) + 1) / 2
