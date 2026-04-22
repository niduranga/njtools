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
                    const viewport = page.getViewport({ scale: 2 }); // High quality output එකක් සඳහා
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
                alert("Can not process PDF. Please try again with a valid file."); //
            }
        };
        reader.readAsArrayBuffer(file);
    };

    return (
        <ToolLayout
            title="PDF to Image Converter"
            description="Extract and convert PDF pages into high-quality PNG images instantly."
            seoContent={
                <>
                    <h2 className="text-xl font-bold">100% Client-Side Conversion</h2>
                    <p className="mt-2">Your documents never leave your browser. NJTools ensures maximum privacy by processing everything on your local machine.</p>
                </>
            }
        >
            <Helmet>
                <title>Free PDF to Image Converter | Export PDF to PNG | NJTools</title>
                <meta name="description" content="Convert PDF documents to PNG images for free. Fast, secure, and private browser-based conversion." />
                <meta name="keywords" content="pdf to image, pdf to png, njtools, free pdf tools, private conversion" />
                <link rel="canonical" href="https://njtools.xyz/tools/pdf-to-image" />
            </Helmet>

            <div className={`flex flex-col items-center justify-center border-2 border-dashed p-10 rounded-xl transition-all ${status === 'error' ? 'border-red-200 bg-red-50/30' : 'border-purple-200 bg-purple-50/30 hover:border-purple-300'}`}>
                <div className="flex gap-2 mb-4">
                    <FileImage className={`w-12 h-12 ${status === 'error' ? 'text-red-400' : 'text-purple-400'}`} />
                    <Upload className={`w-12 h-12 ${status === 'error' ? 'text-red-300' : 'text-purple-300'}`} />
                </div>

                <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="block w-full max-w-xs text-sm text-slate-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer"
                />

                {status === 'processing' && (
                    <div className="mt-6 flex flex-col items-center gap-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                        <p className="text-sm text-purple-600 font-bold italic text-center">Processing PDF... Extracting pages, please wait...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-100 px-4 py-2 rounded-lg">
                        <AlertCircle className="w-5 h-5" />
                        <p className="text-sm font-bold">Failed to process PDF. Please try again.</p>
                    </div>
                )}
            </div>

            {status === 'done' && images.length > 0 && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {images.map((src, index) => (
                        <div key={index} className="group border p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow flex flex-col items-center">
                            <div className="relative overflow-hidden rounded-lg border border-gray-100 mb-6">
                                <img src={src} alt={`Page ${index + 1}`} className="max-w-full h-auto transition-transform group-hover:scale-[1.02]" />
                            </div>
                            <a
                                href={src}
                                download={`njtools-page-${index + 1}.png`}
                                className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-700 transition transform active:scale-95 shadow-lg"
                            >
                                <Download className="w-5 h-5" /> Download Page {index + 1}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </ToolLayout>
    );
};

export default PdfToImage;