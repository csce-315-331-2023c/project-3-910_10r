import React from 'react';
import "./menusCategory.scss";
import MenuItem from "../menuItem/menuItem";

interface MenusCategoryProps {
    categoryName: string;
    drinks: string[];
}
  
const MenusCategory: React.FC<MenusCategoryProps> = ({ categoryName, drinks }) => {

  return (
    <div className="menu__category">
      <div className="menu__category-header">
        <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
      </div>
      <ul className="menu__category-drinks">
        {drinks.map((drinkName: string) => (
          <MenuItem key={drinkName} drinkName={drinkName} />
        ))}
      </ul>
    </div>
  );
};

export default MenusCategory;