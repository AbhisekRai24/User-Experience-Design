

// import { useQuery } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { getEvents, searchEvents } from '../api/events';
// import toast from "react-hot-toast";
// import { getUserHistory } from '../api/history';
// import useAuthStore from '../store/authStore';
// import BannerSlider from '../components/BannerSlider';
// import EventCard from '../components/EventCard';
// import EventDetailModal from '../components/EventDetailModal';
// import { useState, useEffect } from 'react';
// import { Calendar, Clock, MapPin, Search, X, TrendingUp, Users, Sparkles } from 'lucide-react';
// import { getTopAttendees } from '../api/leaderboard';
// import TopAttendeesCarousel from '../components/TopAttendees';

// const Dashboard = () => {
//   const { user } = useAuthStore();
//   const navigate = useNavigate();
//   const [selectedEventId, setSelectedEventId] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearching, setIsSearching] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);

//   const { data: latestEvents = [] } = useQuery({
//     queryKey: ['events', 'latest'],
//     queryFn: () => getEvents('All Events'),
//   });

//   const { data: searchResults = [], refetch: refetchSearch } = useQuery({
//     queryKey: ['events', 'search', searchQuery],
//     queryFn: () => searchEvents(searchQuery),
//     enabled: false,
//   });

//   const { data: userHistory = [] } = useQuery({
//     queryKey: ['userHistory', user?.id],
//     queryFn: () => getUserHistory(user?.id),
//     enabled: !!user?.id,
//   });

//   const { data: leaderboardData, isLoading: leaderboardLoading, error: leaderboardError } = useQuery({
//     queryKey: ['topAttendees', 'month'],
//     queryFn: () => getTopAttendees('month'),
//     refetchInterval: 60000,
//   });

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleViewDetails = (eventId) => {
//     setSelectedEventId(eventId);
//     setIsModalOpen(true);
//   };

//   const handleSearch = async () => {
//     if (searchQuery.trim()) {
//       setIsSearching(true);
//       await refetchSearch();
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setIsSearching(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   useEffect(() => {
//     if (!user) return;

//     const displayName = user.username || "there";

//     if (!sessionStorage.getItem("hasGreeted")) {
//       setTimeout(() => {
//         toast.success(`How are you doing, ${displayName} Mate? 👋`, {
//           duration: 3000,
//         });
//       }, 400);

//       sessionStorage.setItem("hasGreeted", "true");
//     }
//   }, [user]);

//   const displayEvents = isSearching ? searchResults : latestEvents.slice(0, 6);
//   const upcomingEvents = userHistory.slice(0, 3);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   // Stats for the hero section
//   const stats = [
//     { label: 'Active Events', value: latestEvents.length, icon: Calendar },
//     { label: 'Your Events', value: userHistory.length, icon: Users },
//     { label: 'This Month', value: leaderboardData?.topAttendees?.length || 0, icon: TrendingUp },
//   ];

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }

//         @keyframes slideInRight {
//           from {
//             opacity: 0;
//             transform: translateX(-20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }

//         @keyframes scaleIn {
//           from {
//             opacity: 0;
//             transform: scale(0.9);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }

//         @keyframes shimmer {
//           0% {
//             background-position: -1000px 0;
//           }
//           100% {
//             background-position: 1000px 0;
//           }
//         }

//         .animate-fade-in-up {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }

//         .animate-fade-in {
//           animation: fadeIn 0.8s ease-out forwards;
//         }

//         .animate-slide-in-right {
//           animation: slideInRight 0.5s ease-out forwards;
//         }

//         .animate-scale-in {
//           animation: scaleIn 0.4s ease-out forwards;
//         }

//         .stagger-1 { animation-delay: 0.1s; opacity: 0; }
//         .stagger-2 { animation-delay: 0.2s; opacity: 0; }
//         .stagger-3 { animation-delay: 0.3s; opacity: 0; }
//         .stagger-4 { animation-delay: 0.4s; opacity: 0; }
//         .stagger-5 { animation-delay: 0.5s; opacity: 0; }
//         .stagger-6 { animation-delay: 0.6s; opacity: 0; }

//         .hover-lift {
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//         }

//         .hover-lift:hover {
//           transform: translateY(-8px);
//           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
//         }

//         .gradient-border {
//           position: relative;
//           background: white;
//           border-radius: 1rem;
//         }

//         .gradient-border::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           border-radius: 1rem;
//           padding: 2px;
//           background: linear-gradient(135deg, #1AA928, #15861F, #1AA928);
//           -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//           -webkit-mask-composite: xor;
//           mask-composite: exclude;
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }

//         .gradient-border:hover::before {
//           opacity: 1;
//         }

//         .search-glow:focus-within {
//           box-shadow: 0 0 0 4px rgba(26, 169, 40, 0.1);
//         }

//         .pulse-subtle {
//           animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         @keyframes pulse-subtle {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.8;
//           }
//         }

//         .card-shine {
//           position: relative;
//           overflow: hidden;
//         }

//         .card-shine::after {
//           content: '';
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background: linear-gradient(
//             90deg,
//             rgba(255, 255, 255, 0) 0%,
//             rgba(255, 255, 255, 0.3) 50%,
//             rgba(255, 255, 255, 0) 100%
//           );
//           transform: translateX(-100%);
//           transition: transform 0.6s ease;
//         }

//         .card-shine:hover::after {
//           transform: translateX(100%);
//         }
//       `}</style>

//       {/* Hero Stats Section */}
//       {!isSearching && (
//         <section className={`mb-12 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {stats.map((stat, index) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={stat.label}
//                   className={`card bg-gradient-to-br from-white to-gray-50 shadow-lg hover-lift card-shine stagger-${index + 1} animate-scale-in`}
//                 >
//                   <div className="card-body flex-row items-center justify-between">
//                     <div>
//                       <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
//                       <h3 className="text-4xl font-bold text-[#1AA928] mt-1">{stat.value}</h3>
//                     </div>
//                     <div className="bg-[#1AA928] bg-opacity-10 p-4 rounded-full">
//                       <Icon className="w-8 h-8 text-[#1AA928]" />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </section>
//       )}

//       {/* Search Section */}
//       <section className={`mb-8 ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
//         <div className="w-full">
//           <div className="relative search-glow transition-all duration-300">
//             <input
//               type="text"
//               placeholder="Search events by title, location, or category..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="w-full px-4 py-5 pl-12 pr-24 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1AA928] focus:border-[#1AA928] transition-all duration-300"
//             />
//             <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 transition-colors duration-300" />

//             {searchQuery && (
//               <button
//                 onClick={handleClearSearch}
//                 className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             )}

//             <button
//               onClick={handleSearch}
//               className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1AA928] text-white px-4 py-1.5 rounded-md hover:bg-[#15861F] transition-all duration-300 hover:scale-105 active:scale-95"
//             >
//               Search
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Search Results */}
//       {isSearching && (
//         <section className="mb-12 animate-fade-in">
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
//                 <Sparkles className="w-8 h-8 text-[#1AA928]" />
//                 Search Results for "{searchQuery}"
//               </h2>
//               <p className="text-gray-600">
//                 Found {searchResults.length} event(s)
//               </p>
//             </div>
//             <button
//               onClick={handleClearSearch}
//               className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105"
//             >
//               Clear Search
//             </button>
//           </div>

//           {searchResults.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {searchResults.map((event, index) => (
//                 <div key={event._id} className={`animate-scale-in stagger-${(index % 6) + 1}`}>
//                   <EventCard
//                     event={event}
//                     onViewDetails={handleViewDetails}
//                   />
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500 animate-fade-in">
//               <p>No events found matching your search.</p>
//             </div>
//           )}
//         </section>
//       )}

//       {/* Banner - Hide when searching */}
//       {!isSearching && (
//         <>
//           <section className={`mb-12 ${isVisible ? 'animate-fade-in-up stagger-3' : 'opacity-0'}`}>
//             <div className="flex justify-between items-center mb-6">
//               <div>
//                 <p className="text-gray-600 flex items-center gap-2">
//                   <Sparkles className="w-5 h-5 text-[#1AA928] pulse-subtle" />
//                   Discover new tasks
//                 </p>
//               </div>
//             </div>
//           </section>
//           <div className={isVisible ? 'animate-scale-in stagger-4' : 'opacity-0'}>
//             <BannerSlider />
//           </div>
//         </>
//       )}

//       {/* TOP ATTENDEES CAROUSEL */}
//       {!isSearching && (
//         <section className={`mb-12 ${isVisible ? 'animate-fade-in-up stagger-5' : 'opacity-0'}`}>
//           <TopAttendeesCarousel
//             topAttendees={leaderboardData?.topAttendees || []}
//             period="month"
//             isLoading={leaderboardLoading}
//             error={leaderboardError}
//           />
//         </section>
//       )}

//       {/* Latest Events - Hide when searching */}
//       {!isSearching && (
//         <section className={`mb-12 ${isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'}`}>
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-3xl font-bold mb-2">View the latest event</h2>
//               <p className="text-gray-600">
//                 Discover exciting events happening in your local community
//               </p>
//             </div>
//             <button
//               className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105"
//               onClick={() => navigate('/events')}
//             >
//               View More
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {displayEvents.map((event, index) => (
//               <div key={event._id} className={`animate-scale-in stagger-${(index % 6) + 1}`}>
//                 <EventCard
//                   event={event}
//                   onViewDetails={handleViewDetails}
//                 />
//               </div>
//             ))}
//           </div>
//         </section>
//       )}

//       {/* Upcoming Events - Hide when searching */}
//       {!isSearching && (
//         <section className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}>
//           <div className="flex justify-between items-center mb-6">
//             <div>
//               <h2 className="text-3xl font-bold mb-2">Your Upcoming Events</h2>
//               <p className="text-gray-600">Events you've joined</p>
//             </div>
//             <button
//               className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300 hover:scale-105"
//               onClick={() => navigate('/event-history')}
//             >
//               View More
//             </button>
//           </div>

//           {upcomingEvents.length > 0 ? (
//             <div className="space-y-4">
//               {upcomingEvents.map((historyItem, index) => {
//                 const event = historyItem.event;
//                 return (
//                   <div
//                     key={historyItem._id}
//                     className={`card bg-base-100 shadow-md hover-lift gradient-border card-shine animate-slide-in-right stagger-${index + 1}`}
//                   >
//                     <div className="card-body flex-row items-center gap-10">
//                       <img
//                         src={event.image}
//                         alt={event.title}
//                         className="w-24 h-24 object-cover rounded-lg transition-transform duration-300 hover:scale-110"
//                       />
//                       <div className="flex-1 pl-4">
//                         <h3 className="card-title">{event.title}</h3>
//                         <div className="flex flex-wrap gap-10 text-sm text-gray-600 mt-2">
//                           <div className="flex items-center gap-2 transition-colors duration-300 hover:text-[#1AA928]">
//                             <Calendar className="w-4 h-4" />
//                             <span>{formatDate(event.date)}</span>
//                           </div>
//                           <div className="flex items-center gap-2 transition-colors duration-300 hover:text-[#1AA928]">
//                             <Clock className="w-4 h-4" />
//                             <span>{event.time}</span>
//                           </div>
//                           <div className="flex items-center gap-2 transition-colors duration-300 hover:text-[#1AA928]">
//                             <MapPin className="w-4 h-4" />
//                             <span>{event.location}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-12 text-gray-500 animate-fade-in">
//               <p>No upcoming events. Join events to see them here!</p>
//             </div>
//           )}
//         </section>
//       )}

//       <EventDetailModal
//         eventId={selectedEventId}
//         isOpen={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedEventId(null);
//         }}
//       />
//     </div>
//   );
// };

// export default Dashboard;




import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

import { getEvents, searchEvents } from '../api/events';
import { getUserHistory } from '../api/history';
import { getTopAttendees } from '../api/leaderboard';

import useAuthStore from '../store/authStore';

import BannerSlider from '../components/BannerSlider';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import TopAttendeesCarousel from '../components/TopAttendees';

import HeroStats from '../components/HeroStatDash';
import SearchBar from '../components/SearchBar';
import LatestEventsSection from '../components/LatestEvent';
import UpcomingEventsSection from '../components/UpcomingEvent';

import { Calendar, TrendingUp, Users, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  /* ---------------- Queries ---------------- */
  const { data: latestEvents = [] } = useQuery({
    queryKey: ['events', 'latest'],
    queryFn: () => getEvents('All Events'),
  });

  const {
    data: searchResults = [],
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ['events', 'search', searchQuery],
    queryFn: () => searchEvents(searchQuery),
    enabled: false,
  });

  const { data: userHistory = [] } = useQuery({
    queryKey: ['userHistory', user?.id],
    queryFn: () => getUserHistory(user?.id),
    enabled: !!user?.id,
  });

  const {
    data: leaderboardData,
    isLoading: leaderboardLoading,
    error: leaderboardError,
  } = useQuery({
    queryKey: ['topAttendees', 'month'],
    queryFn: () => getTopAttendees('month'),
    refetchInterval: 60000,
  });

  /* ---------------- Effects ---------------- */
  useEffect(() => setIsVisible(true), []);

  useEffect(() => {
    if (!user) return;

    if (!sessionStorage.getItem('hasGreeted')) {
      toast.success(`How are you doing, ${user.username || 'there'} Mate? 👋`);
      sessionStorage.setItem('hasGreeted', 'true');
    }
  }, [user]);

  /* ---------------- Handlers ---------------- */
  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    await refetchSearch();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  /* ---------------- Helpers ---------------- */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  /* ---------------- Derived ---------------- */
  const displayEvents = isSearching
    ? searchResults
    : latestEvents.slice(0, 6);

  const upcomingEvents = userHistory.slice(0, 3);

  const stats = [
    { label: 'Active Events', value: latestEvents.length, icon: Calendar },
    { label: 'Your Events', value: userHistory.length, icon: Users },
    {
      label: 'This Month',
      value: leaderboardData?.topAttendees?.length || 0,
      icon: TrendingUp,
    },
  ];

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto px-4 py-8">
      {!isSearching && (
        <HeroStats stats={stats} isVisible={isVisible} />
      )}

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onKeyPress={handleKeyPress}
        isVisible={isVisible}
      />

      {/* SEARCH RESULTS */}
      {isSearching && (
        <section className="mb-12 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold flex items-center gap-2">
                <Sparkles className="w-7 h-7 text-[#1AA928]" />
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {searchResults.length} event(s)
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="btn bg-white border-gray-300 hover:bg-gray-100"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((event, index) => (
                <div
                  key={event._id}
                  className={`animate-scale-in stagger-${(index % 6) + 1}`}
                >
                  <EventCard
                    event={event}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No events found matching your search.
            </div>
          )}
        </section>
      )}

      {!isSearching && (
        <>
          <BannerSlider />

          <div className="mb-12">
            <TopAttendeesCarousel
              topAttendees={leaderboardData?.topAttendees || []}
              period="month"
              isLoading={leaderboardLoading}
              error={leaderboardError}
            />
          </div>

          <LatestEventsSection
            events={displayEvents}
            onViewDetails={handleViewDetails}
            onViewMore={() => navigate('/events')}
            isVisible={isVisible}
          />

          <UpcomingEventsSection
            upcomingEvents={upcomingEvents}
            formatDate={formatDate}
            onViewMore={() => navigate('/event-history')}
            isVisible={isVisible}
          />
        </>
      )}

      <EventDetailModal
        eventId={selectedEventId}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEventId(null);
        }}
      />
    </div>
  );
};

export default Dashboard;
