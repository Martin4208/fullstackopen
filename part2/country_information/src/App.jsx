import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ onChange, value }) => {
  return <p>find countries <input onChange={onChange} value={value}></input></p> 
}

const ShowMultipleCountries = ({ matches, onShow }) => {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 
  
  if (matches.length > 1) {
    return (
      <div>
        {matches.map(country => (
          <p key={country.name.common}>
            {country.name.common} <button onClick={() => onShow(country)}>Show</button>
          </p>
        ))}
      </div>
    )
  } 
  if (matches.length === 1){
    return <ShowOneCountry country={matches[0]}/>  
  }
}

const ShowOneCountry = ({ country }) => {
  console.log(import.meta.env.VITE_OPEN_WEATHER_API_KEY)
  const api_key = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
      .then(response => setWeather(response.data))
  }, [])

  if (!weather) {
    return <p>Loading weather...</p>
  }
  
  return (
    <div>
      <h1>{country.name.common}</h1>
      
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map(key => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      
      <img src={country.flags.png} alt={country.flags.alt} />
      
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.current.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={weather.current.weather[0].main} />
      <p>Wind {weather.current.wind_speed}m/s</p>
    </div>
  )
}

const App = () => {
  const [filterValue, setFilterValue] = useState('')
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const matches = countries.filter((country) => 
    country.name.common
    .toLowerCase()
    .includes(filterValue.toLowerCase())
  )

  return (
    <div>
      <Filter 
        onChange={e => {
          setFilterValue(e.target.value)
          setSelectedCountry(null)
        }} 
        value={filterValue}
      />
      {selectedCountry ? (
        <ShowOneCountry country={selectedCountry} />
      ) : (
        filterValue.length > 0 && (   
          <ShowMultipleCountries matches={matches} onShow={setSelectedCountry}/>
        )
      )}
    </div>
  )
}

export default App