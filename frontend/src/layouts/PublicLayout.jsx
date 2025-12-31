import Footer from '../components/Footer.jsx';
import PublicNavbar from '../components/PublicNavBar.jsx';

const PublicLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <PublicNavbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default PublicLayout;