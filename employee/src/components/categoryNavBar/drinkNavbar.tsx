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

/**
 * Function for navigation bar
 * @param {boolean} props.showCustomizationPage Showing page
 * @param {boolean} props.showLowPage Show if low
 * @param {function} props.setCategory to set the category React
 * @param {string[]} props.category List of categories
 * @returns 
 */
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
        {category.map((item, index) => (
          <DrinkCategory
            key={item}
            onClick={() => setCatogory(item)}
            index={index}
          >
            {item}
          </DrinkCategory>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;
