import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Cashier from "./pages/Cashier/cashier.tsx";
import Payment from "./pages/Cashier/Payment.tsx";
import axios from "axios";
import React, { useEffect } from "react";

import Login from "./pages/Login/login.tsx";

function App() {
  const [payPage, setPayPage] = useState<boolean>(false);
  const [isManager, setIsManager] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <>
      <div>
        {isLogin ? (<Login setIsLogin={setIsLogin} setIsManager={setIsManager}></Login>) : 
          (payPage ? (
            <Payment></Payment>
          ) : (
            <Cashier setPayPage={setPayPage}></Cashier>
          ))
}
      </div>
    </>
  );
}

export default App;
