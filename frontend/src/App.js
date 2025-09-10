import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard transactions={transactions} />
    </div>
  );
}

export default App;
