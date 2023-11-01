import Order from "./order.tsx";
import Checkout from "./checkoutAmount.tsx";
import "./cart.scss";
import { useState } from "react";

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string[];
  price: string;
}

interface Props {
  orders: order[];
  setOrders: React.Dispatch<React.SetStateAction<order[]>>;
  setPayPage: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart({ orders, setOrders, setPayPage }: Props) {
  let totalPrice = 0;
  const updatePrice = (price: number) => {
    totalPrice += price;
  };

  const navigateToPayPage = () => {
    setPayPage(true);
  };

  const removeChild = (index: number) => {
    const updatedComponents = [...orders];
    updatedComponents.splice(index, 1);
    setOrders(updatedComponents);
  };

  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="cart-orders">
        {orders.map((_order, index) => (
          <>
            <Order
              key={index}
              name={_order.name}
              ice={_order.ice}
              sugar={_order.sugar}
              topping={_order.topping}
              price={_order.price}
              onRemove={() => removeChild(index)}
            ></Order>
            {updatePrice(+_order.price)}
          </>
        ))}
      </div>
      <Checkout
        price={"$" + totalPrice.toFixed(2)}
        tax={"$" + (totalPrice * 0.0625).toFixed(2)}
        total={"$" + (totalPrice * 1.0625).toFixed(2)}
      ></Checkout>
      <div className="cart-buttons">
        <button className="cart-buttons-1" onClick={navigateToPayPage}>
          Charge
        </button>
        <button className="cart-buttons-2">Print Ticket</button>
      </div>
    </div>
  );
}

export default Cart;
