import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Save, X } from 'lucide-react';
import useAuthStore from '../../store/authStore'; // Import your auth store

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: '#1AA928',
        icon: '📋',
    });

    const API_URL = 'http://localhost:5000/api/categories';

    // ✅ GET TOKEN FROM ZUSTAND STORE
    const { accessToken } = useAuthStore();

    // Get token helper function
    const getToken = () => {
        console.log('🔍 Token from Zustand:', accessToken);
        return accessToken;
    };

    // Fetch categories on mount
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        setIsLoading(true);
        try {
            const token = getToken();
            const response = await fetch(`${API_URL}?activeOnly=false`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Failed to load categories. Please check your connection.');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            color: '#1AA928',
            icon: '📋',
        });
    };

    const handleSubmit = async () => {
        if (!formData.name.trim()) {
            alert('Category name is required');
            return;
        }

        try {
            const token = getToken();

            // Debug logging
            console.log('🔍 Token being sent:', token);
            console.log('🔍 Token length:', token?.length);

            if (!token) {
                alert('You are not authenticated. Please log in again.');
                return;
            }

            if (editingId) {
                // Update existing category
                const response = await fetch(`${API_URL}/${editingId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to update category');
                }

                const updatedCategory = await response.json();
                setCategories(prev => prev.map(cat =>
                    cat._id === editingId ? updatedCategory : cat
                ));
                alert('Category updated successfully!');
            } else {
                // Create new category
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || 'Failed to create category');
                }

                const newCategory = await response.json();
                setCategories(prev => [newCategory, ...prev]);
                alert('Category created successfully!');
            }

            setIsCreating(false);
            setEditingId(null);
            resetForm();
        } catch (error) {
            console.error('Error saving category:', error);
            alert(error.message || 'Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormData({
            name: category.name,
            description: category.description || '',
            color: category.color,
            icon: category.icon,
        });
        setIsCreating(true);
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingId(null);
        resetForm();
    };

    const handleDelete = async (id, name, eventCount) => {
        if (eventCount > 0) {
            alert(`Cannot delete "${name}". ${eventCount} event(s) are using this category.`);
            return;
        }

        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to delete category');
            }

            setCategories(prev => prev.filter(cat => cat._id !== id));
            alert('Category deleted successfully!');
        } catch (error) {
            console.error('Error deleting category:', error);
            alert(error.message || 'Failed to delete category');
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            const token = getToken();
            const response = await fetch(`${API_URL}/${id}/toggle-status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to toggle category status');
            }

            const updatedCategory = await response.json();
            setCategories(prev => prev.map(cat =>
                cat._id === id ? updatedCategory : cat
            ));
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Failed to toggle category status');
        }
    };

    const commonIcons = ['📋', '🌿', '📢', '🤝', '🎨', '🎵', '🏃', '🍕', '📚', '💼', '🎭', '🏆'];
    const commonColors = ['#1AA928', '#22C55E', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6'];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Category Management</h1>
                {!isCreating && (
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1AA928] text-white rounded-lg hover:bg-[#15861F] transition-all duration-300"
                    >
                        <Plus size={20} />
                        New Category
                    </button>
                )}
            </div>

            {/* Create/Edit Form */}
            {isCreating && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8 shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">
                        {editingId ? 'Edit Category' : 'Create New Category'}
                    </h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1AA928]"
                                    placeholder="e.g., Technology"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1AA928]"
                                    placeholder="Brief description"
                                />
                            </div>

                            {/* Icon Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Icon
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {commonIcons.map((icon) => (
                                        <button
                                            key={icon}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, icon })}
                                            className={`text-2xl p-2 border-2 rounded-lg hover:scale-110 transition-transform ${formData.icon === icon ? 'border-[#1AA928] bg-green-50' : 'border-gray-300'
                                                }`}
                                        >
                                            {icon}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Selector */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {commonColors.map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, color })}
                                            className={`w-10 h-10 rounded-lg border-2 hover:scale-110 transition-transform ${formData.color === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm font-semibold text-gray-600 mb-2">Preview:</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white" style={{ backgroundColor: formData.color }}>
                                <span className="text-xl">{formData.icon}</span>
                                <span className="font-medium">{formData.name || 'Category Name'}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center gap-2 px-6 py-2 bg-[#1AA928] text-white rounded-lg hover:bg-[#15861F] transition-all duration-300"
                            >
                                <Save size={18} />
                                {editingId ? 'Update' : 'Create'} Category
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex items-center gap-2 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                            >
                                <X size={18} />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Categories List */}
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#1AA928] border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Loading categories...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category._id}
                            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{category.icon}</span>
                                    <div>
                                        <h3 className="text-xl font-bold">{category.name}</h3>
                                        <p className="text-sm text-gray-500">{category.eventCount} events</p>
                                    </div>
                                </div>
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: category.color }}
                                />
                            </div>

                            {/* Description */}
                            {category.description && (
                                <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                            )}

                            {/* Status Badge */}
                            <div className="mb-4">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${category.isActive
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                        }`}
                                >
                                    {category.isActive ? 'Active' : 'Inactive'}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(category)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#1AA928] border border-[#1AA928] text-white rounded-lg hover:bg-[#15861F] hover:border-[#15861F] transition-all duration-300"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(category._id)}
                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-300"
                                >
                                    {category.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                                    Toggle
                                </button>
                                <button
                                    onClick={() => handleDelete(category._id, category.name, category.eventCount)}
                                    disabled={category.eventCount > 0}
                                    className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title={category.eventCount > 0 ? 'Cannot delete category with events' : 'Delete category'}
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && categories.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    <p className="text-lg mb-4">No categories yet.</p>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="text-[#1AA928] hover:underline"
                    >
                        Create your first category
                    </button>
                </div>
            )}
        </div>
    );
};

export default CategoryManagement;