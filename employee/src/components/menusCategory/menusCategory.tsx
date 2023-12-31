import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./menusCategory.scss";
import MenuItem from "../menuItem/menuItem";
import NewDrinkPopup from '../menuItem/newDrinkPopup';

interface MenusCategoryProps {
    categoryName: string;
    drinks: string[];
}
  
  /**
 * Menus Category Component
 * @param {string} props.categoryName String of category name
 * @param {string[]} props.drinks List of drink names
 */
const MenusCategory: React.FC<MenusCategoryProps> = ({ categoryName, drinks }) => {
  const [showNewDrinkPopup, setShowNewDrinkPopup] = useState(false);

  const openPopup = () => {
    setShowNewDrinkPopup(true);
  }

  return (
    <div className="menu__category">
      <div className="menu__category-header">
        <h1>{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h1>
        <i>
          <FontAwesomeIcon icon="square-plus" size="2x" style={{ color: "var(--TO-GREEN)", cursor: "pointer" }} onClick={openPopup}/>
        </i>
      </div>
      <div className="menu__category-drinks">
        {drinks.map((drinkName: string) => (
          <MenuItem key={drinkName} drinkName={drinkName} />
        ))}

      {showNewDrinkPopup && (
        <NewDrinkPopup
          category={categoryName}
          setShowPopup={setShowNewDrinkPopup}
        />
      )}
      </div>
    </div>
  );
};

export default MenusCategory;