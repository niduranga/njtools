import React from 'react';
import { Helmet } from "react-helmet-async";
import ContactForm from '../components/ContactForm';

const ContactUs: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <Helmet>
                <title>Contact Us | NJTools - Jayarathna Innovation</title>
                <meta name="description" content="Get in touch with NJTools. Have questions or suggestions? Contact us via our form or LinkedIn." />
                <link rel="canonical" href="https://njtools.xyz/contact" />
            </Helmet>

            <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Us</h1>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Have a technical question, feedback, or a business inquiry?
                            I'm always open to discussing new projects or creative ideas.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Email Detail */}
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">Email Me</h3>
                                <p className="text-slate-500">nidurangajayarathna@gmail.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800">LinkedIn</h3>
                                <a
                                    href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Niduranga Jayarathna
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200">
                        <p className="text-sm text-slate-400">
                            Managed by <span className="font-semibold text-slate-600">Niduranga Jayarathna</span>
                        </p>
                    </div>
                </div>

                {/* Right Side: The Form */}
                <div className="w-full">
                    <ContactForm />
                </div>

            </div>
        </div>
    );
};

export default ContactUs;