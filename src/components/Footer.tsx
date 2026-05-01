import React from 'react';
import { Link } from 'react-router';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-16 pb-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-500">
                            NJ<span className="text-gray-800 dark:text-white">Tools</span>
                        </Link>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            High-performance web tools built with privacy in mind. All processing happens locally in your browser.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Popular Tools</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/tools/svg-to-png/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">SVG to PNG Converter</Link></li>
                            <li><Link to="/tools/png-to-svg/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">PNG to SVG Converter</Link></li>
                            <li className="pt-2 border-t border-slate-50 dark:border-slate-800">
                                <Link to="/tools/" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                                    View All Tools →
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/about/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Us</Link></li>
                            <li><Link to="/contact/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 dark:text-white mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                            <li><Link to="/privacy-policy/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link></li>
                            <li><Link to="/terms-of-service/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        © {currentYear} <span className="font-medium text-slate-600 dark:text-slate-400">Niduranga Jayarathna</span>.
                    </p>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-[#0077b5] dark:hover:text-blue-400 transition"
                        >
                            <span className="sr-only">LinkedIn</span>
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;