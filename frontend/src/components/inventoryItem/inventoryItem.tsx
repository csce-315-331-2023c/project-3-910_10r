import React, {useState} from 'react';
import InventoryItemPopup from './inventoryItemPopup';

interface InventoryItemProps {
    name: string;
    alert: boolean;
    amount: number;
    capacity: number;
    unit: string;
}  

const InventoryItem: React.FC<InventoryItemProps> = ({ name, alert, amount, capacity, unit }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopup  = () => {
    setShowPopup(true);
  }

  return (
    <div className="inventory__items-item">
      
      {showPopup && <InventoryItemPopup
        name={name}
        amount={amount}
        capacity={capacity}
        unit={unit}
        setShowPopup={setShowPopup}
      />}
      
      <button className={`${alert ? 'alert' : ''}`} onClick={handlePopup}>
        <p>{(amount / capacity * 100).toFixed()}%</p>
      </button>
      <p>{name}</p>
    </div>
  );
};

export default InventoryItem;