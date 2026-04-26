import React, { useState } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { FileSpreadsheet, ArrowLeftRight, Clipboard, Check, Download, AlertCircle } from 'lucide-react';

const JsonCsvConverter: React.FC = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const jsonToCsv = (jsonArray: any[]) => {
        if (!jsonArray.length) return '';
        const headers = Object.keys(jsonArray[0]);
        const rows = jsonArray.map(obj =>
            headers.map(header => JSON.stringify(obj[header] ?? '')).join(',')
        );
        return [headers.join(','), ...rows].join('\n');
    };

    // CSV to JSON Logic
    const csvToJson = (csv: string) => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj: any, header, i) => {
                let val: any = values[i]?.trim();
                // Basic type casting
                if (val === 'true') val = true;
                else if (val === 'false') val = false;
                else if (!isNaN(val) && val !== '') val = Number(val);
                obj[header] = val;
                return obj;
            }, {});
        });
    };

    const handleConvert = () => {
        setError(null);
        const trimmedInput = input.trim();
        if (!trimmedInput) return;

        try {
            // Check if input is JSON
            if (trimmedInput.startsWith('[') || trimmedInput.startsWith('{')) {
                const parsed = JSON.parse(trimmedInput);
                const dataArray = Array.isArray(parsed) ? parsed : [parsed];
                setOutput(jsonToCsv(dataArray));
            } else {
                // Assume CSV
                const result = csvToJson(trimmedInput);
                setOutput(JSON.stringify(result, null, 2));
            }
        } catch (error) {
            console.log(error)
            setError("Invalid format. Please check your JSON or CSV structure.");
        }
    };

    const downloadFile = () => {
        const isJson = output.trim().startsWith('[');
        const blob = new Blob([output], { type: isJson ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = isJson ? 'converted_data.json' : 'converted_data.csv';
        a.click();
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="JSON ↔ CSV Converter"
            description="Seamlessly transform data between JSON and CSV formats. Perfect for Excel workflows and API data management."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Data Interoperability & Transformation</h2>
                        <p className="leading-relaxed text-sm">
                            In modern development, bridging the gap between <strong className="text-blue-600 dark:text-blue-400">NoSQL JSON structures</strong> and tabular <strong className="text-blue-600 dark:text-blue-400">CSV/Excel sheets</strong> is a daily necessity. NJTools provides a high-performance, stateless environment to flatten nested objects or hydrate flat files into developer-ready schemas.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Excel-Ready Exports</h3>
                            <p className="text-sm leading-relaxed">
                                Convert complex <strong className="text-slate-900 dark:text-white">JSON arrays</strong> into standardized Comma-Separated Values. Perfect for importing API responses directly into <strong className="text-slate-900 dark:text-white">Microsoft Excel, Google Sheets,</strong> or Airtable without manual formatting.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Developer Hydration</h3>
                            <p className="text-sm leading-relaxed">
                                Transform legacy <strong className="text-slate-900 dark:text-white">CSV data</strong> into valid JSON objects. Our parser automatically handles <strong className="text-slate-900 dark:text-white">Type Inference</strong>, converting numeric strings and booleans into their respective primitive types.
                            </p>
                        </div>
                    </div>

                    <section className="bg-slate-900 dark:bg-black p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <FileSpreadsheet size={100} className="text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight">100% Client-Side Processing</h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                            Unlike other online converters, NJTools performs all data transformations <strong className="text-blue-500 text-xs">locally in your browser</strong>. Your sensitive business data or proprietary JSON schemas never touch our server, ensuring compliance with strict privacy standards like <strong className="text-blue-500 text-xs">GDPR</strong>.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>JSON to CSV Converter | Convert Excel to JSON Online | NJTools</title>
                <meta name="description" content="Convert JSON to CSV or CSV to JSON instantly. Professional client-side data transformation. Secure, fast, and 100% private. Best for Excel & API data." />
                <meta name="keywords" content="json to csv, csv to json, excel to json converter, json to excel online, data converter tool, api data parser, njtools, niduranga jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/json-csv-converter" />

                <meta property="og:title" content="JSON ↔ CSV Converter | Secure Data Transformation | NJTools" />
                <meta property="og:description" content="Fast, private, and client-side conversion between JSON and CSV. Perfect for developers and data analysts." />
                <meta property="og:url" content="https://njtools.xyz/tools/json-csv-converter" />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Input (JSON or CSV)</label>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Paste JSON array or CSV text here...'
                            className="w-full h-100 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 outline-none font-mono text-sm transition-all shadow-inner dark:text-slate-300"
                        />
                    </div>

                    {/* Output Area */}
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-2">Output</label>
                        <div className="relative">
                            <textarea
                                value={output}
                                readOnly
                                placeholder="Result will appear here..."
                                className="w-full h-100 p-6 bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 font-mono text-sm dark:text-blue-400 outline-none"
                            />
                            {output && (
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <button onClick={copyToClipboard} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                        {copied ? <Check size={18} className="text-emerald-500" /> : <Clipboard size={18} />}
                                    </button>
                                    <button onClick={downloadFile} className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:scale-110 transition-transform">
                                        <Download size={18} className="text-blue-600" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-3 p-5 bg-rose-50 dark:bg-rose-900/10 text-rose-600 rounded-2xl border border-rose-100 dark:border-rose-900/30 font-bold text-sm">
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <button
                    onClick={handleConvert}
                    className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-4xl font-black uppercase tracking-widest italic flex items-center justify-center gap-3 hover:bg-blue-600 transition-all active:scale-[0.98] shadow-xl shadow-blue-500/20"
                >
                    <ArrowLeftRight size={20} /> Perform Transformation
                </button>
            </div>
        </ToolLayout>
    );
};

export default JsonCsvConverter;