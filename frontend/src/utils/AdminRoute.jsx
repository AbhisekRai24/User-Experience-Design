// // import { Navigate } from 'react-router-dom';
// // import useAuthStore from '../store/authStore';

// // const AdminRoute = ({ children }) => {
// //   const { isAuthenticated, user } = useAuthStore();

// //   if (!isAuthenticated) {
// //     return <Navigate to="/login" replace />;
// //   }

// //   if (user?.role !== 'ADMIN') {
// //     return <Navigate to="/admin" replace />;
// //   }

// //   return children;
// // };

// // export default AdminRoute;

// import { Navigate } from 'react-router-dom';
// import useAuthStore from '../store/authStore';

// const AdminRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();

//   // If the user is not authenticated, redirect to the login page
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   // If the user is authenticated but is not an admin, redirect to a default route (e.g., /dashboard)
//   if (user?.role !== 'ADMIN') {
//     return <Navigate to="/dashboard" replace />; // Redirect to dashboard for non-admin users
//   }

//   // If the user is authenticated and an admin, render the protected children (admin-specific content)
//   return children;
// };

// export default AdminRoute;


import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  // 🔍 DEBUG
  console.log('🔐 AdminRoute check:');
  console.log('  - isAuthenticated:', isAuthenticated);
  console.log('  - user:', user);
  console.log('  - user.role:', user?.role);
  console.log('  - Is ADMIN?:', user?.role === 'ADMIN');

  if (!isAuthenticated) {
    console.log('  ❌ Not authenticated, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'ADMIN') {
    console.log('  ❌ Not admin, redirecting to /dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('  ✅ Admin confirmed, rendering admin content');
  return children;
};

export default AdminRoute;