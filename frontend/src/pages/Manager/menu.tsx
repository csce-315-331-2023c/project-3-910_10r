import React, { useState, useEffect } from "react";
//import "../../components/employeesmainpage/employeesList.scss";
import "./employees.scss";
import EmployeePopup from "../../components/employeePopup/employeePopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import "./manager.scss";
//import axios , { AxiosInstance } from 'axios';
//import EmployeesList from "../../components/employeesmainpage/employeesList.tsx";
//import EmployeePopup from "../../components/employeePopup/employeeEdit.tsx";
/*let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000
});*/

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


interface EmployeeData {
  name: string;
  position: string; // "manager" or "employee"
  hoursPerWeek: number;
  hourlyPay: number;
}

function Menu() {
  console.log("Employee component is being rendered"); 

  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeData | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openEmployeePopup = (employeeData: EmployeeData) => {
    setSelectedEmployee(employeeData);
    setIsPopupOpen(true); // Open the popup when a button is clicked
  };

  const closeEmployeePopup = () => {
    setSelectedEmployee(null);
    setIsPopupOpen(false); // Close the popup
  };
  /*useEffect(() => {
    API.get("/cashier/drinkCategory")
      .then((response) => {
        setCatogories(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    API.get("/cashier/drinkAndCategories")
      .then((response) => {
        setDrinks(response.data);
        console.log(response.data);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);*/
  //<FontAwesomeIcon icon="fa-solid fa-square-plus" style={{color: "#0d6f06",}} />

  const managers = [
    { name: 'Manager 1', position: 'Manager', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Manager 2', position: 'Manager', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Manager 3', position: 'Manager', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Man 4', position: 'Manager', hoursPerWeek: 20, hourlyPay: 15 },
    // Add more manager objects as needed
  ];

  const employees = [
    { name: 'Employee 1', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15},
    { name: 'Employee 2', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Employee 3', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Employee 4', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Employee 2', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Employee 3', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    { name: 'Employee 4', position: 'Employee', hoursPerWeek: 20, hourlyPay: 15 },
    // Add more employee objects as needed
  ];
  //        <EmployeesList managers={managers} employees={employees} />
  
  const handleIconButtonClick = () => {
    // Implement the action you want to perform when the icon button is clicked.
    // For example, you can open a popup or perform some other action.
    console.log('Icon button clicked');
  };

  return (
      <div>
      <div className="section">
          <button className="section-icon-button" onClick={handleIconButtonClick}>
            <i>
              <FontAwesomeIcon icon="square-plus" style={{color: "#0d6f06",}} />
            </i>
          </button>
        <h1>Managers:</h1>
          <ul className="ullabel">
            {managers.map((manager, index) => (
              <li key={index} className="lisection">
                <button className="buttonatr" onClick={() => openEmployeePopup(manager)}>
                  {manager.name}
                </button>
              </li>
            ))}
          </ul>
      </div>
      <div className="section">
        <h2>Employees:</h2>
      <ul className="ullabel">
        {employees.map((employee, index) => (
          <li key={index} className="lisection">
              <button className="buttonatr" onClick={() => openEmployeePopup(employee)}>
                {employee.name}
              </button>
          </li>
        ))}
      </ul>
      </div>
      {isPopupOpen && (
        <EmployeePopup
          isOpen={isPopupOpen} // You can conditionally set it based on your requirements
          onClose={closeEmployeePopup}
          onSubmit={(data) => {
            // Handle the data submission here
            console.log('Submitted data:', data);
            closeEmployeePopup(); // Close the popup after submission
          }}
        />
      )}
  </div>
  );
}

export default Menu;
