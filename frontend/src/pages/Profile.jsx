import useAuthStore from '../store/authStore';

const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      
      <div className="card bg-base-100 shadow-xl max-w-2xl">
        <div className="card-body">
          <div className="flex items-center gap-6 mb-6">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img src={user.profileImage} alt={user.username} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.fullName}</h2>
              <p className="text-gray-600">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <p className="text-lg">{user.email}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <p className="text-lg">{user.fullName}</p>
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Role</span>
              </label>
              <p className="text-lg">
                <span className="badge badge-primary">{user.role}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

