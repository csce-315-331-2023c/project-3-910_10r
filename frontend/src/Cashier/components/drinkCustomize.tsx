import Topping from "./topping";
import "../styles/drinkCustomize.scss";
import React, { useState } from "react";

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string;
  price: string;
}

interface Props {
  name: string;
  updateOrder: (newOrder: order) => void;
}
function DrinkCustomize({ name, updateOrder }: Props) {
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

  const calculateSelections = () => {
    console.log(selectedButton, selectedSugarButton);
    pcount > 0 && console.log("pearls : " + pcount);
    avcount > 0 && console.log("aloe vera : " + avcount);
    hjcount > 0 && console.log("herb jelly : " + hjcount);
    pucount > 0 && console.log("pudding : " + pucount);
    mpcount > 0 && console.log("mini pearls : " + mpcount);
    cbcount > 0 && console.log("crystal boba : " + cbcount);
    ljcount > 0 && console.log("lychee jelly : " + ljcount);
    rbcount > 0 && console.log("red bean : " + rbcount);
    ajcount > 0 && console.log("aiyu jelly : " + ajcount);

    let _order: order = {
      name: name,
      ice: "",
      sugar: "",
      topping: "",
      price: "",
    };

    if (selectedButton === 1) {
      _order.ice = "regular ice";
    } else if (selectedButton === 2) {
      _order.ice = "light ice";
    } else if (selectedButton === 3) {
      _order.ice = "no ice";
    } else {
      _order.ice = "extra ice";
    }

    if (selectedSugarButton === 1) {
      _order.sugar = "100% sugar";
    } else if (selectedSugarButton === 2) {
      _order.sugar = "80% sugar";
    } else if (selectedSugarButton === 3) {
      _order.sugar = "50% sugar";
    } else if (selectedSugarButton === 4) {
      _order.sugar = "30% sugar";
    } else if (selectedSugarButton === 5) {
      _order.sugar = "0% sugar";
    } else {
      _order.sugar = "120% sugar";
    }

    if (pcount > 0) {
      _order.topping += "pearls x" + pcount + "\n";
    }
    if (avcount > 0) {
      _order.topping += "aloe vera x" + avcount + "\n";
    }
    if (hjcount > 0) {
      _order.topping += "herb jelly x" + hjcount + "\n";
    }
    if (pucount > 0) {
      _order.topping += "pudding x" + pucount + "\n";
    }
    if (mpcount > 0) {
      _order.topping += "mini pearls x" + mpcount + "\n";
    }
    if (cbcount > 0) {
      _order.topping += "crystal boba x" + cbcount + "\n";
    }
    if (ljcount > 0) {
      _order.topping += "lychee jelly x" + ljcount + "\n";
    }
    if (rbcount > 0) {
      _order.topping += "red bean x" + rbcount + "\n";
    }
    if (ajcount > 0) {
      _order.topping += "aiyu jelly x" + ajcount + "\n";
    }
    //query database

    updateOrder(_order);
    resetCount();
    console.log(_order.topping);
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

  return (
    <div className="customize">
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
