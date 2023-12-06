import "./orderhistory.scss";
import React, { useState, useEffect, useRef } from "react";
import OrderInfo from "../../../components/orderInfoSidebar/orderInfo";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import FilterPopup from "../../../components/orderHistoryFilter/filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios, { AxiosInstance } from 'axios';
//import { format, parse } from 'date-fns';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

// Register the locale to use with react-datepicker
registerLocale("en-GB", enGB);

interface Order {
  orderId: string;
  name: string[];
  date: string;
  time: string;
  total: string;
}

const PAGE_SIZE = 100; // Number of orders per page

/**
 * OrderHistory to display orderHistory component
 * @returns {React.FC} orderHistory component
 */
const OrderHistory: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [drink, setDrinkName] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0.00);
  const [maxPrice, setMaxPrice] = useState<number>(0.00);
  const [orderData, setOrderData] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders(currentPage);
  }, []);

  /**
   * Fetch the order information from the database
   * @param page Page number to fetch orders for
   */
  const fetchOrders = (page: number) => {
    if (loading) {
      return; // Don't make another request while one is in progress
    }
  
    setLoading(true);
  
    API.get('/orderHistory/total', {
      params: {
        page: page,
        pageSize: PAGE_SIZE
      }
    })
      .then((response) => {
        const data = response.data;
        const extractedOrderData = data.map((item: any) => ({
          orderId: item.order_id as string,
          name: item.drink_id,
          date: item.date.slice(0, 10),
          time: item.time,
          total: item.cost as string,
        }));
  
        // Append the data from the current page to the existing orderData
        setOrderData((prevData) => [...prevData, ...extractedOrderData]);
  
        setCurrentPage(page + 1);
        setLoading(false);
  
        if (data.length < PAGE_SIZE) {
          setHasMore(false); // If the last page has fewer items than PAGE_SIZE, there are no more pages.
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  /**
   * Fetch the order information from database based off of the parameter filters
   * @param page Page number to fetch orders from
   * @param startDate String YYYY-MM-DD or null for start date range
   * @param endDate String YYYY-MM-DD or null for end date range
   * @param drink Drink name or null to filter orders
   * @param minPrice Minimum price or null for order price range
   * @param maxPrice Maximum price or null for order price range
   * @param id Drink id or null to filter orders
   */
  const fetchOrdersFilter = (
    page: number,
    startDate: string | null,
    endDate: string | null,
    drink: string | null,
    minPrice: number,
    maxPrice: number,
    id: string | null,
  ) => {
    if (loading) {
      return; // Don't make another request while one is in progress
    }
    console.log(drink);
    setLoading(true);
    console.log("StartDate:");
    console.log(typeof startDate);
    //console.log(startDate);
    //console.log(endDate);
    /*const startDateDate = parse(startDate, 'yyyy-MM-dd', new Date());
    const startDateStr = format(startDateDate, 'yyyy-MM-dd');
    const endDateDate = parse(endDate, 'yyyy-MM-dd', new Date());
    const endDateStr = format(endDateDate, 'yyyy-MM-dd');
    console.log(startDateDate);*/
    const paramStart = "'" + startDate + "'";
    const paramEnd = "'" + endDate + "'";
    // Clear existing data before fetching the filtered data
    setOrderData([]);
    API.get('/orderHistory/filter', {
      params: {
        startDate: startDate ? paramStart : "NULL",
        endDate: endDate ? paramEnd : "NULL",
        drink: id || "NULL",
        minPrice: minPrice !== 0 ? minPrice.toString() : "NULL",
        maxPrice: maxPrice !== 0 ? maxPrice.toString() : "NULL",
        page: page,
        pageSize: PAGE_SIZE,
      }
    })
      .then((response) => {
        const data = response.data;
        const extractedOrderData = data.map((item: any) => ({
          orderId: item.order_id as string,
          name: item.drink_id,
          date: item.date.slice(0, 10),
          time: item.time,
          total: item.cost as string,
        }));
  
        // Set the data from the current page as the filtered data
        setOrderData(extractedOrderData);
  
        setCurrentPage(page + 1);
        setLoading(false);
  
        if (data.length < PAGE_SIZE) {
          setHasMore(false); // If the last page has fewer items than PAGE_SIZE, there are no more pages.
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const orderInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orderInfoRef.current && !orderInfoRef.current.contains(event.target as Node)) {
        setSelectedOrder(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  
  
  
  /**
   * Clear out each of the Order components for when clearing the filter
   */
  const handleClearFilter = () => {
    setIsFilterActive(false);
    setDrinkName(null);
    setStartDate(null);
    setEndDate(null);
    setMinPrice(0.00);
    setMaxPrice(0.00);
    setId(null);
    setOrderData([]); // Clear existing data
    setCurrentPage(1); // Reset the page to 1
    setHasMore(true); // Set hasMore to true to enable loading more orders
    fetchOrders(1); // Fetch the original order history
  };

  /**
   * Sets the order right side bar with the order information
   * @param data Order information for what is clicked
   */
  const handleOrderClick = (data: Order) => {
    setSelectedOrder(data);
  };

  /**
   * Handles when to show the filter popup
   */
  const handleFilterButtonClick = () => {
    setSelectedOrder(null);
    setShowFilterPopup(true);
  };

  /**
   * Handles when the filter popup is submitted, filtering the data and displaying it
   */
  const handleFilterSubmit = () => {

  // Call the fetchOrdersFilter function with the updated parameter types
  //fetchOrdersFilter(currentPage, startDate, endDate, minPrice, maxPrice, id);
  
    // Close the filter popup when submitted
    setShowFilterPopup(false);
    // Only set isFilterActive to true if needed
    if (drink || startDate || endDate || minPrice > 0.00 || maxPrice > 0.00) {
      setIsFilterActive(true);
    }
  };
  

  /**
   * Ensures that the order data is filtered based off of the parameters
   */
  const filteredOrderData = isFilterActive
  ? orderData.filter((data) => {
    //console.log(id);
      // Apply filter conditions based on drink, startDate, and endDate
      return (
        (!id || data.name.some((name) => name.toLowerCase().includes(id.toLowerCase()))) &&
        (!startDate || data.date >= startDate) &&
        (!endDate || data.date <= endDate) &&
        (!minPrice || parseFloat(data.total) >= minPrice) && // Check for minPrice
        (!maxPrice || parseFloat(data.total) <= maxPrice) // Check for maxPrice
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
      <div className="main-container">
        <div className="main-container-header">
          <h3>Id</h3>
          <h3>DrinkID</h3>
          <h3>Date</h3>
          <h3>Time</h3>
          <h3>Total</h3>
        </div>
        <div className="scrollable-content">
          {filteredOrderData.map((data, index) => (
            <button
              className={`data-box ${
                selectedOrder === data ? "selected" : ""
              }`}
              key={index}
              onClick={() => handleOrderClick(data)}
            >
              <div className="data-entry">{data.orderId}</div>
              <div className="data-entry">{data.name.join(',')}</div>
              <div className="data-entry">{data.date}</div>
              <div className="data-entry">{data.time}</div>
              <div className="data-entry">{`$${Number(data.total).toFixed(2)}`}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="order-info-container" ref={orderInfoRef}>
        {selectedOrder ? (
          <OrderInfo order={selectedOrder} />
        ) : (
          isFilterActive ? (
            <div>
              <p className = "filter-title">Filter Info:</p>
              <div className="filter-info">
                {drink && <p>Drink: {drink}</p>}
                {startDate && <p>Start Date: {startDate}</p>}
                {endDate && <p>End Date: {endDate}</p>}
                {minPrice !== 0 && <p>Min Price: ${minPrice.toFixed(2)}</p>}
                {maxPrice !== 0 && <p>Max Price: ${maxPrice.toFixed(2)}</p>}
              </div>  
            </div>
          ) : 
          <p className = "filter-title">Select an order</p>
        )}
      </div>
      {showFilterPopup && (
        <FilterPopup
          fetchOrdersFilter={fetchOrdersFilter}
          drink={drink}
          id={drink}
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
          onClose={() => setShowFilterPopup(false)}
        />
      )}
      {hasMore && (
        <button className="simple" onClick={() => fetchOrders(currentPage)} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default OrderHistory;
