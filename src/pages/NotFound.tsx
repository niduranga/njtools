import React from 'react';
import { Link } from 'react-router';
import { Home, Compass, Ghost } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6 transition-colors duration-300 overflow-hidden relative">

            {/* Background Decorative Elements */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[100px] z-0" />

            <div className="text-center relative z-10 space-y-8">
                {/* Visual Icon Section */}
                <div className="relative inline-block">
                    <div className="p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-bounce duration-2000">
                        <Ghost size={80} className="text-blue-600 dark:text-blue-500" strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-2 -right-2 p-3 bg-rose-500 rounded-2xl text-white shadow-lg border-4 border-slate-50 dark:border-slate-950">
                        <Compass size={24} className="animate-spin-slow" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-8xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter opacity-10 leading-none absolute left-1/2 -translate-x-1/2 -top-12 -z-10 select-none">
                        404
                    </h1>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                        Lost in <span className="text-blue-600 dark:text-blue-500 italic">Cyberspace?</span>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-md mx-auto font-medium">
                        The page you are looking for has either moved to a different dimension or was never built in the first place.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 dark:bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-600 dark:hover:bg-blue-500 transition-all active:scale-95 shadow-xl shadow-blue-500/20 group"
                    >
                        <Home size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                        Back to Home
                    </Link>
                </div>

                <div className="pt-12">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-600 uppercase tracking-[0.5em]">
                        NJTools • Engineering Innovation
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;