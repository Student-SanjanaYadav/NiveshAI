import { Link } from "react-router-dom";
import { useState } from "react";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden bg-black text-white p-4 flex justify-between items-center border-b border-white/10">

      <h1 className="font-bold text-lg">NiveshAI 🚀</h1>

      <button onClick={() => setOpen(!open)}>
        ☰
      </button>

      {open && (
        <div className="absolute top-14 left-0 w-full bg-black flex flex-col gap-4 p-4 z-50 border-t border-white/10">
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
          <Link to="/portfolio" onClick={() => setOpen(false)}>Portfolio</Link>
          <Link to="/radar" onClick={() => setOpen(false)}>Radar</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
        </div>
      )}
    </div>
  );
}