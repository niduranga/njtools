import React, { useState, type ChangeEvent } from 'react';
import imageCompression from 'browser-image-compression';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Download, Upload, Trash2 } from 'lucide-react';

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
            maxSizeMB: 1, // උපරිම සයිස් එක 1MB ට අඩු කරන්න ට්‍රයි කරයි
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        };

        try {
            const compressedFile = await imageCompression(originalImage, options);
            setCompressedImage(compressedFile);

            // කොච්චර ප්‍රමාණයක් අඩු වුණාද කියලා බලමු
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
                <>
                    <h2 className="text-xl font-bold">Secure and Fast Compression</h2>
                    <p className="mt-2">Unlike other online tools, we don't upload your images to any server. Your data stays on your device, making it 100% private and secure.</p>
                </>
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
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 p-12 rounded-2xl bg-blue-50/30 transition hover:bg-blue-50/50">
                        <Upload className="w-12 h-12 text-blue-400 mb-4" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute opacity-0 w-full h-full cursor-pointer"
                        />
                        <p className="text-lg font-medium text-blue-900">Drop your image here or click to browse</p>
                        <p className="text-sm text-blue-500 mt-1">Supports JPG, PNG, WebP</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-xl bg-gray-50">
                            <p className="text-sm font-semibold text-gray-500 mb-2 uppercase">Original</p>
                            <p className="text-lg font-bold">{(originalImage.size / 1024 / 1024).toFixed(2)} MB</p>
                            <button
                                onClick={() => {setOriginalImage(null); setCompressedImage(null);}}
                                className="mt-4 flex items-center text-red-500 text-sm hover:underline"
                            >
                                <Trash2 className="w-4 h-4 mr-1" /> Remove
                            </button>
                        </div>

                        {status === 'done' && compressedImage && (
                            <div className="p-4 border border-green-200 rounded-xl bg-green-50">
                                <p className="text-sm font-semibold text-green-600 mb-2 uppercase">Compressed ({compressionRatio}% Saved)</p>
                                <p className="text-lg font-bold">{(compressedImage.size / 1024 / 1024).toFixed(2)} MB</p>
                                <a
                                    href={URL.createObjectURL(compressedImage)}
                                    download={`compressed-${originalImage.name}`}
                                    className="mt-4 inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-700 transition"
                                >
                                    <Download className="w-4 h-4 mr-2" /> Download
                                </a>
                            </div>
                        )}
                    </div>
                )}

                {originalImage && status !== 'done' && (
                    <button
                        onClick={handleCompress}
                        disabled={status === 'processing'}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition disabled:bg-blue-300"
                    >
                        {status === 'processing' ? 'Compressing...' : 'Compress Image Now'}
                    </button>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageCompressor;