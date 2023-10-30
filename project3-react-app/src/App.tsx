import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Cashier from "./Cashier/Cashier.tsx";

function App() {
  return (
    <div
      style={{ backgroundColor: "#CCE3DE", width: "100vw", height: "100vh" }}
    >
      <Cashier></Cashier>
    </div>
  );
}

export default App;
