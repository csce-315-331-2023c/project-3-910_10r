import React, { useState } from 'react';
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
baseURL: baseURL,
  timeout: 10000
});

interface InventoryPopupProps {
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const InventoryPopup: React.FC<InventoryPopupProps> = ({
    setShowPopup,
  }) => {
    // Create state variables to hold the input values
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [capacity, setCapacity] = useState('');
    const [unit, setUnit] = useState('');
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
  
      // Use the input values to perform the INSERT query
      API.post(`/inventory/addItem`, {
        name,
        amount,
        capacity,
        unit,
        alert: false, // You might want to set this to a default value
      })
        .then((response) => {
          console.log(response.data);
          setShowPopup(false); // Close the popup after adding the item
        })
        .catch((error) => {
          console.error(error);
        });
        closePopup();
    };
  
    const closePopup = () => {
      setShowPopup(false);
    };
  
    return (
      <div className="inventory__items-overlay">
        <form className="inventory__items-popup" onSubmit={handleSubmit}>
          <button onClick={closePopup}>
            <i className="fa-solid fa-xmark"></i>
          </button>
  
          <div className="inventory__items-popup-field">
            <label htmlFor="item_name">Name</label>
            <input
              type="text"
              name="item_name"
              id="item_name"
              value={name}
              required
              autoComplete="off"
              onChange={(e) => setName(e.target.value)} // Handle changes and update state
            />
          </div>
  
          <div className="inventory__items-popup-field">
            <label htmlFor="item_amount">Amount</label>
            <input
              type="number"
              name="item_amount"
              id="item_amount"
              defaultValue={amount}
              required
              autoComplete="off"
              onChange={(e) => setAmount(e.target.value)} // Handle changes and update state
            />
          </div>
  
          <div className="inventory__items-popup-field">
            <label htmlFor="item_capacity">Capacity</label>
            <input
              type="number"
              name="item_capacity"
              id="item_capacity"
              defaultValue={capacity}
              required
              autoComplete="off"
              onChange={(e) => setCapacity(e.target.value)} // Handle changes and update state
            />
          </div>
  
          <div className="inventory__items-popup-field">
            <label htmlFor="item_unit">Unit</label>
            <input
              type="text"
              name="item_unit"
              id="item_unit"
              value={unit}
              required
              autoComplete="off"
              onChange={(e) => setUnit(e.target.value)} // Handle changes and update state
            />
          </div>
  
          <div className="inventory__items-popup__buttons">
            <button onClick={closePopup}>Cancel</button>
            <button type="submit">Confirm</button>
          </div>
        </form>
      </div>
    );
};

export default InventoryPopup;
