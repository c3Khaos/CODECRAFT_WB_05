import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherDisplay from './components/WeatherDisplay'

export default function App() {
  const [cityName, setCityName] = useState("Nairobi")
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const baseUrl = import.meta.env.VITE_APP_BASE_URL

  const fetchWeather = async (city) => {
    if (!city) return
    setLoading(true)
    setError(null)
    setWeatherData(null)
    setCityName(city)

    try {
      const res = await fetch(`${baseUrl}?key=${apiKey}&q=${cityName}`)
      const data = await res.json()
      if (!data.error) {
        setWeatherData(data)
        console.log(data)
      } else {
        setError(data.error.message || "City not found")
      }
    } catch {
      setError("Could not connect to the weather service.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather(cityName)
  }, [])

  return (
    <div>
      <SearchBar onCitySubmit={fetchWeather} disabled={loading} />
      <WeatherDisplay data={weatherData} error={error} />
    </div>
  )
}
