import Navigationbar from "../../components/categoryNavBar/drinkNavbar.tsx";
import Drinks from "../../components/drinkmainpage/drinks.tsx";
import Cart from "../../components/cart/cart.tsx";
import DrinkCustomize from "../../components/drinkPopup/drinkCustomize.tsx";
import React, { useState, useEffect } from "react";
import CustomerHeader from "../../components/header/header.tsx";

import "./cashier.scss";

import axios, { AxiosInstance } from "axios";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string[];
  price: string;
}

interface Props {
  setPayPage: React.Dispatch<React.SetStateAction<boolean>>;
  setWhichPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cashier({ setPayPage, setWhichPage}: Props) {
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
  const [loaded, setLoaded] = useState<boolean>(false);

  const updateOrder = (newOrder: order) => {
    setOrders((prevArray) => [...prevArray, newOrder]);
  };

  useEffect(() => {
    API.get("/cashier/drinkCategory")
      .then((response) => {
        setCatogories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    API.get("/cashier/drinkAndCategories")
      .then((response) => {
        setDrinks(response.data);
        console.log(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="cashier-grid">
      {loaded ? (
        <>
          <CustomerHeader setWhichPage={setWhichPage}></CustomerHeader>

            <div className="cashier-grid-main">
              <Navigationbar
                showCustomizationPage={showCustomizationPage}
                setCatogory={setCatogory}
                category={categories}
              ></Navigationbar>
              <Drinks
                setShowCustomizationPage={setShowCustomizationPage}
                showCustomizationPage={showCustomizationPage}
                setDrinkName={setDrinkName}
                drinks={
                  category === "" ? drinks[categories[0]] : drinks[category]
                }
              ></Drinks>
              <Cart
                orders={orders}
                setOrders={setOrders}
                setPayPage={setPayPage}
              ></Cart>
            </div>
          {showCustomizationPage && (
            <DrinkCustomize
              name={drinkName}
              updateOrder={updateOrder}
              setShowCustomizationPage={setShowCustomizationPage}
            ></DrinkCustomize>
          )}
        </>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "var(--GREEN-MED)",
            color: "black",
            fontSize: "30px",
          }}
        >
          Loading
        </div>
      )}
    </div>
  );
}

export default Cashier;
