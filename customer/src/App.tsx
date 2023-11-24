import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Cashier from "./pages/Cashier/cashier.tsx";
import IntroPage from "./pages/Intro/landing.tsx";
import MenuBoard from "./pages/MenuBoard/menuBoard.tsx";

function App() {
  const [,setIsLanding] = useState<boolean>(false);
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  
  return (
    
    <>
      <div>
          { isOrder? (<Cashier setPayPage = {setIsLanding} setMenuFalse={setIsMenu} setOrderFalse={setIsOrder}></Cashier>):
            isMenu ? (<MenuBoard setMenuFalse={setIsMenu} setOrderFalse={setIsOrder} menuToOrderPage = {setIsOrder}></MenuBoard>):
            (<IntroPage isReadyToOrder={setIsOrder} isLookingAtMenu={setIsMenu}></IntroPage>) //If it is order, change page to "order"
                                      //Else, keep it at introPage 
         } 
         
      </div>
    </>
  );
}

export default App;
