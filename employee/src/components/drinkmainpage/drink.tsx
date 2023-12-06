import "./drinksMainSection.scss";
import React from "react";

interface Props {
  children: string;
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
  setShowLowPage: React.Dispatch<React.SetStateAction<boolean>>;
  drinksWithLowStock: string[];
}

const Show = (
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>,
  setDrinkName: React.Dispatch<React.SetStateAction<string>>,
  children: string
) => {
  setShowCustomizationPage(true);
  setDrinkName(children);
};

const ShowLow = (
  setDrinkName: React.Dispatch<React.SetStateAction<string>>,
  setShowLowPage: React.Dispatch<React.SetStateAction<boolean>>,
  children: string
) => {
  setShowLowPage(true);
  setDrinkName(children);
};

/**
 * Drink component
 * @param {string} props.children String of children
 * @param {function} props.setDrinkName Function to set the drink name
 * @param {function} props.setShowLowPage Function to set the low pages
 * @param {string[]} props.drinksWithLowStock List of low stock drinks
 */
const drink = ({
  children,
  setShowCustomizationPage,
  setDrinkName,
  setShowLowPage,
  drinksWithLowStock,
}: Props) => {
  let low = drinksWithLowStock.indexOf(children) > -1;
  return (
    <div>
      {low ? (
        <button
          className="drinks-grid-drink-low"
          onClick={() => ShowLow(setDrinkName, setShowLowPage, children)}
        >
          {children}
        </button>
      ) : (
        <button
          className="drinks-grid-drink"
          onClick={() => Show(setShowCustomizationPage, setDrinkName, children)}
        >
          {children}
        </button>
      )}
    </div>
  );
};

export default drink;
