import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Footer from "../Footer.tsx";
import ReactGA from "react-ga4";
import ThemeToggle from "../ThemeToggle.tsx";
import { Menu, X } from "lucide-react";

const RootLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const redirectPath = params.get('p');
        if (redirectPath) {
            navigate(redirectPath, { replace: true });
        }
    }, [navigate, location]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMenuOpen(false);
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

    const isActive = (path: string) => {
        if (path === '/') return location.pathname === '/';
        return location.pathname.startsWith(path);
    };

    const linkClasses = (path: string) =>
        `transition-all duration-200 font-semibold px-2 py-1 rounded-lg ${
            isActive(path)
                ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800"
        }`;

    const mobileLinkClasses = (path: string) =>
        `block px-4 py-3 rounded-xl text-lg font-bold transition-all ${
            isActive(path)
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 flex flex-col">
            <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-4 py-3 sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black text-blue-600 dark:text-blue-500 tracking-tight flex items-center gap-2">
                        <div className="bg-blue-600 p-1.5 rounded-lg">
                            <img src="/logo.png" width={30} alt="NJTools-logo"/>
                        </div>
                        <span>NJ<span className="text-gray-800 dark:text-white">Tools</span></span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Link to="/" className={linkClasses("/")}>Home</Link>
                        <Link to="/tools/" className={linkClasses("/tools")}>All Tools</Link>
                        <Link to="/about/" className={linkClasses("/about")}>About</Link>
                        <Link to="/contact/" className={linkClasses("/contact")}>Contact</Link>
                        <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                        <ThemeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-3">
                        <ThemeToggle />
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-4 duration-200">
                        <Link to="/" className={mobileLinkClasses("/")}>Home</Link>
                        <Link to="/tools/" className={mobileLinkClasses("/tools")}>All Tools</Link>
                        <Link to="/about/" className={mobileLinkClasses("/about")}>About Us</Link>
                        <Link to="/contact/" className={mobileLinkClasses("/contact")}>Contact Us</Link>
                    </div>
                )}
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