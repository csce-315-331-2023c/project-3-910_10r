import Drink from "./drink.tsx";
import "./drinksMainSection.scss";
// import React, { useState, useEffect } from "react";

interface Props {
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomizationPage: boolean;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
  drinknames: string[];
  setShowLowPage: React.Dispatch<React.SetStateAction<boolean>>;
  drinksWithLowStock: string[];
}

function drinks({
  setShowCustomizationPage,
  showCustomizationPage,
  setDrinkName,
  drinknames,
  setShowLowPage,
  drinksWithLowStock,
}: Props) {
  return (
    <div className={`${showCustomizationPage ? "drinks-selected" : "drinks"}`}>
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
                setShowLowPage={setShowLowPage}
                drinksWithLowStock={drinksWithLowStock}
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
