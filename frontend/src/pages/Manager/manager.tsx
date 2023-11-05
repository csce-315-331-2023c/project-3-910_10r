import React, { useState, useEffect } from "react";
import './manager.scss';

import ManagerNavBar from "../../components/managerNavBar/managerNavBar.tsx";
import Footer from "../../components/footer/footer.tsx";
import Employees from "./Employees/employees.tsx";
import Inventory from "./Inventory/inventory.tsx";
import Menus from "./Menus/menus.tsx";
import OrderHistory from "./OrderHistory/orderhistory.tsx";
import Reports from "./Reports/reports.tsx";

const Manager = () => {

    const [showEmployees, setShowEmployees] = useState(true);
    const [showInventory, setShowInventory] = useState(false);
    const [showMenus, setShowMenus] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showReports, setShowReports] = useState(false);
    

    return (
        <div className="manager-container">
            <div className="manager">
                <ManagerNavBar></ManagerNavBar>
                {showEmployees && <Employees></Employees>}
                {showInventory && <Inventory></Inventory>}
                {showMenus && <Menus></Menus>}
                {showOrderHistory && <OrderHistory></OrderHistory>}
                {showReports && <Reports></Reports>}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Manager;
