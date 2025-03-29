import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './Components/Countrylist'; // Ensure the correct casing
import Navbar from './Components/navbar'; // Ensure the correct casing
import CountryDetails from './Components/CountryDetails'; // Ensure the correct casing

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: '60px' }}> 
        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
