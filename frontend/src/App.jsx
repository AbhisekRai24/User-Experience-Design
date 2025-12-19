import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import ProtectedRoute from './utils/ProtectedRoute';
import AdminRoute from './utils/AdminRoute';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventHistory from './pages/EventHistory';
import Profile from './pages/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
// import CreateEvent from './pages/admin/CreateEvent';
import CreateEvent from './pages/admin/CreateEvent';
import EditEvent from './pages/admin/EditEvent';
import Settings from './pages/Settings';
import AdminEventDashboard from './pages/admin/AdminEventDashboard';
import AboutUs from './pages/Aboutus';
import HelpPage from './pages/HelpnSupport';


function App() {
  // const { isAuthenticated } = useAuthStore();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
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
          path="/events"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Events />
              </MainLayout>
            </ProtectedRoute>
          }
        />


           <Route
          path="/about"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AboutUs/>
              </MainLayout>
            </ProtectedRoute>
          }
        />

         <Route
          path="/help"
          element={
            <ProtectedRoute>
              <MainLayout>
                <HelpPage/>
              </MainLayout>
            </ProtectedRoute>
          }
        />


   


        <Route path="/settings" element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>

        } />
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
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            </AdminRoute>
          }
        /> */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <MainLayout>
                <AdminDashboard />
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
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router >
  );
}

export default App;

