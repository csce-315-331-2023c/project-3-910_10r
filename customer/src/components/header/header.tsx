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

/**
 * displays title, weather, time and accessibility features
 * @param {React.Dispatch<React.SetStateAction<boolean>>} Props.setMenuFalse
 * @param {React.Dispatch<React.SetStateAction<boolean>>} Props.setorderFalse
 */

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

    if (JSON.parse(sessionStorage.getItem("contrastApplied")!)) {
      setOrigColors(customerColors, origColors);
    } else {
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
        <i
          id="textSliderIcon"
          className="fa-solid fa-text-height"
          onClick={showTextSlider}
        >
          <TextSlider></TextSlider>
        </i>

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
