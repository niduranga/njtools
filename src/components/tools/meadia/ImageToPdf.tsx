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
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Professional Image to PDF Converter</h2>
                        <p className="leading-relaxed">
                            Need to combine multiple photos into a single, organized document? Our <strong className="text-blue-600 dark:text-blue-400">Image to PDF Converter</strong> allows you to merge JPG, PNG, and WebP files into a clean PDF instantly.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Advanced Document Features</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Custom Ordering:</strong> Reorder your pages before converting.</li>
                            <li><strong className="text-slate-900 dark:text-white">100% Client-Side:</strong> Your documents are never uploaded to a server.</li>
                        </ul>
                    </section>

                    <section className="bg-blue-600 dark:bg-blue-900 p-6 rounded-xl shadow-lg border border-blue-500/30">
                        <h3 className="text-lg font-bold mb-2 text-white italic">Secure Document Workflow</h3>
                        <p className="text-sm leading-relaxed text-blue-50 opacity-90">
                            NJTools protects your privacy by design. The generation process runs locally on your computer.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free Image to PDF Converter | JPG to PDF Online | NJTools</title>
                <meta name="description" content="Combine multiple images into one PDF document. Secure, private, and 100% browser-based conversion with NJTools." />
                <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, convert image to pdf, free pdf creator, private converter, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-to-pdf" />
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