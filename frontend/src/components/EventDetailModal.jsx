// import { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getEventById } from '../api/events';
// import { joinEvent, getUserHistory } from '../api/history';
// import useAuthStore from '../store/authStore';
// import toast from 'react-hot-toast';
// import { MapPin, Calendar, Clock, Users } from 'lucide-react';

// const EventDetailModal = ({ eventId, isOpen, onClose }) => {
//   const { user } = useAuthStore();
//   const queryClient = useQueryClient();
//   const [hasJoined, setHasJoined] = useState(false);

//   const { data: event, isLoading } = useQuery({
//     queryKey: ['event', eventId],
//     queryFn: () => getEventById(eventId),
//     enabled: isOpen && !!eventId,
//   });

//   const { data: userHistory } = useQuery({
//     queryKey: ['userHistory', user?.id],
//     queryFn: () => getUserHistory(user?.id),
//     enabled: !!user?.id,
//   });

//   useEffect(() => {
//     if (userHistory && eventId) {
//       const joined = userHistory.some(
//         (item) => item.event._id === eventId
//       );
//       setHasJoined(joined);
//     }
//   }, [userHistory, eventId]);

//   const joinMutation = useMutation({
//     mutationFn: () => joinEvent(eventId),
//     onSuccess: () => {
//       toast.success('Added to your event history');
//       setHasJoined(true);
//       queryClient.invalidateQueries(['userHistory', user?.id]);
//       queryClient.invalidateQueries(['event', eventId]);
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to join event');
//     },
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   if (!isOpen) return null;

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {isLoading ? (
//           <div className="p-8 text-center">
//             <span className="loading loading-spinner loading-lg"></span>
//           </div>
//         ) : event ? (
//           <>
//             <div className="relative">
//               <img
//                 src={event.image}
//                 alt={event.title}
//                 className="w-full h-64 md:h-80 object-cover"
//               />
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-gray-200"
//               >
//                 ✕
//               </button>
//             </div>

//             <div className="p-6">
//               <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//               <p className="text-gray-700 mb-6">{event.description}</p>

//               <div className="space-y-4 mb-6">
//                 <div className="flex items-center gap-3">
//                   <MapPin className="w-5 h-5 " />
//                   <span className="text-lg">{event.location}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Calendar className="w-5 h-5 " />
//                   <span className="text-lg">{formatDate(event.date)}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Clock className="w-5 h-5 " />
//                   <span className="text-lg">{event.time}</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Users className="w-5 h-5 " />
//                   <span className="text-lg">{event.attendees} attendees</span>
//                 </div>
//               </div>

//               <button
//                 className={`btn w-full ${
//                   hasJoined ? 'btn-disabled' : 'btn-success'
//                 }`}
//                 onClick={() => !hasJoined && joinMutation.mutate()}
//                 disabled={hasJoined || joinMutation.isPending}
//               >
//                 {hasJoined
//                   ? 'Joined'
//                   : joinMutation.isPending
//                   ? 'Joining...'
//                   : 'Join Event'}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="p-8 text-center">
//             <p>Event not found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EventDetailModal;

// import { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getEventById } from '../api/events';
// import { joinEvent, getUserHistory } from '../api/history';
// import useAuthStore from '../store/authStore';
// import toast from 'react-hot-toast';
// import { MapPin, Calendar, Clock, Users } from 'lucide-react';
// import RegistrationFormModal from './RegistrationFormModal';

// const EventDetailModal = ({ eventId, isOpen, onClose }) => {
//   const { user } = useAuthStore();
//   const queryClient = useQueryClient();
//   const [hasJoined, setHasJoined] = useState(false);
//   const [showRegistrationForm, setShowRegistrationForm] = useState(false);

//   const { data: event, isLoading } = useQuery({
//     queryKey: ['event', eventId],
//     queryFn: () => getEventById(eventId),
//     enabled: isOpen && !!eventId,
//   });

//   const { data: userHistory } = useQuery({
//     queryKey: ['userHistory', user?.id],
//     queryFn: () => getUserHistory(user?.id),
//     enabled: !!user?.id,
//   });

//   useEffect(() => {
//     if (userHistory && eventId) {
//       const joined = userHistory.some(
//         (item) => item.event._id === eventId
//       );
//       setHasJoined(joined);
//     }
//   }, [userHistory, eventId]);

//   // const joinMutation = useMutation({
//   //   mutationFn: (registrationData) => joinEvent(eventId, registrationData),
//   //   onSuccess: () => {
//   //     toast.success('Successfully registered for the event!');
//   //     setHasJoined(true);
//   //     setShowRegistrationForm(false);
//   //     queryClient.invalidateQueries(['userHistory', user?.id]);
//   //     queryClient.invalidateQueries(['event', eventId]);
//   //   },
//   //   onError: (error) => {
//   //     toast.error(error.response?.data?.message || 'Failed to register for event');
//   //   },
//   // });
//   const joinMutation = useMutation({
//     mutationFn: (registrationData) => joinEvent(eventId, registrationData),
//     onSuccess: () => {
//       toast.success('Successfully registered for the event!');
//       setHasJoined(true);
//       setShowRegistrationForm(false);
//       queryClient.invalidateQueries(['userHistory', user?.id]);
//       queryClient.invalidateQueries(['event', eventId]);

//       // Close the EventDetailModal after successful registration
//       setTimeout(() => {
//         onClose();
//       }, 1500); // Wait 1.5 seconds to show the toast, then close
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to register for event');
//     },
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       month: 'long',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   const handleJoinClick = () => {
//     setShowRegistrationForm(true);
//   };

//   const handleRegistrationSubmit = (formData) => {
//     joinMutation.mutate(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
//         onClick={onClose}
//       >
//         <div
//           className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {isLoading ? (
//             <div className="p-8 text-center">
//               <span className="loading loading-spinner loading-lg"></span>
//             </div>
//           ) : event ? (
//             <>
//               <div className="relative">
//                 <img
//                   src={event.image}
//                   alt={event.title}
//                   className="w-full h-64 md:h-80 object-cover"
//                 />
//                 <button
//                   onClick={onClose}
//                   className="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-gray-200"
//                 >
//                   ✕
//                 </button>
//               </div>

//               <div className="p-6">
//                 <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
//                 <p className="text-gray-700 mb-6">{event.description}</p>

//                 <div className="space-y-4 mb-6">
//                   <div className="flex items-center gap-3">
//                     <MapPin className="w-5 h-5 " />
//                     <span className="text-lg">{event.location}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Calendar className="w-5 h-5 " />
//                     <span className="text-lg">{formatDate(event.date)}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Clock className="w-5 h-5 " />
//                     <span className="text-lg">{event.time}</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Users className="w-5 h-5 " />
//                     <span className="text-lg">{event.attendees} attendees</span>
//                   </div>
//                 </div>

//                 <button
//                   className={`btn w-full ${hasJoined ? 'btn-disabled' : 'btn-success'
//                     }`}
//                   onClick={handleJoinClick}
//                   disabled={hasJoined}
//                 >
//                   {hasJoined ? 'Already Joined' : 'Join Event'}
//                 </button>
//               </div>
//             </>
//           ) : (
//             <div className="p-8 text-center">
//               <p>Event not found</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Registration Form Modal */}
//       <RegistrationFormModal
//         isOpen={showRegistrationForm}
//         onClose={() => setShowRegistrationForm(false)}
//         onSubmit={handleRegistrationSubmit}
//         eventTitle={event?.title || ''}
//       />
//     </>
//   );
// };

// export default EventDetailModal;

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getEventById } from '../api/events';
import { joinEvent, getUserHistory } from '../api/history';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
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

      // Close everything after success
      setTimeout(() => {
        onClose();
      }, 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to register for event');
    },
  });

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
    // Open registration form and keep event detail modal open (don't close it yet)
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

  return (
    <>
      {/* Event Detail Modal */}
      {/* <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleCloseAll}
        style={{ display: showRegistrationForm ? 'none' : 'flex' }}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : event ? (
            <>
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={handleCloseAll}
                  className="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 " />
                    <span className="text-lg">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 " />
                    <span className="text-lg">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 " />
                    <span className="text-lg">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 " />
                    <span className="text-lg">{event.attendees} attendees</span>
                  </div>
                </div>

                <button
                  className={`btn w-full ${hasJoined ? 'btn-disabled' : 'btn-success'
                    }`}
                  onClick={handleJoinClick}
                  disabled={hasJoined}
                >
                  {hasJoined ? 'Already Joined' : 'Join Event'}
                </button>
              </div>
            </>
          ) : (
            <div className="p-8 text-center">
              <p>Event not found</p>
            </div>
          )}
        </div>
      </div> */}

      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={handleCloseAll}
        style={{ display: showRegistrationForm ? 'none' : 'flex' }}
      >
        <div
          className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[95vh] overflow-y-auto" // Increased max-w and max-h
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="p-8 text-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : event ? (
            <>
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <button
                  onClick={handleCloseAll}
                  className="absolute top-4 right-4 btn btn-circle btn-sm bg-white hover:bg-gray-200"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
                <p className="text-gray-700 mb-6">{event.description}</p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 " />
                    <span className="text-lg">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 " />
                    <span className="text-lg">{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 " />
                    <span className="text-lg">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 " />
                    <span className="text-lg">{event.attendees} attendees</span>
                  </div>
                </div>

                <button
                  // className={`btn btn-md w-full text-white bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F] ${hasJoined ? 'btn-disabled' : 'btn-success'}`}
                  className={`btn btn-md w-full text-white bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F] ${hasJoined ? 'btn-disabled' : 'btn-success'}`}

                  onClick={handleJoinClick}
                  disabled={hasJoined}
                >
                  {hasJoined ? 'Already Joined' : 'Join Event'}
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