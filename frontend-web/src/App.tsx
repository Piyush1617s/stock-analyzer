import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StockDetail from "./pages/StockDetail";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Analyzer</h1>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock/:symbol" element={<StockDetail />} />
      </Routes>
    </div>
  );
}

export default App;
