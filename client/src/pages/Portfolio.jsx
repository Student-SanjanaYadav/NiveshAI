import { useState } from "react";

export default function Portfolio() {
  const [stock, setStock] = useState("RELIANCE.NS");
  const [quantity, setQuantity] = useState(1);
  const [portfolio, setPortfolio] = useState([]);

  const stockList = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","ITC.NS","WIPRO.NS","AXISBANK.NS","TATAMOTORS.NS"
  ];

  const addStock = async () => {
    try {
      const res = await fetch(`https://niveshai-4.onrender.com/stock/${stock}`);
      const data = await res.json();

      const latestPrice = data.prices[data.prices.length - 1];

      const newStock = {
        name: stock,
        quantity: quantity,
        price: latestPrice,
        total: latestPrice * quantity,
      };

      setPortfolio([...portfolio, newStock]);
    } catch (err) {
      console.log(err);
      alert("API not working ❌");
    }
  };

  // 🔥 TOTAL PORTFOLIO VALUE
  const totalValue = portfolio.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Portfolio</h1>

      {/* INPUTS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">

        <select
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="px-4 py-2 bg-gray-800 rounded"
        >
          {stockList.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="px-4 py-2 bg-gray-800 rounded"
          placeholder="Quantity"
        />

        <button
          onClick={addStock}
          className="px-4 py-2 bg-green-500 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {portfolio.map((item, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded flex justify-between">
            <span>{item.name}</span>
            <span>Qty: {item.quantity}</span>
            <span>₹{item.price}</span>
            <span className="text-green-400">₹{item.total}</span>
          </div>
        ))}
      </div>

      {/* TOTAL */}
      <div className="mt-6 text-xl font-bold">
        Total Value: ₹{totalValue.toFixed(2)}
      </div>

    </div>
  );
}