import Topping from "./topping";
import "../styles/drinkCustomize.scss";
import React, { useState } from "react";

interface Props {
  name: string;
}
function DrinkCustomize({ name }: Props) {
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
            <Topping name="pearls"></Topping>
            <Topping name="aloe vera"></Topping>
            <Topping name="herb jelly"></Topping>
            <Topping name="pudding"></Topping>
            <Topping name="mini pearl"></Topping>
            <Topping name="crystal boba"></Topping>
            <Topping name="lychee jelly"></Topping>
            <Topping name="red bean"></Topping>
            <Topping name="aiyu jelly"></Topping>
          </div>
        </div>
      </div>
      <button className="customize-confirm">Confirm</button>
    </div>
  );
}

export default DrinkCustomize;
