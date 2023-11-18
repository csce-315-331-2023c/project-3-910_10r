import "./footer.scss";

const footer = () => {
  const date = new Date();
  // const showTime =
  //   date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: true, // Use 24-hour format
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout">Logout</button>
        </div>
        <div className="footer-time">{formattedTime}</div>
      </div>
    </>
  );
};

export default footer;
