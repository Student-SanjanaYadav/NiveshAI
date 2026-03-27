import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState([]);
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");

  const stockList = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","LT.NS","ITC.NS","WIPRO.NS","AXISBANK.NS",
    "MARUTI.NS","TATAMOTORS.NS","ADANIENT.NS","ADANIPORTS.NS",
    "BAJFINANCE.NS","HCLTECH.NS","SUNPHARMA.NS","TITAN.NS",
    "ULTRACEMCO.NS","NESTLEIND.NS"
  ];

  // 🔥 ADD STOCK
  const addStock = async () => {
    if (!stock || !amount) return;

    try {
      const res = await fetch("http://127.0.0.1:5000/stock/" + stock);
      const data = await res.json();

      const latestPrice = data.prices?.slice(-1)[0] || 0;

      const newItem = {
        name: stock,
        price: latestPrice,
        decision: data.decision,
        amount: Number(amount),
        value: latestPrice * Number(amount),
      };

      setPortfolio([...portfolio, newItem]);
      setStock("");
      setAmount("");
    } catch (err) {
      console.log("Error fetching data");
    }
  };

  // ❌ REMOVE
  const removeStock = (name) => {
    setPortfolio(portfolio.filter((item) => item.name !== name));
  };

  // 💰 TOTAL PORTFOLIO VALUE
  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">

      <h1 className="text-3xl font-bold mb-6">💼 Portfolio</h1>

      {/* ADD SECTION */}
      <div className="flex gap-4 mb-6 flex-wrap">

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="px-4 py-2 rounded bg-white/10"
        >
          <option value="">Select Stock</option>
          {stockList.map((s, i) => (
            <option key={i} value={s} className="bg-black">
              {s}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 rounded bg-white/10"
        />

        <button
          onClick={addStock}
          className="bg-green-500 px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* TOTAL VALUE */}
      <div className="mb-6 text-xl">
        Total Value: <span className="text-green-400">₹ {totalValue.toFixed(2)}</span>
      </div>

      {/* PORTFOLIO GRID */}
      <div className="grid grid-cols-3 gap-4">

        {portfolio.map((item, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-lg"
          >
            <h2 className="text-lg font-bold">{item.name}</h2>

            <p className="text-gray-400 text-sm mt-1">
              Price: ₹ {item.price}
            </p>

            <p className="text-gray-400 text-sm">
              Quantity: {item.amount}
            </p>

            <p className="text-green-400 text-lg mt-2">
              Value: ₹ {item.value.toFixed(2)}
            </p>

            <p
              className={`mt-2 font-bold ${
                item.decision === "BUY"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {item.decision}
            </p>

            <button
              onClick={() => removeStock(item.name)}
              className="mt-3 text-red-400 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}