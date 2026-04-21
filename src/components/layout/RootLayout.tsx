import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { useEffect } from "react";
import Footer from "../Footer.tsx";
import ReactGA from "react-ga4";

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search
        });
    }, [location]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get('p');
        if (redirectPath) {
            navigate(redirectPath, { replace: true });
        }
    }, [navigate, location]);

    const isActive = (path: string) => location.pathname === path;

    const linkClasses = (path: string) =>
        `transition-all duration-200 font-medium ${
            isActive(path)
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
        }`;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
                        NJ<span className="text-gray-800">Tools</span>
                    </Link>
                    <div className="flex items-center space-x-6">
                        <Link to="/" className={linkClasses("/")}>Home</Link>
                        <Link to="/about" className={linkClasses("/about")}>About Us</Link>
                        <Link to="/contact" className={linkClasses("/contact")}>Contact Us</Link>
                    </div>
                </div>
            </nav>

            <main className="grow">
                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default RootLayout;