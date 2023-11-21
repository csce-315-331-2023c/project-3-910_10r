import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Cashier from "./pages/Cashier/cashier.tsx";
import IntroPage from "./pages/Intro/landing.tsx";
import MenuBoard from "./pages/MenuBoard/menuBoard.tsx";

function App() {
  const [/* isLanding */, setIsLanding] = useState<boolean>(false);
  const [isOrder, setIsOrder] = useState<boolean>(false);
  const [isMenu, setIsMenu] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(true);
  
  return (
    <>
      <div>
          {/* isOrder ? (<Cashier setPayPage = {setIsLanding} setWhichPage={setIsOrder}></Cashier>):
            (<IntroPage isReadyToOrder={() => setIsOrder(true)} setWhichPage={setIsOrder}></IntroPage>) //If it is order, change page to "order"
                                      //Else, keep it at introPage */
         } 
         <MenuBoard setWhichPage={setIsLanding}></MenuBoard>
      </div>
    </>
  );
}

export default App;
