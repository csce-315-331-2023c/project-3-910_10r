import "./header.scss";
import { useState, useEffect } from "react";
import IntroButton from "./IntroButton";
import TextSlider from "./textSlider";
import GoogleTranslate from "./translate.tsx";

import {
  customerColors,
  customerColorsDark,
  customerColorsLight,
  getOrigColors,
  setOrigColors,
  setContrast,
} from "./../../../../contrast.ts";

interface WeatherData {
  current: {
    temp_f: number;
    condition: {
      icon: string;
    };
  };
}

interface Props {
  setOrderFalse: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuFalse: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomerHeader({ setMenuFalse, setOrderFalse }: Props) {
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  const [origColors] = useState(getOrigColors(customerColors));

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
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setFormattedTime(newFormattedTime);
  }
  async function fetchWeatherData() {
    try {
      const response = await fetch(
        "https://api.weatherapi.com/v1/current.json?key=6407a4a683f54d9ba1f165350232911&q=77840&aqi=no"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data: WeatherData = await response.json();
      setWeatherIcon(data.current.condition.icon);
      setTemperature(data.current.temp_f);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function showTextSlider() {
    document.querySelector(".textslider")?.classList.toggle("active");
  }

  function changeContrast() {
    console.log(origColors);


    if(JSON.parse(sessionStorage.getItem("contrastApplied")!)) {
      setOrigColors(customerColors, origColors);
    }
    else {
      setContrast(customerColorsDark, customerColorsLight);
    }
  }

  return (
    <div className="header">
      <div className="header__weather">
        <IntroButton
          setWhichPage1={setMenuFalse}
          setWhichPage2={setOrderFalse}
        ></IntroButton>
        {weatherIcon && <img src={`http:${weatherIcon}`} alt="Weather Icon" />}
        <p>{temperature}&deg;F</p>
        <p id="time">{formattedTime}</p>
      </div>

      <h1 className="header__title">
        Share<span>Tea</span>
      </h1>

      <div className="header__accessibility">


        <i id="textSliderIcon" className="fa-solid fa-text-height" onClick={showTextSlider}>
          <TextSlider></TextSlider>
        </i>

        
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 998.1 998.3">
          <path fill={getComputedStyle(document.documentElement).getPropertyValue("--GRAY-DARK")} d="M931.7 998.3c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4H283.6l260.1 797.9h388z"/>
          <path fill="#fff" d="M931.7 230.4c9.7 0 18.9 3.8 25.8 10.6 6.8 6.7 10.6 15.5 10.6 24.8v667.1c0 9.3-3.7 18.1-10.6 24.8-6.9 6.8-16.1 10.6-25.8 10.6H565.5L324.9 230.4h606.8m0-30H283.6l260.1 797.9h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4z"/>
          <polygon fill="#fff" points="482.3,809.8 543.7,998.3 714.4,809.8"/>
          <path fill="#fff" d="M936.1 476.1V437H747.6v-63.2h-61.2V437H566.1v39.1h239.4c-12.8 45.1-41.1 87.7-68.7 120.8-48.9-57.9-49.1-76.7-49.1-76.7h-50.8s2.1 28.2 70.7 108.6c-22.3 22.8-39.2 36.3-39.2 36.3l15.6 48.8s23.6-20.3 53.1-51.6c29.6 32.1 67.8 70.7 117.2 116.7l32.1-32.1c-52.9-48-91.7-86.1-120.2-116.7 38.2-45.2 77-102.1 85.2-154.2H936v.1z"/>
          <path fill="#fff" d="M66.4 0C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h648.1L454.4 0h-388z"/>
          <path fill="url(#a)" d="M534.3 200.4h397.4c36.5 0 66.4 29.4 66.4 65.4V666L534.3 200.4z"/>
          <path fill={getComputedStyle(document.documentElement).getPropertyValue("--GRAY-DARK")} d="M371.4 430.6c-2.5 30.3-28.4 75.2-91.1 75.2-54.3 0-98.3-44.9-98.3-100.2s44-100.2 98.3-100.2c30.9 0 51.5 13.4 63.3 24.3l41.2-39.6c-27.1-25-62.4-40.6-104.5-40.6-86.1 0-156 69.9-156 156s69.9 156 156 156c90.2 0 149.8-63.3 149.8-152.6 0-12.8-1.6-22.2-3.7-31.8h-146v53.4l91 .1z"/>
          <path fill="url(#b)" d="M931.7 200.4H518.8L454.4 0h-388C29.9 0 0 29.9 0 66.5v677c0 36.5 29.9 66.4 66.4 66.4h415.9l61.4 188.4h388c36.5 0 66.4-29.4 66.4-65.4V265.8c0-36-29.9-65.4-66.4-65.4z"/>
        </svg>

        <i className="fa-solid fa-circle-half-stroke" onClick={changeContrast}></i>


        {/* <i className="fa-solid fa-language"></i> */}
        {/* <span className="material-symbols-outlined">g_translate</span> */}
        <i
          className="fa-solid fa-circle-half-stroke"
          onClick={changeContrast}
        ></i>
        <GoogleTranslate></GoogleTranslate>
      </div>
    </div>
  );
}

export default CustomerHeader;
