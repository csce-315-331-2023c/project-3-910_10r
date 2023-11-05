import React, { useState } from "react";

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

  const handleSubmit = () => {
    const data: EmployeeData = {
      name,
      position,
      hoursPerWeek: parseInt(hoursPerWeek),
      hourlyPay: parseFloat(hourlyPay),
    };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`popup ${isOpen ? "open" : ""}`}>
      <div className="popup-content">
        <h2>Add Employee</h2>
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
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeePopup;
