
import { Link } from 'react-router-dom';
import logo from '../asset/logo.png';

const PublicNavbar = () => {
  return (
    <nav className="navbar bg-black shadow-md px-4 md:px-8 py-6">
      {/* Left: Logo and Brand */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold text-white flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          Local Space
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="flex-none hidden md:flex">
        <div className="flex gap-6">
          <Link to="/" className="btn btn-ghost text-white hover:bg-gray-800">
            Home
          </Link>
          <Link to="/events" className="btn btn-ghost text-white hover:bg-gray-800">
            Events
          </Link>
          <Link to="/about" className="btn btn-ghost text-white hover:bg-gray-800">
            About Us
          </Link>
          <Link to="/help" className="btn btn-ghost text-white hover:bg-gray-800">
            Help & Support
          </Link>
        </div>
      </div>

      {/* Right: Login/Signup Buttons */}
      <div className="flex-none flex items-center gap-3">
        <Link to="/login" className="btn btn-outline text-white border-white hover:bg-white hover:text-black">
          Login
        </Link>
        <Link to="/signup" className="btn bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F]">
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="dropdown dropdown-end md:hidden ml-2">
        <label tabIndex={0} className="btn btn-ghost text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/events">Events</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/help">Help & Support</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default PublicNavbar;