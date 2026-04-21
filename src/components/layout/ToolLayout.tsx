import React from 'react';
import {Link} from "react-router";

interface IToolLayoutProps {
    children: React.ReactNode;
    title: string;
    description: string;
    seoContent: React.ReactNode;
}

const ToolLayout: React.FC<IToolLayoutProps> = ({ children, title, description, seoContent }) => {
    const SHOW_ADS = false;
    return (
        <div className="max-w-400 mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <aside className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">Categories</h3>
                        <Link to='/tools'>
                            <ul className="space-y-2 text-sm">
                                <li className="text-blue-600 font-semibold cursor-pointer">Media</li>
                                <li className="text-gray-600 hover:text-blue-500 cursor-pointer transition">Developer</li>
                                <li className="text-gray-600 hover:text-blue-500 cursor-pointer transition">Utility</li>
                            </ul>
                        </Link>
                    </div>

                    {SHOW_ADS && (
                        <div className="bg-gray-50 h-100 flex items-center justify-center border-dashed border-2 border-gray-200 rounded-lg">
                            <span className="text-gray-400 text-xs text-center px-2">Vertical Ad<br/>(160x600 or 300x600)</span>
                        </div>
                    )}
                </aside>

                <main className="lg:col-span-7">
                    <header className="mb-6">
                        <h1 className="text-3xl font-black text-gray-900">{title}</h1>
                        <p className="text-gray-600 mt-1">{description}</p>
                    </header>

                    {SHOW_ADS && (
                        <div className="mb-6 bg-gray-50 h-24 flex items-center justify-center border-dashed border-2 border-gray-200 rounded-lg">
                            <span className="text-gray-400 text-xs">Horizontal Leaderboard (728x90)</span>
                        </div>
                    )}

                    <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                        {children}
                    </section>

                    <article className="mt-10 p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                        {seoContent}
                    </article>

                    {SHOW_ADS && (
                        <div className="mt-6 bg-gray-50 h-24 flex items-center justify-center border-dashed border-2 border-gray-200 rounded-lg">
                            <span className="text-gray-400 text-xs">Responsive Feed Ad</span>
                        </div>
                    )}
                </main>

                <aside className="lg:col-span-3 space-y-6">
                    <div className="sticky top-6 space-y-6">
                        {SHOW_ADS && (
                            <div className="bg-gray-50 h-62.5 flex items-center justify-center border-dashed border-2 border-gray-200 rounded-lg">
                                <span className="text-gray-400 text-xs">Square Ad (300x250)</span>
                            </div>
                        )}

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <h3 className="font-bold text-gray-800 border-b pb-2 mb-3">Popular Tools</h3>
                            <ul className="text-sm space-y-4">
                                <Link to="/tools/svg-to-png"><li className="text-blue-500 hover:underline cursor-pointer mb-2">Svg to Png</li></Link>
                                <Link to="/tools/png-to-svg"><li className="text-blue-500 hover:underline cursor-pointer mb-2">Png to Svg</li></Link>
                                <Link to="/tools/json-formatter"><li className="text-blue-500 hover:underline cursor-pointer mb-2">Json Formatter</li></Link>
                            </ul>
                        </div>

                        {SHOW_ADS && (
                            <div className="bg-gray-50 h-62.5 flex items-center justify-center border-dashed border-2 border-gray-200 rounded-lg">
                                <span className="text-gray-400 text-xs">Square Ad (300x250)</span>
                            </div>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ToolLayout;