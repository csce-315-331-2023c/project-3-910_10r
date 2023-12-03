import Order from "./order.tsx";
import Checkout from "./checkoutAmount.tsx";
import "./cart.scss";
import axios, { AxiosInstance } from "axios";

let baseURL = import.meta.env.VITE_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
});

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
  num: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCashier: React.Dispatch<React.SetStateAction<boolean>>;
}

function Cart({ orders, setOrders, setPayPage, setNumber, num, setIsManager, setIsCashier}: Props) {
  let totalPrice = 0;
  let drinks : string[] = [];

  const updatePrice = (price: number) => {
    totalPrice += price;
  };

  const navigateToPayPage = (price: number) => {
    if (price > 0) {
      
      //get drinks from orders
      for(const index in orders) {
        drinks.push(orders[index].name);
      }

      //get date and time 
      const currentDate = new Date();

      // Format the date
      const year = currentDate.getFullYear();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 and padding with '0' if necessary
      const day = currentDate.getDate().toString().padStart(2, '0');

      const formattedDate = `${year}-${month}-${day}`;

      // Format the time
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const seconds = currentDate.getSeconds().toString().padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      let formattedPrice = price.toFixed(2);

      console.log(drinks);
      console.log(formattedPrice);
      console.log("Formatted Date:", formattedDate);
      console.log("Formatted Time:", formattedTime);

      const backendData = {
        drinks: drinks,
        date: formattedDate,
        time: formattedTime,
        cost: formattedPrice,
      };

      API.post("/cashier/makeOrder", backendData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
          console.error(error);
      });

      setPayPage(true);
      setIsManager(false);
      setIsCashier(false);
      if (num > 200) num = 0;
      setNumber(num + 1);
    }
  };

  const removeChild = (index: number, _order : order) => {
    const updatedComponents = [...orders];
    updatedComponents.splice(index, 1);
    setOrders(updatedComponents);

    let ice : number = 0.0;
    let sugar : number = 0.0;

    if (_order.ice === "regular ice") {
      ice = 10;
    } else if (_order.ice === "light ice") {
      ice = 5;
    } else if (_order.ice === "no ice") {
      ice = 3;
    } else {
      _order.ice === "extra ice";
      ice = 15;
    }

    if (_order.sugar === "100% sugar") {
      sugar = 10;
    } else if (_order.sugar === "80% sugar") {
      sugar = 8;
    } else if (_order.sugar === "50% sugar") {
      sugar = 5;
    } else if (_order.sugar === "30% sugar") {
      sugar = 3;
    } else if (_order.sugar === "0% sugar") {
      sugar = 0;
    } else {
      sugar = 12;
    }

    let topping_names : string[] = [];
    let topping_count : number[] = [];

    for (const index in _order.topping) {
      const topping = _order.topping[index];

      //parse topping string
      const match = topping.match(/(.+)\s*x(\d+)/);

      if (match) {
          const topping_name = match[1].trim();; // Extracted item name
          const topping_amount = parseInt(match[2], 10); // Extracted quantity as an integer

          if(topping_amount > 0) {
            topping_names.push(topping_name);
            topping_count.push(topping_amount);
          }
      } else {
          console.log("Invalid input format");
      }      
    }

    console.log(_order.name);
    console.log(ice);
    console.log(sugar);
    console.log(topping_names);
    console.log(topping_count);

    const backendData = {
      name: _order.name,
      ice: ice,
      sugar: sugar,
      topping: topping_names,
      count: topping_count
    };

    API.put("/cashier/restoreInventory", backendData)
      .then((response) => {
        console.log(response.data);
      })
    .catch((error) => {
        console.error(error);
    });
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
              onRemove={() => removeChild(index, _order)}
            ></Order>
            {updatePrice(+_order.price)}
          </>
        ))}
      </div>
      <Checkout
        price={"$" + totalPrice.toFixed(2)}
        tax={"$" + (totalPrice * 0.0825).toFixed(2)}
        total={"$" + (totalPrice * 1.0625).toFixed(2)}
      ></Checkout>
      <div className="cart-buttons">
        <button
          className="cart-buttons-1"
          onClick={() => navigateToPayPage(totalPrice)}
        >
          Charge
        </button>
        <button className="cart-buttons-2">Print Ticket</button>
      </div>
    </div>
  );
}

export default Cart;
