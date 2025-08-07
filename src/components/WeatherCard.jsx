function WeatherCard({ weather }) {
  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-xl p-6 w-80 text-center">
      <h2 className="text-2xl font-bold mb-2">
        {weather.name}, {weather.sys.country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="icon"
        className="mx-auto"
      />
      <p className="text-4xl font-bold">{weather.main.temp}°C</p>
      <p className="capitalize text-lg">{weather.weather[0].description}</p>
      <div className="mt-4">
        <p>💧 Humedad: {weather.main.humidity}%</p>
        <p>🌬️ Viento: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;

