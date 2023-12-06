import Drink from "./drink.tsx";
import "./drinksMainSection.scss";
// import React, { useState, useEffect } from "react";

interface Props {
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomizationPage: boolean;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
  drinks: string[];
  drinksWithLowStock: string[];
}
/**
 * represent all drinks within a category
 * @param {React.Dispatch<React.SetStateAction<boolean>>} Props.setShowCustomizationPage
 * @param {boolean} Props.showCustomizationPage
 *  @param {React.Dispatch<React.SetStateAction<string>>} Props.setDrinkName
 * @param {string[]} Props.drinks
 * @param {string[]} Props.drinksWithLowStock
 */
function drinks({
  setShowCustomizationPage,
  showCustomizationPage,
  setDrinkName,
  drinks,
  drinksWithLowStock,
}: Props) {
  return (
    <div
      //className="drinks"
      className={`${showCustomizationPage ? "drinks-selected" : "drinks"}`}
    >
      <div className="drinks-bound">
        <div className="drinks-grid">
          {drinks === undefined ? (
            <div>Loading</div>
          ) : (
            drinks.map((item) => (
              <Drink
                key={item}
                setShowCustomizationPage={setShowCustomizationPage}
                setDrinkName={setDrinkName}
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
