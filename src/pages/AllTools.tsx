import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { Helmet } from "react-helmet-async";
import { TOOLS_CONFIG } from '../config/tools';
import { Search, LayoutGrid, X, ArrowRight } from 'lucide-react';

const AllTools: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(categoryParam || 'All');
    const categories = ['All', 'Media', 'Developer', 'Utility'];

    useEffect(() => {
        if (categoryParam) {
            setActiveTab(categoryParam);
        } else {
            setActiveTab('All');
        }
    }, [categoryParam]);

    const handleTabChange = (cat: string) => {
        setActiveTab(cat);
        const newParams = new URLSearchParams(searchParams);
        if (cat === 'All') {
            newParams.delete('category');
        } else {
            newParams.set('category', cat);
        }
        setSearchParams(newParams);
    };

    const filteredTools = useMemo(() => {
        return TOOLS_CONFIG.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeTab === 'All' || tool.category === activeTab;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeTab]);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
            <Helmet>
                <title>All Online Tools | High-Performance Web Utilities | NJTools</title>
                <meta name="description" content="Explore the complete suite of professional web tools at NJTools. Fast, secure, and 100% private browser-based utilities for developers and creators." />
                <link rel="canonical" href="https://njtools.xyz/tools/" />

                <meta property="og:title" content="All Online Tools | NJTools Directory" />
                <meta property="og:description" content="Professional-grade tools for image processing, developer utilities, and daily tasks." />
                <meta property="og:url" content="https://njtools.xyz/tools/" />
            </Helmet>

            <section className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 py-16 px-4 transition-colors duration-300">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        The <span className="text-blue-600 dark:text-blue-500">NJ</span> Toolset
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
                        Explore our complete suite of professional web tools.
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
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                            >
                                <X size={16} className="text-slate-400" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-12">
                {/* Category Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex bg-slate-200/50 dark:bg-gray-800/50 p-1.5 rounded-3xl overflow-x-auto no-scrollbar border border-slate-200 dark:border-gray-700">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleTabChange(cat)}
                                className={`px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat
                                        ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm scale-100'
                                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                    }`}
                            >
                                {cat === 'All' && <LayoutGrid size={14} className="inline mr-2 mb-0.5" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                        {searchQuery ? `Results for "${searchQuery}"` : activeTab === 'All' ? "All Tools" : `${activeTab} Tools`}
                    </h2>

                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTools.map((tool) => (
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
                </div>
            </main>
        </div>
    );

};

export default AllTools;