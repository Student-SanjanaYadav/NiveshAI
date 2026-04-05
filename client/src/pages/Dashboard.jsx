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

  const [score, setScore] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [emotion, setEmotion] = useState("");
  const [advice, setAdvice] = useState("");
  const [panicSell, setPanicSell] = useState(0);
  const [holdGain, setHoldGain] = useState(0);
  const [risk, setRisk] = useState("");
  const [whyNot, setWhyNot] = useState("");

  // ✅ EXISTING NEW STATES
  const [explanation, setExplanation] = useState("");
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);

  // ✅ ADDED
  const [news, setNews] = useState([]);

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
      .then((res) => res.json())
      .then((data) => {
        setPrices(data.prices || []);
        setDecision(data.decision || "HOLD");

        setScore(data.score || 0);
        setReasons(data.reasons || []);
        setEmotion(data.emotion || "");
        setAdvice(data.advice || "");
        setPanicSell(data.panic_sell || 0);
        setHoldGain(data.hold_gain || 0);
        setRisk(data.risk || "");
        setWhyNot(data.why_not || "");

        setExplanation(data.explanation || "");

        // ✅ ADDED
        setNews(data.news || []);

        setLoading(false);
      })
      .catch(() => {
        setDecision("API ERROR");
        setLoading(false);
      });
  }, [stock]);

  useEffect(() => {
    fetch("https://niveshai-4.onrender.com/market-summary")
      .then((res) => res.json())
      .then((data) => {
        setGainers(data.gainers || []);
        setLosers(data.losers || []);
      });
  }, []);

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

      {/* HEADER */}
      <div className="mb-6 border-b border-white/10 pb-4">
        <h1 className="text-2xl sm:text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-400 text-sm">Live AI Stock Insights</p>
      </div>

      {/* DROPDOWN */}
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

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">

        {/* CHART */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="mb-4 text-gray-300">Market Trend 📊</h2>

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

        {/* DECISION */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">AI Decision 🤖</h2>

          <p className={`text-2xl sm:text-3xl mt-4 font-bold ${
            decision === "BUY" ? "text-green-400" :
            decision === "SELL" ? "text-red-400" :
            "text-yellow-400"
          }`}>
            {decision}
          </p>

          <p className="mt-4 text-gray-300 italic">
            {explanation}
          </p>

          <p className="text-sm text-gray-400 mt-2">
            ✔ Based on real-time data  
            ✔ Includes news sentiment  
            ✔ AI-assisted decision  
          </p>
        </motion.div>

        {/* RISK */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">Risk ⚠️</h2>

          <div className="mt-4 h-3 bg-gray-700 rounded-full">
            <div
              className={`h-3 rounded ${
                risk.includes("Low") ? "bg-green-400 w-3/4" :
                risk.includes("Moderate") ? "bg-yellow-400 w-1/2" :
                "bg-red-400 w-1/4"
              }`}
            ></div>
          </div>

          <p className="mt-2 text-gray-400 text-sm">{risk}</p>
        </motion.div>

        {/* WHY NOT */}
        <motion.div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl shadow-xl">
          <h2 className="text-gray-300">Why NOT? ❌</h2>

          <p className="mt-2 text-gray-400 text-sm">
            {whyNot}
          </p>
        </motion.div>

      </div>

      {/* MARKET MOVERS */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-green-400 font-bold">Top Gainers</h2>
          {gainers.map((g,i)=>(
            <p key={i}>{g.stock} +{g.change.toFixed(2)}%</p>
          ))}
        </div>

        <div>
          <h2 className="text-red-400 font-bold">Top Losers</h2>
          {losers.map((l,i)=>(
            <p key={i}>{l.stock} {l.change.toFixed(2)}%</p>
          ))}
        </div>
      </div>

      {/* ✅ NEWS */}
      <div className="mt-8 bg-white/5 p-6 rounded-xl border border-white/10">
        <h2 className="text-xl font-bold mb-4">📰 Market News</h2>

        {news.length === 0 ? (
          <p className="text-gray-400">No news available</p>
        ) : (
          news.map((n, i) => {
            const isPositive =
              n.title.toLowerCase().includes("rise") ||
              n.title.toLowerCase().includes("gain");

            const isNegative =
              n.title.toLowerCase().includes("fall") ||
              n.title.toLowerCase().includes("loss");

            return (
              <a
                key={i}
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="block mb-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <p
                  className={`${
                    isPositive
                      ? "text-green-400"
                      : isNegative
                      ? "text-red-400"
                      : "text-blue-400"
                  }`}
                >
                  • {n.title}
                </p>
              </a>
            );
          })
        )}
      </div>

      {/* SCORE */}
      <div className="bg-white/5 p-6 rounded-xl mt-6 border border-white/10">
        <h2 className="text-xl font-bold">🚀 Opportunity Score</h2>

        <p className="text-4xl text-green-400 mt-2">{score}</p>

        <div className="mt-3 h-3 bg-gray-700 rounded-full">
          <div
            className="h-3 bg-green-400 rounded"
            style={{ width: `${score}%` }}
          ></div>
        </div>

        <ul className="mt-3 text-gray-400 text-sm">
          {reasons.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </div>

      {/* EMOTION */}
      <div className="bg-purple-500/10 p-6 rounded-xl mt-6 border border-purple-500/20">
        <h2 className="text-xl font-bold">💭 Market Emotion</h2>

        <p className="text-lg mt-2">{emotion}</p>

        <p className="text-gray-400 mt-2">{advice}</p>
      </div>

      {/* PANIC */}
      <div className="bg-red-500/10 p-6 rounded-xl mt-6 border border-red-500/20">
        <h2 className="text-xl font-bold">💀 Panic Simulator</h2>

        <div className="flex gap-10 mt-4">
          <div>
            <p className="text-red-400 text-lg">Sell Now</p>
            <p>{panicSell}%</p>
          </div>

          <div>
            <p className="text-green-400 text-lg">Hold</p>
            <p>+{holdGain}%</p>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="mt-10 p-4 bg-yellow-500/10 border border-yellow-500 rounded-xl">
        <p className="text-yellow-300 text-sm">
          ⚠️ This is an AI-based analysis tool. Do any Investment at your own risk.
        </p>
      </div>

    </div>
  );
}