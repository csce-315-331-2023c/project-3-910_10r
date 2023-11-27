//npm install react-datepicker
//npm install date-fns
//npm i --save-dev @types/react-datepicker

//when already on Custom Time, if you do the dropdown and click it again, the popup is not popping up


import React, { useState, useEffect } from "react";
import { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB"; // Import a locale for date-fns
import "./reports.scss";
import CustomTimePopup from "../../../components/reportsPopup/customTime";

import axios, { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

// Register the locale to use with react-datepicker
registerLocale("en-GB", enGB);

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState("last24");
  const [startDate, setStartDate] = useState<string | null>(null); // Specify the type
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showCustomTimePopup, setShowCustomTimePopup] = useState(false);
  const [pairCount, setPairCount] = useState<{ [key: string]: number }>({});
  const [excessIngredients, setExcessIngredients] = useState<string[]>([]);
  const [ingredientsMap, setIngredientsMap] = useState<{[key: string]: number}>({});
  const [inventoryInfo, setInventoryInfo] = useState<{[key: string]: number}>({});
  const [loadingExcess, setLoadingExcess] = useState(false);

  useEffect(() => {
    fetch24HoursData(); // Fetch data for last 24 hours on component mount
  }, []);

  /*const clearData = () => {
    setExcessIngredients([]);
    setIngredientsMap({});
    setInventoryInfo({});
  }*/

  const fetch24HoursData = () => {
    const currentDate = new Date();
    const beginningDate = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    const endDate = currentDate;
    const formattedBeginningDate = formatDate(beginningDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedBeginningDate && formattedEndDate) {
      setLoadingExcess(true);
      fetchData(formattedBeginningDate, formattedEndDate);
      //clearData();
      fetchExcessData(formattedBeginningDate, formattedEndDate);
      //calculateTotals();
    } else {
      console.error("Formatted beginning date is null");
    }
  };

  const fetch7DaysData = () => {
    const currentDate = new Date();
    const beginningDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    const endDate = currentDate;
    const formattedBeginningDate = formatDate(beginningDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedBeginningDate && formattedEndDate) {
      setLoadingExcess(true);
      fetchData(formattedBeginningDate, formattedEndDate);
      //clearData();
      fetchExcessData(formattedBeginningDate, formattedEndDate);
      //calculateTotals();
    } else {
      console.error("Formatted beginning date is null");
    }
  };
  const fetch30DaysData = () => {
    const currentDate = new Date();
    const beginningDate = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
    const endDate = currentDate;
    const formattedBeginningDate = formatDate(beginningDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedBeginningDate && formattedEndDate) {
      setLoadingExcess(true);
      fetchData(formattedBeginningDate, formattedEndDate);
      //clearData();
      fetchExcessData(formattedBeginningDate, formattedEndDate);
      //calculateTotals();
    } else {
      console.error("Formatted beginning date is null");
    }
  };

  const fetch180DaysData = () => {
    const currentDate = new Date();
    const beginningDate = new Date(currentDate.getTime() - 180 * 24 * 60 * 60 * 1000); // 180 days ago
    const endDate = currentDate;
    const formattedBeginningDate = formatDate(beginningDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedBeginningDate && formattedEndDate) {
      setLoadingExcess(true);
      fetchData(formattedBeginningDate, formattedEndDate);
      //clearData();
      fetchExcessData(formattedBeginningDate, formattedEndDate);
      //calculateTotals();
    } else {
      console.error("Formatted beginning date is null");
    }
  };

  const fetch365DaysData = () => {
    const currentDate = new Date();
    const beginningDate = new Date(currentDate.getTime() - 365 * 24 * 60 * 60 * 1000); // 365 days ago
    const endDate = currentDate;
    const formattedBeginningDate = formatDate(beginningDate);
    const formattedEndDate = formatDate(endDate);

    if (formattedBeginningDate && formattedEndDate) {
      setLoadingExcess(true);
      fetchData(formattedBeginningDate, formattedEndDate);
      //clearData();
      fetchExcessData(formattedBeginningDate, formattedEndDate);
      //calculateTotals();
    } else {
      console.error("Formatted beginning date is null");
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "custom") {
      setShowCustomTimePopup(true);
    } else {
      setShowCustomTimePopup(false);
      setSelectedOption(selectedValue);

      // Check if both dates are selected and make API call
      if (startDate && endDate) {
        setLoadingExcess(true);
        fetchData(startDate, endDate);
        //clearData();
        fetchExcessData(startDate,endDate);
        //calculateTotals();
      }
    }

    if (selectedValue === "last24") {
      fetch24HoursData();
    } else if (selectedValue === "last7") {
      fetch7DaysData();
    } else if (selectedValue === "last30") {
      fetch30DaysData();
    } else if (selectedValue === "last180") {
      fetch180DaysData();
    } else if (selectedValue === "last365") {
      fetch365DaysData();
    }
  };

  const formatDate = (date: Date | null): string | null => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return null;
  };

  const fetchExcessData = async (beginningDate: string, endDate: string) => {
    try{
      const inventoryInfo2: { [key: string]: number } = {};
      const drinkCountMap: { [key: string]: number } = {};
      const ingredientsMap2: { [key: string]: number } = {};
    //setLoadingExcess(true);
    // Fetch drink count data
    setIngredientsMap({});
    setInventoryInfo({});
    const response = await API.get("/reports/getExcessReport/orderData", {
      params: { beginningDate, endDate }
    });
    const data = response.data;

  
    if (data && Array.isArray(data) && data.length > 0) {
      data.forEach((item: any) => {
        const drinkIds = item.drink_id;

        if (Array.isArray(drinkIds) && drinkIds.length > 0) {
          drinkIds.forEach((drinkId: string) => {
            if (drinkId !== "0"){
            drinkCountMap[drinkId] = (drinkCountMap[drinkId] || 0) + 1;
            }
            else{
              console.log("processing: ", drinkId);
            }
          });
        } else {
          console.error('Drink IDs are not in the expected format or length');
        }
      });
    }

    //console.log(drinkCountMap);
    delete drinkCountMap[0];



    // Fetch inventory information
    const inventoryResponse = await API.get("/reports/getExcessReport/inventoryInfo",{});
        const invdata = inventoryResponse.data;
  
      if (invdata){
        invdata.forEach((item: any) => {
          const name = item.name;
          const amount = parseFloat(item.amount);

          //console.log('Ingredient Name:', name); // Log each ingredient name
          //console.log('Ingredient Value:', amount);
  
          inventoryInfo2[name] = amount;
          //console.log(inventoryInfo[name]);
        });
      } else{
        console.error("No inventory data");
      }  
      
  
      // Calculate multiplied amounts for each ingredient
      for (const drinkId in drinkCountMap) {
        if (drinkCountMap.hasOwnProperty(drinkId)) {

          const count = drinkCountMap[drinkId];

          //add straws, cups, napkins and plastic cover
          ingredientsMap2["straws"] = (ingredientsMap2["straws"] || 0) + count;
          ingredientsMap2["cups"] = (ingredientsMap2["cups"] || 0) + count;
          ingredientsMap2["napkins"] = (ingredientsMap2["napkins"] || 0) + count;
          ingredientsMap2["plastic cover"] = (ingredientsMap2["plastic cover"] || 0) + count;
          //console.log(count);

          // Fetch recipe data for each drinkId
          const recipeResponse = await API.get("/reports/getExcessReport/recipeData", {
            params: { drink: drinkId }
          });
              const recipedata = recipeResponse.data;
              //console.log(data);

              if (recipedata && Array.isArray(recipedata) && recipedata.length > 0) {
                recipedata.forEach((item: any) => {
                  const ingredientNames = item.ingredientNames;
                  const ingredientValues = item.ingredientValues;

                  if (ingredientNames && ingredientValues && Array.isArray(ingredientNames) && Array.isArray(ingredientValues)) {
                    for (let i = 0; i < ingredientNames.length; i++) {
                      const ingredientName = ingredientNames[i];
                      const ingredientValue = ingredientValues[i];

                      if (typeof ingredientValue === 'number') {
                        ingredientsMap2[ingredientName] = (ingredientsMap2[ingredientName] || 0) + (ingredientValue * count);
                        //console.log(ingredientName, count, ingredientValue);
                        //console.log(ingredientsMap2["black tea"]);
                      } else {
                        console.error(`Invalid value for ${ingredientName}`);
                      }
                      // console.log(ingredientsMap[ingredientName]);
                    }
                  }
                });
              }

                //console.log(ingredientsMap);
              } else {
                console.error('No data received or data format issue');
              }
                //setLoadingExcess(false);
        }

      if (Object.keys(ingredientsMap2).length > 0 && Object.keys(inventoryInfo2).length > 0){
          //console.log(ingredientsMap);
          setInventoryInfo(inventoryInfo2);
          setIngredientsMap(ingredientsMap2);
          //await calculateTotals();
      }
      //setLoadingExcess(false);
      }
      catch(error) {
        console.error(error);
        //setLoadingExcess(false);
      }
  };

  useEffect(() => {
    calculateTotals();
    setLoadingExcess(false);
  }, [ingredientsMap, inventoryInfo]);

  /*useEffect(() => {
    // Calculate totals when ingredientsMap or inventoryInfo are updated
    calculateTotals();
  }, [ingredientsMap, inventoryInfo]); */

  const calculateTotals = () => {
    setExcessIngredients([]);
    const excess = [];
    // Compare ingredientsMap with inventoryInfo
    console.log(ingredientsMap);
    console.log(inventoryInfo);
    for (const ingredientName in ingredientsMap) {
      //console.log(inventoryInfo[ingredientName]);
        const ingredientValue = ingredientsMap[ingredientName];
        const inventoryAmount = inventoryInfo[ingredientName];
        //console.log(ingredientValue, inventoryAmount);
        if (inventoryAmount && ingredientValue < (ingredientValue + inventoryAmount) * 0.1) {
          excess.push(ingredientName);
          //console.log("true");
        }
    }
    console.log("excess: " , excess);
    setExcessIngredients(excess);
    //setLoadingExcess(false);
  }


  const fetchData = (beginningDate: string, endDate: string) => {
    API.get("/managers/whatSalesTogether", {
      params: { beginningDate, endDate }
    })
      .then((response) => {
        const data = response.data;
  
        if (data && Array.isArray(data) && data.length > 0) {
          const drinkCountMap: { [key: string]: number } = {};
  
          data.forEach((item: any) => {
            const drinkIds = item.drink_id;
  
            if (Array.isArray(drinkIds) && drinkIds.length > 1) {
              const sortedIds = drinkIds.sort(); // Sort the IDs to ensure consistent combinations
  
              for (let i = 0; i < sortedIds.length; i++) {
                for (let j = i + 1; j < sortedIds.length; j++) {
                  if (sortedIds[i] !== sortedIds[j]) { // Exclude pairs with the same ID
                    const pair = `${sortedIds[i]}-${sortedIds[j]}`;
                    drinkCountMap[pair] = (drinkCountMap[pair] || 0) + 1;
                  }
                }
              }
            } else {
              console.error('Drink IDs are not in the expected format or length');
            }
          });
  
          // Convert drinkCountMap to an array of key-value pairs and sort by count
          const sortedDrinkCountArray = Object.entries(drinkCountMap)
            .sort((a, b) => b[1] - a[1]);
  
          // Convert the sorted array back to an object
          const sortedDrinkCountMap: { [key: string]: number } = {};
          sortedDrinkCountArray.forEach(([pair, count]) => {
            sortedDrinkCountMap[pair] = count;
          });

          setPairCount(sortedDrinkCountMap);
        } else {
          console.error('Data is empty or not in the expected format');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  

  const handleCustomTimeSubmit = () => {
    if (startDate && endDate) {
      setStartDate(formatDate(new Date(startDate)));
      setEndDate(formatDate(new Date(endDate)));
      console.log("Selected Start Date:", startDate);
      console.log("Selected End Date:", endDate);
      setShowCustomTimePopup(false);
      setSelectedOption("custom");
      fetchData(startDate, endDate);
      fetchExcessData(startDate, endDate);
    }
  };

  return (
    <div className="main-container">
      <div className="header">
        <div className="custom-time-container">
          <select value={selectedOption} onChange={handleOptionChange}> 
            <option value="last24">Last 24 hours</option>
            <option value="last7">Last 7 days</option>
            <option value="last30">Last 30 days</option>
            <option value="last180">Last 180 days</option>
            <option value="last365">Last 365 days</option>
            <option value="custom">Custom time</option>
          </select>
          <div className="custom-date-display">
            {selectedOption === "custom" && startDate && endDate && (
              `From: ${startDate}   To: ${endDate}`
            )}
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2>Commonly Sold Together</h2>
          <div className="scrollable-content">
            {Object.entries(pairCount).map(([pair, count], index) => (
              <div className="data-box" key={index}>
                <div className="number">{count}</div>
                <div className="data-entry">{pair.split('-')[0]}</div>
                <div className="separator">|</div>
                <div className="data-entry">{pair.split('-')[1]}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Ingredients in Excess</h2>
          <div className="scrollable-content">
            {excessIngredients.length === 0 && loadingExcess ? (
              <div className="data-box">
                <div className="data-entry">Loading...</div>
              </div>
            ) : excessIngredients.length === 0 ? (
              <div className="data-box">
                <div className="data-entry">None</div>
              </div>
            ) : (
              excessIngredients.map((data, index) => (
                <div className="data-box" key={index}>
                  <div className="data-entry">{data}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showCustomTimePopup && (
        <CustomTimePopup
          isOpen={showCustomTimePopup}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
          onStartDateChange={(date: Date | null) => setStartDate(formatDate(date))}
          onEndDateChange={(date: Date | null) => setEndDate(formatDate(date))}
          onClose={() => setShowCustomTimePopup(false)}
          onSubmit={handleCustomTimeSubmit}
        />
      )}
    </div>
  );
};

export default Reports;

