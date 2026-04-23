import React, { useState, useRef, type ChangeEvent } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Palette, Copy, Check, RefreshCw, Loader2, Download } from 'lucide-react';

const ColorPaletteGenerator: React.FC = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string>("palette");
    const [palette, setPalette] = useState<string[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name.split('.')[0]);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setPalette([]);
            extractPalette(url);
        }
    };

    const extractPalette = (url: string) => {
        setIsProcessing(true);
        const img = new Image();
        img.src = url;
        img.crossOrigin = "Anonymous";

        img.onload = () => {
            const canvas = canvasRef.current!;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) return;

            canvas.width = 100;
            canvas.height = 100;
            ctx.drawImage(img, 0, 0, 100, 100);

            const imageData = ctx.getImageData(0, 0, 100, 100).data;
            const colorCounts: { [key: string]: number } = {};

            for (let i = 0; i < imageData.length; i += 20) {
                const r = imageData[i];
                const g = imageData[i + 1];
                const b = imageData[i + 2];
                const hex = rgbToHex(r, g, b);
                colorCounts[hex] = (colorCounts[hex] || 0) + 1;
            }

            const sortedColors = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
            setPalette(sortedColors.slice(0, 6));
            setIsProcessing(false);
        };
    };

    const rgbToHex = (r: number, g: number, b: number) => {
        return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
    };

    const hexToRgb = (hex: string) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
    };

    const copyToClipboard = (color: string, index: number) => {
        navigator.clipboard.writeText(color);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const exportAsJSON = () => {
        if (palette.length === 0) return;
        const exportData = {
            projectName: fileName,
            timestamp: new Date().toISOString(),
            colors: palette.map(hex => ({ hex, rgb: hexToRgb(hex) }))
        };
        const blob = new Blob([JSON.stringify(exportData, null, 4)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `njtools-palette-${fileName}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <ToolLayout
            title="Color Palette Generator"
            description="Extract stunning color schemes from any image instantly."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Visual DNA Extraction</h2>
                        <p className="leading-relaxed">
                            Transform any photograph into a professional design asset. Our <strong className="text-blue-600 dark:text-blue-400">On-Device Color Palette Generator</strong> uses advanced pixel-sampling algorithms to identify dominant hues and harmonious accents, providing you with ready-to-use HEX codes instantly.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm">
                            <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-[0.2em]">High Velocity</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-200">Instant HEX generation without a single byte leaving your machine.</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm">
                            <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-[0.2em]">Designer UX</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-200">One-click copy to clipboard for seamless Figma, Adobe, or CSS workflows.</p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem] shadow-sm">
                            <p className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-[0.2em]">Absolute Privacy</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-200">No cloud processing. Your creative assets are never stored or analyzed by us.</p>
                        </div>
                    </div>

                    <section className="bg-slate-900 dark:bg-black p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Palette size={100} className="text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight">How it works:</h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                            By leveraging the <strong className="text-blue-500">HTML5 Canvas ImageData API</strong>, we scan image bitstreams in the client-side memory. This allows for rapid color quantization—extracting the most vibrant and representative shades directly from the browser's hardware-accelerated thread.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Color Palette Generator | Extract Colors from Image | NJTools</title>
                <meta name="description" content="Get a beautiful color palette from any photo instantly. Extract professional HEX codes with our private on-device color picker. 100% free & secure." />
                <meta name="keywords" content="color palette generator, extract colors from image, image color picker, hex code extractor, design tool, private color tool, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/color-palette" />

                <meta property="og:title" content="Color Palette Generator | Precision Design Tools | NJTools" />
                <meta property="og:description" content="Analyze and extract dominant colors from any image instantly in your browser." />
                <meta property="og:url" content="https://njtools.xyz/tools/color-palette" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-10">
                {!previewUrl ? (
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-24 text-center bg-white dark:bg-slate-950 transition-all hover:border-blue-500 group relative">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-slate-900 dark:bg-blue-600 rounded-3xl text-white shadow-2xl group-hover:rotate-6 transition-transform">
                                <Palette size={40} />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter text-center">Upload for Inspiration</h3>
                        </div>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
                        {/* Image Preview */}
                        <div className="space-y-4">
                            <div className="bg-white dark:bg-slate-900 p-4 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden relative">
                                <img src={previewUrl} alt="Palette Source" className="w-full h-auto rounded-3xl object-cover max-h-[500px]" />
                                <button onClick={() => setPreviewUrl(null)} className="absolute top-8 right-8 bg-black/50 backdrop-blur-md text-white p-3 rounded-full hover:bg-rose-600 transition-colors">
                                    <RefreshCw size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Palette Results */}
                        <div className="flex flex-col justify-center space-y-8">
                            <div className="space-y-2">
                                <h4 className="text-3xl font-black dark:text-white uppercase tracking-tighter italic text-center lg:text-left">Generated Palette</h4>
                            </div>

                            {isProcessing ? (
                                <div className="flex items-center gap-3 text-blue-600 font-black italic animate-pulse">
                                    <Loader2 className="animate-spin" /> Analyzing Pixels...
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {palette.map((color, index) => (
                                        <div key={index} className="group cursor-pointer space-y-3" onClick={() => copyToClipboard(color, index)}>
                                            <div
                                                className="h-24 md:h-32 rounded-4xl shadow-xl transition-all duration-300 group-hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden border-4 border-white dark:border-slate-800"
                                                style={{
                                                    backgroundColor: color,
                                                    boxShadow: `0 10px 25px -5px ${color}44`
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                                                {copiedIndex === index && (
                                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full animate-in zoom-in">
                                                        <Check className="text-white drop-shadow-md" size={24} />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between px-2">
                                                <span className="font-black text-slate-800 dark:text-slate-200 font-mono text-sm">{color}</span>
                                                <Copy size={14} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {palette.length > 0 && (
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <button onClick={exportAsJSON} className="text-xs font-black text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-[0.3em] flex items-center gap-2 group">
                                        <Download size={14} className="group-hover:translate-y-0.5 transition-transform" /> Export as JSON
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <canvas ref={canvasRef} className="hidden" />
        </ToolLayout>
    );
};

export default ColorPaletteGenerator;