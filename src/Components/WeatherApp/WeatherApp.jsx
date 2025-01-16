// import cloudy from "../../assets/images/cloudy.png";
// import loading from "../../assets/images/loading.gif";
// import rainy from "../../assets/images/rainy.png";
// import showy from "../../assets/images/showy.png";
import sunny from "../../assets/images/sunny.png";
import { useState } from "react";
import { useEffect } from "react";

function WeatherApp() {
  // state to store fetched data
  const [data, setData] = useState({});

  // store state for location
  const [location, setLocation] = useState("");

  // useEffect for initial fetching the default data
  useEffect(() => {
    const fetchDefaultData = async () => {
      const defaultCity = "Pancevo";
      const defaultSearchTerm = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${API_KEY}`
      );
      const respDefSearchTerm = await defaultSearchTerm.json();
      setData(respDefSearchTerm);
    };

    fetchDefaultData();
  }, []);

  // API from .env
  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchWeather = async (e) => {
    if (location.trim() !== "") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      const searchedTerm = await response.json();
      setData(searchedTerm);
      console.log(searchedTerm);
      setLocation("");
    }
  };

  // Handle the input Value
  const handleInputValue = (event) => {
    setLocation(event.target.value);
  };

  // Handle on keydown event for starting the search
  const handleKeyDownSearch = (event) => {
    if (event.key === "Enter") {
      searchWeather();
    }
  };

  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-location">
            <i className="fa-solid fa-location-crosshairs"></i>
            <div className="city">{data ? data.name : null}</div>
          </div>
          <div className="search-input">
            <input
              type="text"
              name="search"
              id=""
              placeholder="Search city"
              value={location}
              onChange={handleInputValue}
              onKeyDown={handleKeyDownSearch}
            />
            <i
              className="fa-solid fa-magnifying-glass"
              onClick={searchWeather}
            ></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">
            {data.weather ? data.weather[0].main : null}
          </div>
          <div className="temperature">
            {data.main ? `${Math.floor(data.main.temp)}°` : null}
          </div>
          <div className="weather-date">{new Date().toLocaleDateString()}</div>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-water"></i>
            <div className="data">
              {data.main ? `${Math.floor(data.main.humidity)}%` : null}
            </div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">
              {data.wind ? `${data.wind.speed}m/s` : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
