import { useQuery } from '@tanstack/react-query';
import { getWishlist } from '../api/wishlist';
import EventCard from '../components/EventCard';
import EventDetailModal from '../components/EventDetailModal';
import { useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

const Wishlist = () => {
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: wishlistEvents = [], isLoading } = useQuery({
        queryKey: ['wishlist'],
        queryFn: getWishlist,
    });

    const handleViewDetails = (eventId) => {
        setSelectedEventId(eventId);
        setIsModalOpen(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                    <h1 className="text-4xl font-bold">My Wishlist</h1>
                </div>
                <p className="text-gray-600 text-lg">
                    {wishlistEvents.length > 0
                        ? `You have ${wishlistEvents.length} event${wishlistEvents.length > 1 ? 's' : ''} saved`
                        : 'Save your favorite events here'
                    }
                </p>
            </div>

            {/* Loading State */}
            {isLoading ? (
                <div className="text-center py-12">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            ) : wishlistEvents.length > 0 ? (
                /* Events Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistEvents.map((event) => (
                        <EventCard
                            key={event._id}
                            event={event}
                            onViewDetails={handleViewDetails}
                            showWishlistButton={true}
                        />
                    ))}
                </div>
            ) : (
                /* Empty State */
                <div className="text-center py-20">
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <Heart className="w-24 h-24 text-gray-300" />
                            <Sparkles className="w-8 h-8 text-gray-400 absolute -top-2 -right-2 animate-pulse" />
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-700 mb-3">
                        Your Wishlist is Empty
                    </h2>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                        Start exploring events and click the heart icon to save your favorites here!
                    </p>
                    <button
                        onClick={() => window.location.href = '/events'}
                        className="btn bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F] px-8"
                    >
                        Explore Events
                    </button>
                </div>
            )}

            {/* Event Detail Modal */}
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

export default Wishlist;