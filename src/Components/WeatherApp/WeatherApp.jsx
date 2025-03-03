import cloudy from "../../assets/images/cloudy.png";
import loadingGif from "../../assets/images/loading.gif";
import rainy from "../../assets/images/rainy.png";
import snowy from "../../assets/images/snowy.png";
import sunny from "../../assets/images/sunny.png";
import { useState } from "react";
import { useEffect } from "react";

function WeatherApp() {
  // state to store fetched data
  const [data, setData] = useState({});

  // store state for location
  const [location, setLocation] = useState("");

  //state for loader
  const [loading, setLoading] = useState(false);

  // useEffect for initial fetching the default data
  useEffect(() => {
    setLoading(true);
    const fetchDefaultData = async () => {
      const defaultCity = "Pancevo";
      const defaultSearchTerm = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${defaultCity}&units=metric&appid=${API_KEY}`
      );
      const respDefSearchTerm = await defaultSearchTerm.json();
      setData(respDefSearchTerm);
    };
    setLoading(false);

    fetchDefaultData();
  }, []);

  // API from .env
  const API_KEY = import.meta.env.VITE_API_KEY;

  const searchWeather = async () => {
    setLoading(true);
    if (location.trim() !== "") {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      const searchedTerm = await response.json();

      // Checking if searched term is server status 200
      if (searchedTerm.cod !== 200) {
        setData({ notFound: true });
      } else {
        setData(searchedTerm);
        setLocation("");
      }
    }
    setLoading(false);
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
  // Display image
  const weatherImages = {
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Clear: sunny,
    Haze: cloudy,
    Mist: cloudy,
  };

  const weatherDisplayImage = data.weather
    ? weatherImages[data.weather[0].main]
    : null;

  // Display backgoround
  const weatherBackgrounds = {
    Rain: `linear-gradient(270deg, rgba(9,73,121,1) 0%, rgba(0,212,255,1) 100%)
`,
    Snow: `linear-gradient(270deg, rgba(9,109,121,1) 0%, rgba(0,212,255,1) 50%, rgba(255,255,255,1) 100%)
`,
    Clear: `  linear-gradient(
    90deg,
    rgba(233, 196, 106, 1) 0%,
    rgba(244, 162, 97, 1) 100%
  )`,
    Clouds: `linear-gradient(270deg, rgba(49,51,51,1) 0%, rgba(150,150,150,1) 50%, rgba(255,255,255,1) 100%)
`,
    Haze: `linear-gradient(270deg, rgba(49,51,51,1) 0%, rgba(150,150,150,1) 50%, rgba(255,255,255,1) 100%)`,
    Mist: `linear-gradient(270deg, rgba(49,51,51,1) 0%, rgba(150,150,150,1) 50%, rgba(255,255,255,1) 100%)`,
  };

  const weatherBackground = data.weather
    ? weatherBackgrounds[data.weather[0].main]
    : null;

  return (
    <div className="container" style={{ backgroundImage: weatherBackground }}>
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
        {loading ? (
          <div className="loading-gif">
            <img src={loadingGif} alt="loading" />
          </div>
        ) : data.notFound ? (
          <div className="not-found">
            Searched data not found, please try again!🤔
          </div>
        ) : (
          <>
            <div className="weather">
              <img src={weatherDisplayImage} alt="sunny" />
              <div className="weather-type">
                {data.weather ? data.weather[0].main : null}
              </div>
              <div className="temperature">
                {data.main ? `${Math.floor(data.main.temp)}°` : null}
              </div>
              <div className="weather-date">
                {new Date().toLocaleDateString("sr-SR")}
              </div>
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
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
