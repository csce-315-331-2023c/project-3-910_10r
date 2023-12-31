import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./customTime.scss"; // Import the custom styles
import {faTimes}  from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CustomTimePopupProps {
    isOpen: boolean;
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
    onClose: () => void;
    onSubmit: () => void;
  }

/**
 * CustomTime Popup for determining time range
 * @param props CustomTimePopupProps component props
 * @returns CustomTimePopup component or null of isOpen is false
 */
const CustomTimePopup: React.FC<CustomTimePopupProps> = ({
  isOpen,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) {
    return null;
  }

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
            <p style={{color: "var(--NORMALLY-BLACK)"}} >Start Date: </p>
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
            <p style={{color: "var(--NORMALLY-BLACK)"}}>End Date:</p>
            <DatePicker
            selected={endDate}
            onChange={(date) => onEndDateChange(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            showTimeSelect
            />
        </label>
        <div className="popup-buttons">
            <button onClick={onSubmit}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default CustomTimePopup;
