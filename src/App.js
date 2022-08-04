import React, { useState, useEffect } from 'react'
import Countries from './components/Countries'
import './App.css'



const url = "https://restcountries.com/v3.1/all";

const App = () => {

  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  //fetching data from api...............
  const fetchData = async (url) => {
    setIsloading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();
      setCountries(data);
      setIsloading(false);
      setError(null);
      // console.log(data);
    }
    catch (error) {
      setIsloading(false);
      setError(error);
    }

  }



  useEffect(() => {
    fetchData(url);

  }, [])




  return <>
    <h1>Country App</h1>
    {isLoading && <h2>Loading...</h2>}
    {error && <h2> {error.message} </h2>}

    {countries && <Countries countries={countries} />}

  </>

};

export default App