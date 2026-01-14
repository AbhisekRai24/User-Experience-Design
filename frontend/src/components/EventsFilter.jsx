import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const EventFilterSidebar = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);

  const [filters, setFilters] = useState({
    dateRange: 'all',
    registrationStatus: 'all',
    availabilityStatus: 'all',
    sortBy: '',
  });

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearFilters = () => {
    const cleared = {
      dateRange: 'all',
      registrationStatus: 'all',
      availabilityStatus: 'all',
      sortBy: '',
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="bg-white border rounded-xl p-4">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="text-sm font-semibold text-gray-700">
          Filters & Sort
        </h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="space-y-5">

          {/* DATE */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Date</p>
            <div className="flex flex-col gap-2">
              {[
                ['all', 'All'],
                ['today', 'Today'],
                ['this-week', 'This Week'],
                ['this-month', 'This Month'],
                ['upcoming', 'Upcoming'],
                ['past', 'Past'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => updateFilter('dateRange', value)}
                  className={`text-left px-3 py-2 rounded-lg border transition
                    ${filters.dateRange === value
                      ? 'bg-[#1AA928] text-white border-[#1AA928]'
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* REGISTRATION */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Registration</p>
            <div className="flex flex-col gap-2">
              {[
                ['all', 'All'],
                ['open', 'Open'],
                ['closing-soon', 'Closing Soon'],
                ['closed', 'Closed'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => updateFilter('registrationStatus', value)}
                  className={`text-left px-3 py-2 rounded-lg border transition
                    ${filters.registrationStatus === value
                      ? 'bg-[#1AA928] text-white border-[#1AA928]'
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* AVAILABILITY */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Availability</p>
            <div className="flex flex-col gap-2">
              {[
                ['all', 'All'],
                ['available', 'Available'],
                ['limited', 'Limited (<10)'],
                ['full', 'Full'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => updateFilter('availabilityStatus', value)}
                  className={`text-left px-3 py-2 rounded-lg border transition
                    ${filters.availabilityStatus === value
                      ? 'bg-[#1AA928] text-white border-[#1AA928]'
                      : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* SORT */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2">Sort By</p>
            <select
              value={filters.sortBy}
              onChange={e => updateFilter('sortBy', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1AA928]"
            >
              <option value="">Default</option>
              <option value="date-asc">Date ↑</option>
              <option value="date-desc">Date ↓</option>
              <option value="title-asc">Title A–Z</option>
              <option value="title-desc">Title Z–A</option>
              <option value="spots-asc">Spots ↑</option>
              <option value="spots-desc">Spots ↓</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* CLEAR */}
          <button
            onClick={clearFilters}
            className="w-full text-sm border border-[#1AA928] text-[#1AA928] rounded-lg py-2 hover:bg-[#1AA928] hover:text-white transition"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default EventFilterSidebar;
