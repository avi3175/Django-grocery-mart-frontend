import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setIsLoggedIn(!!accessToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-red-700 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/"><p>GROCERY MART</p></Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:underline font-bold">
              Home
            </Link>
          </li>
          {!isLoggedIn && (
            <>
              <li>
                <Link to="/signup" className="hover:underline font-bold">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline font-bold">
                  Login
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li>
                <Link to="/order-history" className="hover:underline font-bold">
                  Order History
                </Link>
              </li>
              <li>
                <Link to="/your-comments" className="hover:underline font-bold">
                  Your Comments
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline bg-red-500 px-3 py-1 rounded-md font-bold"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 py-4">
          <ul className="space-y-4 px-4">
            <li>
              <Link
                to="/"
                className="block text-white hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/signup"
                    className="block text-white hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block text-white hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li>
                  <Link
                    to="/order-history"
                    className="block text-white hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <Link
                    to="/your-comments"
                    className="block text-white hover:underline"
                    onClick={() => setMenuOpen(false)}
                  >
                    Your Comments
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left text-white hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
