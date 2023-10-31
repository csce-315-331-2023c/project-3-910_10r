import Navigationbar from "./components/drinkNavbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";
import Footer from "./components/footer.tsx";
import DrinkCustomize from "./components/drinkCustomize.tsx";
import React, { useState } from "react";

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string;
  price: string;
}

function Cashier() {
  const [orders, setOrders] = useState<order[]>([]);

  const updateOrder = (newOrder: order) => {
    setOrders((prevArray) => [...prevArray, newOrder]);
  };

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Footer></Footer>
      <Navigationbar></Navigationbar>
      <Cart orders={orders}></Cart>
      <Drinks></Drinks>
      <DrinkCustomize
        name="Classic Milk Tea"
        updateOrder={updateOrder}
      ></DrinkCustomize>
    </div>
  );
}

export default Cashier;
