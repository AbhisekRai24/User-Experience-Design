import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Calendar,
  FolderOpen,
  AlertCircle,
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import useAuthStore from '../../store/authStore';

const AdminDashboard = () => {
  const { accessToken } = useAuthStore();
  const [stats, setStats] = useState({
    events: [],
    users: [],
    categories: [],
    loading: true
  });

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [eventsRes, usersRes, categoriesRes] = await Promise.all([
        fetch(`${API_BASE}/events`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch(`${API_BASE}/users`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }),
        fetch(`${API_BASE}/categories`, {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        })
      ]);

      const events = await eventsRes.json();
      const users = await usersRes.json();
      const categories = await categoriesRes.json();

      setStats({ events, users, categories, loading: false });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  // Calculate metrics
  const totalEvents = stats.events.length;
  const activeEvents = stats.events.filter(
    e => new Date(e.date) >= new Date()
  ).length;
  const totalVolunteers = stats.events.reduce(
    (sum, e) => sum + (e.currentAttendees || 0), 0
  );
  const totalUsers = stats.users.length;

  // Event status calculations
  const fullEvents = stats.events.filter(
    e => e.currentAttendees >= e.maxAttendees && new Date(e.date) >= new Date()
  );
  const almostFullEvents = stats.events.filter(
    e => {
      const fillRate = e.currentAttendees / e.maxAttendees;
      return fillRate >= 0.8 && fillRate < 1 && new Date(e.date) >= new Date();
    }
  );

  // Chart data - Top 5 events by volunteers
  const topEventsData = stats.events
    .sort((a, b) => (b.currentAttendees || 0) - (a.currentAttendees || 0))
    .slice(0, 5)
    .map(event => ({
      name: event.title.length > 15 ? event.title.slice(0, 15) + '...' : event.title,
      volunteers: event.currentAttendees || 0,
    }));

  // Category distribution - Calculate from events if eventCount not available
  const categoryData = stats.categories
    .map(cat => {
      // Count events for this category
      const eventCount = stats.events.filter(
        event => event.category?._id === cat._id || event.category === cat._id
      ).length;

      return {
        name: cat.name,
        value: eventCount,
      };
    })
    .filter(cat => cat.value > 0); // Only show categories with events

  console.log('📊 Category Data:', categoryData);


  const COLORS = ['#1AA928', '#22C55E', '#3B82F6', '#F59E0B', '#8B5CF6', '#EC4899'];

  // Quick action cards
  const quickActions = [
    {
      title: 'Manage Events',
      description: 'Create, edit, and manage all events',
      icon: Calendar,
      link: '/admin/events',
      color: 'bg-[#1AA928]',
      count: totalEvents
    },
    {
      title: 'Manage Users',
      description: 'View and manage user accounts',
      icon: Users,
      link: '/admin/users',
      color: 'bg-[#424CB1]',
      count: totalUsers
    },
    {
      title: 'Manage Categories',
      description: 'Organize event categories',
      icon: FolderOpen,
      link: '/admin/categories',
      color: 'bg-[#F59E0B]',
      count: stats.categories.length
    }
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#1AA928] border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your events.</p>
      </div>

      {/* Alerts */}
      {fullEvents.length > 0 && (
        <div className="alert alert-error mb-4 shadow-lg">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Full Events Alert</h3>
            <div className="text-sm">
              {fullEvents.length} event(s) are fully booked: {fullEvents.map(e => e.title).join(', ')}
            </div>
          </div>
        </div>
      )}

      {almostFullEvents.length > 0 && (
        <div className="alert alert-warning mb-4 shadow-lg">
          <AlertCircle className="w-6 h-6" />
          <div>
            <h3 className="font-bold">Almost Full Events</h3>
            <div className="text-sm">
              {almostFullEvents.length} event(s) are almost full (≥80% capacity)
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Events */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1AA928]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Events</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalEvents}</h3>
              <p className="text-xs text-gray-500 mt-1">{activeEvents} active</p>
            </div>
            <div className="bg-[#1AA928] bg-opacity-10 p-3 rounded-full">
              <Calendar className="w-8 h-8 text-[#1AA928]" />
            </div>
          </div>
        </div>

        {/* Total Volunteers */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#424CB1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Volunteers</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalVolunteers}</h3>
              <p className="text-xs text-gray-500 mt-1">across all events</p>
            </div>
            <div className="bg-[#424CB1] bg-opacity-10 p-3 rounded-full">
              <Users className="w-8 h-8 text-[#424CB1]" />
            </div>
          </div>
        </div>

        {/* Active Events */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#15861F]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Active Events</p>
              <h3 className="text-3xl font-bold text-gray-800">{activeEvents}</h3>
              <p className="text-xs text-gray-500 mt-1">upcoming events</p>
            </div>
            <div className="bg-[#15861F] bg-opacity-10 p-3 rounded-full">
              <TrendingUp className="w-8 h-8 text-[#15861F]" />
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#F59E0B]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Users</p>
              <h3 className="text-3xl font-bold text-gray-800">{totalUsers}</h3>
              <p className="text-xs text-gray-500 mt-1">registered users</p>
            </div>
            <div className="bg-[#F59E0B] bg-opacity-10 p-3 rounded-full">
              <Users className="w-8 h-8 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart - Top Events */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 Events by Volunteers</h2>
          {topEventsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topEventsData}>
                <XAxis dataKey="name" fontSize={12} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="volunteers" fill="#1AA928" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No event data available
            </div>
          )}
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Events by Category</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-gray-500">
              No category data available
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${action.color} bg-opacity-10 p-3 rounded-full`}>
                    <Icon className={`w-8 h-8 ${action.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{action.count}</span>
                </div>
                <h3 className="text-lg font-bold mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Events Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recent Events Status</h2>
        <div className="space-y-3">
          {stats.events.slice(0, 5).map(event => {
            const now = new Date();
            const eventDate = new Date(event.date);
            const fillRate = event.currentAttendees / event.maxAttendees;

            let status, statusColor, StatusIcon;
            if (eventDate < now) {
              status = 'Closed';
              statusColor = 'text-gray-500';
              StatusIcon = XCircle;
            } else if (fillRate >= 1) {
              status = 'Full';
              statusColor = 'text-red-500';
              StatusIcon = XCircle;
            } else if (fillRate >= 0.8) {
              status = 'Almost Full';
              statusColor = 'text-yellow-500';
              StatusIcon = AlertCircle;
            } else {
              status = 'Open';
              statusColor = 'text-green-500';
              StatusIcon = CheckCircle;
            }

            return (
              <div key={event._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{event.category?.icon || '📋'}</span>
                  <div>
                    <h3 className="font-semibold">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {event.currentAttendees} / {event.maxAttendees} volunteers
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon className={`w-5 h-5 ${statusColor}`} />
                  <span className={`font-medium ${statusColor}`}>{status}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Link
          to="/admin/events"
          className="mt-4 inline-block text-[#1AA928] hover:underline font-medium"
        >
          View all events →
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;