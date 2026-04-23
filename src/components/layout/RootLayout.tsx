import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Footer from "../Footer.tsx";
import ReactGA from "react-ga4";
import ThemeToggle from "../ThemeToggle.tsx";

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

    useEffect(() => {
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search
        });
    }, [location]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [location.pathname]);

    const isActive = (path: string) => location.pathname === path;

    const linkClasses = (path: string) =>
        `transition-all duration-200 font-medium ${
            isActive(path)
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        }`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 py-3 sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500 tracking-tight">
                        NJ<span className="text-gray-800 dark:text-white">Tools</span>
                    </Link>
                    <div className="flex items-center space-x-4 sm:space-x-8">
                        <div className="hidden md:flex items-center space-x-6">
                            <Link to="/" className={linkClasses("/")}>Home</Link>
                            <Link to="/about" className={linkClasses("/about")}>About Us</Link>
                            <Link to="/contact" className={linkClasses("/contact")}>Contact Us</Link>
                        </div>
                        <ThemeToggle />
                    </div>
                </div>
            </nav>

            <main className="grow">
                <div className="max-w-9xl mx-auto">
                    <Outlet />
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default RootLayout;