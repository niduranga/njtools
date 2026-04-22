import {Link, useLocation} from "react-router";
import { TOOLS_CONFIG } from '../../config/tools.tsx';

interface IToolLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    seoContent: React.ReactNode;
}

const ToolLayout: React.FC<IToolLayoutProps> = ({ children, title, description, seoContent }) => {
    const SHOW_ADS = false;
    const location = useLocation();

    // Find the current tool ID from the URL (e.g., /tools/svg-to-png/ -> svg-to-png)
    const currentPath = location.pathname.split('/').filter(Boolean);
    const currentToolId = currentPath[currentPath.length - 1];

    // Find the category of the current tool
    const currentTool = TOOLS_CONFIG.find(t => t.id === currentToolId);
    const currentCategory = currentTool?.category;

    // Dynamically get unique categories
    const categories = Array.from(new Set(TOOLS_CONFIG.map(tool => tool.category)));

    // Get "Popular Tools" (taking first 6 for better balance)
    const popularTools = TOOLS_CONFIG.slice(0, 6);

    return (
        <div className="max-w-400 mx-auto px-4 py-8 text-slate-800 dark:text-slate-200 transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar: Categories */}
                <aside className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        <h3 className="font-black text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3 mb-4 text-sm uppercase tracking-wider">Categories</h3>
                        <ul className="space-y-3 text-sm">
                            {categories.map(cat => (
                                <li key={cat}>
                                    <Link 
                                        to={`/tools/`} 
                                        className={`font-medium transition flex items-center gap-2 group ${
                                            currentCategory === cat 
                                            ? 'text-blue-600 dark:text-blue-400 scale-105' 
                                            : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                                        }`}
                                    >
                                        <div className={`w-1 h-1 rounded-full transition-colors ${
                                            currentCategory === cat ? 'bg-blue-600 dark:bg-blue-400' : 'bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500'
                                        }`} />
                                        {cat}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {SHOW_ADS && (
                        <div className="bg-slate-50 dark:bg-slate-900/50 h-100 flex items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-2xl">
                            <span className="text-slate-400 dark:text-slate-500 text-xs text-center px-4">Vertical Ad Area</span>
                        </div>
                    )}
                </aside>

                {/* Main Content Area */}
                <main className="lg:col-span-7">
                    <header className="mb-8">
                        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{title}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg leading-relaxed">{description}</p>
                    </header>

                    {SHOW_ADS && (
                        <div className="mb-8 bg-slate-50 dark:bg-slate-900/50 h-24 flex items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-2xl">
                            <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">Top Leaderboard Ad</span>
                        </div>
                    )}

                    <section className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 mb-10 transition-colors duration-300">
                        {children}
                    </section>

                    <article className="mt-12 p-8 bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        {seoContent}
                    </article>

                    {SHOW_ADS && (
                        <div className="mt-10 bg-slate-50 dark:bg-slate-900/50 h-32 flex items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-2xl">
                            <span className="text-slate-400 dark:text-slate-500 text-xs font-medium">Feed Content Ad</span>
                        </div>
                    )}
                </main>

                {/* Right Sidebar: Popular Tools */}
                <aside className="lg:col-span-3 space-y-6">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition hover:shadow-md dark:hover:shadow-slate-950/50 transition-colors duration-300">
                            <h3 className="font-black text-slate-900 dark:text-white border-b border-slate-50 dark:border-slate-800 pb-3 mb-5 text-sm uppercase tracking-wider">Popular Tools</h3>
                            <ul className="text-sm space-y-4">
                                {popularTools.map(tool => (
                                    <li key={tool.id}>
                                        <Link 
                                            to={`/tools/${tool.id}/`} 
                                            className={`flex items-center gap-3 group p-2 rounded-xl transition-all ${
                                                currentToolId === tool.id 
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 ring-1 ring-blue-100 dark:ring-blue-900/50' 
                                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                                                currentToolId === tool.id 
                                                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-md shadow-blue-100 dark:shadow-none' 
                                                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 dark:group-hover:text-white'
                                            }`}>
                                                <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                            </div>
                                            <span className={`font-semibold transition-colors truncate ${
                                                currentToolId === tool.id ? 'text-blue-700 dark:text-blue-300' : 'text-slate-600 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                            }`}>
                                                {tool.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {SHOW_ADS && (
                            <div className="bg-slate-50 dark:bg-slate-900/50 h-[300px] flex items-center justify-center border-dashed border-2 border-slate-200 dark:border-slate-800 rounded-2xl">
                                <span className="text-slate-400 dark:text-slate-500 text-xs font-medium tracking-wide">Sidebar Ad Slot</span>
                            </div>
                        )}

                        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 rounded-3xl text-white shadow-xl shadow-blue-200 dark:shadow-none transition-all duration-300">
                            <h4 className="font-bold text-lg mb-2">Need a custom tool?</h4>
                            <p className="text-blue-100 text-xs mb-4 leading-relaxed">We are constantly adding new features. Contact us to request a specific converter!</p>
                            <Link to="/contact/" className="inline-block bg-white dark:bg-blue-50 text-blue-600 px-5 py-2 rounded-xl text-xs font-black uppercase tracking-tight hover:bg-blue-50 dark:hover:bg-white transition-colors">Contact Us</Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ToolLayout;