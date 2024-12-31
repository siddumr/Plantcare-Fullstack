import React, { useState, useEffect } from 'react';
import '../HomePage-CSS/Weather.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=22&longitude=79&current_weather=true&hourly=temperature_2m&timezone=Asia%2FSingapore';

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <section className="weather-widget">
      <h2 style={{fontSize:'38px'}}>Weather Forecast</h2>
      {weatherData ? (
        <>
          <div className="weather-info">
            {/* Sun Icon */}
            <div className="weather-icon">
              <img src="https://img.icons8.com/ios/452/sun.png" alt="Sun Icon" />
            </div>
            {/* Temperature Display */}
            <div className="temperature">
              <span>{weatherData.current_weather.temperature}°C</span>
            </div>
          </div>
          <div className="weather-details">
            {/* Day/Night Icon */}
            <div className="detail">
            {/* Sun/Moon Icon */}
            <img 
              src={weatherData.current_weather.is_day ? "https://img.icons8.com/ios/452/sun.png" : "https://img.icons8.com/ios/452/moon.png"} 
              alt={weatherData.current_weather.is_day ? "Day" : "Night"} 
              className="detail-icon" 
            />
            <p>{weatherData.current_weather.is_day ? 'Day Time' : 'Night Time'}</p>
          </div>

            {/* Rain Icon */}
            <div className="detail">
              <img src="https://img.icons8.com/ios/452/rain.png" alt="Rain" className="detail-icon" />
              <p>{weatherData.current_weather.rain ? `${weatherData.current_weather.rain} mm` : 'No Rain'}</p>
            </div>

            {/* Wind Icon */}
            <div className="detail">
              <img src="https://img.icons8.com/ios/452/wind.png" alt="Wind" className="detail-icon" />
              <p>{weatherData.current_weather.wind_direction_10m}10 km/h°</p>
            </div>
          </div>

          <div className="hourly-forecast">
            <p>Hourly Temperature (Next Hour): {weatherData.hourly.temperature_2m[1]}°C</p>
          </div>
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </section>
  );
};

export default WeatherWidget;
