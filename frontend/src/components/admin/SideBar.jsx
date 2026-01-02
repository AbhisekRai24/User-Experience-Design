import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Calendar, Tags, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

const AdminSidebar = () => {
  const user = useAuthStore((state) => state.user);

  // Safety check
  if (!user || user.role !== 'ADMIN') return null;

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all
     ${isActive
      ? 'bg-black text-white shadow border-l-4 border-blue-500'
      : 'text-gray-700 hover:bg-gray-200 hover:text-black'
    }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-100 shadow-lg p-4 border-r border-gray-200">
      <h2 className="text-gray-800 text-xl font-bold mb-8 px-2">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" end className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>

        <NavLink to="/admin/users" end className={linkClasses}>
          <User className="w-5 h-5" />
          User Management
        </NavLink>


        <NavLink to="/admin/events" className={linkClasses}>
          <Calendar className="w-5 h-5" />
          Event Management.
        </NavLink>

        <NavLink to="/admin/categories" className={linkClasses}>
          <Tags className="w-5 h-5" />
          Category Management
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
