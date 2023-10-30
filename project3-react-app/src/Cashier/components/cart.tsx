import Order from "./order.tsx";
import Checkout from "./checkoutAmount.tsx";
import "../styles/cart.scss";

function Cart() {
  return (
    <div className="cart">
      <div className="cart-title">Cart</div>
      <div className="cart-orders">
        <Order
          name="Classic milk tea"
          ice="Light ice"
          sugar="50% Sugar"
          topping="Pearls"
          price="$5.95"
        ></Order>
        <Order
          name="Classic milk tea"
          ice="Light ice"
          sugar="50% Sugar"
          topping="Pearls"
          price="$5.95"
        ></Order>
        <Order
          name="Classic milk tea"
          ice="Light ice"
          sugar="50% Sugar"
          topping="Pearls"
          price="$5.95"
        ></Order>
        <Order
          name="Classic milk tea"
          ice="Light ice"
          sugar="50% Sugar"
          topping="Pearls"
          price="$5.95"
        ></Order>
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
