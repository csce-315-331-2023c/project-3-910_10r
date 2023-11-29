import "./footer.scss";
import { useState, useEffect } from "react";

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
  
  const increaseFont = () => {
    const fontSizes = ["--FONT-LARGE", "--FONT-MED-LARGE", "--FONT-MED", "--FONT-MED-NORMAL", "--FONT-NORMAL", "--FONT-SMALL"];
    fontSizes.forEach((font) => {
      let currValue = String(getComputedStyle(document.documentElement).getPropertyValue(font));
      currValue = currValue.substring(0, currValue.indexOf("r"));
      let newValue = Number(currValue) + 0.25;
      document.documentElement.style.setProperty(font, `${newValue}rem`);
    });
  }

  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout" onClick={showLogout}>
            Logout
          </button>
        </div>
        <div className="footer-weather">
          <i className="fa-solid fa-font" onClick={increaseFont}></i>
          <i className="fa-solid fa-language"></i>
          <i className="fa-solid fa-circle-half-stroke"></i>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
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
