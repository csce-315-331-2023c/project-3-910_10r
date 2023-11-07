import { useState } from "react";
import './manager.scss';

import ManagerNavBar from "../../components/managerNavBar/managerNavBar.tsx";
import Footer from "../../components/footer/footer.tsx";
import Employee from "./Employees/employees.tsx";
import Inventory from "./Inventory/inventory.tsx";
import Menus from "./Menus/menus.tsx";
import OrderHistory from "./OrderHistory/orderhistory.tsx";
import Reports from "./Reports/reports.tsx";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Manager = () => {

    const [showEmployees] = useState(true);
    const [showInventory] = useState(false);
    const [showMenus] = useState(false);
    const [showOrderHistory] = useState(false);
    const [showReports] = useState(false);
    

    return (
        <div className="manager-container">
            <div className="manager">
                <ManagerNavBar></ManagerNavBar>
                {showEmployees && <Employee></Employee>}
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
