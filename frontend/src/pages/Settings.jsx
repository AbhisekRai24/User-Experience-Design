import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { Bell, BellOff } from 'lucide-react';
import api from '../api/axios';

const Settings = () => {
  const { user, setUser } = useAuthStore();
  const queryClient = useQueryClient();
  
  const [notificationSettings, setNotificationSettings] = useState({
    eventReminders: user?.notificationSettings?.eventReminders ?? true,
  });

  const updateSettingsMutation = useMutation({
    mutationFn: async (settings) => {
      const response = await api.put('/auth/settings', {
        notificationSettings: settings,
      });
      return response.data;
    },
    onSuccess: (data) => {
      setUser(data.user);
      queryClient.invalidateQueries(['user']);
      toast.success('Settings updated successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update settings');
    },
  });

  const handleToggleReminders = () => {
    const newSettings = {
      ...notificationSettings,
      eventReminders: !notificationSettings.eventReminders,
    };
    setNotificationSettings(newSettings);
    updateSettingsMutation.mutate(newSettings);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      {/* Notification Settings Card */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4 flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Notification Settings
          </h2>

          {/* Event Reminders Toggle */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {notificationSettings.eventReminders ? (
                    <Bell className="w-5 h-5 text-blue-500" />
                  ) : (
                    <BellOff className="w-5 h-5 text-gray-400" />
                  )}
                  <h3 className="text-lg font-semibold">Event Reminders</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Receive notifications 24 hours before events you've joined.
                  This helps you remember to attend on time.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={notificationSettings.eventReminders}
                  onChange={handleToggleReminders}
                  disabled={updateSettingsMutation.isPending}
                />
              </div>
            </div>
          </div>

          {/* Admin Updates (Always Enabled) */}
          <div className="pb-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold">Admin Updates</h3>
                  <span className="badge badge-sm">Always On</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Important notifications about event changes or cancellations
                  by administrators. These notifications cannot be disabled to
                  ensure you stay informed about critical updates.
                </p>
              </div>
              <div className="ml-4">
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={true}
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h3 className="font-bold">About Notifications</h3>
          <div className="text-sm">
            <p>Event reminders are sent daily at 9:00 AM for events happening in the next 24-48 hours.</p>
            <p className="mt-1">Admin update notifications are sent instantly when changes occur.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;