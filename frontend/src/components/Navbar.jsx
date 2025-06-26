import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Corrected to Link */}
        <Link className="navbar-brand" to="/">MERN</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Create Post</Link>
            </li>
            <li className="nav-item">
              {/* Use Link instead of Links */}
              <Link to="/all" className="nav-link">All Post</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

