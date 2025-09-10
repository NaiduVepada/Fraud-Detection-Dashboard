import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10; // rows per page

  const fetchData = async () => {
    const skip = (page - 1) * limit;
    const res = await fetch(
      `http://127.0.0.1:8000/transactions?skip=${skip}&limit=${limit}`
    );
    const json = await res.json();
    setTransactions(json.data);
    setTotal(json.total);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1470&q=80')",
      }}
    >
      <div className="w-full max-w-4xl bg-white/95 rounded-2xl shadow-2xl p-6 backdrop-blur-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🚀 Fraud Detection Dashboard
        </h1>

        {/* Cards Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
          {transactions.map((t, index) => (
            <div
              key={index}
              className="p-4 bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
                Transaction #{(page - 1) * limit + index + 1}
              </h2>
              <p className="text-gray-600">
                <span className="font-medium">Amount:</span> ${t.amount}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Hour:</span> {t.hour}:00
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Device Trust:</span>{" "}
                {t.device_trust}
              </p>
              <p
                className={`mt-2 font-bold text-center ${
                  t.fraud === 1 ? "text-red-600" : "text-green-600"
                }`}
              >
                {t.fraud === 1 ? "🚨 Fraud Detected" : "✅ Safe"}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-400 transition"
          >
            ⬅ Back
          </button>
          <span className="text-gray-700 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}
