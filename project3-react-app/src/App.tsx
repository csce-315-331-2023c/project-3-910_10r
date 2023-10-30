import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navigationbar from "./components/navbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";

function App() {
  return (
    <div
      style={{ backgroundColor: "#CCE3DE", width: "100vw", height: "100vh" }}
    >
      <Navigationbar></Navigationbar>
      <Cart></Cart>
      <Drinks></Drinks>
    </div>
  );
}

export default App;
