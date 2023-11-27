import "./footer.scss";

interface Props{
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>
}

const footer = ({ setShowLogout } : Props) => {

  const showLogout  = () => {
    setShowLogout(true);
  }

  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout" onClick={showLogout}>Logout</button>
        </div>
        <div className="footer-time">{showTime}</div>
      </div>
    </>
  );
};

export default footer;
