import {Outlet, Link, useNavigate, useLocation} from "react-router";
import {useEffect} from "react";

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get('p');
        if (redirectPath) {
            navigate(redirectPath, { replace: true });
        }
    }, [navigate, location]);

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white border-b border-gray-200 px-4 py-3">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600">
                        NJ<span className="text-gray-800">Tools</span>
                    </Link>
                    <div className="space-x-4">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">Home</Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                    </div>
                </div>
            </nav>

            <div className="max-w-9xl mx-auto flex">
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>

            <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
                &copy; {new Date().getFullYear()} NJTools. All rights reserved.
            </footer>
        </div>
    );
};

export default RootLayout;