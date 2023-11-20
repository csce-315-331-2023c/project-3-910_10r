import './menusBoard.scss';
import CustomerHeader from "../../components/header/header.tsx";

function MenuBoard() {
  return (
    <div>
        <CustomerHeader></CustomerHeader>
        <div className='menu'>
            <h1 className='menu__title'>MENU</h1>
        </div>
    </div>
  );
}

export default MenuBoard;
