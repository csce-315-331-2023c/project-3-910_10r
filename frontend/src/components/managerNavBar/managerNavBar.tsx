import "./managerNavBar.scss";
import React from 'react';

interface Props {
  activePage: string;
  onNavItemClick: (page: string) => void;
}
//nav classname: nav-bar

const NavigationBar: React.FC<Props> = ({ activePage, onNavItemClick }) => {
  return (
    <nav className="nav-bar"> 
      <ul>
        <li className={`nav-category ${activePage === 'employees' ? 'nav-selected' : 'nav'}`}>
          <button className="nav-link" onClick={() => onNavItemClick('employees')}>Employees</button>
        </li>
        <li className={`nav-category ${activePage === 'inventory' ? 'nav-selected' : 'nav'}`}>
          <button className="nav-link" onClick={() => onNavItemClick('inventory')}>Inventory</button>
        </li>
        <li className={`nav-category ${activePage === 'menu' ? 'nav-selected' : 'nav'}`}>
          <button className="nav-link" onClick={() => onNavItemClick('menu')}>Menus</button>
        </li>
        <li className={`nav-category ${activePage === 'reports' ? 'nav-selected' : 'nav'}`}>
          <button className="nav-link" onClick={() => onNavItemClick('reports')}>Report</button>
        </li>
        <li className={`nav-category ${activePage === 'orderHistory' ? 'nav-selected' : 'nav'}`}>
          <button className="nav-link" onClick={() => onNavItemClick('orderHistory')}>Order History</button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;

