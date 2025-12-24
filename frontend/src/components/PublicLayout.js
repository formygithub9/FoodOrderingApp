import React from 'react';
import { FaHome, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import '../styles/layout.css'

const PublickLayeout = ({children}) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold"><FaUtensils className='me-1'/> Food Ordering System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item mx-1">
                <Link to='/' className="nav-link" ><FaHome className='me-1'/> Home</Link>
              </li>
              <li className="nav-item">
                <Link to='' className="nav-link mx-1" ><FaUtensils className='me-1'/> Menu</Link>
              </li>
              <li className="nav-item">
                <Link to='' className="nav-link mx-1" ><FaTruck className='me-1'/> Track</Link>
              </li>
              <li className="nav-item">
                <Link to='/register' className="nav-link mx-1" ><FaUserPlus className='me-1'/> Register</Link>
              </li>
              <li className="nav-item">
                <Link to='' className="nav-link mx-1" ><FaSignInAlt className='me-1'/> Login</Link>
              </li>
              <li className="nav-item">
                <Link to='/admin-login' className="nav-link mx-1" ><FaUserShield className='me-1'/> Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        {children}
      </div>
      <footer className='text-center py-3'>
        <div className="container">
          <p className=''>&copy; 2025 Food Ordering System. All right reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default PublickLayeout;
