import React from "react";
import "./orderInfo.scss";

interface OrderInfoProps {
  order: {
    orderId: string;
    name: string[];
    date: string;
    time: string;
    total: string;
  };
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
    //console.log(order.name);
    //const namesArray = order.name.split(',');
    //console.log(namesArray);
    //console.log(order.name);
  return (
    <div className="order-info-container">
      <div className="order-id-box">
        <p>Order ID: {order.orderId}</p>
      </div>
      <div className="order-time-box">
        <p>Date: {order.date}</p>
        <p>Time: {order.time}</p>
      </div>
      <div className="scrollable-content">
            {order.name.map((data, index) => (
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

