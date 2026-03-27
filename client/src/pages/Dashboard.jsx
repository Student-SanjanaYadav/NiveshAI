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

  const stockList = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","LT.NS","ITC.NS","WIPRO.NS","AXISBANK.NS",
    "MARUTI.NS","TATAMOTORS.NS","ADANIENT.NS","ADANIPORTS.NS",
    "BAJFINANCE.NS","HCLTECH.NS","SUNPHARMA.NS","TITAN.NS",
    "ULTRACEMCO.NS","NESTLEIND.NS"
  ];

useEffect(() => {
  if (!stock) return;

  setLoading(true);

  fetch(`https://niveshai-4.onrender.com/stock/${stock}`)
    .then((res) => {
      if (!res.ok) throw new Error("API failed");
      return res.json();
    })
    .then((data) => {
      setPrices(data.prices);
      setDecision(data.decision);
      setLoading(false);
    })
    .catch((err) => {
      console.log("API ERROR:", err);

      // ❗ Instead of fake logic, show message
      setPrices([]);
      setDecision("API ERROR");
      setLoading(false);
    });
}, [stock]);

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-6 md:p-8">

      <div className="mb-6 border-b border-white/10 pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">Live AI Stock Insights</p>
      </div>

      <select
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        className="mb-6 px-4 py-2 rounded-xl bg-white/10 border border-white/10 w-full sm:w-auto"
      >
        {stockList.map((s, i) => (
          <option key={i} value={s} className="bg-black">
            {s}
          </option>
        ))}
      </select>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* CHART */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="mb-4 text-gray-300">Market Trend</h2>

          <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
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
          </div>
        </motion.div>

        {/* AI DECISION */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">AI Decision</h2>

          <p className={`text-2xl sm:text-3xl mt-4 font-bold ${
            decision === "BUY" ? "text-green-400" :
            decision === "SELL" ? "text-red-400" :
            "text-yellow-400"
          }`}>
            {decision}
          </p>

          <p className="text-gray-400 mt-2 text-sm">
            Based on momentum & trend signals
          </p>
        </motion.div>

        {/* RISK */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">Risk</h2>

          <div className="mt-4 h-3 bg-gray-700 rounded-full">
            <div className="h-3 bg-yellow-400 w-1/2 rounded"></div>
          </div>

          <p className="mt-2 text-gray-400 text-sm">Moderate Risk</p>
        </motion.div>

        {/* WHY NOT */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">Why NOT?</h2>

          <p className="mt-2 text-gray-400 text-sm">
            Weak breakout & low volume confirmation.
          </p>
        </motion.div>

      </div>
    </div>
  );
}