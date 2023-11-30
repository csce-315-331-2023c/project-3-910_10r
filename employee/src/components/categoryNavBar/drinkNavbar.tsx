import DrinkCategory from "./drinkCategories";
import "./drinkNavbar.scss";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

interface Props {
  showCustomizationPage: boolean;
  showLowPage: boolean;
  setCatogory: React.Dispatch<React.SetStateAction<string>>;
  category: string[];
}

function Navigationbar({
  showCustomizationPage,
  showLowPage,
  setCatogory,
  category,
}: Props) {
  // keeps track of the drink categories
  //

  return (
    <div
      className={`${
        showCustomizationPage || showLowPage ? "nav-selected" : "nav"
      }`}
    >
      <div className="nav-bar">
        {category.map((item) => (
          <DrinkCategory key={item} onClick={() => setCatogory(item)}>
            {item}
          </DrinkCategory>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;
