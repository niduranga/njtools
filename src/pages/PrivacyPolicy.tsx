import React from 'react';
import { Helmet } from "react-helmet-async";
import { ShieldCheck, Lock, EyeOff, ServerOff, Globe, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    const lastUpdated = "April 22, 2026";

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Helmet>
                <title>Privacy Policy | NJTools - 100% Secure & Private</title>
                <meta name="description" content="Read the NJTools Privacy Policy. We process all data locally in your browser. No uploads, no storage, 100% privacy." />
                <link rel="canonical" href="https://njtools.xyz/privacy-policy/" />
                <meta property="og:title" content="Privacy Policy | NJTools" />
                <meta property="og:description" content="Your data never leaves your browser. Learn how we protect your privacy." />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-black uppercase tracking-[0.2em]">
                        <ShieldCheck size={14} /> Trust & Safety
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Privacy <span className="text-blue-600 dark:text-blue-500 italic">Policy</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Last Updated: {lastUpdated}</p>
                </div>

                <div className="space-y-12">
                    {/* 1. Introduction */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tight">
                            <Globe className="text-blue-500" size={20} /> 1. Introduction
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            Welcome to <strong className="text-slate-900 dark:text-white font-black">NJTools</strong> (njtools.xyz), operated by
                            <span className="text-blue-600 dark:text-blue-400 font-bold"> Niduranga Jayarathna</span>.
                            We are committed to protecting your privacy. This policy explains how we handle information when you use our web-based tools.
                        </p>
                    </section>

                    {/* 2. No-Server Model - HIGHLIGHTED */}
                    <section className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/30 shadow-2xl shadow-blue-500/5 transition-colors">
                        <h2 className="text-2xl font-black text-blue-700 dark:text-blue-400 mb-6 flex items-center gap-3 italic uppercase tracking-tight">
                            <ServerOff size={24} /> 2. No-Server Processing Model
                        </h2>
                        <div className="space-y-4">
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold text-lg">
                                At NJTools, your privacy is our priority. Unlike many other online converters:
                            </p>
                            <div className="grid gap-4 mt-6">
                                {[
                                    { icon: <Lock size={18}/>, text: "We do NOT upload your files to any server." },
                                    { icon: <EyeOff size={18}/>, text: "All file processing happens locally within your web browser memory." },
                                    { icon: <ShieldCheck size={18}/>, text: "Your sensitive images, JSON, and documents never leave your device." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 border border-blue-100/50 dark:border-blue-800/30">
                                        <div className="shrink-0">{item.icon}</div>
                                        <span className="font-bold tracking-tight">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. Information Collection */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-400 dark:bg-slate-600" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic uppercase tracking-tight">
                            3. Information We Collect
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">We collect very limited information to improve your experience:</p>
                        <div className="space-y-4">
                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border dark:border-slate-800">
                                <h4 className="font-black text-slate-900 dark:text-white mb-1 tracking-tight">Usage Data</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">We may use tools like Google Analytics to see which tools are popular, helping us improve the site.</p>
                            </div>
                            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border dark:border-slate-800">
                                <h4 className="font-black text-slate-900 dark:text-white mb-1 tracking-tight">Cookies</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">We use basic cookies to remember your preferences and for site analytics.</p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Third-Party */}
                    <section className="p-8 rounded-[2rem] bg-slate-900 text-slate-300 border border-slate-800">
                        <h2 className="text-2xl font-black text-white mb-4 italic uppercase tracking-tight">4. Third-Party Services</h2>
                        <p className="leading-relaxed opacity-90 text-sm">
                            We may use third-party services such as <span className="text-blue-400 font-bold">Google Ads</span> and <span className="text-blue-400 font-bold">Google Analytics</span>.
                            These providers may use cookies or DART cookies to serve ads based on your visit to our site.
                            You may opt-out by visiting the Google Ad Network privacy policy.
                        </p>
                    </section>

                    {/* 5. Security */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic uppercase tracking-tight">
                            5. Security
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            Since your files are processed locally, the security of your data depends on your own device's security.
                            We use <strong className="text-emerald-600 dark:text-emerald-400">HTTPS encryption</strong> to ensure that the tools delivered to your browser are secure and untampered.
                        </p>
                    </section>

                    {/* 6. Contact Us */}
                    <section className="bg-blue-600 dark:bg-blue-700 p-8 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
                        <div className="space-y-2 text-center md:text-left">
                            <h2 className="text-2xl font-black italic uppercase tracking-tight">6. Questions?</h2>
                            <p className="text-blue-100 font-medium">If you have any questions about this policy, please contact us.</p>
                        </div>
                        <a
                            href="mailto:nidurangajayarathna@gmail.com"
                            className="flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-black hover:bg-blue-50 transition-all active:scale-95 shadow-lg"
                        >
                            <Mail size={20} /> Email Me
                        </a>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em]">
                        NJTools • Niduranga Jayarathna • Privacy First Architecture
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;