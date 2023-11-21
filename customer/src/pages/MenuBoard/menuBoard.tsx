import './menusBoard.scss';
import { useState, useEffect } from "react";
import axios, { AxiosInstance } from "axios";
import CustomerHeader from "../../components/header/header.tsx";
import MenusCategory from "../../components/menusCategory/menusCategory.tsx";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

interface MenuBoardProps {
  setWhichPage : React.Dispatch<React.SetStateAction<boolean>>;
}

interface Topping {
  name: string;
}

function MenuBoard({setWhichPage} : MenuBoardProps) {

  const [categories, setCategories] = useState([]);
  const [drinks, setDrinks] = useState<{ [category: string]: string[] | undefined }>({});

  const iceLevels = ["Regular Ice", "Light Ice", "No Ice", "Extra Ice"];
  const sweetnessLevels = ["100%\nNormal", "80%\nLess", "50%\nHalf", '30%\nLight', '0%\nNone', "120%\nExtra"];
  const [toppings, setToppings] = useState<Topping[]>([]);

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


  useEffect(() => {
    API.get("/customer/toppings")
      .then((response) => {
        setToppings(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className='outer-container'>
        <CustomerHeader setWhichPage={setWhichPage}></CustomerHeader>
        <div className='menu'>
            <img src="../../src/assets/drinkImgs/menuBoard_leftside.png" alt="drinks_left" width="3200" height="600" className='drinks_left'/>
            <img src="../../src/assets/drinkImgs/menuBoard_rightside.png" alt="drinks_right" width="3200" height="600" className='drinks_right'/>
            <h1 className='menu__title'>MENU</h1>
            {categories.map((category) => (
            <MenusCategory
              key={category}
              categoryName={category}
              drinks={drinks[category] || []}
            />
            ))}
            <div className='menu__options'>
              <div className='menu__options-ice'>
                <h2>Ice level</h2>
                <div>
                  {iceLevels.map((level, index) => (
                    <div key={index} className='ice-option'>
                      <img src={`../../src/assets/drinkImgs/${level}.png`} alt="ice_icons" width="400" height="600" className='ice_icons'/>
                      <p>{level}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='menu__options-sweetness'>
                <h2>Sweetness level</h2>
                <div>
                  {sweetnessLevels.map((level, index) => (
                    <div key={index} className='sweetness-option'>
                      <img src={`../../src/assets/drinkImgs/${level.substring(0, level.indexOf('%'))}sweetness.png`} alt="sweetness_icons" width="400" height="400" className='sweetness_icons'/>
                      <p>{level}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='menu__options-toppings'>
                <h2>Toppings <span>+</span><span>$0.75 for each <br/>extra topping</span></h2>
                <div>
                  {toppings.map((topping, index) => (
                    <div key={index}>{topping.name}</div>
                  ))}
                </div>
              </div>
            </div>
        </div>
    </div>
  );
}

export default MenuBoard;