import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios , { AxiosInstance } from 'axios';
import IngredientField from './ingredientField';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface NewDrinkPopupProps {
  category: string;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewDrinkPopup: React.FC<NewDrinkPopupProps> = ({ category: initialCategory, setShowPopup }) => {
    const [categories, setCategories] = useState<string[]>([]);

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [ingredientValues, setIngredientValues] = useState([0]);
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState<string>(initialCategory);

    useEffect(() => {
        API.get("/cashier/drinkCategory")
        .then((response) => {
            setCategories(response.data.sort());
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);
    
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const closePopUp = () => {
        setShowPopup(false);
    }

    const handleReset = () => {
        setName('');
        setIngredients(['']);
        setIngredientValues([0]);
        setPrice(0);
        setCategory(initialCategory);
        closePopUp();
    }
    
    const handleAdd = async () => {
        try {
            await API.post('/recipes/add', {
              drinkname: name,
              ingredient_names: ingredients,
              ingredient_values: ingredientValues,
              price,
              category,
            });
      
            console.log('Item added successfully');
        } catch (error) {
            console.error('Error adding item', error);
        }
        handleReset();
    }

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
        setIngredientValues([...ingredientValues, 0]);
    };

    const handleIngredientChange = (ingredient: string, value: number, index: number) => {
        const updatedIngredients = [...ingredients];
        const updatedIngredientValues = [...ingredientValues];

        updatedIngredients[index] = ingredient;
        updatedIngredientValues[index] = value;

        setIngredients(updatedIngredients);
        setIngredientValues(updatedIngredientValues);
    };

    const handleIngredientDelete = (index: number) => {
        const updatedIngredients = [...ingredients];
        const updatedIngredientValues = [...ingredientValues];

        updatedIngredients.splice(index, 1);
        updatedIngredientValues.splice(index, 1);

        setIngredients(updatedIngredients);
        setIngredientValues(updatedIngredientValues);
    };

  return (
    <div className="menu__items-overlay">
    <form className="menu__items-popup" onSubmit={handleSubmit}>
        <button onClick={handleReset}><i className="fa-solid fa-xmark"></i></button>

        <div className='scroll-window'>
            <div className="menu__items-popup-field">
                <label htmlFor="item_name">Name</label>
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
                <label>Ingredients</label>
                <div className='ingredients-container'>
                {ingredients.map((ingredient, index) => (
                    <IngredientField
                        key={index}
                        index={index}
                        ingredient={ingredient}
                        ingredientValue={ingredientValues[index]}
                        onChange={(ingredient, value, index) => handleIngredientChange(ingredient, value, index)}
                        onDelete={(index) => handleIngredientDelete(index)}
                        oneIngredient={ingredientValues.length <= 1}
                    />
                ))}
                </div>
                <i>
                    <FontAwesomeIcon
                        icon="square-plus"
                        size="2x"
                        style={{ color: "#0d6f06", cursor: "pointer" }}
                        onClick={handleAddIngredient}
                    />
                </i>
            </div>

            <div className="menu__items-popup-field">
                <label htmlFor="price">Price</label>
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
                <label htmlFor="category">Category</label>
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
            <button onClick={handleReset}>Cancel</button>
            <button onClick={handleAdd}>Confirm</button>
        </div>
    </form>
</div>
  );
};

export default NewDrinkPopup;