import Topping from "./topping";
import "./drinkCustomize.scss";
import React, { useState, useEffect } from "react";
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
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

  const [pcount, setPCount] = useState(0);
  const [avcount, setAVCount] = useState(0);
  const [hjcount, setHJCount] = useState(0);
  const [pucount, setPUCount] = useState(0);
  const [mpcount, setMPCount] = useState(0);
  const [cbcount, setCBCount] = useState(0);
  const [ljcount, setLJCount] = useState(0);
  const [rbcount, setRBCount] = useState(0);
  const [ajcount, setAJCount] = useState(0);

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
    pcount > 0 && console.log("pearls : " + pcount);
    avcount > 0 && console.log("aloe vera : " + avcount);
    hjcount > 0 && console.log("herb jelly : " + hjcount);
    pucount > 0 && console.log("pudding : " + pucount);
    mpcount > 0 && console.log("mini pearl : " + mpcount);
    cbcount > 0 && console.log("crystal boba : " + cbcount);
    ljcount > 0 && console.log("lychee jelly : " + ljcount);
    rbcount > 0 && console.log("red bean : " + rbcount);
    ajcount > 0 && console.log("aiyu jelly : " + ajcount);

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
    if (pcount > 0) {
      _order.topping.push("pearls x" + pcount);
      backend_order.topping.push("pearls");
      backend_order.count.push(pcount);
      toppingPrice += pcount * 0.75;
    }
    if (avcount > 0) {
      _order.topping.push("aloe vera x" + avcount);
      backend_order.topping.push("aloe vera");
      backend_order.count.push(avcount);
      toppingPrice += avcount * 0.75;
    }

    if (hjcount > 0) {
      _order.topping.push("herb jelly x" + hjcount);
      backend_order.topping.push("herb jelly");
      backend_order.count.push(hjcount);
      toppingPrice += hjcount * 0.75;
    }
    if (pucount > 0) {
      _order.topping.push("pudding x" + pucount);
      backend_order.topping.push("pudding");
      backend_order.count.push(pucount);
      toppingPrice += pucount * 0.75;
    }
    if (mpcount > 0) {
      _order.topping.push("mini pearl x" + mpcount);
      backend_order.topping.push("mini pearl");
      backend_order.count.push(mpcount);
      toppingPrice += mpcount * 0.75;
    }
    if (cbcount > 0) {
      _order.topping.push("crystal boba x" + cbcount);
      backend_order.topping.push("crystal boba");
      backend_order.count.push(cbcount);
      toppingPrice += cbcount * 0.75;
    }
    if (ljcount > 0) {
      _order.topping.push("lychee jelly x" + ljcount);
      backend_order.topping.push("lychee jelly");
      backend_order.count.push(ljcount);
      toppingPrice += ljcount * 0.75;
    }
    if (rbcount > 0) {
      _order.topping.push("red bean x" + rbcount);
      backend_order.topping.push("red bean");
      backend_order.count.push(rbcount);
      toppingPrice += rbcount * 0.75;
    }
    if (ajcount > 0) {
      _order.topping.push("aiyu jelly x" + ajcount);
      backend_order.topping.push("aiyu jelly");
      backend_order.count.push(ajcount);
      toppingPrice += ajcount * 0.75;
    }

    let tmpPrice: number = +_order.price;
    toppingPrice += tmpPrice;
    _order.price = "" + toppingPrice.toFixed(2);

    updateOrder(_order);

    // EUNSOO HERE IS WHAT YOU CAN POST TO THE BACKEND
    // interface back_end_order {
    // name: string;
    // ice: number;
    // sugar: number;
    // topping: string[];
    // count: number[];
    // }
    API.post('/cashier/updateInventory', {backend_order})

    resetCount();
  };

  const resetCount = () => {
    setPCount(0);
    setAVCount(0);
    setHJCount(0);
    setPUCount(0);
    setMPCount(0);
    setMPCount(0);
    setCBCount(0);
    setLJCount(0);
    setRBCount(0);
    setAJCount(0);
    setSelectedButton(1);
    setSelectedSugarButton(1);
  };

  //query database
  let [backendData, setData] = useState<string>("");

  useEffect(() => {
    // Make a GET request to your backend API
    API
      .get('/cashier/price/' + name)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  _order.price = backendData;
  console.log(backendData);

  return (
    <div className="customize">
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
            <Topping
              name="pearls"
              count={pcount}
              setCount={setPCount}
            ></Topping>
            <Topping
              name="aloe vera"
              count={avcount}
              setCount={setAVCount}
            ></Topping>
            <Topping
              name="herb jelly"
              count={hjcount}
              setCount={setHJCount}
            ></Topping>
            <Topping
              name="pudding"
              count={pucount}
              setCount={setPUCount}
            ></Topping>
            <Topping
              name="mini pearl"
              count={mpcount}
              setCount={setMPCount}
            ></Topping>
            <Topping
              name="crystal boba"
              count={cbcount}
              setCount={setCBCount}
            ></Topping>
            <Topping
              name="lychee jelly"
              count={ljcount}
              setCount={setLJCount}
            ></Topping>
            <Topping
              name="red bean"
              count={rbcount}
              setCount={setRBCount}
            ></Topping>
            <Topping
              name="aiyu jelly"
              count={ajcount}
              setCount={setAJCount}
            ></Topping>
          </div>
        </div>
      </div>
      <button className="customize-confirm" onClick={calculateSelections}>
        Confirm
      </button>
    </div>
  );
}

export default DrinkCustomize;
