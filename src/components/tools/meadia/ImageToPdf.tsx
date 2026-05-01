import React, { useState, type ChangeEvent } from 'react';
import { jsPDF } from 'jspdf';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Upload, Download, Trash2, MoveUp, MoveDown, FilePlus } from 'lucide-react';

interface ImageItem {
    id: string;
    src: string;
    file: File;
}

const ImageToPdf: React.FC = () => {
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const newImages = files.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            src: URL.createObjectURL(file),
            file
        }));
        setImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id: string) => {
        setImages(prev => prev.filter(img => img.id !== id));
    };

    const moveImage = (index: number, direction: 'up' | 'down') => {
        const newImages = [...images];
        const nextIndex = direction === 'up' ? index - 1 : index + 1;
        if (nextIndex >= 0 && nextIndex < newImages.length) {
            [newImages[index], newImages[nextIndex]] = [newImages[nextIndex], newImages[index]];
            setImages(newImages);
        }
    };

    const generatePdf = async () => {
        if (images.length === 0) return;
        setIsGenerating(true);

        const pdf = new jsPDF();

        for (let i = 0; i < images.length; i++) {
            const img = images[i];
            const imgData = await getImageData(img.src);

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight);
        }

        pdf.save('NJTools-converted.pdf');
        setIsGenerating(false);
    };

    const getImageData = (src: string): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0);
                resolve(canvas.toDataURL('image/jpeg', 0.8));
            };
        });
    };

    return (
        <ToolLayout
            title="Image to PDF Converter"
            description="Convert multiple JPG, PNG, or WebP images into a single PDF document instantly."
            seoContent={
                /* Dark Mode Text Fixes */
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase border-b-2 border-blue-600 w-fit pb-1">
                            Professional Document Synthesis
                        </h2>
                        <p className="leading-relaxed text-sm">
                            Combining high-resolution assets into a portable document format requires precision. Our <strong className="text-blue-600 dark:text-blue-400">Image to PDF Converter</strong> utilizes the <strong className="text-slate-900 dark:text-white">jsPDF engine</strong> to compile JPG, PNG, and WebP files into a unified document. Whether you are preparing a portfolio, a university assignment, or a corporate report, NJTools ensures your images are preserved with high-fidelity encoding.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Custom Page Sequencing</h3>
                            <p className="text-xs leading-relaxed">
                                Take full control of your document's narrative. Our intuitive UI allows you to <strong className="text-slate-900 dark:text-white">dynamically reorder images</strong> using a drag-and-drop-style logic, ensuring your PDF pages appear exactly in the sequence you need.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">In-Browser Compilation</h3>
                            <p className="text-xs leading-relaxed">
                                Most PDF converters upload your files to remote servers, risking data leaks. NJTools implements an <strong className="text-slate-900 dark:text-white">Offline-First Document Pipeline</strong>. All conversions happen within your browser's local sandbox, providing 100% security for sensitive documents.
                            </p>
                        </div>
                    </div>

                    <section className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase">Developer's Engineering Note</h3>
                        <p className="text-sm text-blue-50 leading-relaxed max-w-2xl">
                            "We utilize <strong className="text-white font-bold">Canvas API toDataURL</strong> with 80% JPEG compression during the PDF synthesis. This strikes a perfect balance between visual clarity and a reduced file size, ensuring your PDFs remain lightweight for email sharing and web uploads."
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Image to PDF Converter | Combine Photos into PDF | NJTools</title>
                <meta name="description" content="Merge multiple JPG, PNG, and WebP images into a single PDF instantly. Fast, secure, and 100% browser-based with NJTools. No registration required." />
                <meta name="keywords" content="image to pdf, batch jpg to pdf, combine images to pdf, secure pdf converter, university assignment tools, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-to-pdf/" />

                <meta property="og:title" content="Secure Image to PDF Converter | NJTools" />
                <meta property="og:description" content="Combine your photos into a professional PDF in seconds. All processing is done locally for 100% privacy." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Professional Image to PDF Converter",
                        "operatingSystem": "Web",
                        "applicationCategory": "BusinessApplication",
                        "featureList": ["Batch Image Conversion", "Custom Page Ordering", "Client-side PDF Generation", "Zero-upload Privacy"],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        },
                        "description": "Convert multiple images into a single professional PDF document instantly with NJTools. 100% secure and private."
                    })}
                </script>
            </Helmet>

            <div className="space-y-6">
                {/* Upload Area with Dark Mode Styling */}
                <div className="relative group flex flex-col items-center justify-center border-2 border-dashed border-blue-200 dark:border-slate-700 p-10 rounded-2xl bg-blue-50/30 dark:bg-slate-800/50 transition hover:bg-blue-50/50 dark:hover:bg-slate-800">
                    <Upload className="w-12 h-12 text-blue-400 dark:text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <p className="text-lg font-medium text-blue-900 dark:text-blue-200">Click or Drag images to upload</p>
                    <p className="text-sm text-blue-500 dark:text-slate-400 mt-1 text-center">Reorder images before generating the PDF.</p>
                </div>

                {images.length > 0 && (
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border dark:border-slate-700 shadow-sm transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <FilePlus size={16} /> Image List ({images.length})
                            </h4>
                        </div>

                        {/* Image Preview Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                            {images.map((img, index) => (
                                <div key={img.id} className="relative group border dark:border-slate-700 rounded-xl p-2 bg-slate-50 dark:bg-slate-900 hover:ring-2 ring-blue-500 transition-all">
                                    <img src={img.src} alt="Preview" className="w-full h-32 object-contain rounded-lg bg-white dark:bg-slate-800" />

                                    {/* Action Buttons with Dark Mode Compatibility */}
                                    <div className="absolute top-2 right-2 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveImage(index, 'up')} title="Move Up" className="p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-md hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-200 transition-colors">
                                            <MoveUp size={14}/>
                                        </button>
                                        <button onClick={() => moveImage(index, 'down')} title="Move Down" className="p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-md hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-200 transition-colors">
                                            <MoveDown size={14}/>
                                        </button>
                                        <button onClick={() => removeImage(img.id)} title="Remove" className="p-1.5 bg-white dark:bg-slate-700 rounded-md shadow-md text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                                            <Trash2 size={14}/>
                                        </button>
                                    </div>
                                    <p className="text-[10px] mt-2 truncate text-slate-500 dark:text-slate-400 font-mono px-1">{img.file.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generatePdf}
                            disabled={isGenerating}
                            className="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Building PDF...
                                </>
                            ) : (
                                <>
                                    <Download size={20}/>
                                    Convert {images.length} Image{images.length > 1 ? 's' : ''} to PDF
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageToPdf;