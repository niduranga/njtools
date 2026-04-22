import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { Download, Image as ImageIcon, Link as LinkIcon, QrCode } from 'lucide-react';

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
                /* Dark Mode Text Colors */
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Professional QR Code Generator</h2>
                        <p className="leading-relaxed">
                            QR codes have become essential for modern marketing. Our <strong className="text-indigo-600 dark:text-indigo-400">Custom QR Code Generator</strong> allows you to embed your brand's personality into every scan.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Why Use Branded QR Codes?</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Custom Logo Integration:</strong> Upload your logo to sit in the center.</li>
                            <li><strong className="text-slate-900 dark:text-white">Error Correction (Level H):</strong> Remain scannable even if partially damaged.</li>
                        </ul>
                    </section>

                    <section className="bg-indigo-600 dark:bg-indigo-900 p-6 rounded-xl shadow-lg border border-indigo-500/30">
                        <h3 className="text-lg font-bold mb-2 text-white flex items-center gap-2">
                            <QrCode className="w-5 h-5" /> Secure and Data-Free
                        </h3>
                        <p className="text-sm leading-relaxed text-indigo-50 opacity-90">
                            NJTools values your anonymity. Your custom logos are processed locally in your browser.
                            Your data remains yours—no redirection, no tracking.
                        </p>
                    </section>
                </div>
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
                    <div className="p-6 border dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-800 shadow-sm space-y-4 transition-colors">
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">
                                <LinkIcon size={16} className="text-indigo-500" /> Enter URL or Text
                            </label>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full p-3 bg-slate-50 dark:bg-slate-900 border dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition dark:text-white"
                                placeholder="https://example.com"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-slate-300 mb-2">
                                <ImageIcon size={16} className="text-indigo-500" /> Add Custom Logo (Optional)
                            </label>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 dark:file:bg-indigo-900/30 file:text-indigo-700 dark:file:text-indigo-300 hover:file:bg-indigo-100 dark:hover:file:bg-indigo-900/50 cursor-pointer transition-all"
                                />
                                {logo && (
                                    <button
                                        onClick={() => setLogo(undefined)}
                                        className="mt-2 text-[10px] text-red-500 hover:underline font-bold uppercase tracking-tighter"
                                    >
                                        Remove Logo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview & Download Section */}
                <div className="flex flex-col items-center justify-center p-8 border border-indigo-100 dark:border-slate-700 rounded-2xl bg-indigo-50/20 dark:bg-slate-800/50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl mb-6 ring-8 ring-indigo-50 dark:ring-slate-700/50">
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
                        className="flex items-center gap-2 bg-indigo-600 dark:bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition transform hover:scale-105 shadow-xl shadow-indigo-500/20"
                    >
                        <Download size={20} /> Download 500x500 PNG
                    </button>
                    <p className="mt-4 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                        High-Resolution Vector Output
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
};

export default QrGenerator;