import React from 'react';
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Cpu, Code2, Rocket, Globe, Zap } from 'lucide-react';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Helmet>
                <title>About NJTools | Niduranga Jayarathna</title>
                <meta name="description" content="Learn more about NJTools and our mission to provide high-performance, privacy-focused web utilities. Built by Niduranga Jayarathna." />
                <link rel="canonical" href="https://njtools.xyz/about/" />
                <meta property="og:title" content="About NJTools | High-Performance Web Tools" />
                <meta property="og:description" content="Our mission is to simplify digital workflows while maintaining 100% user privacy." />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 py-16 px-4 transition-colors duration-300">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-0" />

                <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest">
                        <Zap size={14} /> Powering Productivity
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                        Simplifying <br />
                        <span className="text-blue-500 italic">Digital Workflows.</span>
                    </h1>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed">
                        NJTools is a suite of high-performance web utilities engineered to help developers and designers work smarter, without compromising privacy.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-6xl mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-12 gap-16 items-start">

                    {/* Left Side: Mission & Vision */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="group">
                            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
                                <ShieldCheck className="text-blue-600" size={32} /> Our Mission
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic border-l-4 border-blue-600 pl-6 py-2">
                                We believe privacy is a fundamental right. Unlike typical online tools,
                                <strong className="text-slate-900 dark:text-slate-200"> NJTools processes everything locally in your browser. </strong>
                                Your data never touches a server—ever.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <Cpu className="text-blue-500 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">High Performance</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Optimized using Web Workers and modern algorithms to ensure instant results even with large files.
                                </p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                                <Code2 className="text-blue-500 mb-4" size={28} />
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Clean Engineering</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Adhering to SOLID principles and Clean Architecture to provide professional-grade reliability.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Founder Bio Card */}
                    <div className="lg:col-span-5">
                        <div className="bg-white dark:bg-slate-900 p-1 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 border border-slate-100 dark:border-slate-800 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Rocket size={120} className="dark:text-white" />
                            </div>

                            <div className="p-8 space-y-6 text-center relative z-10">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-4xl overflow-hidden border-4 border-blue-600 shadow-xl mx-auto rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <img
                                            src="/niduranga.jpg"
                                            alt="Niduranga Jayarathna"
                                            className="w-full h-full object-cover scale-110"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-lg" />
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Niduranga Jayarathna</h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-black text-xs uppercase tracking-[0.2em]">Founder & Senior Developer</p>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                                    Engineering Student and Full-stack Developer. NJTools is my commitment to building
                                    fast, privacy-conscious utilities that solve real-world problems for the global developer community.
                                </p>

                                <div className="pt-4 flex justify-center gap-4">
                                    <a
                                        href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-slate-900 dark:bg-blue-600 text-white px-8 py-3 rounded-2xl text-sm font-black hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                                    >
                                        <Globe size={16} /> Follow Work
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tech Stack Footer */}
                <div className="mt-32 pt-16 border-t border-slate-200 dark:border-slate-800">
                    <p className="text-center text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em] mb-10 italic">Engineered With Precision</p>
                    <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 dark:opacity-20 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                        {['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Rust (WASM)'].map((tech) => (
                            <span key={tech} className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;