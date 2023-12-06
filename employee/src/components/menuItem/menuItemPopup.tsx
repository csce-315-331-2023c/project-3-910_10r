import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios , { AxiosInstance } from 'axios';
import IngredientField from './ingredientField';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface MenuItemPopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    setIngredientValues: React.Dispatch<React.SetStateAction<number[]>>;
    setOriginalPrice: React.Dispatch<React.SetStateAction<number>>;
    setOriginalCategory: React.Dispatch<React.SetStateAction<string>>;
    drinkname: string;
    ingredients: string[];
    ingredientValues: number[];
    price: number;
    category: string;
}
  /**
 * Menu item popup component
 */
const MenuItemPopup: React.FC<MenuItemPopupProps> = ({ 
    setShowPopup, 
    setIngredients, setIngredientValues, setOriginalPrice, setOriginalCategory, 
    drinkname, ingredients, ingredientValues, price: initialPrice, category: initialCategory }) => {

    const [displayedIngredients, setDisplayedIngredients] = useState<string[]>([]);
    const [displayedIngredientValues, setDisplayedIngredientValues] = useState<number[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const [category, setCategory] = useState<string>(initialCategory);
    const [name, setName] = useState<string>(drinkname);
    const [price, setPrice] = useState<number>(initialPrice);

    useEffect(() => {
        setDisplayedIngredients(ingredients);
        setDisplayedIngredientValues(ingredientValues);
    }, [ingredients, ingredientValues]);

    useEffect(() => {
        API.get("/cashier/drinkCategory")
          .then((response) => {
            setCategories(response.data.sort());
          })
          .catch((error) => {
            console.error(error);
          });
    }, []);

    const closePopup = () => {
        setShowPopup(false);
    }

    const handleIngredientChange = (ingredient: string, value: number, index: number) => {
        const updatedIngredients = [...displayedIngredients];
        const updatedIngredientValues = [...displayedIngredientValues];

        updatedIngredients[index] = ingredient;
        updatedIngredientValues[index] = value;

        setDisplayedIngredients(updatedIngredients);
        setDisplayedIngredientValues(updatedIngredientValues);
    };

    const handleIngredientDelete = (index: number) => {
        const updatedIngredients = [...displayedIngredients];
        const updatedIngredientValues = [...displayedIngredientValues];
    
        updatedIngredients.splice(index, 1);
        updatedIngredientValues.splice(index, 1);
    
        setDisplayedIngredients(updatedIngredients);
        setDisplayedIngredientValues(updatedIngredientValues);
    };

    const handleAddIngredient = () => {
        setDisplayedIngredients([...displayedIngredients, '']);
        setDisplayedIngredientValues([...displayedIngredientValues, 0]);
    };

    const handleReset = () => {
        setDisplayedIngredients(ingredients);
        setDisplayedIngredientValues(ingredientValues);
        setCategory(initialCategory);
        setName(drinkname);
        setPrice(initialPrice);
        closePopup();
    }

    const handleRemove = async () => {
        try {
            // Assuming you have the appropriate endpoint for deleting a recipe
            await API.delete("/recipes/delete", {
                params: {
                    parameter: drinkname,
                },
            });
            console.log("Item removed successfully");

        } catch (error) {
            console.error("Error removing item", error);
        }

        handleReset();
    }

    const handleEdit = async () => {
        try {
            await API.put(`/recipes/edit?parameter=${drinkname}`, {
                drinkname: name,
                ingredient_names: displayedIngredients,
                ingredient_values: displayedIngredientValues,
                price: price,
                category: category,
            });
    
            console.log("Item edited successfully");
        } catch (error) {
            console.error("Error editing item", error);
        }

        setIngredients(displayedIngredients);
        setIngredientValues(displayedIngredientValues);
        setOriginalCategory(category);
        setOriginalPrice(price);
    
        closePopup();
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    }

  return (
    <div className="menu__items-overlay">
        <form className="menu__items-popup" onSubmit={handleSubmit}>
            <button onClick={handleReset}><i className="fa-solid fa-xmark"></i></button>

            <div className='scroll-window'>
                <div className="menu__items-popup-field">
                    <label style={{ color: "var(--GREEN-MED60)" }} htmlFor="item_name">Name</label>
                    <input
                        type="text"
                        name="item_name"
                        id="item_name"
                        defaultValue={name}
                        required
                        autoComplete="off"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div id="ingredients-field" className="menu__items-popup-field">
                    <label style={{ color: "var(--GREEN-MED60)" }} >Ingredients</label>
                    <div className='ingredients-container'>
                    {displayedIngredients.map((ingredient, index) => (
                        <IngredientField
                            key={index}
                            index={index}
                            ingredient={ingredient}
                            ingredientValue={displayedIngredientValues[index]}
                            onChange={(ingredient, value, index) => handleIngredientChange(ingredient, value, index)}
                            onDelete={(index) => handleIngredientDelete(index)}
                            oneIngredient={displayedIngredientValues.length <= 1}
                        />
                    ))}
                    </div>
                    <i>
                        <FontAwesomeIcon
                            icon="square-plus"
                            size="2x"
                            style={{ color: "var(--TO-GREEN)", cursor: "pointer" }}
                            onClick={handleAddIngredient}
                        />
                    </i>
                </div>

                <div className="menu__items-popup-field">
                    <label style={{ color: "var(--GREEN-MED60)" }}  htmlFor="price">Price</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        defaultValue={price}
                        required
                        autoComplete="off"
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                    />
                </div>

                <div className="menu__items-popup-field">
                    <label style={{ color: "var(--GREEN-MED60)" }}  htmlFor="category">Category</label>
                    <select
                        value={category}
                        name="category"
                        id="category"
                        required
                        autoComplete="off"
                        onChange={(e) => setCategory(e.target.value)} 
                    >
                        {categories.map((cat: string) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="inventory__items-popup__buttons">
                <button onClick={handleRemove}>Remove</button>
                <button onClick={handleEdit}>Confirm</button>
            </div>
        </form>
    </div>
  );
};

export default MenuItemPopup;