import React, { useState } from 'react';
import NavigationBar from "../../components/managerNavBar/managerNavBar.tsx";
import Footer from "../../components/footer/footer.tsx";
import Inventory from '../../pages/Manager/inventory';
import Menu from '../../pages/Manager/menu';
import Reports from '../../pages/Manager/reports';
import OrderHistory from '../../pages/Manager/orderHistory';
import Employee from '../../pages/Manager/employees';
import "./manager.scss";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const Manager: React.FC = () => {
  const [activePage, setActivePage] = useState('employees'); // Default to 'Employee'

  const handleNavItemClick = (page: string) => {
    setActivePage(page);
  };

  console.log(activePage);
  return (
    <div className="container">
        <div>
            <NavigationBar activePage={activePage} onNavItemClick={handleNavItemClick} />
        </div>
      <div className="main-content">
        {activePage === 'employees' && <Employee/>}
        {activePage === 'inventory' && <Inventory />}
        {activePage === 'menu' && <Menu />}
        {activePage === 'reports' && <Reports />}
        {activePage === 'orderHistory' && <OrderHistory />}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Manager;
