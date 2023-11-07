import { useState } from "react";
import './manager.scss';

import ManagerNavBar from "../../components/managerNavBar/managerNavBar.tsx";
import Footer from "../../components/footer/footer.tsx";
import Employee from "./Employees/employees.tsx";
import Inventory from "./Inventory/inventory.tsx";
import Menus from "./Menus/menus.tsx";
import OrderHistory from "./OrderHistory/orderhistory.tsx";
import Reports from "./Reports/reports.tsx";
import LogoutPopup from "../../components/logoutPopup/logoutPopup.tsx";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Manager = () => {

    const [showEmployees, setShowEmployees] = useState(true);
    const [showInventory, setShowInventory] = useState(false);
    const [showMenus, setShowMenus] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    return (
        <div className="manager-container">

            <div className="manager">
            <ManagerNavBar
                    showEmployees={showEmployees}
                    showInventory={showInventory}
                    showMenus={showMenus}
                    showOrderHistory={showOrderHistory}
                    showReports={showReports}
                    toggleEmployees={() => {
                        setShowEmployees(true);
                        setShowInventory(false);
                        setShowMenus(false);
                        setShowOrderHistory(false);
                        setShowReports(false);
                    }}
                    toggleInventory={() => {
                        setShowEmployees(false);
                        setShowInventory(true);
                        setShowMenus(false);
                        setShowOrderHistory(false);
                        setShowReports(false);
                    }}
                    toggleMenus={() => {
                        setShowEmployees(false);
                        setShowInventory(false);
                        setShowMenus(true);
                        setShowOrderHistory(false);
                        setShowReports(false);
                    }}
                    toggleOrderHistory={() => {
                        setShowEmployees(false);
                        setShowInventory(false);
                        setShowMenus(false);
                        setShowOrderHistory(true);
                        setShowReports(false);
                    }}
                    toggleReports={() => {
                        setShowEmployees(false);
                        setShowInventory(false);
                        setShowMenus(false);
                        setShowOrderHistory(false);
                        setShowReports(true);
                    }}
                />
                {showEmployees && <Employee></Employee>}
                {showInventory && <Inventory></Inventory>}
                {showMenus && <Menus></Menus>}
                {showOrderHistory && <OrderHistory></OrderHistory>}
                {showReports && <Reports></Reports>}
            </div>
            <Footer setShowLogout={setIsLogout}></Footer>
            {isLogout && <LogoutPopup setIsLogout={setIsLogout}></LogoutPopup>}
        </div>
    );
};

export default Manager;
