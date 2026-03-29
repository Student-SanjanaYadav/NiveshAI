import { useState } from "react";

export default function Portfolio() {
  const [stock, setStock] = useState("RELIANCE.NS");
  const [quantity, setQuantity] = useState(1);
  const [buyPrice, setBuyPrice] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  const stockList = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","ITC.NS","WIPRO.NS","AXISBANK.NS","TATAMOTORS.NS"
  ];

  const addStock = async () => {
    if (!buyPrice) {
      alert("Enter Buy Price");
      return;
    }

    try {
      const res = await fetch(`https://niveshai-4.onrender.com/stock/${stock}`);
      const data = await res.json();

      const currentPrice = data.prices?.slice(-1)[0] || 0;

      const newStock = {
        name: stock,
        quantity: Number(quantity),
        buyPrice: Number(buyPrice),
        currentPrice,
      };

      setPortfolio([...portfolio, newStock]);
      setBuyPrice("");
    } catch {
      alert("API Error ❌");
    }
  };

  // 🔥 CALCULATIONS
  const totalInvestment = portfolio.reduce(
    (acc, item) => acc + item.buyPrice * item.quantity,
    0
  );

  const currentValue = portfolio.reduce(
    (acc, item) => acc + item.currentPrice * item.quantity,
    0
  );

  const profitLoss = currentValue - totalInvestment;
  const profitPercent =
    totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Portfolio 💰
      </h1>

      {/* INPUTS */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        >
          {stockList.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        />

        <input
          type="number"
          placeholder="Buy Price"
          value={buyPrice}
          onChange={(e) => setBuyPrice(e.target.value)}
          className="px-3 py-2 bg-gray-800 rounded"
        />

        <button
          onClick={addStock}
          className="px-4 py-2 bg-green-500 rounded"
        >
          Add
        </button>
      </div>

      {/* STOCK LIST */}
      <div className="space-y-3">
        {portfolio.map((item, i) => {
          const invested = item.buyPrice * item.quantity;
          const current = item.currentPrice * item.quantity;
          const pnl = current - invested;

          return (
            <div key={i} className="bg-gray-900 p-4 rounded-xl">
              <div className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>Qty: {item.quantity}</span>
              </div>

              <div className="flex justify-between mt-2 text-sm">
                <span>Buy: ₹{item.buyPrice}</span>
                <span>Current: ₹{item.currentPrice}</span>
              </div>

              <div
                className={`mt-2 font-bold ${
                  pnl >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                P&L: ₹{pnl.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* SUMMARY */}
      <div className="mt-6 p-4 bg-gray-900 rounded-xl">

        <p>Total Investment: ₹{totalInvestment.toFixed(2)}</p>
        <p>Current Value: ₹{currentValue.toFixed(2)}</p>

        <p
          className={`font-bold ${
            profitLoss >= 0 ? "text-green-400" : "text-red-400"
          }`}
        >
          Overall P&L: ₹{profitLoss.toFixed(2)} ({profitPercent.toFixed(2)}%)
        </p>

      </div>
    </div>
  );
}