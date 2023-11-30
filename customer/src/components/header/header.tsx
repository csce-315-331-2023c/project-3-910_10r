import "./header.scss"
import { useState, useEffect } from 'react';
import IntroButton from "./IntroButton";
import TextSlider from "./textSlider";
interface WeatherData {
  current: {
    temp_f: number;
    condition: {
      icon: string;
    };
  };
}

interface Props{
  setOrderFalse : React.Dispatch<React.SetStateAction<boolean>>;
  setMenuFalse : React.Dispatch<React.SetStateAction<boolean>>;

}

function CustomerHeader({setMenuFalse, setOrderFalse}:Props) {
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);
  
  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []); 

  useEffect(() => {
    fetchWeatherData();
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
    <div className="header">
      
      <div className="header__weather">
        <IntroButton setWhichPage1={setMenuFalse} setWhichPage2 = {setOrderFalse}></IntroButton>
        {weatherIcon && <img src={`http:${weatherIcon}`} alt="Weather Icon" />}
        <p>{temperature}&deg;F</p>
        <p id="time">{formattedTime}</p>
        
      </div>


      <h1 className="header__title">Share<span>Tea</span></h1>

      <div className="header__accessibility">
        {/* <i className="fa-solid fa-font" onClick={showTextSlider}>
          <TextSlider></TextSlider>
        </i> */}
        <span id="textSliderIcon" className="material-symbols-outlined" onClick={showTextSlider}>text_fields
          <TextSlider></TextSlider>
        </span>
        {/* <i className="fa-solid fa-language"></i> */}
        <span className="material-symbols-outlined">g_translate</span>
        <i className="fa-solid fa-circle-half-stroke" ></i>

      </div>
    </div>
  )
}

export default CustomerHeader;