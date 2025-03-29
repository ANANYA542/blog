import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Countrylist.css';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        const initialLikes = data.reduce((acc, country) => {
          acc[country.cca3] = 0;
          return acc;
        }, {});
        setLikes(initialLikes);
        const initialComments = data.reduce((acc, country) => {
          acc[country.cca3] = [];
          return acc;
        }, {});
        setComments(initialComments);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleLike = (countryCode) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [countryCode]: (prevLikes[countryCode] || 0) + 1,
    }));
  };

  const handleCommentSubmit = (countryCode, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [countryCode]: [...prevComments[countryCode], comment],
    }));
  };

  // Filter countries based on search term
  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="country-list">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
        style={{ marginBottom: '20px', padding: '10px', width: '100%' }}
      />
      {filteredCountries.length === 0 ? (
        <p>No countries found.</p>
      ) : (
        filteredCountries.map(country => (
          <div key={country.cca3} className="country-card">
            <Link to={`/country/${country.name.common}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <h2>{country.name.common}</h2>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <p>Capital: {country.capital ? country.capital[0] : "N/A"}</p>
            </Link>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation();
                handleLike(country.cca3); 
              }} 
              style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              ❤️
            </button>
            
            <p>Likes: {likes[country.cca3] || 0}</p>

            {/* Comment Section */}
            <div className="comment-section">
              <h3>Comments:</h3>
              <ul>
                {comments[country.cca3].map((comment, index) => (
                  <li key={index}>{comment}</li>
                ))}
              </ul>
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const commentInput = e.target.elements.comment;
                  handleCommentSubmit(country.cca3, commentInput.value);
                  commentInput.value = ''; // Clear the input field
                }}
              >
                <input 
                  type="text" 
                  name="comment" 
                  placeholder="Add a comment..." 
                  required 
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CountryList;