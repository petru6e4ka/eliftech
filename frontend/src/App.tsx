import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { ShoppingCart } from "./pages/shopping-cart";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
    </Routes>
  );
}

export default App;
