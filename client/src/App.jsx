import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import Menu from "./pages/Menu";
import Footer from "./components/Footer";
function App() {
  return (
    <div>
      <Navbar />
      <Herosection />
      <Menu />
      <Footer />
    </div>
  );
}

export default App;
