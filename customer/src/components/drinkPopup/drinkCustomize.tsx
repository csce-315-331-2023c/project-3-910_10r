import Topping from "./topping";
import "./drinkCustomize.scss";
import React, { useState, useEffect } from "react";
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

interface back_end_order {
  name: string;
  ice: number;
  sugar: number;
  topping: string[];
  count: number[];
  // price: number;
}

interface Props {
  name: string;
  updateOrder: (newOrder: order) => void;
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function DrinkCustomize({
  name,
  updateOrder,
  setShowCustomizationPage,
}: Props) {
  const [selectedButton, setSelectedButton] = useState<number | null>(1);
  const [selectedSugarButton, setSelectedSugarButton] = useState<number | null>(
    1
  );

  const handleButtonClick = (buttonId: number) => {
    setSelectedButton(buttonId);
  };

  const handleSugarButtonClick = (buttonId: number) => {
    setSelectedSugarButton(buttonId);
  };

  let _order: order = {
    name: name,
    ice: "",
    sugar: "",
    topping: [],
    price: "0.00",
  };

  let backend_order: back_end_order = {
    name: name,
    ice: 0,
    sugar: 0.0,
    topping: [],
    count: [],
    // =price: 0.0,
  };

  const calculateSelections = () => {
    setShowCustomizationPage(false);
    console.log(selectedButton, selectedSugarButton);
    if (selectedButton === 1) {
      _order.ice = "regular ice";
      backend_order.ice = 10;
    } else if (selectedButton === 2) {
      _order.ice = "light ice";
      backend_order.ice = 5;
    } else if (selectedButton === 3) {
      _order.ice = "no ice";
      backend_order.ice = 0;
    } else {
      _order.ice = "extra ice";
      backend_order.ice = 15;
    }

    if (selectedSugarButton === 1) {
      _order.sugar = "100% sugar";
      backend_order.sugar = 10;
    } else if (selectedSugarButton === 2) {
      _order.sugar = "80% sugar";
      backend_order.sugar = 8;
    } else if (selectedSugarButton === 3) {
      _order.sugar = "50% sugar";
      backend_order.sugar = 5;
    } else if (selectedSugarButton === 4) {
      _order.sugar = "30% sugar";
      backend_order.sugar = 3;
    } else if (selectedSugarButton === 5) {
      _order.sugar = "0% sugar";
      backend_order.sugar = 0;
    } else {
      _order.sugar = "120% sugar";
      backend_order.sugar = 12;
    }

    let toppingPrice: number = 0.0;
    let i: number = 0;
    for (const [key] of Object.entries(toppings)) {
      let count = toppingCount[i];
      if (count > 0) {
        _order.topping.push(key + " x" + count);
        backend_order.topping.push(key);
        backend_order.count.push(count);
        toppingPrice += count * 0.75;
      }
      i++;
    }
    let tmpPrice: number = +_order.price;
    toppingPrice += tmpPrice;
    _order.price = "" + toppingPrice.toFixed(2);

    updateOrder(_order);

    API.put("/cashier/updateInventory", { backend_order });

    resetCount();
  };

  const resetCount = () => {
    setToppingCount(new Array(Object.keys(toppings).length).fill(0));
    setSelectedButton(1);
    setSelectedSugarButton(1);
  };

  const increment = (index: number) => {
    const newToppingCount = [...toppingCount];
    newToppingCount[index]++;
    setToppingCount(newToppingCount);
  };

  const decrement = (index: number) => {
    const newToppingCount = [...toppingCount];
    newToppingCount[index] > 0 && newToppingCount[index]--;
    setToppingCount(newToppingCount);
  };

  //query database
  let [backendData, setData] = useState<string>("");
  const [toppings, setToppings] = useState<{ [key: string]: boolean }>({});
  const [toppingCount, setToppingCount] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  let query_drinkname: string = name.toLowerCase();
  let top: string[] = [];
  let defaultTop: string[] = [];

  const updateTopping = () => {
    let tmpToppingCount: number[] = [];
    for (let i = 0; i < top.length; i++) {
      tmpToppingCount.push(0);
    }
    defaultTop.forEach((item) => {
      const toppingIndex = top.indexOf(item);
      if (toppingIndex < 0) {
        console.log("error: topping in drink does not exist in inventory");
      } else {
        //newToppingCount[toppingIndex] = 1;
        tmpToppingCount[toppingIndex] = 1;
      }
    });

    setToppingCount(tmpToppingCount);
  };

  useEffect(() => {
    // Make a GET request to your backend API
    setLoading(true);
    API.get("/cashier/toppings")
      .then((response) => {
        setToppings(response.data);
        top = Object.keys(response.data);
        API.get("/cashier/getDefaultToppingsByDrink", {
          params: {
            drink: query_drinkname,
          },
        })
          .then((response) => {
            defaultTop = response.data;
            updateTopping();
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // getting price for the drink
  useEffect(() => {
    // Make a GET request to your backend API
    API.get("/cashier/price", {
      params: {
        drink: query_drinkname,
      },
    })
      .then((response) => {
        setData(response.data.price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  _order.price = backendData;

  return (
    <div className="customize">
      {loading ? (
        <></>
      ) : (
        <>
          <button
            className="customize-exit"
            onClick={() => setShowCustomizationPage(false)}
          >
            X
          </button>
          <div className="customize-grid">
            <div className="customize-drink">{name}</div>
            <div className="ice">
              <div className="ice-title">Ice</div>
              <div className="ice-buttons">
                <button
                  className={`${
                    selectedButton === 1 ? "ice-button-selected" : "ice-button"
                  }`}
                  onClick={() => handleButtonClick(1)}
                >
                  Regular Ice
                </button>
                <button
                  className={`${
                    selectedButton === 2 ? "ice-button-selected" : "ice-button"
                  }`}
                  onClick={() => handleButtonClick(2)}
                >
                  Light Ice
                </button>
                <button
                  className={`${
                    selectedButton === 3 ? "ice-button-selected" : "ice-button"
                  }`}
                  onClick={() => handleButtonClick(3)}
                >
                  No Ice
                </button>
                <button
                  className={`${
                    selectedButton === 4 ? "ice-button-selected" : "ice-button"
                  }`}
                  onClick={() => handleButtonClick(4)}
                >
                  Extra Ice
                </button>
              </div>
            </div>

            <div className="sugar">
              <div className="sugar-title">Sugar</div>
              <div className="sugar-buttons">
                <button
                  className={`${
                    selectedSugarButton === 1
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(1)}
                >
                  100%
                </button>
                <button
                  className={`${
                    selectedSugarButton === 2
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(2)}
                >
                  80%
                </button>
                <button
                  className={`${
                    selectedSugarButton === 3
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(3)}
                >
                  50%
                </button>
                <button
                  className={`${
                    selectedSugarButton === 4
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(4)}
                >
                  30%
                </button>
                <button
                  className={`${
                    selectedSugarButton === 5
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(5)}
                >
                  0%
                </button>
                <button
                  className={`${
                    selectedSugarButton === 6
                      ? "sugar-button-selected"
                      : "sugar-button"
                  }`}
                  onClick={() => handleSugarButtonClick(6)}
                >
                  120%
                </button>
              </div>
            </div>
            <div className="toppings">
              <div className="toppings-title">Toppings</div>
              <div className="toppings-box">
                {Object.entries(toppings).map((item, index) => (
                  <Topping
                    key={index}
                    name={item[0]}
                    count={toppingCount[index]}
                    onDecrement={decrement}
                    onIncrement={increment}
                    index={index}
                    lowStock={item[1]}
                  ></Topping>
                ))}
              </div>
            </div>
          </div>
          <button className="customize-confirm" onClick={calculateSelections}>
            Confirm
          </button>
        </>
      )}
    </div>
  );
}

export default DrinkCustomize;
