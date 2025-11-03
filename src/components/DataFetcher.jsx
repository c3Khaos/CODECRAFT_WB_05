import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const city = "kakamega";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const actualData = await response.json();
        setData(actualData);
        console.log(actualData);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, apiKey, city]);

  if (isLoading) return <div className="loading">Loading info ...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h2>Weather in {data.location.name}</h2>
      <p>Temperature: {data.current.temp_c}°C</p>
      <p>Condition: {data.current.condition.text}</p>
      <img src={data.current.condition.icon} alt={data.current.condition.text} />
    </div>
  );
}

export default DataFetcher;
