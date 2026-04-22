import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Download, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';

const QrGenerator: React.FC = () => {
    const [url, setUrl] = useState('https://njtools.xyz');
    const [logo, setLogo] = useState<string | undefined>(undefined);
    const qrRef = useRef<SVGSVGElement>(null);

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogo(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const downloadQR = () => {
        const svg = qrRef.current;
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        img.onload = () => {
            canvas.width = 500;
            canvas.height = 500;
            ctx?.drawImage(img, 0, 0, 500, 500);
            const pngFile = canvas.toDataURL("image/png");

            const downloadLink = document.createElement("a");
            downloadLink.download = `njtools-qr-${Date.now()}.png`;
            downloadLink.href = pngFile;
            downloadLink.click();
        };

        img.src = "data:image/svg+xml;base64," + btoa(svgData);
    };

    return (
        <ToolLayout
            title="Custom QR Code Generator"
            description="Create professional QR codes with your custom logo for free. Instant download in high resolution."
            seoContent={
                <>
                    <h2 className="text-xl font-bold">Why use our QR Generator?</h2>
                    <p className="mt-2">Unlike other tools, NJTools allows you to add your brand logo to QR codes without any watermark or subscription. Perfect for business cards, posters, and menus.</p>
                </>
            }
        >
            <Helmet>
                <title>Free QR Code Generator with Logo | Custom QR Maker | NJTools</title>
                <meta name="description" content="Generate high-quality QR codes for free. Add your own logo, customize, and download as PNG. No sign-up required." />
                <meta name="keywords" content="qr code generator, free qr maker, qr code with logo, custom qr code, branded qr code, NJTools, business qr generator" />
                <link rel="canonical" href="https://njtools.xyz/tools/qr-generator" />
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-6">
                    <div className="p-6 border rounded-2xl bg-white shadow-sm space-y-4">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                <LinkIcon size={16} /> Enter URL or Text
                            </label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                                <ImageIcon size={16} /> Add Custom Logo (Optional)
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoUpload}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                {/* Preview & Download Section */}
                <div className="flex flex-col items-center justify-center p-8 border border-indigo-100 rounded-2xl bg-indigo-50/20">
                    <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
                        <QRCodeSVG
                            ref={qrRef}
                            value={url}
                            size={250}
                            level="H"
                            includeMargin={true}
                            imageSettings={logo ? {
                                src: logo,
                                x: undefined,
                                y: undefined,
                                height: 50,
                                width: 50,
                                excavate: true,
                            } : undefined}
                        />
                    </div>

                    <button
                        onClick={downloadQR}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition transform hover:scale-105 shadow-lg"
                    >
                        <Download size={20} /> Download PNG
                    </button>
                    <p className="mt-4 text-xs text-gray-400 font-medium italic">NJTools uses 500x500 high-res output for crisp printing.</p>
                </div>
            </div>
        </ToolLayout>
    );
};

export default QrGenerator;