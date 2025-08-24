function WeatherCard({ weather }) {
  return (
    <div className="card">
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
      />
      <p className="temp">{Math.round(weather.main.temp)}°C</p>
      <p className="desc">{weather.weather[0].description}</p>
      <div className="extra">
        <p>💧 Humedad: {weather.main.humidity}%</p>
        <p>🌬️ Viento: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
