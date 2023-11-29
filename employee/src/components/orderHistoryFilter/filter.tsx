import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./filter.scss";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { AxiosInstance } from 'axios';
import { format} from 'date-fns';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface FilterPopupProps {
  fetchOrdersFilter: (page: 1, startDate: string | null, endDate: string | null, drink: string | null, minPrice: number, maxPrice: number, id: string | null) => void;
  drink: string | null;
  isOpen: boolean;
  id: string | null;
  startDate: string | null;
  endDate: string | null;
  minPrice: number;
  maxPrice: number;
  onDrinkNameChange: (drink: string | null) => void;
  onStartDateChange: (date: string | null) => void;
  onEndDateChange: (date: string | null) => void;
  onMinPriceChange: (minPrice: number) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  fetchOrdersFilter,
  drink,
  isOpen,
  startDate,
  endDate,
  minPrice,
  maxPrice,
  onDrinkNameChange,
  onStartDateChange,
  onEndDateChange,
  onMinPriceChange,
  onMaxPriceChange,
  onClose,
  onSubmit,
}) => {
  const [id, setId] = useState<string | null>(null);
  const [drinks, setDrinks] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleFilterSubmit = () => {
    const page = 1;

    console.log(drink);
    // Rest of the code remains the same
    if (drink !== null) {
      API.get("/managers/drinkid", { params: { drink: drink } })
        .then((response) => {
          const newId = response.data.drinkid;
          setId(newId);
          fetchOrdersFilter(page, startDate, endDate,drink, minPrice, maxPrice, newId);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setId(null);
      fetchOrdersFilter(page, startDate, endDate,drink, minPrice, maxPrice, null);
}
console.log(id);
// Close the popup when submitted
onSubmit();
};
  

  useEffect(() => {
      
      if (drink !== null) {
        API.get("/managers/drinkid", { params: { drink: drink } })
          .then((response) => {
            const newId = response.data.drinkid;
            setId(newId);
            fetchOrdersFilter(1, startDate, endDate,drink, minPrice, maxPrice, newId);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setId(null);
        fetchOrdersFilter(1, startDate, endDate,drink, minPrice, maxPrice, null);
      }
  }, [startDate, endDate, drink, minPrice, maxPrice]);


  useEffect(() => {
    if (!loaded) {
      API.get("/managers/drinknames")
        .then((response) => {
          const drinkData = response.data.map((item: any) => ({
            drink: item.drinkname,
            id: item.recipeid
          }));
          // Extract the first id (assuming it's an array of data)
          const firstId = drinkData.length > 0 ? drinkData[0].id : null;
          setId(firstId);
          setDrinks(drinkData.map((item: any) => item.drink));
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [loaded]);

  /*useEffect(() => {
    if (drink !== null) {
      console.log(drink);
      // Make an API call to fetch the id for the selected drinkName
      API.get("/managers/drinkid", { params: { drink: drink } })
        .then((response) => {
          const newId = response.data.drinkid;
          setId(newId); // Update the id state with the new id
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [drink]);*/
  
  

  // Initialize minPrice and maxPrice with "0.00"
  const [localMinPrice, setLocalMinPrice] = useState("0.00");
  const [localMaxPrice, setLocalMaxPrice] = useState("0.00");

  return (
    <div className={`custom-time-popup-overlay ${isOpen ? "open" : ""}`}>
      <div className="custom-time-popup">
        <div className="popup-header">
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <label>
          Drink Name:
          <select defaultValue="" onChange={(e) => onDrinkNameChange(e.target.value || null)}>
            <option value="">Select a drink</option>
            {drinks.map((drink, index) => (
              <option key={index} value={drink}>
                {drink}
              </option>
            ))}
          </select>
        </label>
        <label>
          Start Date:
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date) => onStartDateChange(date ? format(date, "yyyy-MM-dd") : null)}
            selectsStart
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            showTimeSelect
          />
        </label>
        <label>
          End Date:
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date) => onEndDateChange(date ? format(date, "yyyy-MM-dd") : null)}
            selectsEnd
            startDate={startDate ? new Date(startDate) : null}
            endDate={endDate ? new Date(endDate) : null}
            showTimeSelect
          />
        </label>
        <label>
          Price Range:
          <input
            type="text"
            placeholder="Min Price"
            value={localMinPrice}
            onChange={(e) => {
              setLocalMinPrice(e.target.value);
              const parsedMinPrice = parseFloat(e.target.value);
              onMinPriceChange(isNaN(parsedMinPrice) ? 0 : parsedMinPrice);
            }}
          />
          <span>to</span>
          <input
            type="text"
            placeholder="Max Price"
            value={localMaxPrice}
            onChange={(e) => {
              setLocalMaxPrice(e.target.value);
              const parsedMaxPrice = parseFloat(e.target.value);
              onMaxPriceChange(isNaN(parsedMaxPrice) ? 0 : parsedMaxPrice);
            }}
          />
        </label>
        <div className="popup-buttons">
          <button onClick={handleFilterSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
