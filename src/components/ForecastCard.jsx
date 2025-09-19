export default function ForecastCard({ data }) {
  const date = new Date(data.dt_txt);
  const day = date.toLocaleDateString("es-ES", { weekday: "long" });

  return (
    <article className="card">
      <h3 className="day">{day}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={data.weather[0].description}
      />
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p className="desc">{data.weather[0].description}</p>
    </article>
  );
}
