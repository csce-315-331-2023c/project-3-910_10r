import ".//logoutPopup.scss";

interface Props{
    setIsLogout: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutPopup = ({setIsLogout, setIsLogin} : Props) => {

    const confirmLogout = () => {
        setIsLogout(true);
        setIsLogin(true);
    }

    const cancelLogout = () => {
        setIsLogout(false);
        setIsLogin(false);
    }

  return (
    <>
      <div className="overlay">
        <div className="logout">
            <h1>Confirm Logout</h1>

            <div className="logout__buttons">
                <button onClick={cancelLogout}>Cancel</button>
                <button onClick={confirmLogout}>Logout</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default LogoutPopup;
