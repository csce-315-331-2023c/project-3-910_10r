import "./footer.scss";
import { useState, useEffect } from "react";
import TextSlider from "./textSlider";
import GoogleTranslate from "./translate.tsx";

import {
  employeeColors,
  employeeColorsDark,
  employeeColorsLight,
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
  setShowLogout: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Footer component
 * @param {function} setShowLogout Function to show logout popup
 */
const footer = ({ setShowLogout }: Props) => {
  const showLogout = () => {
    setShowLogout(true);
  };

  function getDate() {
    const date = new Date();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${hour}:${minute}:${second}`;
  }

  const [time, setTime] = useState<string>("");

  useEffect(() => {
    var timer = setInterval(() => setTime(getDate()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const [weatherIcon, setWeatherIcon] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  const [origColors] = useState(getOrigColors(employeeColors));

  function changeContrast() {
    console.log(origColors);

    if (JSON.parse(sessionStorage.getItem("contrastApplied")!)) {
      setOrigColors(employeeColors, origColors);
    } else {
      setContrast(employeeColorsDark, employeeColorsLight);
    }
  }

  useEffect(() => {
    fetchWeatherData();
  }, []);

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

  return (
    <>
      <div className="footer">
        <div className="footer-button">
          <button className="footer-logout" onClick={showLogout}>
            Logout
          </button>
        </div>
        <div className="footer-weather">
          {weatherIcon && (
            <img src={`http:${weatherIcon}`} alt="Weather Icon" />
          )}
          <p>{temperature}&deg;F</p>
        </div>
        <div className="footer-time">{time}</div>
        <div className="accessibility">
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
        </div>

        <GoogleTranslate></GoogleTranslate>
      </div>
    </>
  );
};

export default footer;
