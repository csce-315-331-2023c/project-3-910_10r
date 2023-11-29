import "./footer.scss";
import { useState, useEffect } from "react";
import TextSlider from "./textSlider";

interface WeatherData {
  current: {
    temp_f: number;
    condition: {
      icon: string;
    };
  };
}

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

  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  async function fetchWeatherData() {
    try {
      const response = await fetch(
        'https://api.weatherapi.com/v1/current.json?key=6407a4a683f54d9ba1f165350232911&q=77840&aqi=no'
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data: WeatherData = await response.json();
      setWeatherIcon(data.current.condition.icon);
      setTemperature(data.current.temp_f);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  
  function showTextSlider() {
    document.querySelector(".textslider")?.classList.toggle("active")
  }

  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout" onClick={showLogout}>
            Logout
          </button>
        </div>
        <div className="accessibility">
          {/* <i className="fa-solid fa-font" onClick={showTextSlider}>
            <TextSlider></TextSlider>
          </i> */}
          <span id="textSliderIcon" className="material-symbols-outlined" onClick={showTextSlider}>text_fields
            <TextSlider></TextSlider>
          </span>
          
          {/* <i className="fa-solid fa-language"></i> */}
          <span className="material-symbols-outlined">g_translate</span>
          <i className="fa-solid fa-circle-half-stroke"></i>
        </div>
        <div className="footer-weather">
          {weatherIcon && <img src={`http:${weatherIcon}`} alt="Weather Icon" />}
          <p>{temperature}&deg;F</p>
        </div>
        <div className="footer-time">
          {date.toLocaleTimeString()}
        </div>
      </div>
    </>
  );
};

export default footer;
