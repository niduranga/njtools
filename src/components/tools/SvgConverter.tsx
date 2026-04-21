import React, { useState, useRef, type ChangeEvent } from 'react';
import ToolLayout from '../layout/ToolLayout';
import {Helmet} from "react-helmet-async";

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
            const scale = 2; // for High Quality
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
                <>
                    <h2 className="text-xl font-bold">How to convert SVG to PNG?</h2>
                    <p className="mt-2">Our free online tool allows you to convert Scalable Vector Graphics (SVG) to PNG images instantly. No software installation is required. All processing is done locally in your browser, ensuring your files remain private and secure.</p>
                </>
            }
        >
            <Helmet>
                <title>Free SVG to PNG Converter | High Quality | NJTools</title>
                <meta name="description" content="Convert SVG to PNG online for free. Fast, secure, and high-quality SVG vector to PNG image conversion directly in your browser." />
                <meta name="keywords" content="svg to png, convert svg, vector to image, free online tools, njtools" />
                <link rel="canonical" href="https://njtools.xyz/tools/svg-to-png" />
            </Helmet>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 p-10 rounded-lg bg-blue-50/30">
                <input
                    type="file"
                    accept=".svg"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="mt-4 text-sm text-gray-500">Upload your .svg file to start conversion</p>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {status === 'done' && pngUrl && (
                <div className="mt-6 flex justify-center">
                    <a href={pngUrl} download="njtools-converted.png" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                        Download PNG Image
                    </a>
                </div>
            )}
        </ToolLayout>
    );
};

export default SvgConverter;