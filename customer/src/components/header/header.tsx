import "./header.scss"
import { useState, useEffect } from 'react';


function CustomerHeader() {
  const [weatherCond, /* setWeatherCond */] = useState<string>("sunny");
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []); 

  function updateTime() {
    const currentDate = new Date();
    const newFormattedTime = currentDate.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setFormattedTime(newFormattedTime);
  }

  return (
    <div className="header">
      <div className="header__weather">
        {(weatherCond === "sunny") && <i className="fa-solid fa-sun"></i>}
        {(weatherCond === "cloudy") && <i className="fa-solid fa-cloud"></i>}
        {(weatherCond === "rainy") && <i className="fa-solid fa-cloud-rain"></i>}
        {(weatherCond === "thunderstorm") && <i className="fa-solid fa-cloud-bolt"></i>}
        {(weatherCond === "snowy") && <i className="fa-solid fa-snowflake"></i>}
        {(weatherCond === "night") && <i className="fa-solid fa-moon"></i>}
        <p>73&deg;F</p>
        <p id="time">{formattedTime}</p>
      </div>


      <h1 className="header__title">Share<span>Tea</span></h1>

      <div className="header__accessibility">
        <i className="fa-solid fa-font"></i>
        <i className="fa-solid fa-language"></i>
        <i className="fa-solid fa-circle-half-stroke"></i>
        <i className="fa-solid fa-magnifying-glass-plus"></i>
      </div>
    </div>
  )
}

export default CustomerHeader;