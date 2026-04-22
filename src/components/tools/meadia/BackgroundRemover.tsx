import React, { useState, type ChangeEvent } from 'react';
import { removeBackground } from '@imgly/background-removal';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const BackgroundRemover: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            setStatus('processing');
            try {
                // On-device AI processing
                const blob = await removeBackground(file);
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
                setStatus('done');
            } catch (error) {
                console.error("Removal failed:", error);
                setStatus('idle');
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <ToolLayout
            title="AI Background Remover"
            description="Remove backgrounds from images instantly and for free using on-device AI."
            seoContent={
                /* Dark mode support for SEO Content */
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Professional AI Background Removal</h2>
                        <p className="leading-relaxed">
                            Creating professional-looking product photos or portraits used to require expensive software and hours of manual masking.
                            Our <strong className="text-indigo-600 dark:text-indigo-400">AI Background Remover</strong> brings the power of state-of-the-art machine learning directly to your browser.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Why Choose Our AI Tool?</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Seamless Transparency:</strong> Get a pixel-perfect transparent PNG ready for any background.</li>
                            <li><strong className="text-slate-900 dark:text-white">Zero Uploads:</strong> NJTools runs the AI model locally on your computer. Your private photos never leave your device.</li>
                            <li><strong className="text-slate-900 dark:text-white">Unlimited Usage:</strong> No credits, no subscriptions, and no watermarks.</li>
                        </ul>
                    </section>

                    {/* High-impact Indigo section for Dark Mode */}
                    <section className="bg-indigo-900 dark:bg-indigo-950 text-indigo-100 p-6 rounded-xl border border-indigo-700 shadow-lg">
                        <h3 className="text-lg font-bold text-white mb-2">Our On-Device AI Technology</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            We utilize the latest WASM-based neural network models to perform complex image segmentation tasks without a backend server.
                            This guarantees that your privacy is fundamentally protected by the architecture of the web.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free AI Background Remover | Transparent PNG Maker | NJTools</title>
                <meta name="description" content="Remove image backgrounds online for free. 100% automatic and private. No sign-up required." />
                <meta name="keywords" content="background remover, remove bg, transparent background, ai background removal, free online tool, png maker, image editor, private background remover, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/background-remover" />
            </Helmet>

            <div className={`flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-lg transition-colors ${
                status === 'processing'
                    ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/20'
                    : 'border-indigo-200 dark:border-slate-700 bg-indigo-50/30 dark:bg-slate-800/50'
            }`}>
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    disabled={status === 'processing'}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-slate-700 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-slate-600 disabled:opacity-50"
                />

                {status === 'processing' && (
                    <div className="mt-6 flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-2 w-2 bg-indigo-600 rounded-full animate-ping"></div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-indigo-700 dark:text-indigo-400 font-bold animate-pulse text-lg">AI is working its magic...</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                                First-time use may take a moment to download the AI model (approx. 40MB).
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Result Area */}
            {status === 'done' && imageUrl && (
                <div className="mt-8 flex flex-col items-center gap-6 p-6 border dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow-xl">
                    <div className="relative group p-2 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] dark:bg-slate-700 rounded-lg border dark:border-slate-600">
                        <img src={imageUrl} alt="Background Removed Result" className="max-h-125 object-contain" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href={imageUrl}
                            download="njtools-bg-removed.png"
                            className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                            Download PNG
                        </a>
                        <button
                            onClick={() => {setStatus('idle'); setImageUrl(null);}}
                            className="px-6 py-4 rounded-full font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                        >
                            Remove Another
                        </button>
                    </div>
                </div>
            )}
        </ToolLayout>
    );
};

export default BackgroundRemover;