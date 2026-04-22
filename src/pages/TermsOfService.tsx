import React from 'react';
import { Helmet } from "react-helmet-async";
import { FileText, ShieldAlert, Gavel, Scale, Edit3, Mail, CheckCircle2 } from 'lucide-react';

const TermsOfService: React.FC = () => {
    const lastUpdated = "April 22, 2026";

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
            <Helmet>
                <title>Terms of Service | NJTools - Usage Guidelines</title>
                <meta name="description" content="Terms of Service for NJTools. Read our rules and guidelines for using our online developer tools." />
                <link rel="canonical" href="https://njtools.xyz/terms-of-service/" />
            </Helmet>

            <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-400 text-xs font-black uppercase tracking-[0.2em]">
                        <Gavel size={14} /> Legal Agreement
                    </div>
                    <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Terms of <span className="text-blue-600 dark:text-blue-500 italic">Service</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Last Updated: {lastUpdated}</p>
                </div>

                <div className="space-y-12">
                    {/* 1. Acceptance */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tight">
                            <CheckCircle2 className="text-blue-500" size={20} /> 1. Acceptance of Terms
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                            By accessing and using <strong className="text-slate-900 dark:text-white font-black">NJTools</strong> (njtools.xyz), you agree to comply with and be bound by these Terms of Service. If you do not agree, please refrain from using our services.
                        </p>
                    </section>

                    {/* 2. Use of Services */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tight">
                            <FileText className="text-blue-500" size={20} /> 2. Use of Services
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">You agree to use NJTools only for lawful purposes. You are strictly prohibited from:</p>
                        <div className="grid gap-3">
                            {[
                                "Attempting to disrupt or compromise site security.",
                                "Processing malicious or illegal content via tools.",
                                "Automating access (scraping/crawling) without permission."
                            ].map((rule, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                                    <ShieldAlert size={16} className="text-rose-500 shrink-0" />
                                    {rule}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3. Intellectual Property */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic uppercase tracking-tight">
                            3. Intellectual Property
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            The content, design, and logo of NJTools are the property of <span className="font-black text-slate-900 dark:text-white">Niduranga Jayarathna</span>.
                            However, <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-2 underline-offset-4">your files remain your own property</span>. We claim no ownership over the data you process.
                        </p>
                    </section>

                    {/* 4. Disclaimer - HIGHLIGHTED */}
                    <section className="bg-amber-50 dark:bg-amber-950/20 p-8 rounded-4xl border border-amber-100 dark:border-amber-900/30 shadow-xl shadow-amber-500/5">
                        <h2 className="text-2xl font-black text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-3 italic uppercase tracking-tight">
                            <ShieldAlert size={24} /> 4. Disclaimer of Warranties
                        </h2>
                        <p className="text-amber-800 dark:text-amber-400/90 leading-relaxed font-bold italic">
                            NJTools provides services on an "as is" basis. While we strive for 100% accuracy, we do not guarantee that results will always be error-free. We are not liable for any data loss or damages resulting from the use of our tools.
                        </p>
                    </section>

                    {/* 5. Liability */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tight">
                            <Scale className="text-blue-500" size={20} /> 5. Limitation of Liability
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            In no event shall <span className="font-bold">Jayarathna Innovation</span> be liable for any indirect, incidental, or consequential damages arising out of your use of the website.
                        </p>
                    </section>

                    {/* 6. Modifications */}
                    <section className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                        <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-slate-400" />
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 flex items-center gap-2 italic uppercase tracking-tight">
                            <Edit3 className="text-blue-500" size={20} /> 6. Modifications
                        </h2>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            We reserve the right to change these terms at any time. Continued use of the site constitutes your acceptance of the new terms.
                        </p>
                    </section>

                    {/* 7. Contact Section */}
                    <section className="bg-slate-900 dark:bg-slate-900 p-8 rounded-4xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-black italic uppercase tracking-tight mb-1">Legal Inquiries?</h2>
                            <p className="text-slate-400 text-sm font-medium">Reach out for any clarifications regarding our terms.</p>
                        </div>
                        <a
                            href="mailto:nidurangajayarathna@gmail.com"
                            className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                        >
                            <Mail size={18} /> Contact Legal
                        </a>
                    </section>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.4em]">
                        NJTools • Professional Developer Utilities • 2026
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;