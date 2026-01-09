import { Calendar, Clock, MapPin } from 'lucide-react';

const UpcomingEventsSection = ({
  upcomingEvents,
  formatDate,
  onViewMore,
  isVisible,
}) => {
  return (
    <section className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Your Upcoming Events</h2>
          <p className="text-gray-600">Events you've joined</p>
        </div>
        <button
          className="btn bg-white border-gray-300 hover:bg-gray-100"
          onClick={onViewMore}
        >
          View More
        </button>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="space-y-4">
          {upcomingEvents.map((historyItem, index) => {
            const event = historyItem.event;
            return (
              <div
                key={historyItem._id}
                className={`card bg-base-100 shadow-md hover-lift gradient-border card-shine animate-slide-in-right stagger-${index + 1}`}
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
                        {formatDate(event.date)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
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
          No upcoming events. Join events to see them here!
        </div>
      )}
    </section>
  );
};

export default UpcomingEventsSection;
