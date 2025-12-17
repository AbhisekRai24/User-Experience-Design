import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getEvents, searchEvents } from '../api/events';
import toast from "react-hot-toast";
import { getUserHistory } from '../api/history';
import useAuthStore from '../store/authStore';
import BannerSlider from '../components/BannerSlider';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Search, X } from 'lucide-react';
import { getTopAttendees } from '../api/leaderboard'; // Make sure this import works

import TopAttendeesCarousel from '../components/TopAttendees';

const Dashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const { data: latestEvents = [] } = useQuery({
    queryKey: ['events', 'latest'],
    queryFn: () => getEvents('All Events'),
  });

  const { data: searchResults = [], refetch: refetchSearch } = useQuery({
    queryKey: ['events', 'search', searchQuery],
    queryFn: () => searchEvents(searchQuery),
    enabled: false,
  });

  const { data: userHistory = [] } = useQuery({
    queryKey: ['userHistory', user?.id],
    queryFn: () => getUserHistory(user?.id),
    enabled: !!user?.id,
  });
  const { data: leaderboardData, isLoading: leaderboardLoading, error: leaderboardError } = useQuery({
    queryKey: ['topAttendees', 'month'],
    queryFn: () => getTopAttendees('month'),
    refetchInterval: 60000, // Refetch every minute
  });

  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      await refetchSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (!user) return;

    console.log("Dashboard: user =", user);

    const displayName = user.username || "there";

    // only greet once per session
    if (!sessionStorage.getItem("hasGreeted")) {
      setTimeout(() => {
        toast.success(`How are you doing, ${displayName} Mate? 👋`, {
          duration: 5000,
        });
      }, 400); // delay so it doesn't clash with login success toast

      sessionStorage.setItem("hasGreeted", "true");
    }
  }, [user]);

  const displayEvents = isSearching ? searchResults : latestEvents.slice(0, 6);
  const upcomingEvents = userHistory.slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <section className="mb-8">
        <div className="w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events by title, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-5 pl-12 pr-24 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1AA928] focus:border-transparent"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1AA928] text-white px-4 py-1.5 rounded-md hover:bg-[#15861F] transition-colors"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {isSearching && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Search Results for "{searchQuery}"
              </h2>
              <p className="text-gray-600">
                Found {searchResults.length} event(s)
              </p>
            </div>
            <button
              onClick={handleClearSearch}
              className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            >
              Clear Search
            </button>
          </div>

          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No events found matching your search.</p>
            </div>
          )}
        </section>
      )}



      {/* Banner - Hide when searching */}
      {!isSearching && (
        <>
          <section className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600">
                  Discover new tasks
                </p>
              </div>
            </div>
          </section>
          <BannerSlider />
        </>
      )}
      {/* TOP ATTENDEES CAROUSEL - MOVE IT HERE, AFTER BANNER */}
      {!isSearching && (
        <section className="mb-12">
          <TopAttendeesCarousel
            topAttendees={leaderboardData?.topAttendees || []}
            period="month"
            isLoading={leaderboardLoading}
            error={leaderboardError}
          />
        </section>
      )}

      {/* Latest Events - Hide when searching */}
      {!isSearching && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">View the latest event</h2>
              <p className="text-gray-600">
                Discover exciting events happening in your local community
              </p>
            </div>
            <button
              className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              onClick={() => navigate('/events')}
            >
              View More
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Events - Hide when searching */}
      {!isSearching && (
        <section>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Upcoming Events</h2>
              <p className="text-gray-600">Events you've joined</p>
            </div>
            <button
              className="btn bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400"
              onClick={() => navigate('/event-history')}
            >
              View More
            </button>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="space-y-4">
              {upcomingEvents.map((historyItem) => {
                const event = historyItem.event;
                return (
                  <div
                    key={historyItem._id}
                    className="card bg-base-100 shadow-md"
                  >
                    <div className="card-body flex-row items-center gap-10">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1 pl-4">
                        <h3 className="card-title">{event.title}</h3>
                        <div className="flex flex-wrap gap-10 text-sm text-gray-600 mt-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No upcoming events. Join events to see them here!</p>
            </div>
          )}
        </section>
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