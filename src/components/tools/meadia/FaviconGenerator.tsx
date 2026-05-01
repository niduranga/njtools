import React, { useState, useRef, type ChangeEvent } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { FileCode, Download, RefreshCw, Loader2, CheckCircle2 } from 'lucide-react';
import JSZip from 'jszip';

const FaviconGenerator: React.FC = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Favicon standard sizes
    const SIZES = [
        { name: 'favicon-16x16.png', size: 16 },
        { name: 'favicon-32x32.png', size: 32 },
        { name: 'apple-touch-icon.png', size: 180 },
        { name: 'android-chrome-192x192.png', size: 192 },
        { name: 'android-chrome-512x512.png', size: 512 },
    ];

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            setIsDone(false);
        }
    };

    const generateFavicons = async () => {
        if (!previewUrl || !canvasRef.current) return;
        setIsProcessing(true);

        const zip = new JSZip();
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = previewUrl;

        await new Promise((resolve) => {
            img.onload = async () => {
                for (const item of SIZES) {
                    canvas.width = item.size;
                    canvas.height = item.size;
                    if (ctx) {
                        ctx.clearRect(0, 0, item.size, item.size);
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        ctx.drawImage(img, 0, 0, item.size, item.size);

                        // Convert canvas to blob
                        const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
                        if (blob) {
                            zip.file(item.name, blob);
                        }
                    }
                }

                // Add a basic site.webmanifest file for PWA support
                const manifest = {
                    name: "NJTools Generated App",
                    short_name: "App",
                    icons: [
                        { src: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
                        { src: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
                    ],
                    theme_color: "#ffffff",
                    background_color: "#ffffff",
                    display: "standalone"
                };
                zip.file("site.webmanifest", JSON.stringify(manifest, null, 2));

                // Generate and download ZIP
                const content = await zip.generateAsync({ type: 'blob' });
                const zipUrl = URL.createObjectURL(content);
                const link = document.createElement('a');
                link.href = zipUrl;
                link.download = "njtools-favicons.zip";
                link.click();

                setIsProcessing(false);
                setIsDone(true);
                resolve(null);
            };
        });
    };

    return (
        <ToolLayout
            title="Favicon Generator"
            description="Generate all essential favicon sizes for your website in one click. 100% Client-side."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Omni-Channel Icon Deployment</h2>
                        <p className="leading-relaxed text-sm">
                            In the modern web ecosystem, a single <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">favicon.ico</code> is no longer sufficient.
                            Our <strong className="text-blue-600 dark:text-blue-400">Pro Favicon Generator</strong> creates a comprehensive asset bundle tailored for iOS, Android, and all desktop environments, ensuring your brand looks sharp on every tab and home screen.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">PWA Readiness</h3>
                            <p className="text-sm leading-relaxed">
                                Beyond just images, we generate a valid <strong className="text-slate-900 dark:text-white">site.webmanifest</strong> file. This is crucial for Progressive Web Apps, allowing users to "Add to Home Screen" with high-resolution 192x192 and 512x512 icons.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">High-Fidelity Scaling</h3>
                            <p className="text-sm leading-relaxed">
                                We utilize browser-native <strong className="text-slate-900 dark:text-white">Lanczos-style resampling</strong> via Canvas API. This prevents pixelation when downscaling high-res logos to 16x16 or 32x32 dimensions.
                            </p>
                        </div>
                    </div>

                    <section className="border-l-4 border-blue-600 pl-6 bg-blue-50/30 dark:bg-blue-900/10 py-4 pr-4 rounded-r-3xl">
                        <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2">Privacy-First Engineering</h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            Unlike traditional generators that process your branding assets on a remote server, NJTools performs every transformation in your browser's local sandbox. Your source files never touch the internet, providing 100% security for corporate identity projects.
                        </p>
                    </section>

                    <section className="mt-12 space-y-6 border-t border-slate-100 dark:border-slate-800 pt-10">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">Cross-Platform Icon Standards</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                            <div className="space-y-2">
                                <h4 className="font-bold text-blue-600 uppercase">iOS & macOS Safari</h4>
                                <p className="leading-relaxed">
                                    We generate the <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">apple-touch-icon.png</code> at 180x180 pixels. This is the gold standard for Apple's Retina displays, ensuring your site looks like a native app when bookmarked on an iPhone or iPad.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-bold text-blue-600 uppercase">Android & Chrome PWA</h4>
                                <p className="leading-relaxed">
                                    By providing 192x192 and 512x512 icons coupled with a <strong className="text-slate-900 dark:text-white">site.webmanifest</strong>, we enable the "Splash Screen" and "Standalone Mode" features for modern Android devices.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Technical Implementation Note for Authority */}
                    <section className="mt-10 bg-slate-50 dark:bg-slate-900/30 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                        <h3 className="text-xs font-black text-slate-400 mb-4 uppercase tracking-[0.3em]">Developer's Technical Log</h3>
                        <p className="text-xs leading-relaxed italic text-slate-600 dark:text-slate-400">
                            "NJTools utilizes the <strong className="text-slate-900 dark:text-white">CanvasRenderingContext2D API</strong> for high-quality image resampling. Unlike naive scaling, we ensure the alpha channel is preserved during the transformation to maintain transparency in <code className="px-1 bg-slate-200 dark:bg-slate-700 rounded">.png</code> assets, which is critical for dark-mode tab bars."
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Pro Favicon Generator | Create All Sizes in One ZIP | NJTools</title>
                <meta name="description" content="Generate apple-touch-icon, android-chrome, and standard favicon sizes instantly. Get a complete set with a webmanifest in one ZIP file. Private & secure." />
                <meta name="keywords" content="favicon bundle generator, pwa icon maker, website manifest generator, 512x512 android icon, apple touch icon 180x180, developer tools, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/favicon-generator/" />

                <meta property="og:title" content="Pro Favicon Generator | Complete Asset Bundling | NJTools" />
                <meta property="og:description" content="Generate every favicon size your website needs in one click. 100% private on-device processing." />
                <meta property="og:url" content="https://njtools.xyz/tools/favicon-generator/" />
                <meta property="og:type" content="website" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Pro Favicon & Manifest Generator",
                        "operatingSystem": "Web",
                        "applicationCategory": "DeveloperApplication",
                        "featureList": ["Multi-size Icon Generation", "PWA Manifest Support", "Apple Touch Icon Creation", "Client-side ZIP Bundling"],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        },
                        "description": "Generate a complete favicon suite including Apple Touch Icons and Android Manifests instantly with on-device processing."
                    })}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto">
                {!previewUrl ? (
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-20 text-center bg-white dark:bg-slate-950 transition-all hover:border-blue-500 group relative">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-2xl group-hover:scale-110 transition-transform">
                                <FileCode size={40} />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">Upload Source Image</h3>
                            <p className="text-slate-500 font-bold text-sm">SVG or High-res PNG works best</p>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-40 h-40 bg-slate-50 dark:bg-slate-800 rounded-3xl p-4 flex items-center justify-center border-4 border-white dark:border-slate-700">
                            <img src={previewUrl} alt="Source" className="max-w-full max-h-full rounded-lg shadow-sm" />
                        </div>

                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div>
                                <h4 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">Ready to Generate</h4>
                                <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">Bundle Includes: 5 Sizes + Webmanifest</p>
                            </div>

                            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                <button
                                    onClick={generateFavicons}
                                    disabled={isProcessing}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition active:scale-95 flex items-center gap-2 shadow-xl shadow-blue-500/20 disabled:opacity-50"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" /> : isDone ? <CheckCircle2 /> : <Download size={20} />}
                                    {isProcessing ? 'Processing...' : isDone ? 'Downloaded!' : 'Generate & Download ZIP'}
                                </button>

                                <button
                                    onClick={() => setPreviewUrl(null)}
                                    className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-4 rounded-2xl font-black hover:bg-rose-500 hover:text-white transition flex items-center gap-2"
                                >
                                    <RefreshCw size={18} /> Reset
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
        </ToolLayout>
    );
};

export default FaviconGenerator;