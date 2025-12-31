import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEvents, deleteEvent } from '../../api/events';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Edit, Trash2, Users } from 'lucide-react';


const AdminEvents = () => {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', 'admin'],
    queryFn: () => getEvents('All Events'),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      toast.success('Event deleted successfully');
      queryClient.invalidateQueries(['events']);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete event');
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Events</h1>
        <Link to="/admin/events/new" className="btn bg-[#1AA928] border-[#1AA928] text-white hover:bg-[#15861F] hover:border-[#15861F] transition-all duration-300">
          Create New Event
        </Link>
      </div>

      {events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="card bg-base-100 shadow-xl">
              <figure>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{event.title}</h2>
                <p className="text-sm text-gray-600">{event.category}</p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    to={`/admin/events/${event._id}/edit`}
                    className="btn bg-[#1AA928] border-[#1AA928] text-white hover:bg-[#15861F] hover:border-[#15861F] transition-all duration-300"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>

                  <button
                    className="btn bg-[#C92E2E] border-[#C92E2E] text-white hover:bg-[#A62525] hover:border-[#A62525] transition-all duration-300"
                    onClick={() => handleDelete(event._id)}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                  {/* VIEW VOLUNTEERS BUTTON */}
                  <Link
                    to={`/admin/events/${event._id}/volunteers`}
                    className="btn bg-[#424CB1] border-[#424CB1] text-white hover:bg-[#2F3A8B] hover:border-[#2F3A8B] transition-all duration-300"
                  >
                    <Users className="w-4 h-4" />
                    Volunteers ({event.currentAttendees || 0})
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No events found. Create your first event!</p>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;

