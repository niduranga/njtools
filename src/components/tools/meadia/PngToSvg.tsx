import React, { useState, type ChangeEvent } from 'react';
import ImageTracer from 'imagetracerjs';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const PngToSvg: React.FC = () => {
    const [status, setStatus] = useState<'idle' | 'converting' | 'done'>('idle');
    const [svgUrl, setSvgUrl] = useState<string | null>(null);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result;
                if (typeof result === 'string') processImage(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const processImage = (dataUrl: string) => {
        setStatus('converting');

        ImageTracer.imageToSVG(
            dataUrl,
            (svgString: string) => {
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);
                setSvgUrl(url);
                setStatus('done');
            },
            { ltres: 1, qtres: 1, scale: 1, numberofcolors: 16 }
        );
    };

    return (
        <ToolLayout
            title="PNG to SVG Converter"
            description="Convert your raster images (PNG, JPG) into clean, scalable vector graphics (SVG)."
            seoContent={
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Instant PNG to SVG Vectorization</h2>
                        <p className="leading-relaxed">
                            Need to resize a logo without it becoming blurry? Our <strong className="text-purple-600 dark:text-purple-400">PNG to SVG Converter</strong> uses advanced image tracing algorithms to transform your raster pixels into mathematical paths.
                            This process, known as vectorization, allows you to scale your graphics to any size—from a business card to a billboard—without losing a single bit of quality.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Benefits of SVG Format</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Infinite Scalability:</strong> SVG files are drawn using coordinate geometry, not fixed pixels, so they never pixelate.</li>
                            <li><strong className="text-slate-900 dark:text-white">Small File Sizes:</strong> Complex vectors often have much smaller footprints than high-resolution PNGs.</li>
                            <li><strong className="text-slate-900 dark:text-white">Editable Paths:</strong> Once converted, you can open the SVG in software like Adobe Illustrator or Figma to edit individual shapes.</li>
                            <li><strong className="text-slate-900 dark:text-white">Web Optimized:</strong> SVGs can be styled with CSS and manipulated with JavaScript, making them perfect for interactive websites.</li>
                        </ul>
                    </section>

                    <section className="bg-purple-50 dark:bg-slate-800/50 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30 shadow-sm">
                        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 mb-2">Browser-Based Processing</h3>
                        <p className="text-sm leading-relaxed text-purple-900 dark:text-slate-400">
                            Most online vectorizers require you to upload your images to their servers for processing.
                            <strong className="text-purple-700 dark:text-purple-300"> NJTools runs the vectorization engine locally in your browser.</strong> Your original images and the resulting vector data never leave your device, ensuring maximum privacy for your creative projects.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free PNG to SVG Converter | Vectorize Images | NJTools</title>
                <meta name="description" content="Convert PNG to SVG online for free. Turn your raster images into high-quality vector graphics instantly." />
                <meta name="keywords" content="png to svg, convert png, vector to image, free online tools, njtools, Free PNG to SVG Converter, High Quality" />
                <link rel="canonical" href="https://njtools.xyz/tools/png-to-svg" />
            </Helmet>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 dark:border-slate-700 p-10 rounded-lg bg-purple-50/30 dark:bg-slate-800/50">
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 dark:file:bg-slate-700 file:text-purple-700 dark:file:text-purple-300 hover:file:bg-purple-100 dark:hover:file:bg-slate-600"
                />
                <p className="mt-4 text-sm text-gray-500 dark:text-slate-400">Upload PNG/JPG to vectorize</p>
            </div>

            {status === 'converting' && (
                <div className="mt-6 text-purple-600 dark:text-purple-400 animate-pulse font-medium">
                    Vectorizing image... Please wait.
                </div>
            )}

            {status === 'done' && svgUrl && (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <div className="p-2 bg-white dark:bg-slate-700 border dark:border-slate-600 rounded-lg shadow-sm">
                        <img src={svgUrl} alt="Preview" className="w-48 h-48 object-contain" />
                    </div>
                    <a href={svgUrl} download="njtools-vector.svg" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition shadow-lg shadow-purple-500/20">
                        Download SVG Vector
                    </a>
                </div>
            )}
        </ToolLayout>
    );
};

export default PngToSvg;