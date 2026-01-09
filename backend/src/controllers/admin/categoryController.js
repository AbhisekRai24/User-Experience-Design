
import Category from '../../models/Category.js';
import Event from '../../models/Event.js';

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const { activeOnly } = req.query;
        const filter = activeOnly === 'true' ? { isActive: true } : {};

        const categories = await Category.find(filter)
            .populate('createdBy', 'username fullName')
            .sort({ createdAt: -1 });

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single category
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
            .populate('createdBy', 'username fullName');

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new category
export const createCategory = async (req, res) => {
    try {
        const { name, description, color, icon } = req.body;

        // Check if category already exists
        const existingCategory = await Category.findOne({
            name: { $regex: new RegExp(`^${name}$`, 'i') }
        });

        if (existingCategory) {
            return res.status(400).json({
                message: 'Category with this name already exists'
            });
        }

        const category = new Category({
            name,
            description,
            color: color || '#1AA928',
            icon: icon || '📋',
            createdBy: req.user._id,
        });

        await category.save();
        await category.populate('createdBy', 'username fullName');

        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const { name, description, color, icon, isActive } = req.body;

        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if new name conflicts with existing category
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({
                name: { $regex: new RegExp(`^${name}$`, 'i') },
                _id: { $ne: req.params.id }
            });

            if (existingCategory) {
                return res.status(400).json({
                    message: 'Category with this name already exists'
                });
            }
        }

        category.name = name || category.name;
        category.description = description !== undefined ? description : category.description;
        category.color = color || category.color;
        category.icon = icon || category.icon;
        category.isActive = isActive !== undefined ? isActive : category.isActive;

        await category.save();
        await category.populate('createdBy', 'username fullName');

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Check if category is being used by any events
        const eventsCount = await Event.countDocuments({ category: category.name });

        if (eventsCount > 0) {
            return res.status(400).json({
                message: `Cannot delete category. ${eventsCount} event(s) are using this category.`,
                eventsCount
            });
        }

        await Category.findByIdAndDelete(req.params.id);

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Toggle category active status
export const toggleCategoryStatus = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.isActive = !category.isActive;
        await category.save();

        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category statistics
export const getCategoryStats = async (req, res) => {
    try {
        const stats = await Category.aggregate([
            {
                $lookup: {
                    from: 'events',
                    let: { categoryName: '$name' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$category', '$$categoryName'] }
                            }
                        }
                    ],
                    as: 'events'
                }
            },
            {
                $project: {
                    name: 1,
                    color: 1,
                    icon: 1,
                    isActive: 1,
                    eventCount: { $size: '$events' },
                    createdAt: 1
                }
            },
            {
                $sort: { eventCount: -1 }
            }
        ]);

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

