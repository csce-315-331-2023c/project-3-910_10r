import { useState, useEffect } from "react";
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

interface Props {
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCashier: React.Dispatch<React.SetStateAction<boolean>>;
    setEunsooBirthdayShow: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Manager main page to toggle
 * @returns {JSX.Element} Manager component
 */
const Manager = ({setIsLogin, setIsManager, setIsCashier, setEunsooBirthdayShow} : Props) => {

    const [showEmployees, setShowEmployees] = useState(true);
    const [showInventory, setShowInventory] = useState(false);
    const [showMenus, setShowMenus] = useState(false);
    const [showOrderHistory, setShowOrderHistory] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    useEffect(() => {
        setEunsooBirthdayShow(false);
    })

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
            {isLogout && <LogoutPopup setIsLogout={setIsLogout} setIsLogin={setIsLogin} setIsManager={setIsManager} setIsCashier={setIsCashier} setEunsooBirthdayShow={setEunsooBirthdayShow} fromManager={true}></LogoutPopup>}
        </div>
    );
};

export default Manager;
