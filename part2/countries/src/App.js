import { useState, useEffect } from "react";
import FilterForm from "./components/FilterForm";
import CountriesView from "./components/CountriesView";
import axios from "axios"; 

const App = () => {

  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([]) 
  const filteredCountries = countries.filter(country => country.name.common.includes(filter))


  const handleFilterChange = event => setFilter(event.target.value)

  useEffect(
    () => {
      axios
        .get("https://restcountries.com/v3.1/all")
          .then(response => {
            setCountries(response.data)
          })
    },
    []
  )

  return(
    <div>
      <FilterForm value={filter} handleFilterChange={handleFilterChange}/>
      <CountriesView filteredCountries={filteredCountries}/>
    </div>
  )
}

export default App;
