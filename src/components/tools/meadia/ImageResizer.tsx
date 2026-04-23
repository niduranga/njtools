import React, { useState, useRef, type ChangeEvent } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Image as ImageIcon, Download, Maximize, ArrowsUpFromLine, RefreshCw, Loader2 } from 'lucide-react';

const ImageResizer: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [resizedUrl, setResizedUrl] = useState<string | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, aspectLocked: true });
    const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
    const [isProcessing, setIsProcessing] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageLoad = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setResizedUrl(null);

            const img = new Image();
            img.onload = () => {
                setDimensions({ width: img.width, height: img.height, aspectLocked: true });
                setOriginalDimensions({ width: img.width, height: img.height });
            };
            img.src = url;
        }
    };

    const updateDimension = (type: 'w' | 'h', value: number) => {
        if (type === 'w') {
            const newHeight = dimensions.aspectLocked
                ? Math.round((value / originalDimensions.width) * originalDimensions.height)
                : dimensions.height;
            setDimensions({ ...dimensions, width: value, height: newHeight });
        } else {
            const newWidth = dimensions.aspectLocked
                ? Math.round((value / originalDimensions.height) * originalDimensions.width)
                : dimensions.width;
            setDimensions({ ...dimensions, height: value, width: newWidth });
        }
    };

    const handleResize = () => {
        if (!selectedImage || !canvasRef.current) return;
        setIsProcessing(true);

        const img = new Image();
        img.src = previewUrl!;
        img.onload = () => {
            const canvas = canvasRef.current!;
            canvas.width = dimensions.width;
            canvas.height = dimensions.height;
            const ctx = canvas.getContext('2d');

            if (ctx) {
                // Image smoothing for high quality
                ctx.imageSmoothingEnabled = true;
                ctx.imageSmoothingQuality = 'high';
                ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);

                const dataUrl = canvas.toDataURL(selectedImage.type, 0.9);
                setResizedUrl(dataUrl);
                setIsProcessing(false);
            }
        };
    };

    return (
        <ToolLayout
            title="Image Resizer"
            description="Resize your images to custom dimensions instantly. High-quality output, 100% private."
            seoContent={
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight italic">Precision Image Scaling</h2>
                        <p className="leading-relaxed">
                            Scaling images for web performance or social media requirements shouldn't be a hassle.
                            Our <strong className="text-blue-600 dark:text-blue-400">Pro Image Resizer</strong> allows you to define exact pixel dimensions
                            while maintaining crystal-clear quality through advanced browser-based interpolation.
                        </p>
                    </section>

                    <section className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-3 uppercase tracking-widest">Key Capabilities</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <li className="flex items-center gap-2 text-sm font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Aspect Ratio Preservation
                            </li>
                            <li className="flex items-center gap-2 text-sm font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Canvas-Level Smoothing
                            </li>
                            <li className="flex items-center gap-2 text-sm font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Multi-Format Support (WebP/PNG/JPG)
                            </li>
                            <li className="flex items-center gap-2 text-sm font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div> Zero Server Latency
                            </li>
                        </ul>
                    </section>

                    <section className="border-l-4 border-blue-600 pl-6">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Why Privacy Matters?</h3>
                        <p className="text-sm leading-relaxed opacity-80 font-medium">
                            Typical online resizers upload your photos to their servers, creating a potential privacy risk.
                            NJTools processes your data locally within your browser's memory. Once you close the tab, the data is gone forever.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Online Image Resizer | Custom Dimensions | NJTools</title>
                <meta name="description" content="Resize JPG, PNG, and WebP images online for free. Maintain aspect ratio and get high-quality results instantly. 100% private and on-device." />
                <meta name="keywords" content="image resizer, resize image online, change image dimensions, photo resizer, free image tool, private image resizer, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-resizer" />

                <meta property="og:title" content="Pro Image Resizer | Custom Dimensions & Privacy" />
                <meta property="og:description" content="Professional-grade image resizing with zero server uploads. High quality, instant results." />
                <meta property="og:url" content="https://njtools.xyz/tools/image-resizer" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Upload Section */}
                {!previewUrl ? (
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-20 text-center bg-white dark:bg-slate-900 transition-hover hover:border-blue-500 group">
                        <input type="file" accept="image/*" onChange={handleImageLoad} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-2xl group-hover:scale-110 transition-transform">
                                <ImageIcon size={40} />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">Choose an Image</h3>
                            <p className="text-slate-500 font-bold text-sm">Drop your file here or click to browse</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-10 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Preview Area */}
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-slate-900 p-3 rounded-4xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                                <img src={resizedUrl || previewUrl} alt="Preview" className="w-full h-auto rounded-2xl object-contain max-h-96" />
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Original: {originalDimensions.width}x{originalDimensions.height}</span>
                                <button onClick={() => {setPreviewUrl(null); setSelectedImage(null);}} className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:underline"><RefreshCw size={12}/> Reset</button>
                            </div>
                        </div>

                        {/* Controls Area */}
                        <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl space-y-8">
                            <div className="space-y-6">
                                <h4 className="text-xl font-black dark:text-white uppercase tracking-tighter flex items-center gap-2">
                                    <Maximize size={20} className="text-blue-600" /> Resize Settings
                                </h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Width (px)</label>
                                        <input
                                            type="number"
                                            value={dimensions.width}
                                            onChange={(e) => updateDimension('w', parseInt(e.target.value) || 0)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold dark:text-white focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Height (px)</label>
                                        <input
                                            type="number"
                                            value={dimensions.height}
                                            onChange={(e) => updateDimension('h', parseInt(e.target.value) || 0)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-4 font-bold dark:text-white focus:ring-2 focus:ring-blue-600"
                                        />
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            checked={dimensions.aspectLocked}
                                            onChange={(e) => setDimensions({...dimensions, aspectLocked: e.target.checked})}
                                            className="sr-only peer"
                                        />
                                        <div className="w-10 h-6 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:bg-blue-600 transition-colors" />
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform" />
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Lock Aspect Ratio</span>
                                </label>
                            </div>

                            {!resizedUrl ? (
                                <button
                                    onClick={handleResize}
                                    disabled={isProcessing}
                                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black hover:bg-blue-700 transition active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" /> : <ArrowsUpFromLine size={20} />}
                                    Apply Resize
                                </button>
                            ) : (
                                <a
                                    href={resizedUrl}
                                    download={`resized-${selectedImage?.name}`}
                                    className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black hover:bg-emerald-700 transition active:scale-95 flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/20"
                                >
                                    <Download size={20} /> Download Image
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </ToolLayout>
    );
};

export default ImageResizer;