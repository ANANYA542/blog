import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Countrydetail.css'; // Ensure the correct casing

function CountryDetails() {
  const { countryName } = useParams(); 
  const [country, setCountry] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Function to fetch country details
  const fetchCountryDetails = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`); // Use the name endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch country details');
      }
      const data = await response.json();
      setCountry(data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchCountryDetails();
  }, [countryName]);

  if (loading) return <div className="loading">Loading...</div>; // Apply loading class

  if (error) return <div className="error">Error: {error}</div>; // Apply error class

  return (
    <div className="country-details"> {/* Apply country-details class for styling */}
      <h1>{country.name.common}</h1>
      <p>Native Name: {country.name.official}</p>
      <p>Population: {country.population.toLocaleString()}</p>
      <p>Region: {country.region}</p>
      <p>Subregion: {country.subregion}</p>
      <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
      <p>Languages: {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} style={{ width: '100%', borderRadius: '10px', marginTop: '20px' }} /> {/* Display flag */}
    </div>
  );
}

export default CountryDetails;