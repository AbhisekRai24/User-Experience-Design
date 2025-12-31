import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../../api/events';
import AdminEventsList from '../../components/admin/EventList';


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

          <div className="card-actions mt-4">
            <AdminEventsList />




          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDashboard;