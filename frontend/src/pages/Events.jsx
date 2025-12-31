import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';

import { getEvents, searchEvents } from '../api/events';

import useEventStore from '../store/eventStore';

import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import EventFilter from '../components/Eventfilter';
import CategorySelector from '../components/admin/CategorySelector';
import SearchBar from '../components/SearchBar';

const Events = () => {
  const { selectedCategory, setSelectedCategory } = useEventStore();

  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  /* ---------------- Fetch Events ---------------- */
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', selectedCategory],
    queryFn: () => getEvents(selectedCategory),
  });

  /* ---------------- Search Query ---------------- */
  const {
    data: searchResults = [],
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ['events', 'search', searchQuery],
    queryFn: () => searchEvents(searchQuery),
    enabled: false,
  });

  /* ---------------- Filtering & Sorting ---------------- */
  const filteredEvents = useMemo(() => {
    // Use search results if searching, otherwise use category events
    let filtered = isSearching ? [...searchResults] : [...events];
    const now = new Date();

    // Date filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);

        switch (filters.dateRange) {
          case 'today':
            return eventDate.toDateString() === now.toDateString();

          case 'this-week': {
            const weekFromNow = new Date(now);
            weekFromNow.setDate(now.getDate() + 7);
            return eventDate >= now && eventDate <= weekFromNow;
          }

          case 'this-month':
            return (
              eventDate.getMonth() === now.getMonth() &&
              eventDate.getFullYear() === now.getFullYear()
            );

          case 'upcoming':
            return eventDate >= now;

          case 'past':
            return eventDate < now;

          default:
            return true;
        }
      });
    }

    // Registration status
    if (filters.registrationStatus && filters.registrationStatus !== 'all') {
      filtered = filtered.filter(event => {
        const deadline = new Date(event.registrationDeadline);
        const threeDaysFromNow = new Date(now);
        threeDaysFromNow.setDate(now.getDate() + 3);

        switch (filters.registrationStatus) {
          case 'open':
            return deadline > now;

          case 'closing-soon':
            return deadline > now && deadline <= threeDaysFromNow;

          case 'closed':
            return deadline <= now;

          default:
            return true;
        }
      });
    }

    // Availability
    if (filters.availabilityStatus && filters.availabilityStatus !== 'all') {
      filtered = filtered.filter(event => {
        const spotsLeft = event.maxAttendees - event.currentAttendees;

        switch (filters.availabilityStatus) {
          case 'available':
            return spotsLeft > 0;

          case 'limited':
            return spotsLeft > 0 && spotsLeft < 10;

          case 'full':
            return spotsLeft === 0;

          default:
            return true;
        }
      });
    }

    // Sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        switch (filters.sortBy) {
          case 'date-asc':
            return new Date(a.date) - new Date(b.date);

          case 'date-desc':
            return new Date(b.date) - new Date(a.date);

          case 'title-asc':
            return a.title.localeCompare(b.title);

          case 'title-desc':
            return b.title.localeCompare(a.title);

          case 'spots-desc':
            return (
              (b.maxAttendees - b.currentAttendees) -
              (a.maxAttendees - a.currentAttendees)
            );

          case 'spots-asc':
            return (
              (a.maxAttendees - a.currentAttendees) -
              (b.maxAttendees - b.currentAttendees)
            );

          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);

          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [events, searchResults, filters, isSearching]);

  /* ---------------- Handlers ---------------- */
  const handleViewDetails = eventId => {
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

  /* ---------------- UI ---------------- */
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events</h1>

      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        onClear={handleClearSearch}
        onKeyPress={handleKeyPress}
        isVisible={true}
      />

      {/* Search Status Message */}
      {isSearching && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700">
            🔍 Showing search results for <span className="font-semibold">"{searchQuery}"</span>
            <button
              onClick={handleClearSearch}
              className="ml-2 text-blue-600 hover:text-blue-800 underline"
            >
              Clear search
            </button>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">

        {/* LEFT SIDEBAR */}
        <div className="space-y-6">
          <CategorySelector
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              // Clear search when changing category
              if (isSearching) {
                handleClearSearch();
              }
            }}
          />

          {/* Event Filter Component */}
          <EventFilter
            filters={filters}
            onFilterChange={setFilters}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {!isLoading && (
            <div className="mb-4 text-sm text-gray-600">
              Showing{' '}
              <span className="font-semibold text-[#1AA928]">
                {filteredEvents.length}
              </span>{' '}
              of <span className="font-semibold">{isSearching ? searchResults.length : events.length}</span> events
              {isSearching && ' (from search results)'}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard
                  key={event._id}
                  event={event}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg mb-2">
                {isSearching
                  ? `No events found matching "${searchQuery}"`
                  : 'No events found matching your filters.'
                }
              </p>
              <div className="space-x-2">
                {isSearching && (
                  <button
                    onClick={handleClearSearch}
                    className="text-[#1AA928] hover:underline text-sm"
                  >
                    Clear search
                  </button>
                )}
                <button
                  onClick={() => setFilters({})}
                  className="text-[#1AA928] hover:underline text-sm"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}
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

export default Events;