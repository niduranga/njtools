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
                // deep metadata extraction (EXIF, XMP, ICC, IHDR)
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
                /* Dark mode support for SEO texts */
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Professional Image Metadata & EXIF Viewer</h2>
                        <p className="leading-relaxed">
                            Every digital photo contains "hidden" information known as Metadata.
                            Our <strong className="text-blue-600 dark:text-blue-400">Advanced Image Metadata Extractor</strong> allows you to peek behind the curtain and view technical details like camera settings, lens information, and device sensors.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">What Can You Extract?</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">EXIF Data:</strong> Aperture, shutter speed, ISO, focal length.</li>
                            <li><strong className="text-slate-900 dark:text-white">Device Info:</strong> Manufacturer, model, and software version.</li>
                            <li><strong className="text-slate-900 dark:text-white">Capture Conditions:</strong> Date/time stamp and GPS coordinates.</li>
                        </ul>
                    </section>

                    <section className="bg-blue-50 dark:bg-slate-800 p-6 rounded-xl border border-blue-100 dark:border-slate-700 shadow-sm">
                        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 mb-2">Privacy & Local Processing</h3>
                        <p className="text-sm leading-relaxed">
                            NJTools extracts metadata entirely in your browser. Nothing is ever uploaded, shared, or stored.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Image Metadata Extractor | View EXIF Data Online | NJTools</title>
                <meta name="description" content="View hidden metadata and EXIF tags in your photos for free. Check camera settings, GPS, and more instantly." />
                <meta name="keywords" content="exif viewer, image metadata, photo tags, view photo info, njtools, free online tools, camera settings viewer" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-metadata" />
            </Helmet>

            {/* Upload Area with Dark Mode Support */}
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-slate-700 p-10 rounded-lg bg-blue-50/30 dark:bg-slate-800/50">
                <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-slate-700 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-slate-600 cursor-pointer"
                />
                <p className="mt-4 text-xs text-slate-400">Supported: JPEG, JPG, PNG</p>
            </div>

            {/* Metadata Table Area */}
            {status === 'done' && metadata && (
                <div className="mt-8 overflow-hidden border dark:border-slate-700 rounded-xl shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse bg-white dark:bg-slate-900">
                            <thead className="bg-blue-600 dark:bg-blue-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider">Tag Name</th>
                                <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider">Extracted Value</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                            {Object.entries(metadata).length > 0 ? (
                                Object.entries(metadata).map(([key, value]: [string, any]) => (
                                    <tr key={key} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50/30 dark:bg-blue-900/10">
                                            {key}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 break-all">
                                            {typeof value === 'object'
                                                ? <code className="text-xs">{JSON.stringify(value, null, 2)}</code>
                                                : String(value)
                                            }
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="px-6 py-12 text-center text-orange-500 dark:text-orange-400 italic">
                                        No metadata tags found in this file. Try an original camera photo.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>

                    {/* Clear Button */}
                    <div className="p-4 bg-gray-50 dark:bg-slate-800 border-t dark:border-slate-700 flex justify-center">
                        <button
                            onClick={() => {setMetadata(null); setStatus('idle');}}
                            className="text-sm font-medium text-slate-500 hover:text-red-500 transition"
                        >
                            Clear Results
                        </button>
                    </div>
                </div>
            )}
        </ToolLayout>
    );
};

export default ImageMetadata;