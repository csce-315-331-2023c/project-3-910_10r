import "./menus.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Menus = () => {

  return (
    <>
      <div className="menu">

        <div className="menu__category">
          <div className="menu__category-header">
            <h1>Milk Tea</h1>
            <i>
              <FontAwesomeIcon icon="square-plus" size="2x" style={{color: "#0d6f06",}} />
            </i>
          </div>
          <div className="menu__category-drinks">
            <button className="menu__category-drinks-drink">
              <p>Drink Name</p>
            </button>
            <button className="menu__category-drinks-drink">
              <p>Drink Name</p>
            </button>
          </div>
        </div>


      </div>
    </>
  );
};

export default Menus;
