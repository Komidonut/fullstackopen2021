import React, { useState, useEffect } from "react";
import axios from "axios";

//data for construction of a request to weather api
const weatherRequest = {
  base: 'http://api.openweathermap.org/data/2.5/weather?q=',
  appId: '&appid=' + process.env.REACT_APP_WEATHER_ID
}

const App = () => {

  console.log('Rerendered!')
  const [countries, setCountriesData] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, selectCountry] = useState(null)
  const [weather, setWeather] = useState({})

  // changing list of countries according to filter text input
  const countriesSearched = () => {
    return countries.filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    );
  };



  // getting countries data from external API
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        console.log('getting countries data...!');
        const countriesData = response.data;
        setCountriesData(countriesData.map(country => ({ 
          ...country, 
          showDetails: false,
        })))
      })
  }, []);

  //getting weather data
  useEffect(() => {
    if (!selectedCountry) {
      return
    }
    axios
      .get(weatherRequest.base + countries.find((country, index) =>
      country.alpha2Code === selectedCountry).capital + weatherRequest.appId)
      .then((response) => {
        setWeather((prevWeather) => ({
          ...prevWeather,
          [selectedCountry]: response.data
        }))
      })
  }, [selectedCountry, countries])

  //handling click on Show button
  function handleToggleComplete(country) {
    selectCountry((prevSelect) => prevSelect === country.alpha2Code ? null : country.alpha2Code)
  };



  return (
    <>
      <div>
        find countries
        <form>
          <input onChange={
            (event) => {
              event.preventDefault();
              setFilter(event.target.value);
            }
          } />
        </form>
      </div>
      <ul>
        {countriesSearched().map(country =>
          <li key={country.alpha2Code}>
            {country.name}
            <button
              onClick={() => handleToggleComplete(country)}>
              {country.alpha2Code !== selectedCountry ? 'Show' : 'Hide'}
            </button>
            {country.alpha2Code === selectedCountry && (
              <div key={country.alpha2Code}>
                <h1>{country.name}</h1>
                <p>{country.capital}</p>
                <p>{country.population}</p>
                {weather[selectedCountry] ? <p>{JSON.stringify(weather[selectedCountry])}</p> : null}
                <img alt='flag' src={country.flag} />
                <h2>languages</h2>
                <ul>
                  {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
                </ul>
              </div>
            )}
          </li>
        )}
      </ul>
    </>
  );
};


export default App;
