import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../api/events';
import { Link } from 'react-router-dom';

const AdminEventDashboard = () => {
  const { data: events = [] } = useQuery({
    queryKey: ['events', 'admin'],
    queryFn: () => getEvents('All Events'),
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="stats shadow mb-8">
        <div className="stat">
          <div className="stat-title">Total Events</div>
          <div className="stat-value">{events.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Active Events</div>
          <div className="stat-value">{events.length}</div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Quick Actions</h2>
          <div className="card-actions mt-4">
            <Link
              to="/admin/events"
              className="btn bg-[#424CB1] border-[#424CB1] text-white hover:bg-[#2F3A8B] hover:border-[#2F3A8B] transition-all duration-300"
            >
              Manage Events
            </Link>

            <Link
              to="/admin/events/new"
              className="btn bg-[#1AA928] border-[#1AA928] text-white hover:bg-[#15861F] hover:border-[#15861F] transition-all duration-300"
            >
              Create New Event
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDashboard;