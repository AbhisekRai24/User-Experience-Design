// src/components/EventHistoryCard.jsx
import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Mail, Phone, User, Trash2, Banknote, Gift, MoreVertical, X } from 'lucide-react';

const EventHistoryCard = ({
  historyItem,
  index,
  onCancelRegistration,
  onDeleteEvent,
  isPending
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const event = historyItem.event;
  const regDetails = historyItem.registrationDetails;

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenu]);

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

  const isEventPast = (eventDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const event = new Date(eventDate);
    event.setHours(0, 0, 0, 0);
    return event < today;
  };

  const isPast = isEventPast(event.date);

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative animate-fade-in-up"
      style={{
        boxShadow: '0px 4px 16px rgba(0,0,0,0.06)',
        animationDelay: `${index * 0.1}s`
      }}
    >
      <div className="flex flex-col md:flex-row">
        {/* Event Image */}
        <div className="relative w-full md:w-[340px] h-64 md:h-auto flex-shrink-0 overflow-hidden group">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute top-4 left-4 animate-slide-in-left">
            <div className="px-3 py-1.5 bg-[#57C478] rounded-full">
              <span className="text-[11px] font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {event.category}
              </span>
            </div>
          </div>
          {isPast && (
            <div className="absolute top-4 right-4 animate-slide-in-right">
              <div className="px-3 py-1.5 bg-gray-500 rounded-full">
                <span className="text-[11px] font-semibold text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  Past Event
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Event Details */}
        <div className="flex-1 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-3">
            <div className="flex-1">
              <h3 className="font-semibold text-[24px] text-[#2E3A3D] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {event.title}
              </h3>
              <p className="text-[12px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Registered on {formatRegisteredDate(historyItem.createdAt)}
              </p>
            </div>

            {/* 3-Dot Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 hover:rotate-90 flex items-center justify-center transition-all duration-300"
              >
                <MoreVertical className="w-5 h-5 text-[#6B6B6B]" />
              </button>

              {/* Dropdown Menu */}
              {openMenu && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 animate-slide-down-fast">
                  {!isPast && (
                    <button
                      onClick={() => {
                        onCancelRegistration(historyItem._id, event.title);
                        setOpenMenu(false);
                      }}
                      disabled={isPending}
                      className="w-full px-4 py-2 text-left text-[14px] text-red-600 hover:bg-red-50 hover:translate-x-1 transition-all flex items-center gap-2 disabled:opacity-50"
                      style={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      <X className="w-4 h-4" />
                      Cancel Registration
                    </button>
                  )}
                  <button
                    onClick={() => {
                      onDeleteEvent(historyItem._id, event.title);
                      setOpenMenu(false);
                    }}
                    disabled={isPending}
                    className="w-full px-4 py-2 text-left text-[14px] text-gray-700 hover:bg-gray-50 hover:translate-x-1 transition-all flex items-center gap-2 disabled:opacity-50"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Remove from History
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Event Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-9 h-9 bg-[#F5FAF7] rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 text-blue-600" />
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

            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-9 h-9 bg-[#E8F4FD] rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 text-blue-600" />
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

            <div className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-9 h-9 bg-[#F5FAF7] rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
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
                <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                  <User className="w-4 h-4 text-[#6B6B6B]" />
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {regDetails.name}
                  </p>
                </div>
                <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                  <Mail className="w-4 h-4 text-[#6B6B6B]" />
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {regDetails.email}
                  </p>
                </div>
                {regDetails.phone && (
                  <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Phone className="w-4 h-4 text-[#6B6B6B]" />
                    <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {regDetails.phone}
                    </p>
                  </div>
                )}
                <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                  <Users className="w-4 h-4 text-[#6B6B6B]" />
                  <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {regDetails.attendees} {regDetails.attendees === 1 ? 'Attendee' : 'Attendees'}
                  </p>
                </div>
                {regDetails.donation?.cash && (
                  <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Banknote className="w-4 h-4 text-[#6B6B6B]" />
                    <p className="text-[13px] text-[#6B6B6B]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      Cash: Rs.{regDetails.donation.cash}
                    </p>
                  </div>
                )}
                {regDetails.donation?.items && (
                  <div className="flex items-center gap-2 hover:translate-x-1 transition-transform">
                    <Gift className="w-4 h-4 text-[#6B6B6B]" />
                    <p className="text-[13px] text-[#6B6B6B] truncate" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {regDetails.donation.items}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventHistoryCard;