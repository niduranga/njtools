import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    Search,
    ArrowRight
} from 'lucide-react';
import { TOOLS_CONFIG } from '../config/tools';
import { Helmet } from "react-helmet-async";

const Home: React.FC = () => {
    const SHOW_ADS = false;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = TOOLS_CONFIG.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Helmet>
                <title>NJTools | High-Performance Developer & Media Utilities</title>
                <meta name="description" content="Free, fast, and secure web tools for developers. SVG to PNG, JSON Formatter, Background Remover, and more. All tools process data locally for 100% privacy." />
                <link rel="canonical" href="https://njtools.xyz/" />
                <meta property="og:title" content="NJTools | All-in-One Developer Utilities" />
                <meta property="og:description" content="Browser-based tools that respect your privacy. No uploads, just speed." />
            </Helmet>

            <section className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 py-16 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        All-in-One <span className="text-blue-600 dark:text-blue-500">Developer</span> Tools
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                        Fast, secure, and browser-based tools for your daily tasks. No registration, 100% free.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for a tool (e.g. SVG, JSON, Unit)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg transition-all"
                        />
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                        {searchQuery ? `Results for "${searchQuery}"` : "Featured Tools"}
                    </h2>

                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={`/tools/${tool.id}`}
                                    className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 hover:border-blue-300 dark:hover:border-blue-900 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-slate-50 dark:bg-gray-700 rounded-xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                                            {tool.icon}
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-gray-700 px-2 py-1 rounded">
                                            {tool.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tool.name}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 leading-relaxed">{tool.desc}</p>
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Try it now <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-slate-200 dark:border-gray-700 transition-colors">
                            <p className="text-slate-400 dark:text-slate-500">No tools found matching your search.</p>
                        </div>
                    )}
                </div>

                {SHOW_ADS && (
                    <div className="w-full bg-slate-200/50 dark:bg-gray-800/50 h-32 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-gray-700 mb-16">
                        <span className="text-slate-400 dark:text-slate-500 text-sm font-medium tracking-widest uppercase">Sponsored Advertisement</span>
                    </div>
                )}

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                        Browse Categories
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['Media', 'Developer', 'Utility'].map((cat) => (
                            <Link
                                key={cat}
                                to={`/tools?category=${cat}`}
                                className="w-35 md:w-50 p-4 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-center hover:bg-slate-50 dark:hover:bg-gray-750 hover:border-blue-300 dark:hover:border-blue-900 transition-all cursor-pointer"
                            >
                                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">{cat}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;