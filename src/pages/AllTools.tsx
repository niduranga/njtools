import React from 'react';
import { Link } from 'react-router';
import { Helmet } from "react-helmet-async";
import { TOOLS_CONFIG } from '../config/tools';

const AllTools: React.FC = () => {
    const categories = ['Media', 'Developer', 'Utility'];

    return (
        <div className="bg-slate-50 min-h-screen py-16 px-4">
            <Helmet>
                <title>All Online Tools | NJTools</title>
                <meta name="description" content="Explore all professional-grade web tools at NJTools. Fast, secure, and browser-based utilities." />
                <link rel="canonical" href="https://njtools.xyz/tools/" />
            </Helmet>

            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">All Online Tools</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg">
                        High-performance utilities built with Clean Architecture. All processing happens locally for maximum privacy.
                    </p>
                </header>

                <div className="space-y-16">
                    {categories.map((catName) => {
                        const categoryTools = TOOLS_CONFIG.filter(t => t.category === catName);

                        if (categoryTools.length === 0) return null;

                        return (
                            <section key={catName}>
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-2xl font-bold text-slate-800">{catName} Tools</h2>
                                    <div className="grow h-px bg-slate-200"></div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {categoryTools.map((tool) => (
                                        <Link
                                            key={tool.id}
                                            to={`/tools/${tool.id}`}
                                            className="group bg-white p-8 rounded-4xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500 transition-all duration-300"
                                        >
                                            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                {tool.icon}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                                {tool.name}
                                            </h3>
                                            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                                                {tool.desc}
                                            </p>
                                            <div className="mt-6 flex items-center text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                                Open Tool
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllTools;