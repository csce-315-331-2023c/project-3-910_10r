import './managerNavBar.scss';

interface Props {
    showEmployees: boolean;
    showInventory: boolean;
    showMenus: boolean;
    showOrderHistory: boolean;
    showReports: boolean;
    toggleEmployees: () => void;
    toggleInventory: () => void;
    toggleMenus: () => void;
    toggleOrderHistory: () => void;
    toggleReports: () => void;
}

const ManagerNavBar = ({ 
        showEmployees, showInventory, showMenus, showOrderHistory, showReports,
        toggleEmployees, toggleInventory, toggleMenus, toggleOrderHistory, toggleReports 
    } : Props) => {

    return (
        <>
            <div className='navbar'>
                <button className={`navbar__btn ${showEmployees ? 'active' : ''}`} onClick={toggleEmployees}>
                    Employees
                </button>
                <button className={`navbar__btn ${showInventory ? 'active' : ''}`} onClick={toggleInventory}>
                    Inventory
                </button>
                <button className={`navbar__btn ${showMenus ? 'active' : ''}`} onClick={toggleMenus}>
                    Menus
                </button>
                <button className={`navbar__btn ${showOrderHistory ? 'active' : ''}`} onClick={toggleOrderHistory}>
                    Order History
                </button>
                <button className={`navbar__btn ${showReports ? 'active' : ''}`} onClick={toggleReports}>
                    Reports
                </button>
            </div>
        </>
    );
};

export default ManagerNavBar;
