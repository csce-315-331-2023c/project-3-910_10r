import { useState, useEffect } from "react";
//import "../../components/employeesmainpage/employeesList.scss";
import "./employees.scss";
import EmployeePopup from "../../../components/employeePopup/employeePopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import "./manager.scss";
//import EmployeesList from "../../components/employeesmainpage/employeesList.tsx";
//import EmployeePopup from "../../components/employeePopup/employeeEdit.tsx";

import axios , { AxiosInstance } from 'axios';


let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
/**
 * Data structure for an employee
 * @typedef {Object} EmployeeData
 * @property {string} name - Name of the employee
 * @property {string} position - Position of the employee ("manager" or "employee")
 * @property {number} hoursPerWeek - Number of hours per week
 * @property {number} hourlyPay - Hourly pay rate
 */

// Interface to track specific employee's data
interface EmployeeData {
  name: string;
  position: string; // "manager" or "employee"
  hoursPerWeek: number;
  hourlyPay: number;
}

/**
 * Employee component that displays the cashiers and managers
 * @returns {JSX.Element} Employee component
 */
function Employee(): JSX.Element {
  console.log("Employee component is being rendered");
  //if Managers and Employees loaded
  const [loadedM, setLoadedM] = useState<boolean>(false);
  const [loadedE, setLoadedE] = useState<boolean>(false);

  //names of manager and employee
  const [managersNames, setManagerNames] = useState<string[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  /**
   * Function that opens the employee popup
   * @function openEmployeePopup
   * @param {string} employeeName String of the name of employee selected to popup and display information of
   * @param {string} position String of position: manager or employee
   */
  var openEmployeePopup = (employeeName: string, position: string) => {
    const employeeData: EmployeeData = {
      name: employeeName,
      position: position,
      hoursPerWeek: 0,
      hourlyPay: 0,
    };
    setSelectedEmployee(employeeData);
    setIsPopupOpen(true);
  };

  /**
   * Function that closes the employee popup and refreshes the cashier and manager display
   * @function closeEmployeePopup
   */
  var closeEmployeePopup = () => {
    setSelectedEmployee(null);
    setIsPopupOpen(false);
  //reload
    API.get("/managers/names")
    .then((response) => {
      setManagerNames(response.data);
      console.log(response.data);
      setLoadedM(true);
    })
    .catch((error) => {
      console.error(error);
    });
    API.get("/employees/names")
      .then((response) => {
        setEmployeeNames(response.data);
        console.log(response.data);
        setLoadedE(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    API.get("/managers/names")
      .then((response) => {
        setManagerNames(response.data);
        console.log(response.data);
        setLoadedM(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    API.get("/employees/names")
      .then((response) => {
        setEmployeeNames(response.data);
        console.log(response.data);
        setLoadedE(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //<FontAwesomeIcon icon="fa-solid fa-square-plus" style={{color: "#0d6f06",}} />

  //        <EmployeesList managers={managers} employees={employees} />
  
  /**
   * Handles when the confirm button is pressed for the employee popup. Will perform the necessary api call for adding, editing, or removing an employee
   * @param {EmployeeData} data EmployeeData interface for specific employee
   */
  const handleConfirmation = (data: EmployeeData) => {
    if (data.name) {
      // Name is present, so it's an update or addition
      if (selectedEmployee) {
        // Update an existing employee/manager
        if (selectedEmployee.position === "Manager") {
          setManagerNames((prevNames) =>
            prevNames.map((name) => (name === selectedEmployee.name ? data.name : name))
          );
        } else {
          setEmployeeNames((prevNames) =>
            prevNames.map((name) => (name === selectedEmployee.name ? data.name : name))
          );
        }
      } else {
        // Add a new employee/manager
        if (data.position === "Manager") {
          setManagerNames((prevNames) => [...prevNames, data.name]);
        } else {
          setEmployeeNames((prevNames) => [...prevNames, data.name]);
        }
      }
    } else {
      // Name is not present, so remove
      if (selectedEmployee) {
        if (selectedEmployee.position === "Manager") {
          setManagerNames((prevNames) =>
            prevNames.filter((name) => name !== selectedEmployee.name)
          );
        } else {
          setEmployeeNames((prevNames) =>
            prevNames.filter((name) => name !== selectedEmployee.name)
          );
        }
      }
    }
    closeEmployeePopup();
  };
    

  return (
    <div className = "background" style={{ position: "relative"}}>
    {(loadedM && loadedE) ? (
      <div>
      <div className="section">
          <button className="section-icon-button" onClick={() => openEmployeePopup("", "Manager")}>
            <i>
              <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "var(--GREEN-DARK)"}} />
            </i>
          </button>
        <h1>Managers:</h1>
          <ul className="ullabel">
            {managersNames.map((managerName, index) => (
                  <li key={index} className="lisection">
                    <button
                      className="buttonatr"
                      onClick={() => openEmployeePopup(managerName, "Manager")}
                    >
                      {managerName}
                    </button>
                  </li>
                ))}
          </ul>
      </div>
      <div className="section">
          <button className="section-icon-button" onClick={() => openEmployeePopup("", "Employee")}>
            <i>
              <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "var(--GREEN-DARK)"}} />
            </i>
          </button>
        <h2>Cashiers:</h2>
      <ul className="ullabel">
          {employeeNames.map((employeeName, index) => (
                <li key={index} className="lisection">
                  <button
                    className="buttonatr"
                    onClick={() => openEmployeePopup(employeeName, "Employee")}
                  >
                    {employeeName}
                  </button>
                </li>
              ))}
      </ul>
      </div>
      {isPopupOpen && (
        <EmployeePopup
          isOpen={isPopupOpen}
          onClose={closeEmployeePopup}
          onSubmit={handleConfirmation}
          initialData={{ name: selectedEmployee?.name || "", position: selectedEmployee?.position || "Employee", hoursPerWeek: 0, hourlyPay: 0 }}
        />
      )}
  </div>
      ) : (
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundColor: "var(--GREEN-MED)",
            color: "black",
            fontSize: "30px",
          }}
        >
          Loading
        </div>
      )}
    </div>
  );
}

export default Employee;