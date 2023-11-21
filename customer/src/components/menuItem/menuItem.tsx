import React from "react";

interface MenuItemProps {
  drinkName: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ drinkName }) => {

  return (
    <>
      <li className="menu__category-drinks-drink">
        {drinkName}
      </li>
    </>
  );
};

export default MenuItem;