import Navigationbar from "./components/drinkNavbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";
import Footer from "./components/footer.tsx";
import DrinkCustomize from "./components/drinkCustomize.tsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string[];
  price: string;
}

// interface drinkCategory {
//   category: "";
//   drinks: [];
// }

function Cashier() {
  // keeps track of orders in the cart
  const [orders, setOrders] = useState<order[]>([]);
  // keeps track of if drink is selected in order to dim other pages
  const [showCustomizationPage, setShowCustomizationPage] =
    useState<boolean>(false);
  // keeps track of the drink selected
  const [drinkName, setDrinkName] = useState<string>("");
  // keeps track of the selected category
  const [category, setCatogory] = useState<string>("");
  // keeps track of all the drinks and categories for easier access in the future
  const [drinks, setDrinks] = useState<{ [key: string]: string[] }>({});
  // keeps track of all categories
  const [categories, setCatogories] = useState<string[]>([]);

  const updateOrder = (newOrder: order) => {
    setOrders((prevArray) => [...prevArray, newOrder]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/cashier/drinkCategory")
      .then((response) => {
        setCatogories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cashier/drinkAndCategories")
      .then((response) => {
        setDrinks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Footer></Footer>
      <Navigationbar
        showCustomizationPage={showCustomizationPage}
        setCatogory={setCatogory}
        category={categories}
      ></Navigationbar>
      <Cart orders={orders}></Cart>
      <Drinks
        setShowCustomizationPage={setShowCustomizationPage}
        showCustomizationPage={showCustomizationPage}
        setDrinkName={setDrinkName}
        drinks={category === "" ? drinks[categories[0]] : drinks[category]}
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
