import React, { useState, type ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Download, Upload, Trash2 } from 'lucide-react';

const ImageCompressor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [compressedImage, setCompressedImage] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
    const [compressionRatio, setCompressionRatio] = useState<number>(0);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setOriginalImage(file);
            setCompressedImage(null);
            setStatus('idle');
        }
    };

    const handleCompress = async () => {
        if (!originalImage) return;

        setStatus('processing');
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(originalImage, options);
            setCompressedImage(compressedFile);

            const ratio = ((originalImage.size - compressedFile.size) / originalImage.size) * 100;
            setCompressionRatio(Math.round(ratio));
            setStatus('done');
        } catch (error) {
            console.error("Compression failed:", error);
            setStatus('idle');
        }
    };

    return (
        <ToolLayout
            title="Privacy-Focused Image Compressor"
            description="Reduce image file size without losing quality. All processing happens locally in your browser."
            seoContent={
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase border-b-2 border-blue-600 w-fit pb-1">
                            Next-Gen Image Optimization
                        </h2>
                        <p className="leading-relaxed text-sm">
                            Web performance starts with asset management. Our <strong className="text-blue-600 dark:text-blue-400">Online Image Compressor</strong> utilizes advanced <strong className="text-slate-900 dark:text-white">multi-threaded Web Workers</strong> to reduce file sizes by up to 90% without visible degradation. This client-side approach ensures that your high-resolution assets are processed in your browser's sandboxed environment, maximizing both speed and data integrity.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Lanczos Resampling</h3>
                            <p className="text-xs leading-relaxed">
                                By leveraging browser-native canvas APIs and high-quality resampling filters, we ensure that sharpness is preserved during the <strong className="text-slate-900 dark:text-white">Width/Height downscaling</strong> process, making it ideal for web developers and social media managers.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Asynchronous Processing</h3>
                            <p className="text-xs leading-relaxed">
                                The compression logic runs in a separate thread to prevent <strong className="text-slate-900 dark:text-white">UI-jank</strong>. This allows the main thread to remain responsive, providing a seamless user experience even when processing multi-megabyte image files.
                            </p>
                        </div>
                    </div>

                    <section className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase">Architectural Privacy</h3>
                        <p className="text-sm text-blue-50 leading-relaxed max-w-2xl">
                            Standard compressors upload your data to a server. NJTools implements an <strong className="text-white font-bold">Offline-First</strong> strategy. Your binary image data stays within your local RAM, ensuring 100% compliance with corporate data protection policies.
                        </p>
                    </section>

                    <section className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 italic uppercase">Optimization FAQ</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">What formats are supported?</h4>
                                <p className="text-sm">We fully support <strong className="text-blue-600">JPEG, PNG, and WebP</strong> formats, which are the primary drivers of modern web traffic.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">How much size reduction can I expect?</h4>
                                <p className="text-sm">Typically, images can be reduced by <strong className="text-slate-900 dark:text-white">60% to 80%</strong> with negligible impact on quality for 1080p and 4K displays.</p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Image Compressor | Reduce Photo Size Online | NJTools</title>
                <meta name="description" content="Compress JPG, PNG, and WebP images locally with zero quality loss. High-speed, private, and no-upload tool for developers and designers." />
                <meta name="keywords" content="image compressor, reduce image size, online photo compressor, private image compression, web worker image tool, optimize image for web, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-compressor/" />

                {/* OG Meta */}
                <meta property="og:title" content="Fast & Private Image Compressor | NJTools" />
                <meta property="og:description" content="Reduce file sizes instantly in your browser without uploading your photos. Fast, secure, and 100% free." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />
                <meta property="og:url" content="https://njtools.xyz/tools/image-compressor/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Privacy-First Image Compressor",
                        "operatingSystem": "Web",
                        "applicationCategory": "MultimediaApplication",
                        "featureList": ["Client-side compression", "Web Worker processing", "No upload privacy", "Batch-ready architecture"],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        },
                        "description": "Compress JPG, PNG, and WebP images directly in your browser using multi-threaded web workers. 100% private and secure."
                    })}
                </script>
            </Helmet>

            <div className="max-w-3xl mx-auto space-y-6">
                {!originalImage ? (
                    <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-slate-700 p-12 rounded-2xl bg-blue-50/30 dark:bg-slate-800/50 transition hover:bg-blue-50/50 dark:hover:bg-slate-800">
                        <Upload className="w-12 h-12 text-blue-400 dark:text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <p className="text-lg font-medium text-blue-900 dark:text-blue-200 text-center">Drop your image here or click to browse</p>
                        <p className="text-sm text-blue-500 dark:text-slate-500 mt-1 text-center">Supports JPG, PNG, WebP</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Original Image Card */}
                        <div className="p-6 border dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Original File</p>
                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-[10px] font-bold dark:text-slate-300">SOURCE</span>
                            </div>
                            <p className="text-3xl font-black text-slate-900 dark:text-white">{(originalImage.size / 1024 / 1024).toFixed(2)} <span className="text-lg font-normal">MB</span></p>
                            <button
                                onClick={() => {setOriginalImage(null); setCompressedImage(null);}}
                                className="mt-6 flex items-center text-red-500 dark:text-red-400 text-sm font-medium hover:opacity-80 transition"
                            >
                                <Trash2 className="w-4 h-4 mr-2" /> Remove image
                            </button>
                        </div>

                        {/* Compressed Image Card */}
                        {status === 'done' && compressedImage ? (
                            <div className="p-6 border border-green-200 dark:border-green-900/30 rounded-2xl bg-green-50/50 dark:bg-green-900/10 shadow-sm animate-in fade-in zoom-in duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-widest">Optimized</p>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 rounded text-[10px] font-bold text-green-700 dark:text-green-300">-{compressionRatio}%</span>
                                </div>
                                <p className="text-3xl font-black text-green-700 dark:text-green-400">{(compressedImage.size / 1024 / 1024).toFixed(2)} <span className="text-lg font-normal text-green-600/70">MB</span></p>
                                <a
                                    href={URL.createObjectURL(compressedImage)}
                                    download={`nj-compressed-${originalImage.name}`}
                                    className="mt-6 w-full inline-flex items-center justify-center bg-green-600 dark:bg-green-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-green-700 dark:hover:bg-green-600 transition shadow-lg shadow-green-500/20"
                                >
                                    <Download className="w-4 h-4 mr-2" /> Download Result
                                </a>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center border-2 border-dotted border-slate-200 dark:border-slate-700 rounded-2xl bg-slate-50/50 dark:bg-slate-900/20 text-slate-400 italic text-sm">
                                {status === 'processing' ? 'Processing...' : 'Wait for compression'}
                            </div>
                        )}
                    </div>
                )}

                {originalImage && status !== 'done' && (
                    <button
                        onClick={handleCompress}
                        disabled={status === 'processing'}
                        className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-blue-500/20"
                    >
                        {status === 'processing' ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Analyzing & Compressing...
                            </span>
                        ) : 'Compress Image Now'}
                    </button>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageCompressor;