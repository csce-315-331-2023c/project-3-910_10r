import React, { useState, useEffect } from "react";
import "./employeePopup.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import IconPopup from "./iconPopup"; // Import the IconPopup component
import axios , { AxiosInstance } from 'axios';

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

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
  initialData: EmployeeData;
}

/**
 * EmployeePopup component to display employee information when selected
 * @param props Props for the EmployeePopup component
 * @returns EmployeePopup or null if isOpen is false
 */
const EmployeePopup: React.FC<Props> = ({ isOpen, onClose, initialData}) => {
  const [name, setName] = useState(initialData.name);
  const [position, setPosition] = useState(initialData.position);
  const [hoursPerWeek, setHoursPerWeek] = useState(initialData.hoursPerWeek.toString());
  const [hourlyPay, setHourlyPay] = useState(initialData.hourlyPay.toString());
  const [confirmed, setConfirmed] = useState(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [updatedDB, setUpdatedDB] = useState<boolean>(false);
  const [newEmployee, setNew] = useState<boolean>(false);

  useEffect(() => {
    if (initialData.name.trim() === "") {
      // Handle the case where name is empty
      setNew(true);
      setLoaded(true); // Set loaded to true to avoid unnecessary loading
    } else {
      // Make the API request only if the name is not empty
      API.get('/employees/info', {
        params: {
          name: initialData.name,
        }
      })
        .then((response) => {
          const data = response.data;
          console.log(data.name);
          //setName(data[0]);
          //setPosition(data[1]);
          setHoursPerWeek(data.hours);
          setHourlyPay(data.pay);
          setLoaded(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [initialData.name]);
  

  /**
   * Function to handle removal of an employee from database
   */
  const handleRemove = () => {
    API.put('/employees/remove', {name,})
      .then((response) => {
        console.log(response);
        setUpdatedDB(true);
        setConfirmed(true);
      })
      .catch((error) => {
        console.error(error);
      })
  };

  /**
   * Function to handle adding an employee to database or editing the employee
   */
  const handleSubmit = () => {
    // Make the PUT request to update the database
    const isManager = position === "Manager";
    const positionParam = isManager ? "true" : "false";

    if (newEmployee){
      API.put('/employees/add', {
        name,
        position: positionParam,
        password: "password",
        hourlyPay,
        hoursPerWeek,
      })
        .then((response) => {
          console.log(response);
          setUpdatedDB(true);
          setConfirmed(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      API.put('/employees/edit', {
          name,
          position: positionParam,
          hourlyPay,
          hoursPerWeek,
      })
        .then((response) => {
          console.log(response);
          setUpdatedDB(true);
          setConfirmed(true);
          // You can also call the onSubmit function here if needed
          // onSubmit({ name, position, hoursPerWeek, hourlyPay });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-overlay">
      {loaded ? (
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
              <IconPopup
                isOpen={updatedDB}
                onClose={onClose}
                icon={faCheckCircle}
                color="green"
              />
            ) : (
              // Show input fields and buttons if not confirmed
              <>
                <label className="labels">
                  Name:
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="labels">
                  Position:
                  <select value={position} onChange={(e) => setPosition(e.target.value)}>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                  </select>
                </label>
                <label className="labels">
                  Hours per Week:
                  <input type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
                </label>
                <label className="labels">
                  Hourly Pay:
                  <input type="number" value={hourlyPay} onChange={(e) => setHourlyPay(e.target.value)} />
                </label>
                <div className="popup-buttons">
                  <button onClick={handleRemove} disabled={confirmed}>
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
      ) : (
        <div
          style={{
            color: "black",
            fontSize: "30px",
          }}
        >
          Loading
        </div>
      )}
    </div>
  );
};

export default EmployeePopup;