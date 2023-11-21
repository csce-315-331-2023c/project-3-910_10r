// Button.tsx
import React from 'react';
import './landing.scss'; // Import the CSS file

interface Props {
    setOrderPage: React.Dispatch<React.SetStateAction<boolean>>;
  }
function OrderButton({setOrderPage}: Props) {

  const navigateToOrderPage = () => {
    setOrderPage(false);
    
  };

  return (
    
    <button className = "order-button" onClick={navigateToOrderPage}>
    </button>
  );
};

export default OrderButton;
