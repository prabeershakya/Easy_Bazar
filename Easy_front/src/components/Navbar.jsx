import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to check login state
  const checkLoginState = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {

    checkLoginState();
  }, []);


  useEffect(() => {
    checkLoginState();
  }, [location.pathname]);


  useEffect(() => {
    const handleLoginEvent = () => {
      checkLoginState();
    };

    window.addEventListener('userLoggedIn', handleLoginEvent);
    
    return () => {
      window.removeEventListener('userLoggedIn', handleLoginEvent);
    };
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
       
        setIsVisible(true);
      } else {
        
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b border-orange-100 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
         
          <div className="flex items-center">
            <div
              className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-orange-700 transition-all duration-300"
            >
              Easy Bazar
            </div>
          </div>

       
          <div className="flex items-center space-x-2">
        
            {!isLoggedIn ? (
           
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActiveLink('/About') 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  About
                </Link>
                <Link
                  to="/login"
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    isActiveLink('/login')
                      ? 'bg-orange-600 text-white shadow-xl shadow-orange-300'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-lg shadow-orange-200'
                  }`}
                >
                  Login
                </Link>
              </>
            ) : (
             
              <>

                <Link
                  to="/Home"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActiveLink('/Home') 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  Home
                </Link>

                <Link
                  to="/Product"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActiveLink('/Product') 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  Product
                </Link>

                <Link
                  to="/Wishlist"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActiveLink('/wishlist') 
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200' 
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  Wishlist
                </Link>

                <Link
                  to="/profile"
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isActiveLink('/profile')
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-200'
                      : 'text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-semibold'
                  }`}
                >
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>{user?.username || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-transparent to-orange-400/10 rounded-2xl pointer-events-none"></div>
    </nav>
  );
};

export default Navbar;