import { useState } from "react";

export default function Radar() {
  const stocks = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","LT.NS","ITC.NS","WIPRO.NS","AXISBANK.NS",
    "MARUTI.NS","TATAMOTORS.NS","ADANIENT.NS","ADANIPORTS.NS",
    "BAJFINANCE.NS","HCLTECH.NS","SUNPHARMA.NS","TITAN.NS",
    "ULTRACEMCO.NS","NESTLEIND.NS"
  ];

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  const toggleStock = (s) => {
    if (selected.includes(s)) {
      setSelected(selected.filter((x) => x !== s));
    } else {
      if (selected.length < 4) {
        setSelected([...selected, s]);
      } else {
        alert("Select max 4 stocks");
      }
    }
  };

  const fetchData = async () => {
    const results = [];

    for (let s of selected) {
      try {
        const res = await fetch(`https://niveshai-4.onrender.com/stock/${s}`);
        const d = await res.json();
        const price = d.prices?.slice(-1)[0];

        results.push({
          name: s,
          price: price || 0,
        });
      } catch {
        results.push({
          name: s,
          price: 0,
        });
      }
    }

    setData(results);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Radar Comparison
      </h1>

      {/* 🔥 STOCK BUTTONS (FIXED) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {stocks.map((s, i) => (
          <button
            key={i}
            onClick={() => toggleStock(s)}
            className={`px-3 py-2 rounded text-xs sm:text-sm ${
              selected.includes(s)
                ? "bg-green-500"
                : "bg-gray-800"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* FETCH BUTTON */}
      <button
        onClick={fetchData}
        className="mb-6 px-4 py-2 bg-blue-500 rounded"
      >
        Compare
      </button>

      {/* 🔥 RESULT CARDS (FIXED GRID) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.map((item, i) => (
          <div key={i} className="bg-gray-900 p-4 rounded-xl">
            <p className="text-sm text-gray-400">{item.name}</p>
            <p className="text-green-400 text-lg sm:text-xl">
              ₹ {item.price}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}