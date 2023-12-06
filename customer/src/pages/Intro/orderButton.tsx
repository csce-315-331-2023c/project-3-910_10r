// Button.tsx
import React from "react";
import "./landing.scss"; // Import the CSS file

interface Props {
  setOrderPage: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * order button for customer to take to main page
 * @param {function} Props.setOrderpage // useState that determine if order is made
 */
function OrderButton({ setOrderPage }: Props) {
  const navigateToOrderPage = () => {
    setOrderPage(true);
  };

  return (
    <button className="order-button" onClick={navigateToOrderPage}>Order</button>
  );
}

export default OrderButton;
