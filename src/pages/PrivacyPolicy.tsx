import React from 'react';
import { Helmet } from "react-helmet-async";

const PrivacyPolicy: React.FC = () => {
    const lastUpdated = "April 22, 2026";

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800">
            <Helmet>
                <title>Privacy Policy | NJTools</title>
                <meta name="description" content="Privacy Policy for NJTools. Learn how we handle your data and ensure your privacy while using our web tools." />
                <link rel="canonical" href="https://njtools.xyz/privacy-policy" />
            </Helmet>

            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-sm text-slate-500 mb-8">Last Updated: {lastUpdated}</p>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">1. Introduction</h2>
                <p className="leading-relaxed">
                    Welcome to <strong>NJTools</strong> (njtools.xyz), operated by <strong>Niduranga Jayarathna</strong>.
                    We are committed to protecting your privacy. This policy explains how we handle information when you use our web-based tools.
                </p>
            </section>

            <section className="mb-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
                <h2 className="text-2xl font-semibold mb-4 text-blue-700">2. Our "No-Server" Processing Model</h2>
                <p className="leading-relaxed font-medium">
                    At NJTools, your privacy is our priority. Unlike many other online converters:
                </p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                    <li><strong>We do NOT upload your files to any server.</strong></li>
                    <li>All file conversions (SVG to PNG, PNG to SVG, etc.) happen locally within your web browser.</li>
                    <li>Your sensitive images and data never leave your device.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">3. Information We Collect</h2>
                <p className="mb-4">We collect very limited information to improve your experience:</p>
                <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Usage Data:</strong> We may use tools like Google Analytics to see which tools are popular, helping us improve the site.</li>
                    <li><strong>Cookies:</strong> We use basic cookies to remember your preferences and for site analytics.</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">4. Third-Party Services</h2>
                <p className="leading-relaxed">
                    We may use third-party services such as <strong>Google Ads</strong> and <strong>Google Analytics</strong>.
                    These providers may use cookies or DART cookies to serve ads based on your visit to our site and other sites on the internet.
                    You may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">5. Security</h2>
                <p className="leading-relaxed">
                    Since your files are processed locally, the security of your data depends on your own device's security.
                    We use <strong>HTTPS</strong> encryption to ensure that the tools delivered to your browser are secure and untampered.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">6. Contact Us</h2>
                <p className="leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at:
                    <br />
                    <span className="font-semibold text-blue-600">Email: nidurangajayarathna@gmail.com</span>
                </p>
            </section>
        </div>
    );
};

export default PrivacyPolicy;