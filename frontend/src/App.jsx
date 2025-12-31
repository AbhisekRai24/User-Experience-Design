import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminRoute from './utils/AdminRoute';
import MainLayout from './layouts/MainLayout';
import PublicLayout from './layouts/PublicLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';
import PublicEvents from './pages/PublicEvents';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventHistory from './pages/EventHistory';
import Profile from './pages/Profile';
import UserManage from './pages/admin/UserManagement';
import AdminEvents from './pages/admin/AdminEvents';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import Settings from './pages/Settings';
import AdminEventDashboard from './pages/admin/AdminEventDashboard';
import AboutUs from './pages/Aboutus';
import HelpPage from './pages/HelpnSupport';
import Wishlist from './pages/Wishlist';
import VolunteersPage from './pages/admin/VolunteerPage';
import CategoryManagement from './components/admin/categoryManagement';
import AdminDash from './pages/admin/RealAdminDashboard';
import AdminLayout from './layouts/Admin/AdminLayout';



function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <Routes>
        {/* Public Routes - No Authentication Required */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <LandingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/events"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <MainLayout>
                  <Events />
                </MainLayout>
              </ProtectedRoute>
            ) : (
              <PublicLayout>
                <PublicEvents />
              </PublicLayout>
            )
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <MainLayout>
                  <AboutUs />
                </MainLayout>
              </ProtectedRoute>
            ) : (
              <PublicLayout>
                <AboutUs />
              </PublicLayout>
            )
          }
        />
        <Route
          path="/help"
          element={
            isAuthenticated ? (
              <ProtectedRoute>
                <MainLayout>
                  <HelpPage />
                </MainLayout>
              </ProtectedRoute>
            ) : (
              <PublicLayout>
                <HelpPage />
              </PublicLayout>
            )
          }
        />

        {/* Auth Routes */}


        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        /> */}

        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/event-history"
          element={
            <ProtectedRoute>
              <MainLayout>
                <EventHistory />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Wishlist />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        {/* <Route
          path="/admin"
          element={
            <AdminRoute>
              <MainLayout>
                <UserManage />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <AdminRoute>
              <MainLayout>
                <CategoryManagement />
              </MainLayout>
            </AdminRoute>
          }
        />


        <Route
          path="/admin/testdash"
          element={
            <AdminRoute>
              <MainLayout>
                <TestDashboard />
              </MainLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/eventdashboard"
          element={
            <AdminRoute>
              <MainLayout>
                <AdminEventDashboard />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <MainLayout>
                <AdminEvents />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/new"
          element={
            <AdminRoute>
              <MainLayout>
                <CreateEvent />
              </MainLayout>
            </AdminRoute>
          }
        />
        <Route
          path="/admin/events/:id/edit"
          element={
            <AdminRoute>
              <MainLayout>
                <EditEvent />
              </MainLayout>
            </AdminRoute>
          }
        />
        // Admin-only route
        <Route
          path="/admin/events/:id/volunteers"
          element={
            <AdminRoute>
              <MainLayout>
                <VolunteersPage />
              </MainLayout>
            </AdminRoute>

          }
        /> */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={< AdminDash />} />

          <Route path="categories" element={<CategoryManagement />} />
          <Route path="users" element={<UserManage />} />
          {/* <Route path="eventdashboard" element={<UserManage />} /> */}
          <Route path="events" element={<AdminEvents />} />
          <Route path="events/new" element={<CreateEvent />} />
          <Route path="events/:id/edit" element={<EditEvent />} />
          <Route path="events/:id/volunteers" element={<VolunteersPage />} />
        </Route>


        {/* Catch all - redirect to home instead of dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;