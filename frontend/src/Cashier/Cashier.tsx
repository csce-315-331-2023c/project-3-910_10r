import Navigationbar from "./components/drinkNavbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";
import Footer from "./components/footer.tsx";

function Cashier() {
  return (
    <div
      style={{
        backgroundColor: "#CCE3DE",
        width: "100vw",
        height: "100vh",
        overflow: "scroll",
        position: "relative",
      }}
    >
      <Footer></Footer>
      <Navigationbar></Navigationbar>
      <Cart></Cart>
      <Drinks></Drinks>
    </div>
  );
}

export default Cashier;
