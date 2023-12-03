import { useState, useEffect } from "react";
import Cashier from "./pages/Cashier/cashier.tsx";
import Payment from "./pages/Cashier/Payment.tsx";
import { Route, Navigate, Routes } from "react-router-dom";
import Manager from "./pages/Manager/manager.tsx";

import Login from "./pages/Login/login.tsx";

function App() {
  // Load state from localStorage or use default values
  const storedPayPage = localStorage.getItem("payPage");
  const storedIsManager = localStorage.getItem("isManager");
  const storedIsCashier = localStorage.getItem("isCashier");
  const storedIsLogin = localStorage.getItem("isLogin");
  const storedNum = localStorage.getItem("num");

  // const [payPage, setPayPage] = useState<boolean>(false);
  const [payPage, setPayPage] = useState<boolean>(
    storedPayPage ? JSON.parse(storedPayPage) : false
  );
  const [isManager, setIsManager] = useState<boolean>(
    storedIsManager ? JSON.parse(storedIsManager) : false
  );
  const [isCashier, setIsCashier] = useState<boolean>(
    storedIsCashier ? JSON.parse(storedIsCashier) : false
  );
  const [isLogin, setIsLogin] = useState<boolean>(
    storedIsLogin ? JSON.parse(storedIsLogin) : true
  );
  const [num, setNumber] = useState<number>(
    storedNum ? JSON.parse(storedNum) : 1
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("payPage", JSON.stringify(payPage));
    localStorage.setItem("isManager", JSON.stringify(isManager));
    localStorage.setItem("isCashier", JSON.stringify(isCashier));
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
    localStorage.setItem("num", JSON.stringify(num));
  }, [payPage, isManager, isCashier, isLogin, num]);

  return (
      <Routes>
        <Route
          path="/"
          element={
            isLogin ? (
              <Login
                setIsLogin={setIsLogin}
                setIsManager={setIsManager}
                setIsCashier={setIsCashier}
                setPayPage={setPayPage}
              />
            ) : (
              <Navigate to="/manager" />
            )
          }
        ></Route>
        <Route
          path="/manager"
          element={
            isManager ? (
              <Manager
                setIsLogin={setIsLogin}
                setIsManager={setIsManager}
                setIsCashier={setIsCashier}
              />
            ) : (
              <Navigate to="/payment" />
            )
          }
        ></Route>
        <Route
          path="/payment"
          element={
            payPage ? (
              <Payment
                setPayPage={setPayPage}
                num={num}
                setIsCashier={setIsCashier}
              />
            ) : (
              <Navigate to="/cashier" />
            )
          }
        ></Route>
        <Route
          path="/cashier"
          element={
            isCashier ? (
              <Cashier
                setPayPage={setPayPage}
                setIsLogin={setIsLogin}
                setNumber={setNumber}
                num={num}
                setIsManager={setIsManager}
                setIsCashier={setIsCashier}
              />
            ) : payPage ? (
              <Navigate to="/payment" />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/"
          element={
            <Login
              setIsLogin={setIsLogin}
              setIsManager={setIsManager}
              setIsCashier={setIsCashier}
              setPayPage={setPayPage}
            />
          }
        />
      </Routes>
  );
}

export default App;
