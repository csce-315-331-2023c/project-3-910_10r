import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menusCategory.scss";

interface MenusCategoryProps {
    categoryName: string;
    drinks: string[];
}
  
const MenusCategory: React.FC<MenusCategoryProps> = ({ categoryName, drinks }) => {
  return (
    <div className="menu__category">
      <div className="menu__category-header">
        <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
        <i>
          <FontAwesomeIcon icon="square-plus" size="2x" style={{ color: "#0d6f06", cursor: "pointer" }} />
        </i>
      </div>
      <div className="menu__category-drinks">
        {drinks.map((drinkName: string) => (
          <button key={drinkName} className="menu__category-drinks-drink">
            <p>{drinkName}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenusCategory;