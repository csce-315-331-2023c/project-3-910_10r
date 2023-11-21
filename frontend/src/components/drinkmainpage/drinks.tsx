import Drink from "./drink.tsx";
import "./drinksMainSection.scss";
// import React, { useState, useEffect } from "react";

interface Props {
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomizationPage: boolean;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
  drinknames: string[];
}

function drinks({
  setShowCustomizationPage,
  showCustomizationPage,
  setDrinkName,
  drinknames,
}: Props) {
  // let drinkNames = [
  //   "Classic milk tea",
  //   "Honey milk tea",
  //   "Matcha milk tea",
  //   "Fresh milk tea",
  //   "Fresh honey milk tea",
  //   "Fresh matcha milk tea",
  // ];

  // const [drinks, setDrinks] = useState<string[]>([]);
  return (
    <div
      //className="drinks"
      className={`${showCustomizationPage ? "drinks-selected" : "drinks"}`}
    >
      <div className="drinks-bound">
        <div className="drinks-grid">
          {drinknames === undefined ? (
            <div>Loading</div>
          ) : (
            drinknames.map((item) => (
              <Drink
                key={item}
                setShowCustomizationPage={setShowCustomizationPage}
                setDrinkName={setDrinkName}
              >
                {item}
              </Drink>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default drinks;
