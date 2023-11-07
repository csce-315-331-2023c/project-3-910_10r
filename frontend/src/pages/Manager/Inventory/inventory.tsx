import "./inventory.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InventoryItem from "../../../components/inventoryItem/inventoryItem";

import { useState, useEffect } from "react";
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
baseURL: baseURL,
  timeout: 10000
});

const Inventory = () => {
  const [inventory, setInventory] = useState<{
    name: string;
    alert: boolean;
    amount: number;
    capacity: number;
  }[]>([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await API.get(`/inventory`);
        const updatedInventory = response.data.map((item: {
          name: string;
          alert: boolean;
          amount: number;
          capacity: number;
        }) => ({
          ...item,
          alert: (item.amount / item.capacity) <= 0.1,
        }));
        updatedInventory.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setInventory(updatedInventory);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch inventory data initially
    fetchInventoryData();

    // Periodically update inventory data every 10 seconds
    const updateInterval =  10000;
    const updateTimer = setInterval(fetchInventoryData, updateInterval);

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(updateTimer);
    };
  }, []); // Empty dependency array to run once on mount

  // Use another effect to handle the PUT requests when inventory changes
  useEffect(() => {
    inventory.forEach(async (item) => {
      try {
        await API.put(`/inventory/updateAlert?parameter=${item.name}`, { alert: item.alert }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
  }, [inventory]);

  return (
    <div className="inventory">
      <div className="inventory__header">
        <h1>Ingredients</h1>
        <i>
          <FontAwesomeIcon icon="square-plus" size="2x" style={{ color: '#0d6f06' }} />
        </i>
      </div>

      <div className="inventory__items">
        {inventory.map((item) => (
          <InventoryItem
            key={item.name}
            name={item.name}
            alert={item.alert}
            amount={item.amount}
            capacity={item.capacity}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
