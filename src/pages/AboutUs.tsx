import React from 'react';
import { Helmet } from "react-helmet-async";

const AboutUs: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            <Helmet>
                <title>About Us | NJTools - Niduranga Jayarathna</title>
                <meta name="description" content="Learn more about NJTools and Niduranga Jayarathna. We build high-performance web tools for developers and creators." />
                <link rel="canonical" href="https://njtools.xyz/about" />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-slate-900 py-20 px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Simplifying Digital Workflows</h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    NJTools is a suite of high-performance web tools designed to help developers and designers work smarter, not harder.
                </p>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 gap-16 items-start">

                    {/* Mission & Vision */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-4">Our Mission</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Our goal is to provide fast, secure, and accessible tools that run entirely in the browser.
                                We believe that privacy should never be a trade-off for convenience, which is why
                                <strong> NJTools processes your data locally—nothing is ever uploaded to our servers.</strong>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-slate-800 mb-4 border-l-4 border-blue-600 pl-4">The Innovation</h2>
                            <p className="text-slate-600 leading-relaxed">
                                As part of <strong>Niduranga Jayarathna</strong>, we focus on building software that adheres to
                                Clean Architecture and SOLID principles, ensuring top-tier performance and reliability for every user.
                            </p>
                        </div>
                    </div>

                    {/* Founder Bio */}
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Behind the Project</h2>
                        <div className="space-y-4 text-center">
                            <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold">
                                <img src="https://media.licdn.com/dms/image/v2/D5603AQEE8sD9Qku4Bg/profile-displayphoto-scale_400_400/B56Z1rsg77IIAg-/0/1775628331221?e=1778112000&v=beta&t=AEcYcP14_qwwTkQBNERL73qoI1Ds1kRlTZuE4ENw2Ko" alt="niduranga Jayarathna"/>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Niduranga Jayarathna</h3>
                                <p className="text-blue-600 font-medium italic">Founder & Senior Developer</p>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                I am an Engineering Student and a Senior Full-stack Developer with a passion for building
                                high-performance web applications. NJTools is a project born out of my dedication to
                                open-source and professional-grade software engineering.
                            </p>
                            <div className="pt-4">
                                <a
                                    href="https://www.linkedin.com/in/niduranga-jayarathna-1606b21b9/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-blue-600 transition"
                                >
                                    Follow on LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Stack Section */}
                <div className="mt-20 py-12 border-t border-slate-100">
                    <h2 className="text-center text-slate-400 uppercase tracking-widest text-sm font-bold mb-8">Built With Modern Tech</h2>
                    <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <span className="font-bold text-2xl">React</span>
                        <span className="font-bold text-2xl">TypeScript</span>
                        <span className="font-bold text-2xl">Vite</span>
                        <span className="font-bold text-2xl">Tailwind CSS</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;