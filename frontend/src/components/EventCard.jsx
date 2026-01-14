import { Calendar, Clock, MapPin, Heart } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addToWishlist, removeFromWishlist, checkWishlist } from '../api/wishlist';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

const EventCard = ({ event, onViewDetails, showWishlistButton = true }) => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if event is in wishlist
  const { data: wishlistStatus } = useQuery({
    queryKey: ['wishlist-check', event._id],
    queryFn: () => checkWishlist(event._id),
    enabled: !!user && showWishlistButton,
  });

  const isInWishlist = wishlistStatus?.isInWishlist || false;

  // Add to wishlist mutation
  const addMutation = useMutation({
    mutationFn: () => addToWishlist(event._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist-check', event._id]);
      queryClient.invalidateQueries(['wishlist']);
      queryClient.invalidateQueries(['wishlist-count']);
      toast.success('Added to wishlist! ❤️');
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add to wishlist');
    },
  });

  // Remove from wishlist mutation
  const removeMutation = useMutation({
    mutationFn: () => removeFromWishlist(event._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['wishlist-check', event._id]);
      queryClient.invalidateQueries(['wishlist']);
      queryClient.invalidateQueries(['wishlist-count']);
      toast.success('Removed from wishlist');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
    },
  });

  const handleWishlistToggle = (e) => {
    e.stopPropagation();

    if (!user) {
      toast.error('Please login to add to wishlist');
      return;
    }

    if (isInWishlist) {
      removeMutation.mutate();
    } else {
      addMutation.mutate();
    }
  };

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
                group transition-transform duration-300 hover:scale-105 relative">

      {/* Wishlist Heart Button */}
      {showWishlistButton && user && (
        <button
          onClick={handleWishlistToggle}
          disabled={addMutation.isPending || removeMutation.isPending}
          className={`absolute top-4 right-4 z-10 btn btn-circle btn-sm border-2 transition-all duration-300 ${isInWishlist
              ? 'bg-red-500 border-red-500 hover:bg-red-600'
              : 'bg-white border-gray-300 hover:bg-gray-100'
            } ${isAnimating ? 'scale-125' : 'scale-100'}`}
        >
          <Heart
            className={`w-5 h-5 transition-colors ${isInWishlist ? 'fill-white text-white' : 'text-gray-600'
              }`}
          />
        </button>
      )}

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