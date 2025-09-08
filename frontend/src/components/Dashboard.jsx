import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const Dashboard = () => {
  // Sample transaction data
  const [transactions] = useState([
    { id: 1, amount: 120, hour: "10:00", status: "Safe" },
    { id: 2, amount: 4500, hour: "2:00", status: "Fraud" },
    { id: 3, amount: 300, hour: "15:00", status: "Safe" },
    { id: 4, amount: 7000, hour: "1:00", status: "Fraud" },
    { id: 5, amount: 50, hour: "18:00", status: "Safe" },
    { id: 6, amount: 2000, hour: "22:00", status: "Fraud" },
    { id: 7, amount: 999, hour: "9:00", status: "Safe" },
  ]);

  // Stats
  const total = transactions.length;
  const fraudCount = transactions.filter((t) => t.status === "Fraud").length;
  const safeCount = total - fraudCount;

  const chartData = [
    { name: "Fraud", value: fraudCount },
    { name: "Safe", value: safeCount },
  ];

  const COLORS = ["#EF4444", "#22C55E"];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Navbar */}
      <header className="bg-white shadow p-4 mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          🚀 Fraud Detection Dashboard
        </h1>
        <p className="text-gray-500">Monitor transactions in real-time</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold">Total Transactions</h2>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-red-600">Fraud Cases</h2>
          <p className="text-2xl font-bold text-red-600">{fraudCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h2 className="text-lg font-semibold text-green-600">Safe Cases</h2>
          <p className="text-2xl font-bold text-green-600">{safeCount}</p>
        </div>
      </div>

      {/* Charts + Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Fraud vs Safe Ratio</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Transactions Table */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Hour</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t.id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-2">{t.id}</td>
                  <td className="p-2">${t.amount}</td>
                  <td className="p-2">{t.hour}</td>
                  <td
                    className={`p-2 font-semibold ${
                      t.status === "Fraud" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {t.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
