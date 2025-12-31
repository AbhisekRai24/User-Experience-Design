import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../../api/events';
import CategorySelector from '../../components/admin/CategorySelector'; // Import CategorySelector component

import toast from 'react-hot-toast';
import { Users, Calendar } from 'lucide-react';

const CreateEvent = () => {
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

  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success('Event created successfully');
      queryClient.invalidateQueries(['events']);
      navigate('/admin/events');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create event');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.image) {
      toast.error('Please upload an event image');
      return;
    }

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

    if (formData.maxAttendees < 1) {
      toast.error('Maximum attendees must be at least 1');
      return;
    }

    console.log('Submitting form data:', formData);
    mutation.mutate(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Image selected:', file.name, file.size);
      setFormData(prev => ({ ...prev, image: file }));
    }
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Create New Event</h1>

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
                placeholder="Beach Cleanup Drive"
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
                placeholder="Join us for a community beach cleanup event..."
              />
            </div>

            {/* Category */}
            {/* <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                className="select select-bordered"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="Nature">Nature</option>
                <option value="Promotional">Promotional</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div> */}
            {/* Category */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>

              <CategorySelector
                selectedCategory={formData.category}
                onCategoryChange={(category) =>
                  setFormData({ ...formData, category })
                }
                required={true}
              />
            </div>


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
                placeholder="Santa Monica Beach, CA"
              />
            </div>

            {/* Date and Time Row */}
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

            {/* NEW FIELDS: Registration Deadline & Max Attendees */}
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
                  min="1"
                  max="1000"
                  onChange={(e) =>
                    setFormData({ ...formData, maxAttendees: parseInt(e.target.value) || 1 })
                  }
                  required
                />
                <label className="label">
                  <span className="label-text-alt text-gray-500">
                    Total available seats
                  </span>
                </label>
              </div>
            </div>

            {/* Info Alert */}
            <div className="alert alert-info mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">
                Registration will automatically close on the deadline or when max attendees is reached.
              </span>
            </div>

            {/* Event Image */}
            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text font-semibold">Event Image</span>
                <span className="label-text-alt text-gray-500">Required</span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
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
                    Creating...
                  </>
                ) : (
                  'Create Event'
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

export default CreateEvent;