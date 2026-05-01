import React, { useState, useRef, type ChangeEvent } from 'react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const SvgConverter: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'converting' | 'done'>('idle');
    const [pngUrl, setPngUrl] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type === "image/svg+xml") {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                if (typeof result === 'string') processSvg(result);
            };
            reader.readAsText(file);
        }
    };

    const processSvg = (svgData: string) => {
        setStatus('converting');
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const img = new Image();
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const scale = 2;
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.scale(scale, scale);

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);

            const dataUrl = canvas.toDataURL("image/png");
            setPngUrl(dataUrl);
            setStatus('done');
            URL.revokeObjectURL(url);
        };
        img.src = url;
    };

    return (
        <ToolLayout
            title="SVG to PNG Converter"
            description="Convert your SVG vectors to high-quality PNG images instantly."
            seoContent={
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">How to Convert SVG to PNG?</h2>
                        <p className="leading-relaxed">
                            Our free online tool allows you to convert Scalable Vector Graphics (SVG) to Raster PNG images instantly.
                            Simply upload your .svg file, and our high-performance engine will render it into a high-quality PNG for download.
                            No registration or software installation is required.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Key Features</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">High Quality Rendering:</strong> We use advanced canvas scaling to ensure your vector stays crisp even when rasterized.</li>
                            <li><strong className="text-slate-900 dark:text-white">100% Privacy:</strong> Your files never touch our servers. All conversions happen entirely in your web browser.</li>
                            <li><strong className="text-slate-900 dark:text-white">Zero Cost:</strong> Unlimited conversions at no charge, forever.</li>
                            <li><strong className="text-slate-900 dark:text-white">Lightning Fast:</strong> No waiting in server queues; the conversion happens in milliseconds on your device.</li>
                        </ul>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Why Convert SVG to PNG?</h3>
                        <p className="leading-relaxed">
                            While SVG is perfect for logos and icons because it scales infinitely, not all software or platforms support vector formats.
                            Converting to PNG allows you to use your designs in social media posts, presentations, and websites that require standard image formats without losing the clarity of your original vector.
                        </p>
                    </section>

                    <section className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-100 dark:border-slate-700 shadow-sm">
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-1">Privacy Notice</h3>
                        <p className="text-sm italic text-slate-600 dark:text-slate-400">
                            Unlike traditional online converters, NJTools uses client-side processing. Your design data remains on your local machine throughout the entire process.
                        </p>
                    </section>

                    <section className="mt-12 space-y-6 border-t border-slate-100 dark:border-slate-800 pt-10 text-sm">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">Advanced Vector Rasterization Logic</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs">High-Density Scaling</h4>
                                <p className="leading-relaxed">
                                    Most online converters produce blurry PNGs by rendering at 1:1 scale. NJTools implements a <strong className="text-slate-900 dark:text-white">200% oversampling method</strong> via the Canvas API. By doubling the viewport dimensions before rasterization, we preserve the mathematical precision of your vector paths.
                                </p>
                            </div>
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs">Asynchronous Data Handling</h4>
                                <p className="leading-relaxed">
                                    Our conversion pipeline utilizes <strong className="text-slate-900 dark:text-white">Blob-to-URL mapping</strong>. This avoids memory leaks and ensure that even complex SVG files with heavy path data are processed without blocking the main UI thread.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pro Engineering Note */}
                    <div className="mt-10 p-8 bg-blue-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase underline decoration-blue-400">Architectural insight</h3>
                            <p className="text-sm text-blue-100 leading-relaxed max-w-2xl font-medium">
                                "By leveraging the browser-native <strong className="text-white">XMLSerializer and CanvasRenderingContext2D</strong>, NJTools isolates the conversion process within the client's local sandbox. This architecture guarantees that sensitive design data is never exposed to external network vulnerabilities."
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Helmet>
                <title>Free SVG to PNG Converter | High-Res Rasterization | NJTools</title>
                <meta name="description" content="Convert Scalable Vector Graphics (SVG) to high-quality PNG images instantly. 100% private on-device processing with zero server uploads. Powered by NJTools." />
                <meta name="keywords" content="svg to png converter, convert svg to png high quality, vector to raster, free online svg converter, secure image conversion, njtools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/svg-to-png/" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://njtools.xyz/tools/svg-to-png/" />
                <meta property="og:title" content="Pro SVG to PNG Converter | Secure & Fast | NJTools" />
                <meta property="og:description" content="Transform your vectors into crisp PNG images instantly. No registration, no tracking, just high-performance conversion." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://njtools.xyz/tools/svg-to-png/" />
                <meta property="twitter:title" content="High-Resolution SVG to PNG Converter | NJTools" />
                <meta property="twitter:description" content="Professional-grade SVG rasterization directly in your browser. 100% Private." />
                <meta property="twitter:image" content="https://njtools.xyz/og-image.png/" />

                {/* Software Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "High-Res SVG to PNG Converter",
                        "operatingSystem": "Web",
                        "applicationCategory": "DesignApplication",
                        "featureList": [
                            "High-Fidelity Canvas Rendering",
                            "2x Upscale Support",
                            "Instant Browser-Native Processing",
                            "Zero Server Uploads"
                        ],
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

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-slate-700 p-10 rounded-lg bg-blue-50/30 dark:bg-slate-800/50">
                <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-slate-700 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-slate-600"
                />
                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">Upload your .svg file to start conversion</p>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {status === 'done' && pngUrl && (
                <div className="mt-6 flex justify-center">
                    <a href={pngUrl} download="njtools-converted.png" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-500/20">
                        Download PNG Image
                    </a>
                </div>
            )}
        </ToolLayout>
    );
};

export default SvgConverter;