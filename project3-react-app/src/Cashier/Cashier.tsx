import Navigationbar from "./components/navbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";

function Cashier() {
  return (
    <div
      style={{ backgroundColor: "#CCE3DE", width: "100vw", height: "100vh" }}
    >
      <Navigationbar></Navigationbar>
      <Cart></Cart>
      <Drinks></Drinks>
    </div>
  );
}

export default Cashier;
