import "./menus.scss";
import { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import MenusCategory from "../../../components/menusCategory/menusCategory.tsx";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

/**
 * Menu page that shows recipe database information
 * @returns Menus component
 */
const Menus = () => {
  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState<{ [category: string]: string[] | undefined }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/menus/drinkCategoryAndDrinks");
        const data = response.data;
        const sortedCategories = data.categories.sort();
        setCategories(sortedCategories);

        const sortedDrinks: { [category: string]: string[] | undefined } = {};
        for (const category of sortedCategories) {
          sortedDrinks[category] = Array.isArray(data.drinks[category])
            ? (data.drinks[category] as string[]).sort()
            : undefined;
        }
        setDrinks(sortedDrinks);
        
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 1.5 seconds
    const intervalId = setInterval(fetchData, 1500);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="menu">
      {categories.map((category) => (
        <MenusCategory
          key={category}
          categoryName={category}
          drinks={drinks[category] || []}
        />
      ))}
    </div>
  );
};

export default Menus;
