import DrinkCategory from "./drinkCategories";
import "./drinkNavbar.scss";
// import React, { useState, useEffect } from "react";
// import axios from "axios";

interface Props {
  showCustomizationPage: boolean;
  setCatogory: React.Dispatch<React.SetStateAction<string>>;
  category: string[];
}

/**
 * navigation bar for drink categories
 * @param {boolean} Props.showCustomizationPage
 * @param {React.Dispatch<React.SetStateAction<string>>} Props.setCatogory
 *  @param {string[]} Props.category
 */
function Navigationbar({
  showCustomizationPage,
  setCatogory,
  category,
}: Props) {
  return (
    <div className={`${showCustomizationPage ? "nav-selected" : "nav"}`}>
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
