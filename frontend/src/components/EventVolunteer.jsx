import { useQuery } from '@tanstack/react-query';
import { getEventVolunteers } from '../api/events';
import { Download, Users, Mail, Phone, Calendar } from 'lucide-react';
import { useState } from 'react';

const EventVolunteers = ({ eventId, eventTitle }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['volunteers', eventId],
        queryFn: () => getEventVolunteers(eventId),
        refetchInterval: 5000, // Real-time: refetch every 5 seconds
    });

    const volunteers = data?.volunteers || [];
    const totalVolunteers = data?.totalVolunteers || 0;

    // Filter volunteers based on search
    const filteredVolunteers = volunteers.filter(v =>
        v.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Export to CSV
    const exportToCSV = () => {
        const headers = ['Full Name', 'Username', 'Email', 'Phone', 'Joined Date'];
        const rows = volunteers.map(v => [
            v.fullName,
            v.username,
            v.email,
            v.phone,
            new Date(v.joinedAt).toLocaleString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${eventTitle}-volunteers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Users className="w-6 h-6" />
                        Registered Volunteers
                    </h2>
                    <p className="text-gray-600 mt-1">
                        Total: {totalVolunteers} volunteer{totalVolunteers !== 1 ? 's' : ''}
                    </p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="btn btn-primary gap-2"
                    disabled={volunteers.length === 0}
                >
                    <Download className="w-4 h-4" />
                    Export CSV
                </button>
            </div>

            {/* Search */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by name, username, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Volunteers List */}
            {filteredVolunteers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No volunteers registered yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Joined Date</th>
                                <th>Attendee</th>
                                <th>Donation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVolunteers.map((volunteer) => (
                                <tr key={volunteer.id}>
                                    <td>
                                        <div className="avatar">
                                            <div className="w-10 h-10 rounded-full">
                                                <img
                                                    src={volunteer.profileImage}
                                                    alt={volunteer.fullName}
                                                />
                                            </div>
                                        </div>
                                    </td>

                                    <td className="font-semibold">{volunteer.fullName}</td>

                                    <td className="text-gray-600">@{volunteer.username}</td>

                                    <td>
                                        <a
                                            href={`mailto:${volunteer.email}`}
                                            className="flex items-center gap-1 text-blue-600 hover:underline"
                                        >
                                            <Mail className="w-4 h-4" />
                                            {volunteer.email}
                                        </a>
                                    </td>

                                    <td>
                                        {volunteer.phone !== 'N/A' ? (
                                            <a
                                                href={`tel:${volunteer.phone}`}
                                                className="flex items-center gap-1 text-blue-600 hover:underline"
                                            >
                                                <Phone className="w-4 h-4" />
                                                {volunteer.phone}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">N/A</span>
                                        )}
                                    </td>

                                    <td className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(volunteer.joinedAt).toLocaleDateString()} {/* Only date */}
                                    </td>
                                    {/* Attendees */}
                                    <td className="text-center font-medium">{volunteer.attendees}</td>

                                    {/* Donation */}
                                    <td className="text-center">
                                        {volunteer.donation?.cash && <span>💵 Rs.{volunteer.donation.cash}</span>}
                                        {volunteer.donation?.items && <span> 🎁 {volunteer.donation.items}</span>}
                                        {!volunteer.donation?.cash && !volunteer.donation?.items && <span className="text-gray-400">None</span>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EventVolunteers;
