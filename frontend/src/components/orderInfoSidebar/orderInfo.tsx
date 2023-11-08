import React, { useState, useEffect } from "react";
import "./orderInfo.scss";
import axios, { AxiosInstance } from "axios";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

interface OrderInfoProps {
  order: {
    orderId: string;
    name: string[];
    date: string;
    time: string;
    total: string;
  };
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
  const [drinkData, setDrinkData] = useState<{ drinkname: string; price: number }[]>([]);

  useEffect(() => {
    // Create a temporary function to fetch drinkNames and prices for each name
    const fetchDrinkData = async () => {
      const resolvedDrinkData: { drinkname: string; price: number }[] = [];

      for (const name of order.name) {
        try {
          if (name) {
            const response = await API.get("/managers/drinkNameandPrice", { params: { drink: name } });
            const drinkInfo = response.data;

            //if (drinkInfo.drinkName) {
              resolvedDrinkData.push({ drinkname: drinkInfo.drinkname, price: drinkInfo.price });
            //} else {
              //resolvedDrinkData.push({ drinkname: drinkInfo.drinkname, price: "N/A" }); // Handle the case where `drinkInfo` is missing gracefully
           // }
          //} else {
            //resolvedDrinkData.push({ drinkname: "N/A", price: "N/A" }); // Handle the case where name is missing gracefully
          }
        } catch (error) {
          console.error(error);
          //resolvedDrinkData.push({ drinkname: "Error", price: "N/A" }); // Handle errors gracefully
        }
      }

      setDrinkData(resolvedDrinkData);
    };

    fetchDrinkData();
  }, [order.name]);

  return (
    <div className="order-info-container">
      <div className="order-id-box">
        <p>Order ID: {order.orderId}</p>
      </div>
      <div className="order-time-box">
        <p>Date: {order.date}</p>
        <p>Time: {order.time}</p>
      </div>
      <div className="scrollable-content">
        {drinkData.map((drink, index) => (
          <div className="data-box" key={index}>
            <div className="data-entry">{drink.drinkname}</div>
            <div className="data-entry">${drink.price}</div>
          </div>
        ))}
      </div>
      <div className="order-total-box">
        <p>Total: ${order.total}</p>
      </div>
    </div>
  );
};

export default OrderInfo;
