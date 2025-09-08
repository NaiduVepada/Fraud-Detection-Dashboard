import React, { useEffect, useState } from "react";
import axios from "axios";

function TransactionList({ onTransactionClick }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from FastAPI backend
    axios
      .get("http://localhost:8000/transactions")
      .then((res) => setTransactions(res.data.transactions))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        📊 Recent Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Hour</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, i) => (
              <tr
                key={txn.id}
                className={`hover:bg-gray-100 cursor-pointer ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => onTransactionClick(txn)}
              >
                <td className="p-3">{txn.id}</td>
                <td className="p-3 font-medium">${txn.amount}</td>
                <td className="p-3">{txn.hour}:00</td>
                <td
                  className={`p-3 font-bold ${
                    txn.fraud ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {txn.fraud ? "Fraud 🚨" : "Safe ✅"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionList;
