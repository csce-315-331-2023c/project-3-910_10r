import "./orderhistory.scss";
import React, { useState, useEffect } from "react";
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
  
    setLoading(true);
    console.log("StartDate:");
    console.log(typeof startDate);
    console.log(startDate);
    console.log(endDate);
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

  const handleOrderClick = (data: Order) => {
    setSelectedOrder(data);
  };

  const handleFilterButtonClick = () => {
    setSelectedOrder(null);
    setShowFilterPopup(true);
  };

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
  

  const filteredOrderData = isFilterActive
  ? orderData.filter((data) => {
    console.log(id);
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
        <h3>Id    DrinkID     Date/Time     Total</h3>
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
              <div className="data-entry">{data.total}</div>
            </button>
          ))}
        </div>
      </div>
      {selectedOrder && <OrderInfo order={selectedOrder} />}
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
        <button onClick={() => fetchOrders(currentPage)} disabled={loading}>
          {loading ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default OrderHistory;
