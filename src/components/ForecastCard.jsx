export default function ForecastCard({ day, minTemp, maxTemp, icon, description }) {
  return (
    <article className="card">
      <h3 className="day">{day}</h3>

      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />

      <p className="temp">
        {Math.round(maxTemp)}° / {Math.round(minTemp)}°
      </p>

      <p className="desc">{description}</p>
    </article>
  );
}
