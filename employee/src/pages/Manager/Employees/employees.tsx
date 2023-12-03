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


interface EmployeeData {
  name: string;
  position: string; // "manager" or "employee"
  hoursPerWeek: number;
  hourlyPay: number;
}

function Employee() {
  console.log("Employee component is being rendered");
  //if Managers and Employees loaded
  const [loadedM, setLoadedM] = useState<boolean>(false);
  const [loadedE, setLoadedE] = useState<boolean>(false);

  //names of manager and employee
  const [managersNames, setManagerNames] = useState<string[]>([]);
  const [employeeNames, setEmployeeNames] = useState<string[]>([]);

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openEmployeePopup = (employeeName: string, position: string) => {
    const employeeData: EmployeeData = {
      name: employeeName,
      position: position,
      hoursPerWeek: 0,
      hourlyPay: 0,
    };
    setSelectedEmployee(employeeData);
    setIsPopupOpen(true);
  };

  const closeEmployeePopup = () => {
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
  
  /*const handleIconButtonClick = () => {
    // Implement the action you want to perform when the icon button is clicked.
    // For example, you can open a popup or perform some other action.
    console.log('Icon button clicked');
  };*/
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
    <div style={{ position: "relative" }}>
    {(loadedM && loadedE) ? (
      <div>
      <div className="section">
          <button className="section-icon-button" onClick={() => openEmployeePopup("", "Manager")}>
            <i>
              <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "#0d6f06",}} />
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
              <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "#0d6f06",}} />
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