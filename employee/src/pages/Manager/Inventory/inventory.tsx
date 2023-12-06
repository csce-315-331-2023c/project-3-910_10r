import "./inventory.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InventoryItem from "../../../components/inventoryItem/inventoryItem";
import { useState, useEffect } from "react";
import axios , { AxiosInstance } from 'axios';
import InventoryPopup from "../../../components/inventoryItem/inventoryPopup";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
baseURL: baseURL,
  timeout: 10000
});

/**
 * Inventory page that shows the inventory information
 * @returns  Inventory component
 */
const Inventory = () => {
  let [showSearchClear, setShowSearchClear] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [inventory, setInventory] = useState<{
    name: string;
    alert: boolean;
    amount: number;
    capacity: number;
    unit: string;
    topping: boolean;
  }[]>([]);

  const [displayedInventory, setDisplayedInventory] = useState<{
    name: string;
    alert: boolean;
    amount: number;
    capacity: number;
    unit: string;
    topping: boolean;
  }[]>([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await API.get(`/inventory`);
        const updatedInventory: {
          name: string;
          alert: boolean;
          amount: number;
          capacity: number;
          unit: string;
          topping: boolean;
        }[] = response.data.map((item: {
          name: string;
          alert: boolean;
          amount: number;
          capacity: number;
          unit: string;
          topping: boolean;
        }) => ({
          ...item,
          alert: (item.amount / item.capacity) <= 0.1,
        }));
        updatedInventory.sort((a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name));
        setInventory(updatedInventory);

        console.log(showSearchClear);
        if(!showSearchClear) {
          setDisplayedInventory(updatedInventory);
        }

      } catch (error) {
        console.error(error);
      }
    };

    // Fetch inventory data initially
    fetchInventoryData();

    // Periodically update inventory data every 1.5 seconds
    const updateInterval =  1500;
    const updateTimer = setInterval(fetchInventoryData, updateInterval);

    // Clear the timer when the component unmounts
    return () => {
      clearInterval(updateTimer);
    };
  }, [showSearchClear]);

  // Use another effect to handle the PUT requests when inventory changes
  useEffect(() => {
    displayedInventory.forEach(async (item) => {
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
  }, [displayedInventory]);

  const handlePopup = () => {
    setShowPopup(true)
  }

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();
    setShowSearchClear(true);
    showSearchClear = true;
  
    const searchInput = (document.querySelector("#searchInv") as HTMLInputElement).value.trim().toLowerCase();
  
    if(searchInput === '') {
      handleSearchClear();
    } 
    else {
      const foundItem = inventory.find(item => item.name === searchInput);
  
      if (foundItem) {
        setDisplayedInventory([foundItem]);
        displayedInventory.splice(0);
        displayedInventory.push(foundItem);
      } 
      else {
        setDisplayedInventory([]);
        displayedInventory.splice(0);
      }
    }
  }

  function handleSearchClear() {
    setShowSearchClear(false);
    (document.querySelector("#searchInv") as HTMLInputElement).value = "";

    setDisplayedInventory(inventory);
  }

  return (
    <div className="inventory">
      <div className="inventory__header">
        {showPopup && <InventoryPopup setShowPopup={setShowPopup}/>}
        <h1>Ingredients</h1>

        <form action="" onSubmit={handleSearch} className="inventory__search">
          <div className="inventory__search-box">
            <label htmlFor="searchInv">Search Inventory</label>
            <FontAwesomeIcon icon="magnifying-glass" />
            <input type="text" name="searchInv" id="searchInv" placeholder={"Search for an ingredient"} autoComplete="off"/>
          </div>
          {showSearchClear && <FontAwesomeIcon icon="xmark" onClick={handleSearchClear}/>}
        </form>

        <button><i>
          <FontAwesomeIcon icon="square-plus" size="2x" style={{ color: "var(--GREEN-DARK)" }} onClick={handlePopup}/>
        </i></button>
      </div>

      <div className="inventory__items">
        {displayedInventory.length === 0 && <p>No Results Found...</p>}
        {displayedInventory.map((item) => (
          <InventoryItem
            key={item.name}
            name={item.name}
            alert={item.alert}
            amount={item.amount}
            capacity={item.capacity}
            unit={item.unit}
            topping={item.topping}
          />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
