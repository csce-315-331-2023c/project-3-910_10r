import "./drinksMainSection.scss";
import React from "react";
interface Props {
  children: string;
  setShowCustomizationPage: React.Dispatch<React.SetStateAction<boolean>>;
  setDrinkName: React.Dispatch<React.SetStateAction<string>>;
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

const drink = ({
  children,
  setShowCustomizationPage,
  setDrinkName,
  drinksWithLowStock,
}: Props) => {
  const buttonStyle = {
    backgroundImage: `url('../../src/assets/drinkImgs/${children}.png')`,
    cursor: `pointer`,
  };
  const buttonStyleDimmed = {
    backgroundImage: `url('../../src/assets/drinkImgs/${children}.png')`,
    filter: "brightness(30%)",
  };
  const textStyle = {
    color: "white",
  };

  const low = drinksWithLowStock.indexOf(children) > -1;
  return (
    <div>
      {low ? (
        <div>
        <button style={buttonStyleDimmed} className="drinks-grid-drink">
          
        </button>
        <p className="drinkTitle">{children}</p>
        </div>
      ) : (
        <div>
        <button
          style={buttonStyle}
          className="drinks-grid-drink"
          onClick={() => Show(setShowCustomizationPage, setDrinkName, children)}
        >
          
        </button>
        <p className="drinkTitle">{children}</p>
        </div>
      )}
    </div>
  );
};

export default drink;
