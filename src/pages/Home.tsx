import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    Search,
    ArrowRight
} from 'lucide-react';
import { TOOLS_CONFIG } from '../config/tools';

const Home: React.FC = () => {
    const SHOW_ADS = false;
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTools = TOOLS_CONFIG.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-50">
            <section className="bg-white border-b border-slate-200 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">
                        All-in-One <span className="text-blue-600">Developer</span> Tools
                    </h1>
                    <p className="text-xl text-slate-600 mb-8">
                        Fast, secure, and browser-based tools for your daily tasks. No registration, 100% free.
                    </p>

                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for a tool (e.g. SVG, JSON, Unit)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-lg"
                        />
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        {searchQuery ? `Results for "${searchQuery}"` : "Featured Tools"}
                    </h2>

                    {filteredTools.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredTools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    to={`/tools/${tool.id}`} // Dynamic route එකට link කරනවා
                                    className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-blue-50 transition-colors">
                                            {tool.icon}
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                            {tool.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.name}</h3>
                                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{tool.desc}</p>
                                    <div className="flex items-center text-blue-600 font-semibold text-sm group-hover:gap-2 transition-all">
                                        Try it now <ArrowRight className="w-4 h-4 ml-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                            <p className="text-slate-400">No tools found matching your search.</p>
                        </div>
                    )}
                </div>

                {SHOW_ADS && (
                    <div className="w-full bg-slate-200/50 h-32 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-300 mb-16">
                        <span className="text-slate-400 text-sm font-medium tracking-widest uppercase">Sponsored Advertisement</span>
                    </div>
                )}

                <section>
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                        <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
                        Browse Categories
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['Media', 'Developer', 'Utility'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSearchQuery(cat)}
                                className="w-35 md:w-50 p-4 bg-white border border-slate-200 rounded-xl text-center hover:bg-slate-50 hover:border-blue-300 transition cursor-pointer"
                            >
                                <span className="font-semibold text-slate-700">{cat}</span>
                            </button>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;