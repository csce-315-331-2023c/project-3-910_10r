import React from "react";
import "./orderInfo.scss";

interface OrderInfoProps {
  order: {
    orderId: number;
    name: string;
    time: string;
    total: number;
  };
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
    const namesArray = order.name.split(',');
  return (
    <div className="order-info-container">
      <div className="order-id-box">
        <p>Order ID: {order.orderId}</p>
      </div>
      <div className="order-time-box">
        <p>Time: {order.time}</p>
      </div>
      <div className="scrollable-content">
            {namesArray.map((data, index) => (
              <div className="data-box" key={index}>
                <div className="data-entry">{data}</div>
                <div className="data-entry">Price</div>
              </div>
            ))}
          </div>
      <div className="order-total-box">
        <p>Total: ${order.total}</p>
      </div>
    </div>
  );
};

export default OrderInfo;

