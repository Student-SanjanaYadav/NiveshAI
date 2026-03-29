import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="hidden md:block w-64 h-screen bg-black/80 backdrop-blur-xl text-white p-6 border-r border-white/10">
      
      <h1 className="text-2xl font-bold mb-10">NiveshAI </h1>

      <nav className="flex flex-col gap-6 text-gray-300">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
        <Link to="/portfolio" className="hover:text-white transition">Portfolio</Link>
        <Link to="/radar" className="hover:text-white transition">Radar</Link>
        <Link to="/login" className="hover:text-white transition">Login</Link>
      </nav>

    </div>
  );
}