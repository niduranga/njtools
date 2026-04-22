import React, { useState, type ChangeEvent } from 'react';
import { jsPDF } from 'jspdf';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Upload, Download, Trash2, MoveUp, MoveDown } from 'lucide-react';

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
                <>
                    <h2 className="text-xl font-bold">Fast & Private PDF Creation</h2>
                    <p className="mt-2">Combine your photos into a professional PDF without uploading them to any server. Your privacy is our priority.</p>
                </>
            }
        >
            <Helmet>
                <title>Free Image to PDF Converter | JPG to PDF Online | NJTools</title>
                <meta name="description" content="Combine multiple images into one PDF document. Secure, private, and 100% browser-based conversion with NJTools." />
                <meta name="keywords" content="image to pdf, jpg to pdf, png to pdf, convert image to pdf, free pdf creator, private converter, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/image-to-pdf" />
            </Helmet>

            <div className="space-y-6">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 p-10 rounded-2xl bg-blue-50/30 transition hover:bg-blue-50/50 relative">
                    <Upload className="w-12 h-12 text-blue-400 mb-4" />
                    <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <p className="text-lg font-medium text-blue-900">Click or Drag images to upload</p>
                    <p className="text-sm text-blue-500 mt-1 text-center">You can upload multiple files and reorder them before converting.</p>
                </div>

                {images.length > 0 && (
                    <div className="bg-white p-6 rounded-2xl border shadow-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {images.map((img, index) => (
                                <div key={img.id} className="relative group border rounded-lg p-2 bg-gray-50">
                                    <img src={img.src} alt="Preview" className="w-full h-32 object-cover rounded" />
                                    <div className="absolute top-1 right-1 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveImage(index, 'up')} className="p-1 bg-white rounded shadow hover:text-blue-600"><MoveUp size={14}/></button>
                                        <button onClick={() => moveImage(index, 'down')} className="p-1 bg-white rounded shadow hover:text-blue-600"><MoveDown size={14}/></button>
                                        <button onClick={() => removeImage(img.id)} className="p-1 bg-white rounded shadow text-red-500"><Trash2 size={14}/></button>
                                    </div>
                                    <p className="text-[10px] mt-1 truncate text-gray-500">{img.file.name}</p>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={generatePdf}
                            disabled={isGenerating}
                            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition disabled:bg-blue-300"
                        >
                            {isGenerating ? 'Generating PDF...' : <><Download size={20}/> Convert to PDF</>}
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default ImageToPdf;