import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getEvents, searchEvents } from '../api/events';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';
import { useState, useEffect } from 'react';
import { Search, X, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const PublicEvents = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useEventStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', selectedCategory],
    queryFn: () => getEvents(selectedCategory),
  });

  const { data: searchResults = [], refetch: refetchSearch } = useQuery({
    queryKey: ['events', 'search', searchQuery],
    queryFn: () => searchEvents(searchQuery),
    enabled: false,
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ['All Events', 'Nature', 'Promotional', 'Volunteer'];

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

  const handleViewDetails = (eventId) => {
    // Show toast that prompts login to view details
    toast((t) => (
      <div className="flex flex-col gap-2">
        <p className="font-semibold">Login Required</p>
        <p className="text-sm text-gray-600">Please login or sign up to view event details and join events</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/login', { state: { from: `/events` } });
            }}
            className="btn btn-sm bg-[#1AA928] text-white hover:bg-[#15861F]"
          >
            Login
          </button>
          <button
            onClick={() => {
              toast.dismiss(t.id);
              navigate('/signup');
            }}
            className="btn btn-sm btn-outline"
          >
            Sign Up
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };

  const displayEvents = isSearching ? searchResults : events;

  return (
    <div className="container mx-auto px-4 py-8">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .stagger-1 { animation-delay: 0.1s; opacity: 0; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; }
        .stagger-5 { animation-delay: 0.5s; opacity: 0; }
        .stagger-6 { animation-delay: 0.6s; opacity: 0; }

        .search-glow:focus-within {
          box-shadow: 0 0 0 4px rgba(26, 169, 40, 0.1);
        }
      `}</style>

      {/* Header */}
      <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <h1 className="text-5xl font-bold mb-4">Explore Events</h1>
        <p className="text-xl text-gray-600">
          Discover amazing events happening in your local community
        </p>
      </div>

      {/* Search Section */}
      <section className={`mb-8 ${isVisible ? 'animate-fade-in-up stagger-1' : 'opacity-0'}`}>
        <div className="w-full max-w-3xl mx-auto">
          <div className="relative search-glow transition-all duration-300">
            <input
              type="text"
              placeholder="Search events by title, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-5 pl-12 pr-24 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1AA928] focus:border-[#1AA928] transition-all duration-300"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />

            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:scale-110"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#1AA928] text-white px-4 py-1.5 rounded-md hover:bg-[#15861F] transition-all duration-300 hover:scale-105"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      {!isSearching && (
        <div className={`flex flex-wrap gap-3 mb-8 justify-center ${isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'}`}>
          <div className="flex items-center gap-2 text-gray-600 mr-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${
                selectedCategory === category
                  ? 'bg-[#1AA928] text-white'
                  : 'btn-outline text-black border-[#1AA928]'
              } hover:bg-[#15861F] hover:text-white transition-all duration-300`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Header */}
      {isSearching && (
        <div className="flex justify-between items-center mb-6 animate-fade-in-up">
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
      )}

      {/* Events Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : displayEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((event, index) => (
            <div
              key={event._id}
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} stagger-${(index % 6) + 1}`}
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
          <p className="text-xl">
            {isSearching
              ? 'No events found matching your search.'
              : 'No events found in this category.'}
          </p>
        </div>
      )}

      {/* Login Prompt Section */}
      <div className={`mt-16 bg-gradient-to-r from-[#1AA928] to-[#15861F] rounded-2xl p-8 text-center text-white ${isVisible ? 'animate-fade-in-up stagger-4' : 'opacity-0'}`}>
        <h3 className="text-2xl font-bold mb-3">Want to Join These Events?</h3>
        <p className="text-lg mb-6 opacity-90">
          Create an account or login to join events and be part of the community
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/signup')}
            className="btn btn-lg bg-white text-[#1AA928] hover:bg-gray-100 border-white"
          >
            Sign Up Now
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-[#1AA928]"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicEvents;