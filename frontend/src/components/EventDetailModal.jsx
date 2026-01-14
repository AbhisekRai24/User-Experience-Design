import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventById } from '../api/events';
import { joinEvent, getUserHistory } from '../api/history';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { MapPin, Calendar, Clock, Users, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import RegistrationFormModal from './RegistrationFormModal';

const EventDetailModal = ({ eventId, isOpen, onClose }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [hasJoined, setHasJoined] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const { data: event, isLoading } = useQuery({
    queryKey: ['event', eventId],
    queryFn: () => getEventById(eventId),
    enabled: isOpen && !!eventId,
  });

  const { data: userHistory } = useQuery({
    queryKey: ['userHistory', user?.id],
    queryFn: () => getUserHistory(user?.id),
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (userHistory && eventId) {
      const joined = userHistory.some(
        (item) => item.event._id === eventId
      );
      setHasJoined(joined);
    }
  }, [userHistory, eventId]);

  const joinMutation = useMutation({
    mutationFn: (registrationData) => joinEvent(eventId, registrationData),
    onSuccess: () => {
      toast.success('Successfully registered for the event!');
      setHasJoined(true);
      setShowRegistrationForm(false);
      queryClient.invalidateQueries(['userHistory', user?.id]);
      queryClient.invalidateQueries(['event', eventId]);

      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to register for event');
    },
  });

  // ========================================
  // SMART EVENT STATUS CALCULATOR
  // ========================================
  const getEventStatus = () => {
    if (!event) return null;

    const now = new Date();
    const eventDate = new Date(event.date);
    const deadline = event.registrationDeadline ? new Date(event.registrationDeadline) : null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    // Calculate seats
    const maxSeats = event.maxAttendees || 0;
    const currentSeats = event.currentAttendees || 0;
    const spotsLeft = maxSeats - currentSeats;
    const isFull = spotsLeft <= 0;
    const isFewSpotsLeft = spotsLeft > 0 && spotsLeft <= 5;

    // 1. EVENT HAS PASSED
    if (eventDate < today) {
      return {
        type: 'ended',
        label: 'Event Ended',
        badge: 'bg-gray-500',
        alertBg: 'bg-gray-50 border-gray-200',
        icon: <XCircle className="w-5 h-5 text-gray-600" />,
        message: 'This event has already taken place.',
        canRegister: false,
        showSeats: false,
        showDeadline: false
      };
    }

    // 2. REGISTRATION DEADLINE PASSED (but event is upcoming)
    if (deadline && now > deadline) {
      return {
        type: 'deadline-closed',
        label: 'Registration Closed',
        badge: 'bg-red-500',
        alertBg: 'bg-red-50 border-red-200',
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        message: 'Registration deadline has passed.',
        canRegister: false,
        showSeats: true,
        showDeadline: true
      };
    }

    // 3. FULLY BOOKED
    if (isFull) {
      return {
        type: 'full',
        label: 'Fully Booked',
        badge: 'bg-red-500',
        alertBg: 'bg-red-50 border-red-200',
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        message: 'All spots have been filled for this event.',
        canRegister: false,
        showSeats: true,
        showDeadline: true
      };
    }

    // 4. FEW SPOTS LEFT (Urgency)
    if (isFewSpotsLeft) {
      return {
        type: 'limited',
        label: 'Few Spots Left',
        badge: 'bg-yellow-500',
        alertBg: 'bg-yellow-50 border-yellow-200',
        icon: <AlertCircle className="w-5 h-5 text-yellow-600" />,
        message: `Only ${spotsLeft} spot${spotsLeft > 1 ? 's' : ''} remaining! Register now.`,
        canRegister: true,
        showSeats: true,
        showDeadline: true,
        urgent: true
      };
    }

    // 5. OPEN FOR REGISTRATION (Good to go)
    return {
      type: 'open',
      label: 'Open Registration',
      badge: 'bg-green-500',
      alertBg: 'bg-green-50 border-green-200',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
      message: 'Registration is open. Secure your spot now!',
      canRegister: true,
      showSeats: true,
      showDeadline: true
    };
  };

  // ========================================
  // DEADLINE COUNTDOWN HELPER
  // ========================================
  const getDeadlineCountdown = () => {
    if (!event?.registrationDeadline) return null;

    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    const diff = deadline - now;

    if (diff <= 0) return 'Registration closed';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 1) return `${days} days left to register`;
    if (days === 1) return '1 day left to register';
    if (hours > 1) return `${hours} hours left to register`;
    return 'Registration closing soon!';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleJoinClick = () => {
    setShowRegistrationForm(true);
  };

  const handleRegistrationSubmit = (formData) => {
    joinMutation.mutate(formData);
  };

  const handleCloseRegistrationForm = () => {
    setShowRegistrationForm(false);
  };

  const handleCloseAll = () => {
    setShowRegistrationForm(false);
    onClose();
  };

  if (!isOpen) return null;

  const status = getEventStatus();
  const deadlineCountdown = getDeadlineCountdown();

  return (
    <>
      {/* Event Detail Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleCloseAll}
        style={{ display: showRegistrationForm ? 'none' : 'flex' }}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : event ? (
            <>
              {/* Image Header with Status Badge */}
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />

                {/* Status Badge */}
                {status && (
                  <div className={`absolute top-4 left-4 ${status.badge} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                    {status.label}
                  </div>
                )}

                {/* Close Button */}
                <button
                  onClick={handleCloseAll}
                  className="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Title */}
                <div>
                  <h2 className="text-3xl font-bold mb-2">{event.title}</h2>
                  <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {event.category}
                  </span>
                </div>

                {/* Status Alert Box */}
                {status && (
                  <div className={`flex items-start gap-3 p-4 rounded-lg border ${status.alertBg}`}>
                    {status.icon}
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{status.message}</p>

                      {/* Show deadline countdown if applicable */}
                      {status.showDeadline && deadlineCountdown && status.canRegister && (
                        <p className="text-sm text-gray-600 mt-1">
                          ⏰ {deadlineCountdown}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">About this event</h3>
                  <p className="text-gray-700 leading-relaxed">{event.description}</p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">{formatDate(event.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="font-medium">{event.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="font-medium">{event.location}</p>
                    </div>
                  </div>

                  {/* Seats Available */}
                  {status?.showSeats && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-500">Availability</p>
                        <p className="font-medium">
                          {event.currentAttendees || 0} / {event.maxAttendees || 0} registered
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Registration Deadline Display */}
                {event.registrationDeadline && status?.showDeadline && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>Registration Deadline:</strong> {formatDate(event.registrationDeadline)}
                    </p>
                  </div>
                )}

                {/* Join Button */}
                <button
                  className={`btn btn-md w-full text-white ${hasJoined
                      ? 'bg-gray-400 cursor-not-allowed'
                      : status?.canRegister
                        ? 'bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F]'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  onClick={handleJoinClick}
                  disabled={hasJoined || !status?.canRegister}
                >
                  {hasJoined
                    ? '✓ Already Registered'
                    : status?.canRegister
                      ? 'Register for Event'
                      : status?.label}
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p>Event not found</p>
            </div>
          )}
        </div>
      </div>

      {/* Registration Form Modal */}
      <RegistrationFormModal
        isOpen={showRegistrationForm}
        onClose={handleCloseRegistrationForm}
        onSubmit={handleRegistrationSubmit}
        eventTitle={event?.title || ''}
      />
    </>
  );
};

export default EventDetailModal;