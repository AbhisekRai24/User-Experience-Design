import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getNotifications, markAsRead, markAllAsRead, clearAllNotifications } from '../api/notifications';
import { Calendar, Clock, MapPin, Bell, X, Check, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const NotificationDropdown = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
    enabled: isOpen,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unreadCount']);
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unreadCount']);
      toast.success('All notifications marked as read');
    },
  });

  const clearAllMutation = useMutation({
    mutationFn: clearAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unreadCount']);
      toast.success('All notifications cleared');
    },
  });

  const handleMarkAsRead = (notificationId, e) => {
    e.stopPropagation();
    markAsReadMutation.mutate(notificationId);
  };

  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification._id);
    }
    onClose();
    // Navigate to event (you can add modal opening logic here)
    navigate(`/events`);
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'event_updated':
        return <Bell className="w-5 h-5 text-orange-500" />;
      case 'event_cancelled':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-[600px] flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="btn btn-ghost btn-sm btn-circle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="p-2 border-b border-gray-200 flex gap-2">
          <button
            onClick={() => markAllAsReadMutation.mutate()}
            className="btn btn-xs btn-ghost"
            disabled={markAllAsReadMutation.isPending}
          >
            <Check className="w-3 h-3 mr-1" />
            Mark all read
          </button>
          <button
            onClick={() => clearAllMutation.mutate()}
            className="btn btn-xs btn-ghost text-red-500"
            disabled={clearAllMutation.isPending}
          >
            Clear all
          </button>
          <button
            onClick={() => {
              navigate('/settings');
              onClose();
            }}
            className="btn btn-xs btn-ghost ml-auto"
          >
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="overflow-y-auto flex-1">
        {isLoading ? (
          <div className="p-8 text-center">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification._id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!notification.isRead ? 'bg-blue-50' : ''
                  }`}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold mb-1 ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    {notification.event && (
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(notification.event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {notification.event.time}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        {formatTimeAgo(notification.createdAt)}
                      </span>
                      {!notification.isRead && (
                        <button
                          onClick={(e) => handleMarkAsRead(notification._id, e)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;