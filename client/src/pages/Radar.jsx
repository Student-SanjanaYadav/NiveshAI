import { useState, useEffect } from "react";

export default function Radar() {
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState([]);

  const stockList = [
    "RELIANCE.NS","TCS.NS","INFY.NS","HDFCBANK.NS","ICICIBANK.NS",
    "SBIN.NS","LT.NS","ITC.NS","WIPRO.NS","AXISBANK.NS",
    "MARUTI.NS","TATAMOTORS.NS","ADANIENT.NS","ADANIPORTS.NS",
    "BAJFINANCE.NS","HCLTECH.NS","SUNPHARMA.NS","TITAN.NS",
    "ULTRACEMCO.NS","NESTLEIND.NS"
  ];

  const toggleStock = (stock) => {
    if (selected.includes(stock)) {
      setSelected(selected.filter((s) => s !== stock));
    } else {
      setSelected([...selected, stock]);
    }
  };

  useEffect(() => {
    if (selected.length === 0) return;

    Promise.all(
      selected.map((s) =>
        fetch("https://niveshai-4.onrender.com/stock/" + s)
          .then((res) => res.json())
      )
    ).then((results) => {
      const formatted = results.map((r, i) => ({
        name: selected[i],
        price: r.prices?.slice(-1)[0] || 0,
      }));
      setData(formatted);
    });
  }, [selected]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Radar Comparison</h1>

      {/* STOCK SELECTION */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {stockList.map((s, i) => (
          <button
            key={i}
            onClick={() => toggleStock(s)}
            className={`p-2 rounded ${
              selected.includes(s)
                ? "bg-green-500"
                : "bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* RESULT */}
      <div className="grid grid-cols-3 gap-4">
        {data.map((d, i) => (
          <div
            key={i}
            className="bg-white/10 p-4 rounded-xl"
          >
            <h2 className="text-lg">{d.name}</h2>
            <p className="text-green-400 text-xl mt-2">
              ₹ {d.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}