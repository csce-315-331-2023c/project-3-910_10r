import React, { useState, useEffect } from "react";
import MenuItemPopup from "./menuItemPopup";
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface MenuItemProps {
  drinkName: string;
}

  /**
 * Menu item component
 * @param {stirng} drinkName Drink name for menu
 */
const MenuItem: React.FC<MenuItemProps> = ({ drinkName }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientValues, setIngredientValues] = useState<number[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    API.get("/recipes/drink", {
      params: {
        drink: drinkName,
      },
    })
      .then((response) => {
        const data = response.data[0];

        setIngredients(data.ingredient_names || []);
        setIngredientValues(data.ingredient_values || []);
        setPrice(data.price !== undefined ? data.price : 0);
        setCategory(data.category || '');
      })
      .catch((error) => {
        console.error(error);
      });
  }, [drinkName]);

  const handlePopup  = () => {
    setShowPopup(true);
  }

  return (
    <>
      {showPopup && (
        <MenuItemPopup
          drinkname={drinkName}
          ingredients={ingredients}
          ingredientValues={ingredientValues}
          price={price}
          category={category}
          setShowPopup={setShowPopup}

          setIngredients={setIngredients}
          setIngredientValues={setIngredientValues}
          setOriginalPrice={setPrice}
          setOriginalCategory={setCategory}
        />
      )}

      <button className="menu__category-drinks-drink" onClick={handlePopup}>
        <p>{drinkName}</p>
      </button>
    </>
  );
};

export default MenuItem;