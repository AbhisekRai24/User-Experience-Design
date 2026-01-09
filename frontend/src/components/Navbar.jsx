import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useState, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Bell, Heart } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { getUnreadCount } from '../api/notifications';
import { getWishlist } from '../api/wishlist';
import logo from '../asset/logo.png';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  // Fetch unread count
  const { data: unreadData } = useQuery({
    queryKey: ['unreadCount'],
    queryFn: getUnreadCount,
    enabled: !!user,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Fetch wishlist count
  const { data: wishlistData = [] } = useQuery({
    queryKey: ['wishlist-count'],
    queryFn: getWishlist,
    enabled: !!user && user?.role !== 'ADMIN',
  });

  const unreadCount = unreadData?.count || 0;
  const wishlistCount = wishlistData?.length || 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log('Before logout - user:', user);
    console.log('Before logout - isAuthenticated:', useAuthStore.getState().isAuthenticated);
    sessionStorage.removeItem("hasGreeted");
    logout();
    navigate("/login", { replace: true });
  };

  if (!user) return null;

  return (
    <nav className="navbar bg-black shadow-md px-4 md:px-8 py-6">
      {/* Left: Logo and Brand */}
      <div className="flex-none">
        <Link
          to={user?.role === 'ADMIN' ? '/admin' : '/dashboard'}
          className="btn btn-ghost text-xl font-bold text-white flex items-center gap-2"
        >
          <img src={logo} alt="Logo" className="w-8 h-8" />
          Local Space
        </Link>

      </div>

      {/* Navigation Links */}
      <div className="flex-1 hidden md:flex justify-center">
        <div className="flex gap-6">
          {/* Normal User Links */}
          {user?.role !== 'ADMIN' && (
            <>
              <Link to="/dashboard" className="btn btn-ghost text-white hover:bg-gray-800">
                Home
              </Link>
              <Link to="/events" className="btn btn-ghost text-white hover:bg-gray-800">
                Events
              </Link>
              <Link to="/wishlist" className="btn btn-ghost text-white hover:bg-gray-800">
                Wishlist
              </Link>
              <Link to="/event-history" className="btn btn-ghost text-white hover:bg-gray-800">
                Event History
              </Link>
            </>
          )}

          {/* Admin User Links */}
          {/* {user?.role === 'ADMIN' && (
            <>
              <Link to="/admin" className="btn btn-ghost text-white hover:bg-gray-800">
                Admin Dashboard
              </Link>
              <Link to="/admin/eventdashboard" className="btn btn-ghost text-white hover:bg-gray-800">
                Event Management
              </Link>
              <Link to="/admin/categories" className="btn btn-ghost text-white hover:bg-gray-800">
                Category Management
              </Link>
            </>
          )} */}
        </div>
      </div>

      {/* Right: Wishlist + Notifications + User Profile */}
      <div className="flex-none flex items-center gap-4">
        {/* Wishlist Icon - Only for non-admin users */}
        {user?.role !== 'ADMIN' && (
          <Link to="/wishlist" className="btn btn-ghost btn-circle text-white relative">
            <Heart className="w-6 h-6" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>
        )}

        {/* Notification Bell */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setNotificationOpen(!notificationOpen)}
            className="btn btn-ghost btn-circle text-white relative"
          >
            <Bell className="w-6 h-6" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          <NotificationDropdown
            isOpen={notificationOpen}
            onClose={() => setNotificationOpen(false)}
          />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="font-medium text-white hidden md:inline">{user.username}</span>

            {/* <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-2 overflow-hidden bg-gray-600 flex items-center justify-center">
                <img
                  src={user?.profileImage || '/default-avatar.jpg'}
                  alt={user?.username || 'User'}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/default-avatar.jpg';
                  }}
                  className="object-cover w-full h-full"
                />
              </div>
            </div> */}
            <div className="w-10 h-10 rounded-full ring ring-gray-700 ring-offset-base-100 ring-offset-2 overflow-hidden bg-gray-600 flex items-center justify-center">
              <img
                src={user?.profileImage || '/default-avatar.jpg'}
                alt={user?.username || 'User'}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/default-avatar.jpg';
                }}
              />
            </div>

          </div>

          {dropdownOpen && (
            <ul className="menu bg-base-100 rounded-box shadow-lg absolute right-0 mt-2 w-48 z-50">
              {/* Mobile Menu Items */}
              {user?.role !== 'ADMIN' && (
                <>
                  <li className="md:hidden">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="md:hidden">
                    <Link to="/events" onClick={() => setDropdownOpen(false)}>
                      Events
                    </Link>
                  </li>
                  <li className="md:hidden">
                    <Link to="/wishlist" onClick={() => setDropdownOpen(false)}>
                      Wishlist
                    </Link>
                  </li>
                  <li className="md:hidden">
                    <Link to="/event-history" onClick={() => setDropdownOpen(false)}>
                      Event History
                    </Link>
                  </li>
                </>
              )}

              {/* Admin Menu Items */}
              {user?.role === 'ADMIN' && (
                <li className="md:hidden">
                  <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)}>
                    Admin Dashboard
                  </Link>
                </li>
              )}

              {/* Profile, Settings, and Logout */}
              <li>
                <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/settings" onClick={() => setDropdownOpen(false)}>
                  Settings
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;