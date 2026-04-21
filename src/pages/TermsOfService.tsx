import React from 'react';
import { Helmet } from "react-helmet-async";

const TermsOfService: React.FC = () => {
    const lastUpdated = "April 22, 2026";

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
            <Helmet>
                <title>Terms of Service | NJTools</title>
                <meta name="description" content="Terms of Service for NJTools. Read our rules and guidelines for using our online developer tools." />
                <link rel="canonical" href="https://njtools.xyz/terms-of-service" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {lastUpdated}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">1. Acceptance of Terms</h2>
                <p className="leading-relaxed">
                    By accessing and using <strong>NJTools</strong> (njtools.xyz), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">2. Use of Services</h2>
                <p className="mb-4">You agree to use NJTools only for lawful purposes. You are strictly prohibited from:</p>
                <ul className="list-disc ml-6 space-y-2">
                    <li>Attempting to disrupt or compromise the security of the website.</li>
                    <li>Using the tools to process malicious or illegal content.</li>
                    <li>Automating access to the site (crawling/scraping) without prior permission.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">3. Intellectual Property</h2>
                <p className="leading-relaxed">
                    The content, design, and logo of NJTools are the property of <strong>Niduranga Jayarathna</strong>. You may not reproduce or redistribute any part of this site without our explicit consent. However, any files you convert using our tools remain your own property.
                </p>
            </section>

            <section className="mb-8 bg-amber-50 p-6 rounded-xl border border-amber-100">
                <h2 className="text-2xl font-semibold mb-4 text-amber-700">4. Disclaimer of Warranties</h2>
                <p className="leading-relaxed italic">
                    NJTools provides services on an "as is" and "as available" basis. While we strive for 100% accuracy in our conversion tools (like SVG to PNG), we do not guarantee that the results will always be error-free or meet your specific requirements. We are not liable for any data loss or damages resulting from the use of our tools.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">5. Limitation of Liability</h2>
                <p className="leading-relaxed">
                    In no event shall Jayarathna Innovation be liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the website.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">6. Modifications to Terms</h2>
                <p className="leading-relaxed">
                    We reserve the right to change these terms at any time. Your continued use of the site after changes are posted constitutes your acceptance of the new terms.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">7. Contact Information</h2>
                <p className="leading-relaxed">
                    For any legal inquiries regarding these terms, please contact:
                    <br />
                    <span className="font-semibold text-blue-600">Email: nidurangajayarathna@gmail.com</span>
                </p>
            </section>
        </div>
    );
};

export default TermsOfService;