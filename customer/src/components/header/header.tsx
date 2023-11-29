import "./header.scss"
import { useState, useEffect } from 'react';
import IntroButton from "./IntroButton";

interface WeatherData {
  current: {
    temp_f: number;
    condition: {
      icon: string;
    };
  };
}

interface Props{
  setWhichPage : React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomerHeader({setWhichPage}:Props) {
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
    <div className="header">
      
      <div className="header__weather">
        <IntroButton setWhichPage={setWhichPage}></IntroButton>
        {weatherIcon && <img src={`http:${weatherIcon}`} alt="Weather Icon" />}
        <p>{temperature}&deg;F</p>
        <p id="time">{formattedTime}</p>
        
      </div>


      <h1 className="header__title">Share<span>Tea</span></h1>

      <div className="header__accessibility">
        <i className="fa-solid fa-font" onClick={increaseFont}></i>
        <i className="fa-solid fa-language"></i>
        <i className="fa-solid fa-circle-half-stroke"></i>
        <i className="fa-solid fa-magnifying-glass-plus"></i>
        
        {/* BETTER ICONS KEVIN FOUND - https://fonts.google.com/icons?preview.text=MENU&selected=Material+Symbols+Outlined:g_translate:FILL@0;wght@400;GRAD@0;opsz@24

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <span className="material-symbols-outlined">g_translate</span> */}
      </div>
    </div>
  )
}

export default CustomerHeader;