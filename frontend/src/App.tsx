import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Cashier from "./Cashier/Cashier.tsx";
import axios from "axios";
import React, { useEffect } from "react";

interface MyData {
  // Define the structure of your data here
  id: number;
  name: string;
  ingredients: string[];
  price: string;
  category: string;
}

function App() {
  let [backendData, setData] = useState<MyData[]>([]);

  useEffect(() => {
    // Make a GET request to your backend API
    axios
      .get("http://localhost:8000/user")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div
        style={{ backgroundColor: "#CCE3DE", width: "100vw", height: "100vh" }}
      >
        <Cashier></Cashier>
      </div>
    </>
  );
}

export default App;
