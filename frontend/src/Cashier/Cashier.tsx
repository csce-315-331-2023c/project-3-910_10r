import Navigationbar from "./components/drinkNavbar.tsx";
import Drinks from "./components/drinks.tsx";
import Cart from "./components/cart.tsx";
import Footer from "./components/footer.tsx";
import DrinkCustomize from "./components/drinkCustomize.tsx";

function Cashier() {
  return (
    <div
      style={{
        position: "relative",
        // width: "100vw",
        // height: "100vh",
        // overflow: "scroll",
      }}
    >
      <Footer></Footer>
      <Navigationbar></Navigationbar>
      <Cart></Cart>
      <Drinks></Drinks>
      <DrinkCustomize name="Classic Milk Tea"></DrinkCustomize>
    </div>
  );
}

export default Cashier;
