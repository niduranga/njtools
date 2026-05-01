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
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase border-b-2 border-blue-600 w-fit pb-1">
                            Forensic Image Metadata Inspection
                        </h2>
                        <p className="leading-relaxed text-sm">
                            Every digital asset carries a forensic footprint. Our <strong className="text-blue-600 dark:text-blue-400">Advanced Metadata Extractor</strong> utilizes binary-level parsing to reveal <strong className="text-slate-900 dark:text-white">TIFF, XMP, and ICC</strong> headers that standard viewers ignore. This is an essential utility for photographers verifying lens profiles and privacy-conscious users auditing their photos for leaked geolocation data.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Photographic Intelligence</h3>
                            <p className="text-xs leading-relaxed">
                                Analyze the exact <strong className="text-slate-900 dark:text-white">Optic Configuration</strong> of a shot—including F-number, Exposure Time, ISO speed ratings, and specific Lens Model identifiers—to deconstruct professional photography techniques.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">XMP & ICC Profiling</h3>
                            <p className="text-xs leading-relaxed">
                                Go beyond basic tags. Inspect <strong className="text-slate-900 dark:text-white">Extensible Metadata Platforms (XMP)</strong> used by Adobe Lightroom and ICC profiles that define color space integrity across different display hardware.
                            </p>
                        </div>
                    </div>

                    <section className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-slate-300 border border-slate-800">
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight uppercase">Privacy-Centric Parsing</h3>
                        <p className="text-sm leading-relaxed max-w-2xl">
                            NJTools operates on a <strong className="text-blue-500 font-bold">Local-Only Execution</strong> model. By parsing image buffers directly via the browser's File API, your sensitive geolocation and device identifiers never touch our servers. Audit your privacy without risking a data leak.
                        </p>
                    </section>

                    <section className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 italic uppercase">Technical Reference & FAQ</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">What is the difference between EXIF and Metadata?</h4>
                                <p className="text-sm">EXIF (Exchangeable Image File Format) is a specific type of metadata standard used by digital cameras. Metadata is the broader term encompassing EXIF, XMP, and IPTC data.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Can this tool detect GPS coordinates?</h4>
                                <p className="text-sm font-bold text-blue-600 dark:text-blue-400">Yes. If the "Location Services" were active during the shot, our parser will extract the Latitude/Longitude tags from the GPS IFD block.</p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Deep Image Metadata Extractor | EXIF & XMP Viewer | NJTools</title>
                <meta name="description" content="Extract hidden EXIF, XMP, and ICC metadata from your photos instantly. 100% private on-device viewer for photographers and privacy audits." />
                <meta name="keywords" content="exif data viewer, image metadata extractor, view xmp tags, photo forensic tool, gps coordinate extractor from photo, njtools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-metadata/" />

                <meta property="og:title" content="Advanced EXIF & Forensic Metadata Viewer | NJTools" />
                <meta property="og:description" content="Peek into your photo's hidden details. View camera settings, GPS info, and device data without uploading anything." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Professional EXIF & Metadata Viewer",
                        "operatingSystem": "Web",
                        "applicationCategory": "UtilitiesApplication",
                        "featureList": ["EXIF Extraction", "XMP Parsing", "ICC Profile Inspection", "GPS Coordinate Recovery"],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        },
                        "description": "A deep-dive metadata inspection tool that extracts EXIF, IHDR, and XMP data points directly in the browser for privacy auditing and photography analysis."
                    })}
                </script>
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