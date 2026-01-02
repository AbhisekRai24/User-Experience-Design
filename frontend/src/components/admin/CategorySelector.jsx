import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CategorySelector = ({
  selectedCategory,
  onCategoryChange,
  required = false,
  error = null,
}) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true); // 🔥 open by default

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'http://localhost:5000/api/categories?activeOnly=true'
      );

      if (!response.ok) throw new Error('Failed to fetch categories');

      const data = await response.json();
      setCategories(data.filter(cat => cat.isActive));
    } catch (err) {
      console.error(err);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-64 bg-white border rounded-xl p-4">
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="text-sm font-semibold text-gray-700">
          Categories {required && <span className="text-red-500">*</span>}
        </h3>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Loading */}
      {isLoading && isOpen && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1AA928] border-r-transparent" />
          Loading categories...
        </div>
      )}

      {/* Category List */}
      {isOpen && !isLoading && (
        <div className="flex flex-col gap-2">
          {/* All Events */}
          <button
            onClick={() => onCategoryChange('All Events')}
            className={`text-left px-3 py-2 rounded-lg border transition
              ${selectedCategory === 'All Events'
                ? 'bg-[#1AA928] text-white border-[#1AA928]'
                : 'border-gray-300 hover:bg-gray-50'
              }`}
          >
            All Events
          </button>

          {categories.map(category => (
            <button
              key={category._id}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition
                ${selectedCategory === category.name
                  ? 'text-white'
                  : 'border-gray-300 hover:bg-gray-50'
                }`}
              style={{
                backgroundColor:
                  selectedCategory === category.name
                    ? category.color
                    : 'white',
              }}
            >
              <span>{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CategorySelector;
