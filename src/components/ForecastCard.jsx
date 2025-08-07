function ForecastCard({ data }) {
  const date = new Date(data.dt_txt);
  const day = date.toLocaleDateString("es-ES", { weekday: "long" });

  return (
    <div className="bg-white text-gray-800 rounded-xl shadow-md p-4 text-center">
      <h3 className="capitalize font-semibold mb-2">{day}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="icon"
        className="mx-auto"
      />
      <p className="text-lg font-bold">{data.main.temp}°C</p>
      <p className="capitalize">{data.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;
