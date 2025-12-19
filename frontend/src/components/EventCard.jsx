import { Calendar, Clock, MapPin } from 'lucide-react';

const EventCard = ({ event, onViewDetails }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden min-h-[520px] 
                group transition-transform duration-300 hover:scale-105">

      <figure className="overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-lg">{event.title}</h2>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{event.time}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-2">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>

        <div className="card-actions justify-center mt-4">
          <button
            className="btn btn-md w-full text-white bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F]"
            onClick={() => onViewDetails(event._id)}
          >
            View Details
          </button>
        </div>

      </div>
    </div>
  );
};

export default EventCard;

