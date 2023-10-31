import Order from "./order.tsx";
import Checkout from "./checkoutAmount.tsx";
import "../styles/cart.scss";
import { useState } from "react";

interface order {
  name: string;
  ice: string;
  sugar: string;
  topping: string;
  price: string;
}

interface Props {
  orders: order[];
}

function Cart({ orders }: Props) {
  //const [orders, setOrders] = useState<order[]>([]);
  // const orders: order[] = [
  //   // {
  //   //   name: "Classic milk tea",
  //   //   ice: "Light ice",
  //   //   sugar: "50% Sugar",
  //   //   topping: "Pearls",
  //   //   price: "$5.95",
  //   // },
  // ];
  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="cart-orders">
        {orders.map((order, index) => (
          <Order
            key={index}
            name={order.name}
            ice={order.ice}
            sugar={order.sugar}
            topping={order.topping}
            price={order.price}
          ></Order>
        ))}
      </div>
      <Checkout price="$11.90" tax="$1.20" total="$13.10"></Checkout>
      <div className="cart-buttons">
        <button className="cart-buttons-1">Charge</button>
        <button className="cart-buttons-2">Print Ticket</button>
      </div>
    </div>
  );
}

export default Cart;
