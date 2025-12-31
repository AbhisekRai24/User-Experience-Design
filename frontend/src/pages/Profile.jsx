import { useState, useRef } from 'react';
import useAuthStore from '../store/authStore';
import { updateProfile } from '../api/user';
import { toast } from 'react-hot-toast';
import { Camera, X, Save } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    gender: user?.gender || '',
    profileImage: null,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <span className="loading loading-spinner loading-lg text-[#1AA928]"></span>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('username', formData.username);
      submitData.append('gender', formData.gender);

      if (formData.profileImage) {
        submitData.append('profileImage', formData.profileImage);
      }

      const response = await updateProfile(submitData);
      updateUser(response.user);

      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setImagePreview(null);
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      username: user.username,
      gender: user.gender || '',
      profileImage: null,
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Profile</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="btn bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F] transition-all duration-300"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="card bg-base-100 shadow-xl max-w-3xl mx-auto overflow-hidden">
        <div className="card-body p-8">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              {/* Profile Image Section */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative group">
                  <div className="avatar">
                    <div className="w-32 h-32 rounded-full ring-4 ring-[#1AA928] ring-offset-4 ring-offset-base-100">
                      <img
                        src={imagePreview || user.profileImage}
                        alt={user.username}
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 btn btn-circle btn-sm bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F] text-white transition-all duration-300"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3">Click the camera icon to change photo (Max 5MB)</p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input input-bordered focus:border-[#1AA928] focus:outline-none focus:ring-2 focus:ring-[#1AA928]/20"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* Username */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Username</span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input input-bordered focus:border-[#1AA928] focus:outline-none focus:ring-2 focus:ring-[#1AA928]/20"
                    placeholder="Enter your username"
                    required
                    minLength={3}
                    maxLength={30}
                  />
                </div>

                {/* Email (Disabled) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Email</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Email cannot be changed</span>
                  </label>
                </div>

                {/* Gender */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Gender</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="select select-bordered focus:border-[#1AA928] focus:outline-none focus:ring-2 focus:ring-[#1AA928]/20"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Role */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-base">Role</span>
                  </label>
                  <div className="pt-3">
                    <span className="badge badge-lg bg-[#1AA928] text-white border-[#1AA928] px-4 py-3">
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-outline text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-300"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#1AA928] text-white border-[#1AA928] hover:bg-[#15861F] transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* View Mode */}
              <div className="flex flex-col items-center mb-8">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring-4 ring-[#1AA928] ring-offset-4 ring-offset-base-100">
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="object-cover"
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold mt-4">{user.fullName}</h2>
                <p className="text-gray-600 text-lg">@{user.username}</p>
                <span className="badge badge-lg bg-[#1AA928] text-white border-[#1AA928] mt-3 px-4 py-3">
                  {user.role}
                </span>
              </div>

              {/* Profile Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Email
                  </label>
                  <p className="text-lg font-medium mt-2">{user.email}</p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Username
                  </label>
                  <p className="text-lg font-medium mt-2">@{user.username}</p>
                </div>

                {user.gender && (
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Gender
                    </label>
                    <p className="text-lg font-medium mt-2 capitalize">{user.gender}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    Account Role
                  </label>
                  <p className="text-lg font-medium mt-2">{user.role}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;