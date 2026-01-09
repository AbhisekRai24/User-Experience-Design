import { Search, X } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  onClear,
  onKeyPress,
  isVisible,
}) => {
  return (
    <section
      className={`mb-8 ${
        isVisible ? 'animate-fade-in-up stagger-2' : 'opacity-0'
      }`}
    >
      <div className="relative search-glow transition-all duration-300">
        <input
          type="text"
          placeholder="Search events by title, location, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={onKeyPress}
          className="w-full px-4 py-5 pl-12 pr-24 rounded-xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1AA928]"
        />

        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        {searchQuery && (
          <button
            onClick={onClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={onSearch}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1AA928] text-white px-4 py-1.5 rounded-md hover:bg-[#15861F]"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default SearchBar;
