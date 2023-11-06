import React, { useState } from "react";
import "./employeePopup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconPopup from "./iconPopup"; // Import the IconPopup component

interface EmployeeData {
  name: string;
  position: string; // "manager" or "employee"
  hoursPerWeek: number;
  hourlyPay: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EmployeeData) => void;
}

const EmployeePopup: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState('Employee');
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [hourlyPay, setHourlyPay] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = () => {
    const data: EmployeeData = {
      name,
      position,
      hoursPerWeek: parseInt(hoursPerWeek),
      hourlyPay: parseFloat(hourlyPay),
    };

    // If not confirmed, mark it as confirmed
    if (!confirmed) {
      setConfirmed(true);
    } else {
      // If already confirmed, submit the data and close the popup
      onSubmit(data);
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-header">
        {/* Close button (x icon) in the top right */}
        <button className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="popup-content">
        {confirmed ? (
          // Show confirmation icon if confirmed
          <IconPopup isOpen={confirmed} onClose={onClose} icon={faCheckCircle} color="green" />
        ) : (
          // Show input fields and buttons if not confirmed
          <>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              Position:
              <select value={position} onChange={(e) => setPosition(e.target.value)}>
                <option value="Manager">Manager</option>
                <option value="Employee">Employee</option>
              </select>
            </label>
            <label>
              Hours per Week:
              <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
            </label>
            <label>
              Hourly Pay:
              <input type="number" value={hourlyPay} onChange={(e) => setHourlyPay(e.target.value)} />
            </label>
            <div className="popup-buttons">
              <button onClick={onClose}>
                Remove
              </button>
              <button onClick={handleSubmit} disabled={confirmed}>
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </div>
  );
};

export default EmployeePopup;