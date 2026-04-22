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
                </div>
            }
        >
            <Helmet>
                <title>Free SVG to PNG Converter | High Quality | NJTools</title>
                <meta name="description" content="Convert SVG to PNG online for free. Fast, secure, and high-quality SVG vector to PNG image conversion directly in your browser." />
                <meta name="keywords" content="svg to png, convert svg, vector to image, free online tools, njtools, Free SVG to PNG Converter, High Quality" />
                <link rel="canonical" href="https://njtools.xyz/tools/svg-to-png" />
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