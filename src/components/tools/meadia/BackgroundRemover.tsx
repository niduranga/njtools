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
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase">
                            Privacy-First AI Image Segmentation
                        </h2>
                        <p className="leading-relaxed text-sm">
                            Most online "Remove BG" tools compromise your privacy by uploading your personal photos to remote servers. NJTools disrupts this model by deploying <strong className="text-indigo-600 dark:text-indigo-400">TensorFlow/WASM-based neural networks</strong> directly to your client-side environment. This ensures that your binary image data is processed in volatile memory and is never transmitted over the network.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-indigo-600 mb-3 tracking-[0.2em]">Neural Network Precision</h3>
                            <p className="text-xs leading-relaxed">
                                Our AI utilizes a complex <strong className="text-slate-900 dark:text-white">Saliency Object Detection</strong> algorithm to identify foreground subjects. It handles challenging edge cases like hair, fur, and complex lighting with professional-grade masking accuracy.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-indigo-600 mb-3 tracking-[0.2em]">Transparent PNG Export</h3>
                            <p className="text-xs leading-relaxed">
                                Once the alpha channel is calculated, the tool generates a high-resolution <strong className="text-slate-900 dark:text-white">32-bit RGBA PNG</strong>. Perfect for e-commerce listings, professional headshots, and graphic design workflows.
                            </p>
                        </div>
                    </div>

                    <section className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase">Technical Performance Note</h3>
                        <p className="text-sm text-indigo-50 leading-relaxed max-w-2xl">
                            Upon first execution, the tool initializes a ~40MB AI model buffer. This is a one-time overhead per session, after which the hardware-accelerated processing ensures near-instant background removal for all subsequent images.
                        </p>
                    </section>

                    <section className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 italic uppercase">AI Tool FAQ</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Is my data safe with NJTools?</h4>
                                <p className="text-sm">Absolutely. Since we use <strong className="text-indigo-600">On-Device AI</strong>, the processing happens on your GPU/CPU. We have no backend storage, making it the most secure way to edit photos online.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Why is the first-time load slow?</h4>
                                <p className="text-sm">The browser needs to fetch the trained AI weights (the "brain") to perform the segmentation. Once cached, the tool works offline and much faster.</p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free AI Background Remover | Transparent PNG Maker | NJTools</title>
                <meta name="description" content="Remove image backgrounds online for free. 100% automatic and private. No sign-up required." />
                <meta name="keywords" content="background remover, remove bg, transparent background, ai background removal, free online tool, png maker, image editor, private background remover, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/background-remover/" />

                <meta property="og:title" content="AI Background Remover | Privacy-First Image Tool | NJTools" />
                <meta property="og:description" content="Remove backgrounds instantly using on-device AI. Your photos never leave your computer." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />
                <meta property="og:url" content="https://njtools.xyz/tools/background-remover/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "AI Background Remover",
                        "operatingSystem": "Web",
                        "applicationCategory": "MultimediaApplication",
                        "featureList": ["AI Image Segmentation", "On-device processing", "Transparent PNG Export"],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        }
                    })}
                </script>
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