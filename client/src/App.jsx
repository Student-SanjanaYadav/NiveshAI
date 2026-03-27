import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Radar from "./pages/Radar";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/radar" element={<Radar />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </motion.div>
        </div>
      </div>
    </BrowserRouter>
  );
}