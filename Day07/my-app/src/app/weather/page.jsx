export default async function WeatherPage() {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=16.8&longitude=96.2&current_weather=true",
    {
      cache: "no-store", // DYNAMIC (always fresh)
    },
  );

  const data = await res.json();

  return (
    <div style={{ padding: 20 }}>
      <h1>Weather (Dynamic / No Cache)</h1>

      <h2>Temperature: {data.current_weather.temperature}°C</h2>
      <h2>Wind Speed: {data.current_weather.windspeed}</h2>
    </div>
  );
}
