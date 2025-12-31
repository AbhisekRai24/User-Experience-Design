
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventById, updateEvent } from '../../api/events';
import CategorySelector from '../../components/admin/CategorySelector'; // Import the CategorySelector

import toast from 'react-hot-toast';
import { Users, Calendar } from 'lucide-react';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Nature',
    location: '',
    date: '',
    time: '',
    maxAttendees: 50,
    registrationDeadline: '',
    image: null,
  });

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEventById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category, // Prepopulate the category
        location: event.location,
        date: event.date.split('T')[0],
        time: event.time,
        maxAttendees: event.maxAttendees || 50,
        registrationDeadline: event.registrationDeadline ? event.registrationDeadline.split('T')[0] : '',
        image: null,
      });
    }
  }, [event]);

  const mutation = useMutation({
    mutationFn: (data) => updateEvent(id, data),
    onSuccess: () => {
      toast.success('Event updated successfully');
      queryClient.invalidateQueries(['events']);
      queryClient.invalidateQueries(['event', id]);
      navigate('/admin/events');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update event');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.date) {
      toast.error('Please select an event date');
      return;
    }

    if (!formData.registrationDeadline) {
      toast.error('Please select a registration deadline');
      return;
    }

    // Validate deadline is before event date
    const eventDate = new Date(formData.date);
    const deadline = new Date(formData.registrationDeadline);

    if (deadline > eventDate) {
      toast.error('Registration deadline must be before or on the event date');
      return;
    }

    // Validate maxAttendees doesn't go below current registrations
    if (event && formData.maxAttendees < event.currentAttendees) {
      toast.error(`Cannot reduce max attendees below current registrations (${event.currentAttendees})`);
      return;
    }

    if (formData.maxAttendees < 1) {
      toast.error('Maximum attendees must be at least 1');
      return;
    }

    mutation.mutate(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split('T')[0];

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
      <h1 className="text-4xl font-bold mb-8">Edit Event</h1>


      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Event Title</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* Description */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            {/* Category */}
            <CategorySelector
              selectedCategory={formData.category}
              onCategoryChange={(category) =>
                setFormData({ ...formData, category })
              }
              required
            />
            {/* Location */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Location</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Event Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={formData.date}
                  min={today}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Time</span>
                </label>
                <input
                  type="time"
                  className="input input-bordered"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Registration Settings */}
            <div className="divider">Registration Settings</div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Registration Deadline */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Registration Deadline
                  </span>
                </label>
                <input
                  type="date"
                  className="input input-bordered"
                  value={formData.registrationDeadline}
                  min={today}
                  max={formData.date || undefined}
                  onChange={(e) =>
                    setFormData({ ...formData, registrationDeadline: e.target.value })
                  }
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Must be before event date
                  </span>
                </label>
              </div>

              {/* Max Attendees */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Max Attendees
                  </span>
                </label>
                <input
                  type="number"
                  className="input input-bordered"
                  value={formData.maxAttendees}
                  min={event?.currentAttendees || 1}
                  max="1000"
                  onChange={(e) =>
                    setFormData({ ...formData, maxAttendees: parseInt(e.target.value) || 1 })
                  }
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    {event?.currentAttendees
                      ? `Current: ${event.currentAttendees} registered`
                      : 'Total available seats'}
                  </span>
                </label>
              </div>
            </div>

            {/* Current Registration Status */}
            {event && event.currentAttendees > 0 && (
              <div className="alert alert-info mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-sm">
                  <strong>{event.currentAttendees}</strong> user{event.currentAttendees !== 1 ? 's have' : ' has'} already registered for this event.
                  {' '}Spots remaining: <strong>{event.maxAttendees - event.currentAttendees}</strong>
                </span>
              </div>
            )}

            {/* Event Image */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Event Image</span>
                <span className="label-text-alt text-gray-500">Leave empty to keep current</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                accept="image/*"
                onChange={handleImageChange}
              />
              {event && !formData.image && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-2">Current image:</p>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-32 h-32 object-cover rounded border-2 border-gray-200"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="card-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Updating...
                  </>
                ) : (
                  'Update Event'
                )}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => navigate('/admin/events')}
                disabled={mutation.isPending}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;