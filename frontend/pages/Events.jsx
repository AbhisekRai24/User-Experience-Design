import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../api/events';
import useEventStore from '../store/eventStore';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import { useState } from 'react';

const Events = () => {
  const { selectedCategory, setSelectedCategory } = useEventStore();
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events', selectedCategory],
    queryFn: () => getEvents(selectedCategory),
  });

  const categories = ['All Events', 'Nature', 'Promotional', 'Volunteer'];

  const handleViewDetails = (eventId) => {
    setSelectedEventId(eventId);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Events</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${selectedCategory === category
              ? 'bg-[#1AA928] text-white' // Active button style with green color and blck non selected
              : 'btn-outline text-black border-[#1AA928]'} 
              hover:bg-[#15861F] hover:text-white transition-all duration-300`}

            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No events found in this category.</p>
        </div>
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

export default Events;

