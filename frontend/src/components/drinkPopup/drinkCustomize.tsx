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
    // price: 0.0,
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
    for (let i = 0; i < toppings.length; i++) {
      let count = toppingCount[i];
      if (count > 0) {
        _order.topping.push(toppings[i] + " x" + count);
        backend_order.topping.push(toppings[i]);
        backend_order.count.push(count);
        toppingPrice += count * 0.75;
      }
    }
    let tmpPrice: number = +_order.price;
    toppingPrice += tmpPrice;
    _order.price = "" + toppingPrice.toFixed(2);

    updateOrder(_order);

    //API.put("/cashier/updateInventory", { backend_order });

    resetCount();
  };

  const resetCount = () => {
    // setPCount(0);
    // setAVCount(0);
    // setHJCount(0);
    // setPUCount(0);
    // setMPCount(0);
    // setMPCount(0);
    // setCBCount(0);
    // setLJCount(0);
    // setRBCount(0);
    // setAJCount(0);
    setToppingCount(new Array(toppings.length).fill(0));
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

  const updateTopping = (defaults: string[]) => {
    const newToppingCount = [...toppingCount];
    defaults.forEach((item) => {
      const toppingIndex = toppings.indexOf(item);
      if (toppingIndex < 0) {
        console.log("error: topping in drink does not exist in inventory");
      } else {
        newToppingCount[toppingIndex] = 1;
      }
    });
    setToppingCount(newToppingCount);
  };

  //query database
  let [backendData, setData] = useState<string>("");
  let [defaultToppings, setDefaultToppings] = useState<string[]>([]);
  let [toppings, setToppings] = useState<string[]>([]);
  let [toppingCount, setToppingCount] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  let query_drinkname: string = name.toLowerCase();
  console.log(query_drinkname);

  useEffect(() => {
    // Make a GET request to your backend API
    setLoading(true);
    API.get("/cashier/toppings")
      .then((response) => {
        setToppings(response.data);
        setToppingCount(new Array(response.data.length).fill(0));
      })
      .catch((error) => {
        console.error(error);
      });

    API.get("/cashier/getDefaultToppingsByDrink", {
      params: {
        drink: query_drinkname,
      },
    })
      .then((response) => {
        setDefaultToppings(response.data);
        updateTopping(response.data);
        console.log(response.data);
        setLoading2(false);
        setLoading(false);
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

  // getting default topping for the drink
  // useEffect(() => {
  //   setLoading2(true);
  //   // Make a GET request to your backend API
  //   API.get("/cashier/getDefaultToppingsByDrink", {
  //     params: {
  //       drink: query_drinkname,
  //     },
  //   })
  //     .then((response) => {
  //       setDefaultToppings(response.data);
  //       updateTopping(response.data);
  //       console.log(response.data);
  //       setLoading2(false);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  _order.price = backendData;

  return (
    <div className="customize">
      {loading || loading2 ? (
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
                {toppings.map((item, index) => (
                  <Topping
                    key={index}
                    name={item}
                    count={toppingCount[index]}
                    onDecrement={decrement}
                    onIncrement={increment}
                    index={index}
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
