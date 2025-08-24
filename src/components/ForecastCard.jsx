function ForecastCard({ data }) {
  const date = new Date(data.dt_txt);
  const day = date.toLocaleDateString("es-ES", { weekday: "long" });

  return (
    <div className="card">
      <h3 className="day">{day}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="icon"
      />
      <p className="temp">{Math.round(data.main.temp)}°C</p>
      <p className="desc">{data.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;
