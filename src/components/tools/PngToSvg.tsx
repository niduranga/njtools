import React, { useState, type ChangeEvent } from 'react';
import ImageTracer from 'imagetracerjs';
import ToolLayout from '../layout/ToolLayout';
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
                <>
                    <h2 className="text-xl font-bold">Why convert PNG to SVG?</h2>
                    <p className="mt-2">SVG files are resolution-independent, meaning they don't lose quality when resized. Our tool traces your PNG images and creates a vector version instantly in your browser.</p>
                </>
            }
        >
            <Helmet>
                <title>Free PNG to SVG Converter | Vectorize Images | NJTools</title>
                <meta name="description" content="Convert PNG to SVG online for free. Turn your raster images into high-quality vector graphics instantly." />
                <meta name="keywords" content="png to svg, convert png, vector to image, free online tools, njtools, Free PNG to SVG Converter, High Quality" />
                <link rel="canonical" href="https://njtools.xyz/tools/png-to-svg" />
            </Helmet>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 p-10 rounded-lg bg-purple-50/30">
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                />
                <p className="mt-4 text-sm text-gray-500">Upload PNG/JPG to vectorize</p>
            </div>

            {status === 'done' && svgUrl && (
                <div className="mt-6 flex flex-col items-center gap-4">
                    <img src={svgUrl} alt="Preview" className="w-48 h-48 border rounded p-2" />
                    <a href={svgUrl} download="njtools-vector.svg" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-purple-700 transition">
                        Download SVG Vector
                    </a>
                </div>
            )}
        </ToolLayout>
    );
};

export default PngToSvg;