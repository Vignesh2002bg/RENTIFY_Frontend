import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';

const Navbar = () => {
    const [role, setRole] = useState('');
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setRole(user.role);
        }
      }, []);
      const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/login';
    };
  return (
    <div>
        
          <nav class="navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">RENTIFY</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul className="navbar-nav ">
          {role === '' && (
            <>
            <li className="nav-item">
            <Link className="nav-link "  to="/register">Register</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link "  to="/login">Login</Link>
            </li>
            </>
            )}
            {role === 'seller' && (
              <>
                <li className="nav-item">
                <Link className="nav-link"  to="/home-property">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-property">Add Property</Link>
                </li>
                <li>
                  <Link className="nav-link" onClick={handleLogout} to="/logout">Logout</Link>
                </li>
              </>
            )}
            {role === 'buyer' && (
              <>
                <li className="nav-item">
                <Link className="nav-link active" to="/buyer-property">Home</Link>
                </li>
                <li>
                  <Link className="nav-link" onClick={handleLogout} to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
    </div>
  </div>
</nav>
    </div>
    
  );
};

export default Navbar;
