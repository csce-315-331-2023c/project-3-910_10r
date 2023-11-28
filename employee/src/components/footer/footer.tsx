import "./footer.scss";
import { useState, useEffect } from "react";

interface Props {
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

const footer = ({ setShowLogout }: Props) => {
  const showLogout = () => {
    setShowLogout(true);
  };
  var [date, setDate] = useState(new Date());
  // const [time, setTime] = useState<string>("");
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout" onClick={showLogout}>
            Logout
          </button>
        </div>
        <div className="footer-time">{date.toLocaleTimeString()}</div>
      </div>
    </>
  );
};

export default footer;
