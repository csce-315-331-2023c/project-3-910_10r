import "./menus.scss";
import { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import MenusCategory from "../../../components/menusCategory/menusCategory.tsx";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

const Menus = () => {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState({});

  useEffect(() => {
    API.get("/menus/drinkCategoryAndDrinks")
      .then((response) => {
        const data = response.data;
        setCategories(data.categories);
        setDrinks(data.drinks);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="menu">
      {categories.map((category) => (
        <MenusCategory
          key={category}
          categoryName={category}
          drinks={drinks[category]}
        />
      ))}
    </div>
  );
};

export default Menus;
