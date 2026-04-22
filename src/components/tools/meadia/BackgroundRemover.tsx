import React, { useState, type ChangeEvent } from 'react';
import { removeBackground } from '@imgly/background-removal';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const BackgroundRemover: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
            setStatus('processing');
            try {
                const blob = await removeBackground(file);
                const url = URL.createObjectURL(blob);
                setImageUrl(url);
                setStatus('done');
            } catch (error) {
                console.error("Removal failed:", error);
                setStatus('idle');
                alert("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <ToolLayout
            title="AI Background Remover"
            description="Remove backgrounds from images instantly and for free using on-device AI."
            seoContent={
                <>
                    <h2 className="text-xl font-bold">How it works?</h2>
                    <p className="mt-2">Our tool uses advanced AI models that run directly in your browser. Your photos never leave your computer, ensuring 100% privacy while providing high-quality transparent PNGs.</p>
                </>
            }
        >
            <Helmet>
                <title>Free AI Background Remover | Transparent PNG Maker | NJTools</title>
                <meta name="description" content="Remove image backgrounds online for free. 100% automatic and private. No sign-up required." />
                <meta name="keywords" content="background remover, remove bg, transparent background, ai background removal, free online tool, png maker, image editor, private background remover, NJTools" />
                <meta property="og:title" content="Free AI Background Remover | NJTools" />
                <meta property="og:description" content="High-quality background removal using browser-based AI. Your privacy is our priority." />
                <meta property="og:type" content="website" />
                <link rel="canonical" href="https://njtools.xyz/tools/background-remover" />
            </Helmet>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-indigo-200 p-10 rounded-lg bg-indigo-50/30">
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    disabled={status === 'processing'}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 disabled:opacity-50"
                />
                {status === 'processing' && (
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p className="text-sm text-indigo-600 font-medium italic">AI is analyzing your image and removing background... (This might take a moment on first load)</p>
                    </div>
                )}
            </div>

            {status === 'done' && imageUrl && (
                <div className="mt-8 flex flex-col items-center gap-6 p-6 border rounded-xl bg-white shadow-lg">
                    <div className="relative group p-2 bg-[url('https://www.transparenttextures.com/patterns/checkerboard.png')] rounded-lg border border-gray-200">
                        <img src={imageUrl} alt="Background Removed Result" className="max-h-[500px] object-contain" />
                    </div>
                    <a
                        href={imageUrl}
                        download="njtools-bg-removed.png"
                        className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-md"
                    >
                        Download Transparent PNG
                    </a>
                </div>
            )}
        </ToolLayout>
    );
};

export default BackgroundRemover;