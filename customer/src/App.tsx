import { useState } from "react";
import Cashier from "./pages/Cashier/cashier.tsx";
import IntroPage from "./pages/Intro/landing.tsx";
import MenuBoard from "./pages/MenuBoard/menuBoard.tsx";
import Payment from "./pages/Cashier/Payment.tsx";
function App() {
  const [isPayPage,setIsPayPage] = useState<boolean>(false);
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  
  return (
    
    <>
      <div>
          { isPayPage ? (<Payment></Payment>):
            isOrder? (<Cashier setPayPage = {setIsPayPage} setMenuFalse={setIsMenu} setOrderFalse={setIsOrder}></Cashier>):
            isMenu ? (<MenuBoard setMenuFalse={setIsMenu} setOrderFalse={setIsOrder} menuToOrderPage = {setIsOrder}></MenuBoard>):
            
            (<IntroPage isReadyToOrder={setIsOrder} isLookingAtMenu={setIsMenu}></IntroPage>) //If it is order, change page to "order"
                                      //Else, keep it at introPage 
         } 
         
      </div>
    </>
  );
}

export default App;
