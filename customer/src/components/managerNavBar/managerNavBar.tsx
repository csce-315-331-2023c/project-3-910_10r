import './managerNavBar.scss';

const ManagerNavBar = () => {

    return (
        <>
            <div className='navbar'>
                <button className='navbar__btn active'>Employees</button>
                <button className='navbar__btn'>Inventory</button>
                <button className='navbar__btn'>Menus</button>
                <button className='navbar__btn'>Order History</button>
                <button className='navbar__btn'>Reports</button>
            </div>
        </>
    );
};

export default ManagerNavBar;
