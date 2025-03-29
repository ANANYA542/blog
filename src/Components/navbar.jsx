import React, { useState } from 'react';
import './navbar.css';
import leafLogo from './leaf-logo.png';
import LoginDialog from './Logindialog'; // Import the LoginDialog component

const Navbar = () => {
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);

  const openLoginDialog = () => {
    setLoginDialogOpen(true);
  };

  const closeLoginDialog = () => {
    setLoginDialogOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={leafLogo} alt="Leaf Logo" className="logo" />
      </div>
      <ul className="navbar-links">
        <li><a href="#home">COUNTRY DELIGHT</a></li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-button" onClick={openLoginDialog}>Login</button>
        <button className="signup-button">Sign Up</button>
      </div>
      {isLoginDialogOpen && <LoginDialog onClose={closeLoginDialog} />}
    </nav>
  );
};

export default Navbar;