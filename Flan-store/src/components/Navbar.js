import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiHome, FiMail } from 'react-icons/fi';
import '../Styles/Navbar.css';
import logo from '../assets/images/store.svg';
import burger from '../assets/images/burger.svg';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="FlanStore Logo" />
          FlanStore
        </div>
        <button className="burger-button" onClick={toggleMenu}>
        <img src={burger} alt="burgerMenu" />
        </button>
        <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <FiHome /> Главная
              </Link>
            </li>
            <li>
              <Link to="/cart" onClick={() => setIsMenuOpen(false)}>
                <FiShoppingCart /> Корзина
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                <FiMail /> Контакты
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
