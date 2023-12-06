import "./drinksMainSection.scss";
import React from "react";
import Classic_black_tea from "../../assets/drinkImgs/Classic_black_tea.png";
import Classic_milk_black_tea from "../../assets/drinkImgs/Classic_milk_black_tea.png";
import Cocoa_creama from "../../assets/drinkImgs/Cocoa_creama.png";
import Cocoa_lover_with_fresh_milk from "../../assets/drinkImgs/Cocoa_lover_with_fresh_milk.png";
import Coffee_creama from "../../assets/drinkImgs/Coffee_creama.png";
import Coffee_milk_tea from "../../assets/drinkImgs/Coffee_milk_tea.png";
import Hawaii_fruit_tea_with_aiyu_jelly from "../../assets/drinkImgs/Hawaii_fruit_tea_with_aiyu_jelly.png";
import Honey_milk_tea from "../../assets/drinkImgs/Honey_milk_tea.png";
import Lime_mojito from "../../assets/drinkImgs/Lime_mojito.png";
import Mango_and_passion_fruit_tea from "../../assets/drinkImgs/Mango_and_passion_fruit_tea.png";
import Mango_green_tea from "../../assets/drinkImgs/Mango_green_tea.png";
import Matcha_red_bean_milk_tea from "../../assets/drinkImgs/Matcha_red_bean_milk_tea.png";
import Milk_tea_ice_blended_with_pearl from "../../assets/drinkImgs/Milk_tea_ice_blended_with_pearl.png";
import Passion_fruit_orange_and_grapefruit_tea from "../../assets/drinkImgs/Passion_fruit_orange_and_grapefruit_tea.png";
import Peach_mojito from "../../assets/drinkImgs/Peach_mojito.png";
import Strawberry_ice_blended_with_lychee_jelly_and_ice_cream from "../../assets/drinkImgs/Strawberry_ice_blended_with_lychee_jelly_and_ice_cream.png";
import Strawberry_Matcha from "../../assets/drinkImgs/Strawberry_Matcha.png";
import Taro_ice_blended_with_pudding from "../../assets/drinkImgs/Taro_ice_blended_with_pudding.png";
import Wintermelon_tea from "../../assets/drinkImgs/Wintermelon_tea.png";
import Wintermelon_with_fresh_milk from "../../assets/drinkImgs/Wintermelon_with_fresh_milk.png";

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

// const imgNameArr = [
//   Classic_milk_black_tea,
//   Classic_black_tea,
//   Cocoa_creama,
//   Cocoa_lover_with_fresh_milk,
//   Coffee_creama,
//   Coffee_milk_tea,
//   Hawaii_fruit_tea_with_aiyu_jelly,
//   Honey_milk_tea,
//   Lime_mojito,
//   Mango_and_passion_fruit_tea,
//   Mango_green_tea,
//   Matcha_red_bean_milk_tea,
//   Milk_tea_ice_blended_with_pearl,
//   Passion_fruit_orange_and_grapefruit_tea,
//   Peach_mojito,
//   Strawberry_ice_blended_with_lychee_jelly_and_ice_cream,
//   Strawberry_Matcha,
//   Taro_ice_blended_with_pudding,
//   Wintermelon_tea,
//   Wintermelon_with_fresh_milk,
// ];

type ImageObject = {
  [key: string]: string; // Assuming all values are strings (image URLs)
};

const imgObj: ImageObject = {
  Classic_milk_black_tea: Classic_milk_black_tea,
  Classic_black_tea: Classic_black_tea,
  Cocoa_creama: Cocoa_creama,
  Cocoa_lover_with_fresh_milk: Cocoa_lover_with_fresh_milk,
  Coffee_creama: Coffee_creama,
  Coffee_milk_tea: Coffee_milk_tea,
  Hawaii_fruit_tea_with_aiyu_jelly: Hawaii_fruit_tea_with_aiyu_jelly,
  Honey_milk_tea: Honey_milk_tea,
  Lime_mojito: Lime_mojito,
  Mango_and_passion_fruit_tea: Mango_and_passion_fruit_tea,
  Mango_green_tea: Mango_green_tea,
  Matcha_red_bean_milk_tea: Matcha_red_bean_milk_tea,
  Milk_tea_ice_blended_with_pearl: Milk_tea_ice_blended_with_pearl,
  Passion_fruit_orange_and_grapefruit_tea:
    Passion_fruit_orange_and_grapefruit_tea,
  Peach_mojito: Peach_mojito,
  Strawberry_ice_blended_with_lychee_jelly_and_ice_cream:
    Strawberry_ice_blended_with_lychee_jelly_and_ice_cream,
  Strawberry_Matcha: Strawberry_Matcha,
  Taro_ice_blended_with_pudding: Taro_ice_blended_with_pudding,
  Wintermelon_tea: Wintermelon_tea,
  Wintermelon_with_fresh_milk: Wintermelon_with_fresh_milk,
};

const drink = ({
  children,
  setShowCustomizationPage,
  setDrinkName,
  drinksWithLowStock,
}: Props) => {
  console.log(children);

  let imgName = children.trim();
  while (
    imgName.includes(" ") ||
    imgName.includes("&") ||
    imgName.includes(",")
  ) {
    if (imgName.includes(" ")) {
      imgName = imgName.replace(" ", "_");
    }
    if (imgName.includes("&")) {
      imgName = imgName.replace("&", "and");
    }
    if (imgName.includes(",")) {
      imgName = imgName.replace(",", "");
    }
    console.log(imgName);
  }

  console.log("final name ",imgName);

  const buttonStyle = {
    backgroundImage: `url(${imgObj[imgName]})`,
    cursor: `pointer`,
  };
  const buttonStyleDimmed = {
    backgroundImage: `url(${imgObj[imgName]})`,
    filter: "brightness(30%)",
  };

  const low = drinksWithLowStock.indexOf(children) > -1;
  return (
    <div>
      {low ? (
        <div>
          <button
            style={buttonStyleDimmed}
            className="drinks-grid-drink"
          ></button>
          <p className="drinkTitle">{children}</p>
        </div>
      ) : (
        <div>
          <button
            style={buttonStyle}
            className="drinks-grid-drink"
            onClick={() =>
              Show(setShowCustomizationPage, setDrinkName, children)
            }
          ></button>
          <p className="drinkTitle">{children}</p>
        </div>
      )}
    </div>
  );
};

export default drink;
