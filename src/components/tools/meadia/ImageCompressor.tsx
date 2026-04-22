import React, { useState, type ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Download, Upload, Trash2, Zap } from 'lucide-react';

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
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Optimize Performance with Smart Image Compression</h2>
                        <p className="leading-relaxed">
                            Large image files are the primary cause of slow website loading times.
                            Our <strong className="text-blue-600 dark:text-blue-400">Smart Image Compressor</strong> helps you find the perfect balance between file size and visual quality.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Key Benefits</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Improve Page Speed:</strong> Faster loading times for better UX.</li>
                            <li><strong className="text-slate-900 dark:text-white">Privacy Guaranteed:</strong> NJTools compresses everything locally. Your photos stay on your machine.</li>
                        </ul>
                    </section>

                    <section className="bg-blue-50 dark:bg-slate-800/50 p-6 rounded-xl border border-blue-100 dark:border-slate-700 shadow-sm">
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2 italic flex items-center gap-2">
                            <Zap className="w-5 h-5" /> How it Works
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                            Our compressor uses intelligent algorithms to strip away unnecessary color data and metadata. The result is a significantly smaller file that looks identical to the original.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Image Compressor | Reduce Photo Size Online | NJTools</title>
                <meta name="description" content="Compress JPG, PNG, and WebP images locally. Fast, secure, and no upload required." />
                <meta name="keywords" content="image compressor, reduce image size, online photo compressor, private image compression, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-compressor" />
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