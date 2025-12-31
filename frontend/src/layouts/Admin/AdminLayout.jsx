import AdminSidebar from '../../components/admin/SideBar';
import Navbar from '../../components/Navbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Top Navbar */}
            <Navbar />

            {/* Main content: Sidebar + Page content */}
            <div className="flex flex-1">
                <AdminSidebar />

                <main className="flex-1 bg-gray-100 min-h-screen p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
