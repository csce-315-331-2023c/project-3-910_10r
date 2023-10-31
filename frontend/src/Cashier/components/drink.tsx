import "../styles/drinksMainSection.scss";
import React from "react";

interface Props {
  children: string;
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
}

const Show = (
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>,
  setDrinkName: React.Dispatch<React.SetStateAction<string>>,
  children: string
) => {
  setShowCustomizationPage(true);
  setDrinkName(children);
};

const drink = ({ children, setShowCustomizationPage, setDrinkName }: Props) => {
  return (
    <button
      className="drinks-grid-drink"
      onClick={() => Show(setShowCustomizationPage, setDrinkName, children)}
    >
      {children}
    </button>
  );
};

export default drink;
