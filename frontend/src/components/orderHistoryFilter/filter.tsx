import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./filter.scss"; // Import the custom styles
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface FilterPopupProps {
  drink: string | null;
  isOpen: boolean;
  startDate: Date | null;
  endDate: Date | null;
  minPrice: number;
  maxPrice: number;
  onDrinkNameChange: (drinkName: string | null) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onMinPriceChange: (minPrice: number) => void;
  onMaxPriceChange: (maxPrice: number) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
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
  if (!isOpen) {
    return null;
  }

  // Initialize minPrice and maxPrice with "0.00"
  const [localMinPrice, setLocalMinPrice] = useState("0.00");
  const [localMaxPrice, setLocalMaxPrice] = useState("0.00");

  return (
    <div className={`custom-time-popup-overlay ${isOpen ? "open" : ""}`}>
      <div className="custom-time-popup">
        <div className="popup-header">
          {/* Close button (x icon) in the top right */}
          <button className="close-button" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <label>
          Drink Name:
          <select value={drink || ""} onChange={(e) => onDrinkNameChange(e.target.value || null)}>
            <option value="">Select a drink</option>
            <option value="Drink 1">Drink 1</option>
            <option value="Drink 2">Drink 2</option>
            {/* Add more options for drinks as needed */}
          </select>
        </label>
        <label>
          Start Date:
          <DatePicker
            selected={startDate}
            onChange={(date) => onStartDateChange(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showTimeSelect
          />
        </label>
        <label>
          End Date:
          <DatePicker
            selected={endDate}
            onChange={(date) => onEndDateChange(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
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
          <button onClick={onSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
