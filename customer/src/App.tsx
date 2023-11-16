import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import Cashier from "./pages/Cashier/cashier.tsx";
import Payment from "./pages/Cashier/Payment.tsx";
import IntroPage from "./pages/Intro/landing.tsx";
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
        <IntroPage></IntroPage> 

      </div>
    </>
  );
}

export default App;
