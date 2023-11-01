import "./footer.scss";

const footer = () => {
  const date = new Date();
  const showTime =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout">Logout</button>
        </div>
        <div className="footer-time">{showTime}</div>
      </div>
    </>
  );
};

export default footer;
