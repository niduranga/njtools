import React, { useState, type ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { FileImage, Upload, Download, AlertCircle } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.mjs',
    import.meta.url
).toString();

const PdfToImage: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || file.type !== "application/pdf") return;

        setImages([]);
        setStatus('processing');

        const reader = new FileReader();
        reader.onload = async (event) => {
            const typedarray = new Uint8Array(event.target?.result as ArrayBuffer);
            try {
                const loadingTask = pdfjsLib.getDocument({ data: typedarray });
                const pdf = await loadingTask.promise;
                const imageUrls: string[] = [];

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const viewport = page.getViewport({ scale: 2 });
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    if (context) {
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        const renderContext = {
                            canvasContext: context,
                            viewport: viewport
                        };

                        // @ts-ignore
                        await page.render(renderContext).promise;
                        imageUrls.push(canvas.toDataURL('image/png'));
                    }
                }
                setImages(imageUrls);
                setStatus('done');
            } catch (err) {
                console.error("PDF Processing Error:", err);
                setStatus('error');
                alert("Can not process PDF. Please try again with a valid file.");
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <ToolLayout
            title="PDF to Image Converter"
            description="Extract and convert PDF pages into high-quality PNG images instantly."
            seoContent={
                /* Dark Mode Text Colors Fix */
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase border-b-2 border-purple-600 w-fit pb-1">
                            High-Fidelity Document Rasterization
                        </h2>
                        <p className="leading-relaxed text-sm">
                            Document sharing often requires specific pages to be sent as static images. Our <strong className="text-purple-600 dark:text-purple-400">PDF to PNG Converter</strong> leverages the <strong className="text-slate-900 dark:text-white">Mozilla pdf.js engine</strong> to rasterize vector-based PDF data into high-definition 300DPI-equivalent PNG files. This ensures that fine typography and detailed diagrams remain perfectly legible across all devices.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-purple-600 mb-3 tracking-[0.2em]">Vector-to-Raster Precision</h3>
                            <p className="text-xs leading-relaxed">
                                By implementing a <strong className="text-slate-900 dark:text-white">2x Viewport Scale</strong>, NJTools generates images with double the standard pixel density. This process effectively preserves sub-pixel anti-aliasing, making the output ideal for professional presentations and archival purposes.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-purple-600 mb-3 tracking-[0.2em]">Sandboxed Data Integrity</h3>
                            <p className="text-xs leading-relaxed">
                                Security is a core architectural principle at NJTools. Your PDFs are processed in a <strong className="text-slate-900 dark:text-white">client-side sandboxed environment</strong>. No binary data is transmitted to an external server, ensuring complete data sovereignty for sensitive legal or financial documents.
                            </p>
                        </div>
                    </div>

                    <section className="bg-purple-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase">Engineering Focus: Asynchronous Rendering</h3>
                        <p className="text-sm text-purple-100 leading-relaxed max-w-2xl font-medium">
                            "Our converter utilizes the <strong className="text-white font-bold">Canvas API and Asynchronous Promises</strong> to render pages sequentially. This prevents browser thread-locking, allowing you to process multi-page documents smoothly while maintaining an interactive UI."
                        </p>
                        <div className="absolute -top-5 -right-5 opacity-10 rotate-12">
                            <FileImage size={180} />
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free PDF to Image Converter | Export PDF to PNG | NJTools</title>
                <meta name="description" content="Convert PDF documents to high-quality PNG images instantly. 100% private and secure browser-based conversion with zero data tracking. Powered by NJTools." />
                <meta name="keywords" content="pdf to image, pdf to png, export pdf pages, high quality pdf to image, private pdf converter, njtools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/pdf-to-image/" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://njtools.xyz/tools/pdf-to-image/" />
                <meta property="og:title" content="Pro PDF to Image Converter | Secure & Private | NJTools" />
                <meta property="og:description" content="Extract and convert PDF pages into high-definition PNG images instantly. 100% on-device processing for maximum privacy." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://njtools.xyz/tools/pdf-to-image/" />
                <meta property="twitter:title" content="Pro PDF to Image Converter | NJTools" />
                <meta property="twitter:description" content="Convert PDF documents to high-quality PNG images instantly. No server uploads, 100% secure." />
                <meta property="twitter:image" content="https://njtools.xyz/og-image.png/" />

                {/* Structured Data for SEO */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Professional PDF to Image Converter",
                        "operatingSystem": "Web",
                        "applicationCategory": "UtilitiesApplication",
                        "featureList": [
                            "High-definition PNG export",
                            "Multi-page extraction",
                            "Client-side rendering",
                            "Privacy-first architecture"
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

            {/* Upload Area with Dark Mode Support */}
            <div className={`flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-2xl transition-all ${
                status === 'error'
                    ? 'border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-900/10'
                    : 'border-purple-200 dark:border-slate-700 bg-purple-50/30 dark:bg-slate-800/50 hover:border-purple-300 dark:hover:border-purple-500'
            }`}>
                <div className="flex gap-2 mb-4">
                    <FileImage className={`w-12 h-12 ${status === 'error' ? 'text-red-400' : 'text-purple-400'}`} />
                    <Upload className={`w-12 h-12 ${status === 'error' ? 'text-red-300' : 'text-purple-300'} opacity-50`} />
                </div>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="block w-full max-w-xs text-sm text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 dark:file:bg-purple-500 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />

                {status === 'processing' && (
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-600 dark:border-purple-400"></div>
                        <p className="text-sm text-purple-700 dark:text-purple-400 font-bold animate-pulse">Rendering PDF Pages... Please wait.</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-4 flex items-center gap-2 text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-bold">Failed to process PDF. Please try again.</p>
                    </div>
                )}
            </div>

            {/* Results Grid with Dark Mode Cards */}
            {status === 'done' && images.length > 0 && (
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((src, index) => (
                        <div key={index} className="group border dark:border-slate-700 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col items-center">
                            <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Page {index + 1}</div>
                            <div className="relative overflow-hidden rounded-lg border dark:border-slate-700 mb-4 bg-slate-50 dark:bg-slate-900">
                                <img src={src} alt={`Page ${index + 1}`} className="max-w-full h-auto transition-transform group-hover:scale-[1.05]" />
                            </div>
                            <a
                                href={src}
                                download={`nj-page-${index + 1}.png`}
                                className="w-full flex items-center justify-center gap-2 bg-purple-600 dark:bg-purple-500 text-white px-4 py-3 rounded-xl font-bold hover:bg-purple-700 dark:hover:bg-purple-600 transition shadow-lg shadow-purple-500/20"
                            >
                                <Download className="w-4 h-4" /> Download PNG
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </ToolLayout>
    );
};

export default PdfToImage;