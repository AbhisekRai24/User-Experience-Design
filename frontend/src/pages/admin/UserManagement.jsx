

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, createUser, updateUser, deleteUser } from '../../api/admin/users';
import toast from 'react-hot-toast';
import { Users, MoreVertical, Edit2, Trash2, UserPlus, X, Search, Shield, User, Mail, Lock } from 'lucide-react';

// UserIcon component
const UserIcon = User;

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, userName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#2E3A3D]">Delete User</h3>
            <p className="text-sm text-[#6B6B6B]">This action cannot be undone</p>
          </div>
        </div>

        <p className="text-[#2E3A3D] mb-6">
          Are you sure you want to delete <span className="font-semibold">{userName}</span>? All their data will be permanently removed.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 h-12 bg-[#F5FAF7] text-[#2E3A3D] rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-12 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

// User Form Modal (Create/Edit)
const UserFormModal = ({ isOpen, onClose, onSubmit, user, mode, isLoading }) => {
  const [formData, setFormData] = useState(user || {
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: 'USER',
    gender: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username?.trim()) newErrors.username = 'Username is required';
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email?.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (mode === 'create' && !formData.password) {
      newErrors.password = 'Password is required';
    }
    if (formData.password && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" style={{ fontFamily: 'Poppins, sans-serif' }}>
        <div className="flex items-center justify-between p-8 pb-4 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-semibold text-[#2E3A3D]">
              {mode === 'create' ? 'Create New User' : 'Edit User'}
            </h2>
            <p className="text-sm text-[#6B6B6B] mt-1">
              {mode === 'create' ? 'Add a new user to the system' : 'Update user information'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-[#F5FAF7] rounded-full flex items-center justify-center hover:bg-[#E8F7EC] transition-colors"
          >
            <X className="w-5 h-5 text-[#2E3A3D]" />
          </button>
        </div>

        <div className="px-8 pb-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Username *
            </label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Enter username"
                className={`w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.username ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                  }`}
              />
            </div>
            {errors.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Full Name *
            </label>
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                placeholder="Enter full name"
                className={`w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.fullName ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                  }`}
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email"
                className={`w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.email ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                  }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Password {mode === 'edit' && '(Leave blank to keep current)'}
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder={mode === 'create' ? 'Enter password' : 'Enter new password'}
                className={`w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 transition-all ${errors.password ? 'ring-2 ring-red-400' : 'focus:ring-[#4BA3F2]'
                  }`}
              />
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Role
            </label>
            <div className="relative">
              <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <select
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                className="w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] focus:outline-none focus:ring-2 focus:ring-[#4BA3F2] transition-all appearance-none"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-[#2E3A3D] mb-2">
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => handleChange('gender', e.target.value)}
              className="w-full h-12 bg-[#F5FAF7] rounded-xl px-4 text-sm text-[#2E3A3D] focus:outline-none focus:ring-2 focus:ring-[#4BA3F2] transition-all"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 h-12 bg-[#F5FAF7] text-[#2E3A3D] rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 h-12 bg-[#1AA928] text-white rounded-xl font-semibold hover:bg-[#159023] transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : mode === 'create' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Three Dot Dropdown Menu
const UserActionsMenu = ({ user, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-lg hover:bg-[#F5FAF7] flex items-center justify-center transition-colors"
      >
        <MoreVertical className="w-5 h-5 text-[#6B6B6B]" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-2xl z-20 overflow-hidden border border-gray-100">
            <button
              onClick={() => {
                onEdit(user);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#F5FAF7] transition-colors text-left"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Edit2 className="w-4 h-4 text-[#4BA3F2]" />
              <span className="text-sm font-medium text-[#2E3A3D]">Edit User</span>
            </button>
            <button
              onClick={() => {
                onDelete(user);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-left"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              <Trash2 className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Delete User</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formMode, setFormMode] = useState('create');

  // Fetch all users from database
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
  });

  // Create user mutation
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success('User created successfully!');
      queryClient.invalidateQueries(['users']);
      setShowUserForm(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create user');
    },
  });

  // Update user mutation
  const updateMutation = useMutation({
    mutationFn: ({ userId, userData }) => updateUser(userId, userData),
    onSuccess: () => {
      toast.success('User updated successfully!');
      queryClient.invalidateQueries(['users']);
      setShowUserForm(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update user');
    },
  });

  // Delete user mutation
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      toast.success('User deleted successfully!');
      queryClient.invalidateQueries(['users']);
      setShowDeleteModal(false);
      setSelectedUser(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete user');
    },
  });

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateUser = () => {
    setSelectedUser(null);
    setFormMode('create');
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormMode('edit');
    setShowUserForm(true);
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    deleteMutation.mutate(selectedUser._id);
  };

  const handleFormSubmit = (formData) => {
    if (formMode === 'create') {
      createMutation.mutate(formData);
    } else {
      updateMutation.mutate({ userId: selectedUser._id, userData: formData });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="text-[#6B6B6B] mt-4">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5FAF7] to-[#E8F4FD] p-4 md:p-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#1AA928] to-[#159023] rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#2E3A3D]">User Management</h1>
              <p className="text-sm text-[#6B6B6B]">Manage system users and permissions</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B6B6B] mb-1">Total Users</p>
                <p className="text-3xl font-bold text-[#2E3A3D]">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B6B6B] mb-1">Admins</p>
                <p className="text-3xl font-bold text-[#2E3A3D]">
                  {users.filter(u => u.role === 'ADMIN').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B6B6B] mb-1">Regular Users</p>
                <p className="text-3xl font-bold text-[#2E3A3D]">
                  {users.filter(u => u.role === 'USER').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search users by name, email, or username..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 bg-[#F5FAF7] rounded-xl pl-12 pr-4 text-sm text-[#2E3A3D] placeholder:text-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#4BA3F2] transition-all"
              />
            </div>
            <button
              onClick={handleCreateUser}
              className="w-full md:w-auto px-6 h-12 bg-[#1AA928] text-white rounded-xl font-semibold hover:bg-[#159023] transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add New User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F5FAF7] border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Gender
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <Search className="w-12 h-12 text-[#6B6B6B] opacity-50" />
                        <p className="text-[#6B6B6B]">No users found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-[#F5FAF7] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={user.profileImage}
                            alt={user.fullName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#2E3A3D]">{user.fullName}</p>
                            <p className="text-xs text-[#6B6B6B]">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#2E3A3D]">{user.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${user.role === 'ADMIN'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                          }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#2E3A3D]">{user.gender || '-'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-[#6B6B6B]">{formatDate(user.createdAt)}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <UserActionsMenu
                          user={user}
                          onEdit={handleEditUser}
                          onDelete={handleDeleteClick}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserFormModal
        isOpen={showUserForm}
        onClose={() => {
          setShowUserForm(false);
          setSelectedUser(null);
        }}
        onSubmit={handleFormSubmit}
        user={selectedUser}
        mode={formMode}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        userName={selectedUser?.fullName}
      />
    </div>
  );
};

export default AdminDashboard;