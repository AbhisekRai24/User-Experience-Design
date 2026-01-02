// src/components/EventHistoryStats.jsx
import { Calendar, Users } from 'lucide-react';

const EventHistoryStats = ({ history }) => {
    const isEventPast = (eventDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const event = new Date(eventDate);
        event.setHours(0, 0, 0, 0);
        return event < today;
    };

    const totalAttendees = history.reduce((sum, item) => sum + (item.registrationDetails?.attendees || 1), 0);
    const upcomingEvents = history.filter(item => !isEventPast(item.event.date)).length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div
                className="bg-white rounded-2xl p-6 hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)', animationDelay: '0.1s' }}
            >
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

            <div
                className="bg-white rounded-2xl p-6 hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)', animationDelay: '0.2s' }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#4BA3F2] to-[#3B8BD9] rounded-xl flex items-center justify-center">
                        <Users className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6B6B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Total Attendees
                        </p>
                        <p className="text-[24px] font-semibold text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {totalAttendees}
                        </p>
                    </div>
                </div>
            </div>

            <div
                className="bg-white rounded-2xl p-6 hover:scale-105 transition-transform duration-300 animate-fade-in-up"
                style={{ boxShadow: '0px 4px 16px rgba(0,0,0,0.06)', animationDelay: '0.3s' }}
            >
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FFB84D] to-[#E89F3C] rounded-xl flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <p className="text-[12px] text-[#6B6B6B] mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            Upcoming Events
                        </p>
                        <p className="text-[24px] font-semibold text-[#2E3A3D]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                            {upcomingEvents}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventHistoryStats;