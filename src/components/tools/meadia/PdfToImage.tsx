import React, { useState, type ChangeEvent } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { FileImage, Upload, Download, AlertCircle, FileText } from 'lucide-react';

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
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Professional PDF into PNG Conversion</h2>
                        <p className="leading-relaxed">
                            Need to share a specific page from a large PDF document as an image? Our <strong className="text-purple-600 dark:text-purple-400">PDF to Image Converter</strong> allows you to extract every page and transform them into high-quality PNG graphics instantly.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Key Highlights</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Lossless Extractions:</strong> High-definition rendering for fine text.</li>
                            <li><strong className="text-slate-900 dark:text-white">Browser Rendering:</strong> Privacy-first conversion powered by `pdf.js`.</li>
                        </ul>
                    </section>

                    <section className="bg-purple-900 dark:bg-purple-950 text-purple-100 p-6 rounded-xl shadow-lg border border-purple-700 dark:border-purple-800">
                        <h3 className="text-lg font-bold mb-2 text-white italic flex items-center gap-2">
                            <FileText className="w-5 h-5" /> Maximum Data Privacy
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            NJTools values your privacy. Your PDF data is read directly from your local file system.
                            Your documents stay exactly where they belong: on your computer.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free PDF to Image Converter | Export PDF to PNG | NJTools</title>
                <meta name="description" content="Convert PDF documents to PNG images for free. Fast, secure, and private browser-based conversion." />
                <meta name="keywords" content="pdf to image, pdf to png, njtools, free pdf tools, private conversion" />
                <link rel="canonical" href="https://njtools.xyz/tools/pdf-to-image" />
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