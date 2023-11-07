import React from 'react';

interface InventoryItemProps {
    name: string;
    alert: boolean;
    amount: number;
    capacity: number;
}  

const InventoryItem: React.FC<InventoryItemProps> = ({ name, alert, amount, capacity }) => {
  return (
    <div className="inventory__items-item">
      <button className={`${alert ? 'alert' : ''}`}>
        <p>{(amount / capacity * 100).toFixed()}%</p>
      </button>
      <p>{name}</p>
    </div>
  );
};

export default InventoryItem;