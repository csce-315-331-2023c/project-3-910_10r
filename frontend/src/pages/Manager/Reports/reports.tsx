//npm install react-datepicker
//npm install date-fns
//npm i --save-dev @types/react-datepicker

//when already on Custom Time, if you do the dropdown and click it again, the popup is not popping up


import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB"; // Import a locale for date-fns
import "./reports.scss";
import CustomTimePopup from "../../../components/reportsPopup/customTime";

// Register the locale to use with react-datepicker
registerLocale("en-GB", enGB);

const commonlySoldData = [
  { firstString: "Product A", secondString: "Product B", count: 250 },
  { firstString: "Product C", secondString: "Product D", count: 400 },
  { firstString: "Product E", secondString: "Product F", count: 340 },
  { firstString: "Product A", secondString: "Product B", count: 250 },
  { firstString: "Product C", secondString: "Product D", count: 400 },
  { firstString: "Product E", secondString: "Product F", count: 340 },
  { firstString: "Product A", secondString: "Product B", count: 250 },
  { firstString: "Product C", secondString: "Product D", count: 400 },
  { firstString: "Product E", secondString: "Product F", count: 340 },
];

const excessIngredientsData = [
  {ingredientName: "Black tea"},{ingredientName: "Mango"},{ingredientName: "water"}, 
  {ingredientName: "Winter Melon"}, {ingredientName: "Green Tea"},
];

const Reports = () => {
  const [selectedOption, setSelectedOption] = useState("last24");
  const [startDate, setStartDate] = useState<Date | null>(null); // Specify the type
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showCustomTimePopup, setShowCustomTimePopup] = useState(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
  
    // Check if "Custom time" is selected and display CustomTimePopup
    if (selectedValue === "custom") {
      setShowCustomTimePopup(true);
    } else {
      setShowCustomTimePopup(false);
    }
  
    // Update the selected option
    setSelectedOption(selectedValue);
  };

  const handleCustomTimeSubmit = () => {
    // Handle custom time selection
    if (startDate && endDate) {
      console.log("Selected Start Date:", startDate.toLocaleDateString());
      console.log("Selected End Date:", endDate.toLocaleDateString());
    }
    setShowCustomTimePopup(false);
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
              `From: ${startDate.toLocaleDateString()}   To: ${endDate.toLocaleDateString()}`
            )}
          </div>
        </div>
      </div>

      <div className="columns">
        <div className="column">
          <h2>Commonly Sold Together</h2>
          <div className="scrollable-content">
            {commonlySoldData.map((data, index) => (
              <div className="data-box" key={index}>
                <div className="number">{data.count}</div>
                <div className="data-entry">{data.firstString}</div>
                <div className="separator">|</div>
                <div className="data-entry">{data.secondString}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="column">
          <h2>Ingredients in Excess</h2>
          <div className="scrollable-content">
            {excessIngredientsData.map((data, index) => (
              <div className="data-box" key={index}>
                <div className="data-entry">{data.ingredientName}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showCustomTimePopup && (
        <CustomTimePopup
          isOpen={showCustomTimePopup}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onClose={() => setShowCustomTimePopup(false)}
          onSubmit={handleCustomTimeSubmit}
        />
      )}
    </div>
  );
};

export default Reports;

