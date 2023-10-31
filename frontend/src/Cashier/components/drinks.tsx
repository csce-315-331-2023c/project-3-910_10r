import Drink from "./drink.tsx";
import "../styles/drinksMainSection.scss";
import React from "react";

interface Props {
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomizationPage: boolean;
}

function drinks({ setShowCustomizationPage, showCustomizationPage }: Props) {
  let drinkNames = [
    "Classic milk tea",
    "Honey milk tea",
    "Matcha milk tea",
    "Fresh milk tea",
    "Fresh honey milk tea",
    "Fresh matcha milk tea",
  ];
  return (
    <div
      //className="drinks"
      className={`${showCustomizationPage ? "drinks-selected" : "drinks"}`}
    >
      <div className="drinks-bound">
        <div className="drinks-grid">
          {drinkNames.map((item, index) => (
            <Drink
              key={item}
              setShowCustomizationPage={setShowCustomizationPage}
            >
              {item}
            </Drink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default drinks;
