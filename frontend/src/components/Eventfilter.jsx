import { useState } from 'react';

const EventFilter = ({ onFilterChange, initialFilters = {} }) => {
    const [filters, setFilters] = useState({
        dateRange: initialFilters.dateRange || 'all',
        registrationStatus: initialFilters.registrationStatus || 'all',
        availabilityStatus: initialFilters.availabilityStatus || 'all',
        sortBy: initialFilters.sortBy || 'date-asc',
    });

    const filterOptions = {
        dateRange: [
            { value: 'all', label: 'All Dates' },
            { value: 'today', label: 'Today' },
            { value: 'this-week', label: 'This Week' },
            { value: 'this-month', label: 'This Month' },
            { value: 'upcoming', label: 'Upcoming' },
            { value: 'past', label: 'Past' },
        ],
        registrationStatus: [
            { value: 'all', label: 'All' },
            { value: 'open', label: 'Open' },
            { value: 'closing-soon', label: 'Closing Soon' },
            { value: 'closed', label: 'Closed' },
        ],
        availabilityStatus: [
            { value: 'all', label: 'All' },
            { value: 'available', label: 'Available' },
            { value: 'limited', label: 'Limited (<10)' },
            { value: 'full', label: 'Full' },
        ],
        sortBy: [
            { value: 'date-asc', label: 'Date ↑' },
            { value: 'date-desc', label: 'Date ↓' },
            { value: 'title-asc', label: 'Title A–Z' },
            { value: 'title-desc', label: 'Title Z–A' },
            { value: 'spots-desc', label: 'Most Spots' },
            { value: 'spots-asc', label: 'Least Spots' },
            { value: 'newest', label: 'Newest' },
        ],
    };

    const handleChange = (key, value) => {
        const updated = { ...filters, [key]: value };
        setFilters(updated);
        onFilterChange(updated);
    };

    const clearFilters = () => {
        const reset = {
            dateRange: 'all',
            registrationStatus: 'all',
            availabilityStatus: 'all',
            sortBy: 'date-asc',
        };
        setFilters(reset);
        onFilterChange(reset);
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filter Events</h3>
                <button
                    onClick={clearFilters}
                    className="text-sm text-[#1AA928] hover:underline"
                >
                    Reset
                </button>
            </div>

            <div className="space-y-4">
                {/* Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <select
                        value={filters.dateRange}
                        onChange={(e) => handleChange('dateRange', e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:ring-[#1AA928]"
                    >
                        {filterOptions.dateRange.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                {/* Registration */}
                <div>
                    <label className="block text-sm font-medium mb-1">Registration</label>
                    <select
                        value={filters.registrationStatus}
                        onChange={(e) => handleChange('registrationStatus', e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:ring-[#1AA928]"
                    >
                        {filterOptions.registrationStatus.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                {/* Availability */}
                <div>
                    <label className="block text-sm font-medium mb-1">Availability</label>
                    <select
                        value={filters.availabilityStatus}
                        onChange={(e) => handleChange('availabilityStatus', e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:ring-[#1AA928]"
                    >
                        {filterOptions.availabilityStatus.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div>
                    <label className="block text-sm font-medium mb-1">Sort By</label>
                    <select
                        value={filters.sortBy}
                        onChange={(e) => handleChange('sortBy', e.target.value)}
                        className="w-full rounded-lg border-gray-300 focus:ring-[#1AA928]"
                    >
                        {filterOptions.sortBy.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default EventFilter;
