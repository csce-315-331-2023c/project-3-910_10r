import React, { useState } from 'react';
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
baseURL: baseURL,
  timeout: 10000
});

interface InventoryItemPopupProps {
  name: string;
  amount: number;
  capacity: number;
  unit: string;
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const InventoryItemPopup: React.FC<InventoryItemPopupProps> = ({
  name,
  amount,
  capacity,
  unit,
  setShowPopup
}) => {
    // Create state variables to hold the edited values
    const [editedName, setEditedName] = useState(name);
    const [editedAmount, setEditedAmount] = useState(amount);
    const [editedCapacity, setEditedCapacity] = useState(capacity);
    const [editedUnit, setEditedUnit] = useState(unit);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const closePopup = () => {
        setShowPopup(false);
    }

    const removeItem = () => {
        
        API.delete(`/inventory/deleteItem?parameter=${name}`)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            }
        );

        closePopup();
    };
    
    const editItem = () => {
        // Create an object to represent the edited item
        const editedItem = {
            name: editedName,
            amount: editedAmount,
            capacity: editedCapacity,
            unit: editedUnit,
        };
    
        // Send a PUT request to update the item in the inventory
        API.put(`/inventory/editItem?parameter=${name}`, editedItem)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    
        closePopup();
    };

  return (
    <div className="inventory__items-overlay">
      <form className="inventory__items-popup" onSubmit={handleSubmit}>
        <button onClick={closePopup}><i className="fa-solid fa-xmark"></i></button>

        <div className="inventory__items-popup-field">
          <label htmlFor="item_name">Name</label>
          <input
            type="text"
            name="item_name"
            id="item_name"
            defaultValue={editedName}
            required
            autoComplete="off"
            onChange={(e) => setEditedName(e.target.value)} // Handle changes and update state
          />
        </div>

        <div className="inventory__items-popup-field">
          <label htmlFor="item_amount">Amount</label>
          <input
            type="number"
            name="item_amount"
            id="item_amount"
            defaultValue={editedAmount}
            required
            autoComplete="off"
            onChange={(e) => setEditedAmount(parseFloat(e.target.value))} // Handle changes and update state
          />
        </div>

        <div className="inventory__items-popup-field">
          <label htmlFor="item_capacity">Capacity</label>
          <input
            type="number"
            name="item_capacity"
            id="item_capacity"
            defaultValue={editedCapacity} 
            required
            autoComplete="off"
            onChange={(e) => setEditedCapacity(parseFloat(e.target.value))} // Handle changes and update state
          />
        </div>

        <div className="inventory__items-popup-field">
          <label htmlFor="item_unit">Unit</label>
          <input
            type="text"
            name="item_unit"
            id="item_unit"
            defaultValue={editedUnit} 
            required
            autoComplete="off"
            onChange={(e) => setEditedUnit(e.target.value)} // Handle changes and update state
          />
        </div>

        <div className="inventory__items-popup__buttons">
          <button onClick={removeItem}>Remove</button>
          <button onClick={editItem}>Confirm</button>
        </div>
      </form>
    </div>
  );
};

export default InventoryItemPopup;
