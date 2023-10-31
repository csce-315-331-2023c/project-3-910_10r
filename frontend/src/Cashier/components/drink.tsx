import "../styles/drinksMainSection.scss";
import React from "react";

interface Props {
  children: string;
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const Show = (
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setShowCustomizationPage(true);
};

const drink = ({ children, setShowCustomizationPage }: Props) => {
  return (
    <button
      className="drinks-grid-drink"
      onClick={() => Show(setShowCustomizationPage)}
    >
      {children}
    </button>
  );
};

export default drink;
