import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Herosection from "./components/Herosection";
import Menu from "./pages/Menu";
import Footer from "./components/Footer";
import { MenuProvider } from "./context/MenuContext";

function App() {
  return (
    <MenuProvider>
      <div>
        <Navbar />
        <Herosection />
        <Menu />
        <Footer />
      </div>
    </MenuProvider>
  );
}

export default App;
