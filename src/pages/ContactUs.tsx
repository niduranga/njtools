import React from 'react';
import { Helmet } from "react-helmet-async";
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

const ContactUs: React.FC = () => {
    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Helmet>
                <title>Contact Us | NJTools - Jayarathna Innovation</title>
                <meta name="description" content="Get in touch with NJTools. Have questions or suggestions? Contact us via our form or LinkedIn." />
                <link rel="canonical" href="https://njtools.xyz/contact/" />
            </Helmet>

            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-start">

                {/* Left Side: Contact Info & Branding */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-black uppercase tracking-widest">
                            <MessageSquare size={14} /> Get in Touch
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                            Let's Build <br />
                            <span className="text-blue-600 dark:text-blue-500 italic">Something Great.</span>
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                            Have a technical question, feedback, or a business inquiry?
                            I'm always open to discussing new projects or creative ideas.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Email Card */}
                        <div className="group flex items-center gap-5 p-4 rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                            <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Email Me</h3>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">nidurangajayarathna@gmail.com</p>
                            </div>
                        </div>

                        {/* LinkedIn Card - Using SVG for zero dependency errors */}
                        <div className="group flex items-center gap-5 p-4 rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                            <div className="bg-blue-600 dark:bg-blue-500 p-4 rounded-2xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform flex items-center justify-center">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">LinkedIn</h3>
                                <a
                                    href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-bold text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    Niduranga Jayarathna
                                </a>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="group flex items-center gap-5 p-4 rounded-3xl border border-transparent hover:border-slate-200 dark:hover:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                            <div className="bg-slate-800 dark:bg-slate-700 p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Based In</h3>
                                <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Sri Lanka</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.3em]">
                            Managed by <span className="text-slate-900 dark:text-slate-300">Niduranga Jayarathna</span>
                        </p>
                    </div>
                </div>

                {/* Right Side: The Contact Form Card */}
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-3xl -z-10" />

                    <div className="bg-white dark:bg-slate-900 p-2 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                        <div className="p-4 md:p-6">
                            <ContactForm />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;