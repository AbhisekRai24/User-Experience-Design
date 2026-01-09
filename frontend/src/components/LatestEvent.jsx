import EventCard from '../components/EventCard'; // ⚡ add this import

const LatestEventsSection = ({
    events,
    onViewDetails,
    onViewMore,
    isVisible,
}) => {
    return (
        <section
            className={`mb-12 ${isVisible ? 'animate-fade-in-up stagger-6' : 'opacity-0'
                }`}
        >
            <div className="flex justify-between items-center mb-16"> {/* was mb-6 */}
                <div>
                    <h2 className="text-3xl font-bold mb-4">View the latest event</h2> {/* was mb-2 */}
                    <p className="text-gray-600">
                        Discover exciting events happening in your local community
                    </p>
                </div>
                <button
                    className="btn bg-white border-gray-300 hover:bg-gray-100"
                    onClick={onViewMore}
                >
                    View More
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event, index) => (
                    <div
                        key={event._id}
                        className={`animate-scale-in stagger-${(index % 6) + 1}`}
                    >
                        <EventCard event={event} onViewDetails={onViewDetails} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LatestEventsSection;
