import "./drinksMainSection.scss";
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
  const buttonStyle = {
    backgroundImage: `url('../../src/assets/drinkImgs/${children}.png')`,
  };
  const textStyle = {
    color: "white",
  };
  return (
    <button
      style={buttonStyle}
      className="drinks-grid-drink"
      onClick={() => Show(setShowCustomizationPage, setDrinkName, children)}
    >
      <p style={textStyle}>{children}</p>
    </button>
  );
};

export default drink;
