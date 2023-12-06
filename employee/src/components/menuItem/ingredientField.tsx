import React, { useState, useEffect } from 'react';
import axios, { AxiosInstance } from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface IngredientFieldProps {
  index: number;
  ingredient: string;
  ingredientValue: number;
  onChange: (ingredient: string, value: number, index: number) => void;
  onDelete: (index: number) => void;
  oneIngredient: boolean;
}

  /**
 * Ingredients field component
 */
const IngredientField: React.FC<IngredientFieldProps> = ({ index, ingredient: initialIngredient, ingredientValue: initialIngredientValue, onChange, onDelete, oneIngredient }) => {
    const [ingredient, setIngredient] = useState<string>(initialIngredient);
    const [ingredientValue, setIngredientValue] = useState<number>(initialIngredientValue);
    const [unit, setUnit] = useState<string>('');
    const [inventoryItems, setInventoryItems] = useState<string[]>([]);

    useEffect(() => {
      setIngredient(initialIngredient);
      setIngredientValue(initialIngredientValue);
    }, [initialIngredient, initialIngredientValue]);

    useEffect(() => {
      API.get("/inventory")
        .then((response) => {
          const items = response.data.map((item: { name: string }) => item.name);
          setInventoryItems(items);
        })
        .catch((error) => {
          console.error(error);
        });
    }, []);

    useEffect(() => {
      API.get("/recipes/drinkItemUnit", {
        params: {
          drink: ingredient,
        },
      })
        .then((response) => {
          setUnit(response.data.unit);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [ingredient]);

    const handleIngredientChange = (newIngredient: string, newIngredientValue: number) => {
      setIngredient(newIngredient);
      setIngredientValue(newIngredientValue);
      onChange(newIngredient, newIngredientValue, index);
    };

    return (
      <div className='ingredients'>
        <select
          name={`ingredient-${index}`}
          id={`ingredient-${index}`}
          value={ingredient}
          required
          autoComplete="off"
          onChange={(e) => handleIngredientChange(e.target.value, ingredientValue)}
        >
          <option value="" disabled>Select an ingredient</option>
          {inventoryItems.map((item, i) => (
            <option key={i} value={item}>{item}</option>
          ))}
        </select>
        <input
          type="number"
          name={`ingredient-value-${index}`}
          id={`ingredient-value-${index}`}
          value={ingredientValue}
          required
          autoComplete="off"
          onChange={(e) => handleIngredientChange(ingredient, parseFloat(e.target.value))}
        />
        <p className='ingredient-unit'>{unit}</p>
        <i>
          {!oneIngredient && (
              <FontAwesomeIcon
                  icon="square-minus"
                  size="2x"
                  onClick={() => onDelete(index)}
                  style={{ color: "hsl(0, 45%, 56%)", cursor: "pointer" }}
              />
          )}
        </i>
      </div>
    );
};
  
export default IngredientField;