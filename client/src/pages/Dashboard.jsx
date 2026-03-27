import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [stock, setStock] = useState("RELIANCE.NS");
  const [prices, setPrices] = useState([]);
  const [decision, setDecision] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  // 🔥 STOCK LIST (NEW ADDITION)
  const stockList = [
    "RELIANCE.NS",
    "TCS.NS",
    "INFY.NS",
    "HDFCBANK.NS",
    "ICICIBANK.NS",
    "SBIN.NS",
    "LT.NS",
    "ITC.NS",
    "WIPRO.NS",
    "AXISBANK.NS",
    "MARUTI.NS",
    "TATAMOTORS.NS",
    "ADANIENT.NS",
    "ADANIPORTS.NS",
    "BAJFINANCE.NS",
    "HCLTECH.NS",
    "SUNPHARMA.NS",
    "TITAN.NS",
    "ULTRACEMCO.NS",
    "NESTLEIND.NS"
  ];

  useEffect(() => {
    if (!stock) return;

    setLoading(true);

    fetch("https://niveshai-4.onrender.com/stock/" + stock)
      .then((res) => res.json())
      .then((data) => {
        setPrices(data.prices || []);
        setDecision(data.decision || "No Data");

        setTimeout(() => setLoading(false), 1200);
      })
      .catch(() => setLoading(false));
  }, [stock]);

  // 🔥 LOADER
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg">AI analyzing market...</p>
        </div>
      </div>
    );
  }

  const chartData = prices.map((p, i) => ({
    name: `Day ${i + 1}`,
    price: p,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      {/* HEADER */}
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">Live AI Stock Insights</p>
      </div>

      {/* 🔥 DROPDOWN */}
      <select
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="mb-8 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10"
      >
        {stockList.map((s, i) => (
          <option key={i} value={s} className="bg-black">
            {s}
          </option>
        ))}
      </select>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-8">

        {/* CHART */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 transition"
        >
          <h2 className="mb-4 text-gray-300">Market Trend</h2>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#00f5c4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* AI DECISION */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 transition"
        >
          <h2 className="text-gray-300">AI Decision</h2>

          <p
            className={`text-3xl mt-4 font-bold ${
              decision === "BUY"
                ? "text-green-400"
                : decision === "SELL"
                ? "text-red-400"
                : "text-yellow-400"
            }`}
          >
            {decision}
          </p>

          <p className="text-gray-400 mt-2 text-sm">
            Based on momentum & trend signals
          </p>
        </motion.div>

        {/* RISK */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 transition"
        >
          <h2 className="text-gray-300">Risk</h2>

          <div className="mt-4 h-3 bg-gray-700 rounded-full">
            <div className="h-3 bg-yellow-400 w-1/2 rounded"></div>
          </div>

          <p className="mt-2 text-gray-400 text-sm">Moderate Risk</p>
        </motion.div>

        {/* WHY NOT */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl hover:shadow-green-500/20 transition"
        >
          <h2 className="text-gray-300">Why NOT?</h2>

          <p className="mt-2 text-gray-400 text-sm">
            Weak breakout & low volume confirmation.
          </p>
        </motion.div>

      </div>
    </div>
  );
}