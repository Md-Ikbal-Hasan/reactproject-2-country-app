import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import './App.css'



const url = "https://restcountries.com/v3.1/all";

const App = () => {

  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);

  //fetching data from api...............
  const fetchData = async (url) => {
    setIsloading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setFilteredCountries(data);
      setIsloading(false);
      setError(null);

    }
    catch (error) {
      setIsloading(false);
      setError(error);
    }

  }


  useEffect(() => {
    fetchData(url);

  }, [])


  const handleRemoveCountry = (name) => {
    const filter = filteredCountries.filter((country) => {
      return country.name.common !== name
    })

    setFilteredCountries(filter);
  }

  return <>
    <h1>Country App</h1>
    {isLoading && <h2>Loading...</h2>}
    {error && <h2> {error.message} </h2>}

    {countries && <Countries countries={filteredCountries} onRemoveCountry={handleRemoveCountry} />}

  </>

};

export default App