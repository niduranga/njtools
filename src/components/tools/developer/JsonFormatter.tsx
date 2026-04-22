import React, { useState } from 'react';
import { Copy, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const JsonFormatter: React.FC = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 4);
            setInput(formatted);
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const minifyJson = () => {
        try {
            if (!input.trim()) return;
            const parsed = JSON.parse(input);
            setInput(JSON.stringify(parsed));
            setError(null);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const copyToClipboard = () => {
        if (!input) return;
        navigator.clipboard.writeText(input);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="JSON Formatter & Validator"
            description="Validate, prettify, and minify your JSON code instantly. High-performance formatting right in your browser."
            seoContent={
                <>
                    <h2 className="text-xl font-bold text-slate-800">Why use a JSON Formatter?</h2>
                    <p className="mt-2 text-slate-600">
                        JSON is the backbone of modern web APIs. Our tool helps developers debug faster by turning minified,
                        unreadable JSON strings into a clean, human-readable format. Like all NJTools,
                        <strong> your data never leaves your browser.</strong>
                    </p>
                </>
            }
        >
            <Helmet>
                <title>Free JSON Formatter & Validator | Prettify JSON Online | NJTools</title>
                <meta name="description" content="Best online JSON formatter to validate, beautify, and minify JSON code. Privacy-focused tool for developers." />
                <meta name="keywords" content="json formatter, json validator, prettify json, minify json, online developer tools, njtools" />
                <link rel="canonical" href="https://njtools.xyz/tools/json-formatter" />
            </Helmet>

            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-1">
                {/* Action Buttons */}
                <div className="flex flex-wrap justify-end gap-2 mb-4 p-4">
                    <button
                        onClick={formatJson}
                        className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-blue-700 transition active:scale-95 text-sm shadow-sm"
                    >
                        Beautify
                    </button>
                    <button
                        onClick={minifyJson}
                        className="bg-slate-800 text-white px-5 py-2 rounded-xl font-bold hover:bg-slate-900 transition active:scale-95 text-sm shadow-sm"
                    >
                        Minify
                    </button>
                </div>

                {/* Textarea Container */}
                <div className="relative group">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your JSON here (e.g. {"name":"Niduranga","role":"Dev"})'
                        className={`w-full h-125 p-6 font-mono text-sm bg-slate-50 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all ${
                            error ? 'border-rose-300 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                        }`}
                    />

                    {/* Floating Utilities */}
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            onClick={copyToClipboard}
                            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition text-slate-600 shadow-sm"
                            title="Copy Code"
                        >
                            {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => { setInput(''); setError(null); }}
                            className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-rose-50 hover:text-rose-600 transition text-slate-600 shadow-sm"
                            title="Clear"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="m-4 p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 text-rose-700 text-sm animate-in fade-in slide-in-from-top-1">
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-bold">Invalid JSON Format</p>
                            <p className="font-mono mt-1 opacity-80">{error}</p>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default JsonFormatter;