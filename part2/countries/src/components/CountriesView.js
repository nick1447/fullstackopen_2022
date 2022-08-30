import axios from "axios";
import { useState, useEffect } from "react";

const CountriesView = ({ filteredCountries }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelected(filteredCountries[0]);
    } else {
      setSelected(undefined);
    }
  }, [filteredCountries]);

  if (selected) {
    return <SingleViewCountry country={selected} />;
  }
  if (filteredCountries.length < 11) {
    return (
      <ListView countries={filteredCountries} showButtonHandler={setSelected} />
    );
  } else {
    return <p>Too many matches, specify a filter...</p>;
  }
};

const ListView = ({ countries, showButtonHandler }) =>
  countries.map((country, index) => (
    <p key={index}>
      {country.name.common}
      <ShowCountryButton onClick={() => showButtonHandler(country)} />
    </p>
  ));

const ShowCountryButton = ({ onClick }) => {
  return <button onClick={onClick}>show</button>;
};

const CityWeatherData = ({ country }) => {
  const [weather, setWeather] = useState();

  const kelvinToCelsius = (value) => value - 273.15;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        if (response !== undefined) {
          setWeather(response.data);
          console.log(weather);
        }
      });
  }, [country.capital]);

  if (weather !== undefined) {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>
          Temperature is
          {Math.round(kelvinToCelsius(weather.main.temp) * 10) / 10} celcius
        </p>
        <img
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Loading data...</p>
      </div>
    );
  }
};

const SingleViewCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((language, index) => (
          <li key={index}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" />
      <CityWeatherData country={country} />
    </div>
  );
};

export default CountriesView;
