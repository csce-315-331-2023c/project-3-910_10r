import "./orderhistory.scss";
import React, { useState} from "react";
import OrderInfo from "../../../components/orderInfoSidebar/orderInfo";

import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB"; // Import a locale for date-fns
import FilterPopup from "../../../components/orderHistoryFilter/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Register the locale to use with react-datepicker
registerLocale("en-GB", enGB);

interface Order {
  orderId: number;
  name: string;
  time: string;
  total: number;
}

const orderData:  Order[] = [
  { orderId: 10, name: "Name, Mango Ice, Green Tea", time: "10", total: 100},
  { orderId: 12, name: "Name", time: "10", total: 100},
  { orderId: 20, name: "Name", time: "10", total: 100},
  { orderId: 120, name: "Name", time: "10", total: 100},
  { orderId: 200, name: "Name", time: "10", total: 100},
  { orderId: 30, name: "Name", time: "10", total: 100},
  { orderId: 400, name: "Name", time: "10", total: 100},
  { orderId: 13, name: "Name", time: "10", total: 100},
  { orderId: 1, name: "Name", time: "10", total: 100},
  { orderId: 999, name: "Name", time: "10", total: 100},
  { orderId: 123, name: "Name", time: "10", total: 100},
  { orderId: 8, name: "Name", time: "10", total: 100},
];

const OrderHistory: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [drink, setDrinkName] = useState<string | null>(null);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [minPrice, setMinPrice] = useState<number>(0.00);
  const [maxPrice, setMaxPrice] = useState<number>(0.00);
  

  const handleClearFilter = () => {
    setIsFilterActive(false);
    // Clear any filter-related state, such as drink, startDate, and endDate.
    setDrinkName(null);
    setStartDate(null);
    setEndDate(null);
    setMinPrice(0.00);
    setMaxPrice(0.00);
  };

  const handleOrderClick = (data: Order) => {
    setSelectedOrder(data);
  };

  const handleFilterButtonClick = () => {
    setSelectedOrder(null);
    setShowFilterPopup(true); // Show the filter popup when the button is clicked
  };

const handleFilterSubmit = () => {
  if (drink) {
    console.log("Selected Drink: ", drink);
  }
  // Handle custom time selection
  if (startDate && endDate) {
    console.log("Selected Start Date:", startDate.toLocaleDateString());
    console.log("Selected End Date:", endDate.toLocaleDateString());
  }
  if (maxPrice > 0.00) {
    console.log("Min Price: ", minPrice);
    console.log("Max Price: ", maxPrice);
  }
  setShowFilterPopup(false); // Close the filter popup when submitted
  //only if something was changed:
  if (drink || (startDate && endDate) || maxPrice > 0.00){
      setIsFilterActive(true); // Set the filter as active
  }
};

const filteredOrderData = isFilterActive
  ? orderData.filter((data) => {
      // Apply filter conditions based on drink, startDate, and endDate
      return (
        (!drink || data.name.includes(drink)) &&
        (!startDate || data.time >= startDate.toLocaleDateString()) &&
        (!endDate || data.time <= endDate.toLocaleDateString()) &&
        (!minPrice || data.total >= minPrice) && // Check for minPrice
        (!maxPrice || data.total <= maxPrice) // Check for maxPrice
      );
    })
  : orderData;

  return (
    <div className="order-history-container">
      <div className="header">
        <h2>Order History</h2>
        <div>
        {isFilterActive && (
          <button className="close-button" onClick={handleClearFilter}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}
        </div>
        <div className="filter-button-container">
        <button className="filter-button" onClick={handleFilterButtonClick}>
          Filter
        </button>
        </div>
      </div>
      <div>
        <div className="main-container">
          <h3>Id    Name     Time     Total</h3>
          <div className="scrollable-content">
            {filteredOrderData.map((data, index) => (
              <button
                className={`data-box ${
                  selectedOrder === data ? "selected" : ""
                } ${isFilterActive ? "inactive" : ""}`}
                key={index}
                onClick={() => handleOrderClick(data)}
              >
                <div className="data-entry">{data.orderId}</div>
                <div className="data-entry">{data.name}</div>
                <div className="data-entry">{data.time}</div>
                <div className="data-entry">{data.total}</div>
              </button>
            ))}
          </div>
        </div>
        {selectedOrder && <OrderInfo order={selectedOrder} />}
      </div>
      {showFilterPopup && (
        <FilterPopup drink={drink}
        isOpen={showFilterPopup}
        onDrinkNameChange={(newDrink) => setDrinkName(newDrink)}
        startDate={startDate}
        endDate={endDate}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onStartDateChange={(newStartDate) => setStartDate(newStartDate)}
        onEndDateChange={(newEndDate) => setEndDate(newEndDate)}
        onMinPriceChange= {(newMinPrice) => setMinPrice(newMinPrice)}
        onMaxPriceChange= {(newMaxPrice) => setMaxPrice(newMaxPrice)}
        onSubmit={handleFilterSubmit}
        onClose={() => setShowFilterPopup(false)} />
      )}
    </div>
  );
};

export default OrderHistory;
