import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {

  console.log('Rerendered!')
  const [countries, setCountriesData] = useState([]);
  const [filter, setFilter] = useState("");


  const weatherRequest = {
    base: 'http://api.openweathermap.org/data/2.5/weather?q=',
    appId: '&appid=23eb6a0c17a0a740a7bc3610a74f03de'
  }

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



  function handleToggleComplete(country) {
    console.log('альфакод страны ', country.alpha2Code);
    const listUpdated = countries.map(element => {
      if (element.alpha2Code === country.alpha2Code) {
        const elementUpdated = {
          ...element,
          showDetails: !element.showDetails,
        }
        return elementUpdated
      }
      return element
    })
    setCountriesData(listUpdated)
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
              {country.showDetails === false ? 'Show' : 'Hide'}
            </button>
            {country.showDetails && (
              <div key={country.alpha2Code}>
                <h1>{country.name}</h1>
                <p>{country.capital}</p>
                <p>{country.population}</p>
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
