// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { getUserHistory, removeFromHistory } from '../api/history';
// import useAuthStore from '../store/authStore';
// import toast from 'react-hot-toast';
// import { Calendar, Clock, MapPin, Users, Trash2 } from 'lucide-react';

// const EventHistory = () => {
//   const { user } = useAuthStore();
//   const queryClient = useQueryClient();

//   const { data: history = [], isLoading } = useQuery({
//     queryKey: ['userHistory', user?.id],
//     queryFn: () => getUserHistory(user?.id),
//     enabled: !!user?.id,
//   });

//   const removeMutation = useMutation({
//     mutationFn: removeFromHistory,
//     onSuccess: () => {
//       toast.success('Event removed from history');
//       queryClient.invalidateQueries(['userHistory', user?.id]);
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.message || 'Failed to remove event');
//     },
//   });

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric',
//     });
//   };

//   if (isLoading) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center py-12">
//           <span className="loading loading-spinner loading-lg"></span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-4xl font-bold mb-8">Event History</h1>

//       {history.length > 0 ? (
//         <div className="space-y-4">
//           {history.map((historyItem) => {
//             const event = historyItem.event;
//             return (
//               <div
//                 key={historyItem._id}
//                 className="card bg-base-100 shadow-md"
//               >
//                 <div className="card-body flex-row items-center gap-4">
//                   <img
//                     src={event.image}
//                     alt={event.title}
//                     className="w-24 h-24 object-cover rounded-lg"
//                   />
//                   <div className="flex-1">
//                     <h3 className="card-title text-xl">{event.title}</h3>
//                     <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
//                       <div className="flex items-center gap-1">
//                         <Calendar className="w-4 h-4" />
//                         <span>{formatDate(event.date)}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="w-4 h-4" />
//                         <span>{event.time}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <MapPin className="w-4 h-4" />
//                         <span>{event.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Users className="w-4 h-4" />
//                         <span>{event.attendees} attendees</span>
//                       </div>
//                     </div>
//                   </div>
//                   <button
//                     className="btn btn-error btn-sm"
//                     onClick={() => removeMutation.mutate(historyItem._id)}
//                     disabled={removeMutation.isPending}
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       ) : (
//         <div className="text-center py-12 text-gray-500">
//           <p>No events in your history. Join events to see them here!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventHistory;

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserHistory, removeFromHistory } from '../api/history';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Clock, Users, Mail, Phone, User, Trash2, DollarSign, Gift } from 'lucide-react';

const EventHistory = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: history = [], isLoading } = useQuery({
    queryKey: ['userHistory', user?.id],
    queryFn: () => getUserHistory(user?.id),
    enabled: !!user?.id,
  });

  const removeMutation = useMutation({
    mutationFn: removeFromHistory,
    onSuccess: () => {
      toast.success('Event removed from history');
      queryClient.invalidateQueries(['userHistory', user?.id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove event');
    },
  });

  const handleDeleteEvent = (historyId, eventTitle) => {
    if (window.confirm(`Are you sure you want to remove "${eventTitle}" from your registered events?`)) {
      removeMutation.mutate(historyId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatRegisteredDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="px-4 md:px-8 lg:px-[120px] pt-8 pb-12 min-h-screen">
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-[120px] pt-8 pb-12 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-semibold text-[32px] text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Event History
        </h1>
        <p className="text-[16px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
          View all events you've signed for
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#57C478] to-[#3DA65E] rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-[12px] text-[#6B6B6B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Total Events
              </p>
              <p className="text-[24px] font-semibold text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {history.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#4BA3F2] to-[#3B8BD9] rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-[12px] text-[#6B6B6B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Total Attendees
              </p>
              <p className="text-[24px] font-semibold text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {history.reduce((sum, item) => sum + (item.registrationDetails?.attendees || 1), 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6" style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#FFB84D] to-[#E89F3C] rounded-xl flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-[12px] text-[#6B6B6B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Upcoming Events
              </p>
              <p className="text-[24px] font-semibold text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {history.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Registered Events List */}
      {history.length === 0 ? (
        <div className="bg-white rounded-3xl p-16 text-center" style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)' }}>
          <div className="w-24 h-24 bg-[#F5FAF7] rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar className="w-12 h-12 text-[#6B6B6B]" />
          </div>
          <h3 className="font-semibold text-[24px] text-[#2E3A3D] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
            No Events Yet
          </h3>
          <p className="text-[16px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
            You haven't registered for any events. Explore events and start connecting with your community!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((historyItem) => {
            const event = historyItem.event;
            const regDetails = historyItem.registrationDetails;

            return (
              <div
                key={historyItem._id}
                className="bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-shadow"
                style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)' }}
              >
                {/* <div className="flex flex-col md:flex-row"> */}
                <div className="flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Event Image */}
                  {/* <div className="relative w-full md:w-[340px] h-auto md:h-full flex-shrink-0"> */}
                  <div className="relative w-full md:w-[340px] h-64 md:h-auto flex-shrink-0">


                    <img
                      src={event.image}
                      alt={event.title}
                      // className="w-full h-full object-cover md:object-cover"
                      className="w-full h-full object-left rounded-3xl"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="px-3 py-1.5 bg-[#57C478] rounded-full">
                        <span className="text-[11px] font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {event.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
                      <div>
                        <h3 className="font-semibold text-[24px] text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          {event.title}
                        </h3>
                        <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Registered on {formatRegisteredDate(historyItem.createdAt)}
                        </p>
                      </div>
                      {/* <div className="px-4 py-2 bg-[#E8F7EC] rounded-full">
                        <span className="text-[12px] font-semibold text-[#1AA928]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Confirmed
                        </span>
                      </div> */}
                    </div>

                    {/* Event Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#F5FAF7] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-4 h-4 text-[#57C478]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Date
                          </p>
                          <p className="text-[13px] font-medium text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {formatDate(event.date)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#E8F4FD] rounded-lg flex items-center justify-center flex-shrink-0">
                          <Clock className="w-4 h-4 text-[#4BA3F2]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Time
                          </p>
                          <p className="text-[13px] font-medium text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {event.time}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 bg-[#F5FAF7] rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-4 h-4 text-[#57C478]" />
                        </div>
                        <div>
                          <p className="text-[10px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Location
                          </p>
                          <p className="text-[13px] font-medium text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {event.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Registration Info */}
                    {regDetails && (
                      <div className="border-t border-[#E6E6E6] pt-4">
                        <p className="text-[12px] font-medium text-[#2E3A3D] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                          Registration Details
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#6B6B6B]" />
                            <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {regDetails.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-[#6B6B6B]" />
                            <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {regDetails.email}
                            </p>
                          </div>
                          {regDetails.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-[#6B6B6B]" />
                              <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {regDetails.phone}
                              </p>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[#6B6B6B]" />
                            <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                              {regDetails.attendees} {regDetails.attendees === 1 ? 'Attendee' : 'Attendees'}
                            </p>
                          </div>
                          {regDetails.donation?.cash && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-[#6B6B6B]" />
                              <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                Cash Donation: Rs.{regDetails.donation.cash}
                              </p>
                            </div>
                          )}
                          {regDetails.donation?.items && (
                            <div className="flex items-center gap-2">
                              <Gift className="w-4 h-4 text-[#6B6B6B]" />
                              <p className="text-[13px] text-[#6B6B6B] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                                {regDetails.donation.items}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Delete Button */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => handleDeleteEvent(historyItem._id, event.title)}
                        disabled={removeMutation.isPending}
                        className="h-[48px] px-6 bg-red-500 text-white rounded-xl text-[14px] font-medium hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                        style={{ fontFamily: 'Poppins, sans-serif' }}
                      >
                        <Trash2 className="w-4 h-4" />
                        {removeMutation.isPending ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EventHistory;