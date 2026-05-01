import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    Search,
    ArrowRight,
    Sparkles,
    LayoutGrid
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

    const displayTools = searchQuery ? filteredTools : filteredTools.slice(0, 6);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Helmet>
                <title>NJTools | High-Performance Developer & Media Utilities</title>
                <meta name="description" content="Free, fast, and secure web tools for developers. SVG to PNG, JSON Formatter, Background Remover, and more. All tools process data locally for 100% privacy." />
                <link rel="canonical" href="https://njtools.xyz/" />
                <meta property="og:title" content="NJTools | All-in-One Developer Utilities" />
                <meta property="og:description" content="Browser-based tools that respect your privacy. No uploads, just speed." />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 pt-20 pb-16 px-4 transition-colors duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
                </div>
                
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 animate-fade-in">
                        <Sparkles size={16} />
                        <span>100% Free & Privacy-Focused</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-6 leading-tight">
                        Power Tools for <br/>
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Modern Developers</span>
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                        Fast, secure, and browser-based utilities for media and code. 
                        No data ever leaves your device.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link 
                            to="/tools/" 
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
                        >
                            Explore All Tools <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <div className="relative w-full sm:w-96 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by name or category..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-slate-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg transition-all"
                            />
                        </div>
                    </div>

                    {/* Category Quick Links - Moved UP */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {['Media', 'Developer', 'Utility'].map((cat) => (
                            <Link
                                key={cat}
                                to={`/tools?category=${cat}`}
                                className="px-5 py-2 bg-slate-100 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-200 dark:hover:border-blue-800 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-16">
                <div className="mb-16">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 flex items-center gap-3">
                                <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
                                {searchQuery ? `Search Results (${filteredTools.length})` : "Featured Utilities"}
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400">
                                {searchQuery ? `Showing matching tools for "${searchQuery}"` : "Our most popular tools for quick tasks."}
                            </p>
                        </div>
                    </div>

                    {displayTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayTools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={`/tools/${tool.id}`}
                                    className="group bg-white dark:bg-gray-800 p-8 rounded-3xl border border-slate-200 dark:border-gray-700 shadow-sm hover:shadow-2xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="p-4 bg-slate-50 dark:bg-blue-500/10 dark:text-blue-500 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 transition-colors">
                                            {React.cloneElement(tool.icon as React.ReactElement, { size: 32 } as any)}
                                        </div>
                                        <span className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg">
                                            {tool.category}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{tool.desc}</p>
                                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-black text-sm uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Open Tool <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white dark:bg-gray-800 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-gray-700 transition-colors">
                            <div className="bg-slate-100 dark:bg-slate-900 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search size={48} className="text-slate-300" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-3">NO TOOLS FOUND</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">We couldn't find anything matching your search. Try different keywords or browse by category.</p>
                        </div>
                    )}
                    
                    {!searchQuery && filteredTools.length > 6 && (
                        <div className="mt-16 text-center">
                            <Link 
                                to="/tools/" 
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-2xl font-black text-slate-900 dark:text-white shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all group"
                            >
                                <LayoutGrid size={20} className="text-blue-600" />
                                Explore
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                {SHOW_ADS && (
                    <div className="w-full bg-slate-200/50 dark:bg-gray-800/50 h-32 rounded-3xl flex items-center justify-center border border-dashed border-slate-300 dark:border-gray-700 mb-16">
                        <span className="text-slate-400 dark:text-slate-500 text-xs font-black tracking-widest uppercase">Advertisement</span>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Home;