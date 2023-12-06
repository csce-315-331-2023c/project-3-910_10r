import React from "react";

interface MenuItemProps {
  drinkName: string;
}
/**
 * display a menu item
 * @param {string} MenuItemProps.drinkName
 */
const MenuItem: React.FC<MenuItemProps> = ({ drinkName }) => {
  return (
    <>
      <li className="menu__category-drinks-drink">{drinkName}</li>
    </>
  );
};

export default MenuItem;
