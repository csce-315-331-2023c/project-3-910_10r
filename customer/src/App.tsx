import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Cashier from "./pages/Cashier/cashier.tsx";
import Payment from "./pages/Cashier/Payment.tsx";
import IntroPage from "./pages/Intro/landing.tsx";
import MenuBoard from "./pages/MenuBoard/menuBoard.tsx";

function App() {
  const [payPage, setPayPage] = useState<boolean>(false);

  return (
    <>
      <div>
         
        {/* {payPage ? (
          <Payment></Payment>
        ) : (
          <Cashier setPayPage={setPayPage}></Cashier>
        )} */}
        {/* <IntroPage></IntroPage> */}
        <MenuBoard></MenuBoard>
      </div>
    </>
  );
}

export default App;
