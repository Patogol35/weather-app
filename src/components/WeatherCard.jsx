export default function WeatherCard({ weather }) {
  if (!weather) return null;
  const { name, sys, main, weather: w, wind } = weather;
  const icon = w[0].icon;

  return (
    <div className="card">
      <h2>{name}, {sys.country}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={w[0].description} />
      <p className="temp">{Math.round(main.temp)}°C</p>
      <p className="desc">{w[0].description}</p>
      <div className="extra">
        <p>💧 Humedad: {main.humidity}%</p>
        <p>🌬️ Viento: {wind.speed} m/s</p>
      </div>
    </div>
  );
}
