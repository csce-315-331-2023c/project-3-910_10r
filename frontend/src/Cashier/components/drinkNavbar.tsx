import DrinkCategory from "./drinkCategories";
import "../styles/drinkNavbar.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  showCustomizationPage: boolean;
}

function Navigationbar({ showCustomizationPage }: Props) {
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/cashier/drinkCategory")
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className={`${showCustomizationPage ? "nav-selected" : "nav"}`}>
      <div className="nav-bar">
        {items.map((item, index) => (
          <DrinkCategory key={item} onClick={() => console.log({ item })}>
            {item}
          </DrinkCategory>
        ))}
      </div>
    </div>
  );
}

export default Navigationbar;
