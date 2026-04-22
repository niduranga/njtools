import React, { useState, type ChangeEvent } from 'react';
import exifr from 'exifr';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const ImageMetadata: React.FC = () => {
    const [metadata, setMetadata] = useState<any>(null);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setStatus('processing');
            try {
                const data = await exifr.parse(file, {
                    tiff: true,
                    xmp: true,
                    icc: true,
                    ihdr: true
                });

                setMetadata(data || {});
                setStatus('done');
            } catch (error) {
                console.error("Metadata extraction failed:", error);
                setMetadata({});
                setStatus('done');
            }
        }
    };

    return (
        <ToolLayout
            title="Advanced Image Metadata Extractor"
            description="Extract deep metadata (EXIF, IHDR, XMP) from JPEG and PNG files instantly."
            seoContent={
                <>
                    <h2 className="text-xl font-bold">Comprehensive Metadata Analysis</h2>
                    <p className="mt-2">Our tool supports multi-format parsing including PNG headers and professional camera EXIF data, all processed locally in your browser.</p>
                </>
            }
        >
            <Helmet>
                <title>Free Image Metadata Extractor | View EXIF Data Online | NJTools</title>
                <meta name="description" content="View hidden metadata and EXIF tags in your photos for free. Check camera settings, GPS, and more instantly." />
                <meta name="keywords" content="exif viewer, image metadata, photo tags, view photo info, njtools, free online tools, camera settings viewer" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-metadata" />
            </Helmet>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 p-10 rounded-lg bg-blue-50/30">
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
            </div>

            {status === 'done' && metadata && (
                <div className="mt-8 overflow-x-auto">
                    <table className="w-full text-left border-collapse bg-white rounded-lg shadow-sm">
                        <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-2">Tag</th>
                            <th className="px-4 py-2">Value</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.entries(metadata).length > 0 ? (
                            Object.entries(metadata).map(([key, value]: [string, any]) => (
                                <tr key={key} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-4 py-2 font-medium">{key}</td>
                                    <td className="px-4 py-2 break-all">
                                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={2} className="px-4 py-8 text-center text-orange-500">
                                    No metadata tags found in this file. Try a camera-captured photo.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </ToolLayout>
    );
};

export default ImageMetadata;