// export default Login;
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import loginBg from '../asset/login-bg.jpg';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  // const setAuth = useAuthStore((state) => state.setAuth);

  const { setAuth, isAuthenticated, user } = useAuthStore(); // Get isAuthenticated and user


  // const mutation = useMutation({
  //   mutationFn: login,
  //   onSuccess: (data) => {

  //     setAuth(data.user, data.accessToken, data.refreshToken);
  //     toast.success('Login successful!');

  //     // Navigate based on user role
  //     if (data.user.role === 'ADMIN') {
  //       navigate('/admin');
  //     } else {
  //       navigate('/dashboard');
  //     }
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || 'Login failed');
  //   },
  // });


  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.role === 'ADMIN' ? '/admin' : '/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.accessToken, data.refreshToken);
      toast.success('Login successful!');

      // Navigate based on role
      if (data.user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">

        {/* Optional: Add an actual image */}
        {<img
          src={loginBg}
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover"
        />}
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-200 px-8 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Brand (optional) */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold">Local Space</h2>
            <p className="text-sm text-gray-500 mt-2">Sign in to your account</p>
          </div>

          {/* Login Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text font-medium">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="input input-bordered w-full"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button
                    type="submit"
                    className="btn btn-md w-full text-white bg-[#1AA928] border-[#1AA928] hover:bg-[#15861F]"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Logging in...
                      </>
                    ) : (
                      'Login'
                    )}
                  </button>
                </div>
              </form>

              <div className="divider">OR</div>

              <div className="text-center">
                <span className="text-sm">
                  Don't have an account?{' '}
                  <Link to="/signup" className="link link-primary font-semibold">
                    Sign up
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;