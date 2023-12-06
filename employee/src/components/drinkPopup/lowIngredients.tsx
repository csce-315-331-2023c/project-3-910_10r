import "./drinkCustomize.scss";
import React, { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";

let baseURL = import.meta.env.VITE_API_URL;
const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

interface Props {
  drinkName: string;
  setShowLowPage: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Low Ingredients Component
 * @param {string} drinkName String of drinkName
 * @param {function} setShowLowPage Function to show low page
 */
function lowIngredients({ drinkName, setShowLowPage }: Props) {
  const [ingredientsMap, setIngredientsMap] = useState<{
    [key: string]: string[];
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/cashier/getLowIngredientForDrink", {
      params: {
        drink: drinkName.toLowerCase(),
      },
    })
      .then((response) => {
        setIngredientsMap(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="low">
      {loading ? (
        <></>
      ) : (
        <>
          <button
            className="customize-exit"
            onClick={() => setShowLowPage(false)}
          >
            X
          </button>
          <h1 className="low-title">Warning: inventory items low in stock</h1>
          <ul className="low-items">
            <li className="low-item low-subtitle">
              <div>Item Name</div>
              <div>Percentage In Stock</div>
            </li>
            {Object.entries(ingredientsMap).map(([key]) => (
              <li className="low-item" key={key}>
                <div>{key}</div>
                <div>{ingredientsMap[key]}%</div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default lowIngredients;
