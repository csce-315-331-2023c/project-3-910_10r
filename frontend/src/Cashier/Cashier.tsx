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
  topping: string[];
  price: string;
}

function Cashier() {
  const [orders, setOrders] = useState<order[]>([]);
  const [showCustomizationPage, setShowCustomizationPage] =
    useState<boolean>(false);
  const [drinkName, setDrinkName] = useState<string>("");

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
      <Navigationbar
        showCustomizationPage={showCustomizationPage}
      ></Navigationbar>
      <Cart orders={orders}></Cart>
      <Drinks
        setShowCustomizationPage={setShowCustomizationPage}
        showCustomizationPage={showCustomizationPage}
        setDrinkName={setDrinkName}
      ></Drinks>
      {showCustomizationPage && (
        <DrinkCustomize
          name={drinkName}
          updateOrder={updateOrder}
          setShowCustomizationPage={setShowCustomizationPage}
        ></DrinkCustomize>
      )}
    </div>
  );
}

export default Cashier;
