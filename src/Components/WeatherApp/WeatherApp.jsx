// import cloudy from "../../assets/images/cloudy.png";
// import loading from "../../assets/images/loading.gif";
// import rainy from "../../assets/images/rainy.png";
// import showy from "../../assets/images/showy.png";
import sunny from "../../assets/images/sunny.png";

function WeatherApp() {
  return (
    <div className="container">
      <div className="weather-app">
        <div className="search">
          <div className="search-location">
            <i className="fa-solid fa-location-crosshairs"></i>
            <div className="city">Belgrade</div>
          </div>
          <div className="search-input">
            <input type="text" name="" id="" placeholder="Search city" />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
        <div className="weather">
          <img src={sunny} alt="sunny" />
          <div className="weather-type">Clear</div>
          <div className="temperature">35°C</div>
        </div>
        <div className="weather-data">
          <div className="humidity">
            <div className="data-name">Humidity</div>
            <i className="fa-solid fa-water"></i>
            <div className="data">45%</div>
          </div>
          <div className="wind">
            <div className="data-name">Wind</div>
            <i className="fa-solid fa-wind"></i>
            <div className="data">5 m/s</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
