import ".//logoutPopup.scss";

interface Props{
    setIsLogout: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setIsManager: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCashier: React.Dispatch<React.SetStateAction<boolean>>;
    setEunsooBirthdayShow: React.Dispatch<React.SetStateAction<boolean>>;
    fromManager: boolean
}

  /**
 * LogoutPopup component
 * @param {function} setIsLogout to show logout
 * @param {function} setIsLogin to show login
 * @param {function} setIsManager to show Manager
 * @param {function} setIsCashier to show cashier
 */
const LogoutPopup = ({setIsLogout, setIsLogin, setIsManager, setIsCashier, setEunsooBirthdayShow, fromManager} : Props) => {

    const confirmLogout = () => {
        setIsLogout(true);
        setIsLogin(true);
        setIsManager(false);
        setIsCashier(false);

        // Set this to true to see the animation or false to remove it
        if(fromManager) {
          setEunsooBirthdayShow(true);
        }
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
