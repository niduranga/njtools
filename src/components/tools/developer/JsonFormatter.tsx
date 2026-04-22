import React, { useState } from 'react';
import { Copy, Trash2, CheckCircle, AlertCircle, Code2, Braces } from 'lucide-react';
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
                /* Dark Mode Optimization for SEO Content */
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 italic flex items-center gap-2">
                            <Braces className="text-blue-600 dark:text-blue-400" /> Professional JSON Formatter
                        </h2>
                        <p className="leading-relaxed">
                            JSON is the backbone of modern web communication. Our professional <strong className="text-blue-600 dark:text-blue-400">JSON Formatter</strong> instantly beautifies your code with proper indentation and syntax validation.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Why Use Our JSON Tool?</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Syntax Validation:</strong> Real-time error detection with exact location details.</li>
                            <li><strong className="text-slate-900 dark:text-white">Prettify & Minify:</strong> Toggle between human-readable and production-ready code.</li>
                            <li><strong className="text-slate-900 dark:text-white">Local Privacy:</strong> NJTools processes everything on your device. Sensitive API keys or user data never leave your browser.</li>
                        </ul>
                    </section>

                    <section className="bg-slate-900 dark:bg-slate-950 text-slate-300 p-6 rounded-2xl border border-slate-700 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2 italic">
                            <Code2 className="w-5 h-5 text-blue-400" /> Developer-First Security
                        </h3>
                        <p className="text-sm leading-relaxed opacity-90">
                            We do not use a backend database. Your JSON stays in the browser's memory, ensuring maximum security for professional development workflows.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Free JSON Formatter & Validator | Prettify JSON Online | NJTools</title>
                <meta name="description" content="Best online JSON formatter to validate, beautify, and minify JSON code. Privacy-focused tool for developers." />
                <meta name="keywords" content="json formatter, json validator, prettify json, minify json, online developer tools, njtools" />
                <link rel="canonical" href="https://njtools.xyz/tools/json-formatter" />
            </Helmet>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden transition-colors">
                {/* Header & Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 border-b dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 rounded-full">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase tracking-widest">Active Session</span>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={formatJson}
                            className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-black hover:bg-blue-700 dark:hover:bg-blue-600 transition active:scale-95 text-sm shadow-lg shadow-blue-500/20 uppercase tracking-tight"
                        >
                            Beautify
                        </button>
                        <button
                            onClick={minifyJson}
                            className="bg-slate-800 dark:bg-slate-700 text-white px-6 py-2.5 rounded-xl font-black hover:bg-slate-900 dark:hover:bg-slate-600 transition active:scale-95 text-sm shadow-lg shadow-slate-900/20 uppercase tracking-tight"
                        >
                            Minify
                        </button>
                    </div>
                </div>

                {/* Textarea Container */}
                <div className="relative group p-4">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='Paste your raw JSON here... &#10;Example: {"name":"Niduranga", "status":"online"}'
                        className={`w-full h-125 p-6 font-mono text-sm bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-blue-300 border rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 transition-all leading-relaxed resize-none ${
                            error ? 'border-rose-400 dark:border-rose-900/50' : 'border-slate-200 dark:border-slate-800 focus:border-blue-500'
                        }`}
                        spellCheck="false"
                    />

                    {/* Floating Utilities */}
                    <div className="absolute top-8 right-8 flex flex-col gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={copyToClipboard}
                            className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all text-slate-600 dark:text-slate-300 shadow-md"
                            title="Copy Code"
                        >
                            {copied ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => { setInput(''); setError(null); }}
                            className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950 transition-all text-slate-600 dark:text-rose-400 shadow-md"
                            title="Clear"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Error Message with Dark Mode Support */}
                {error && (
                    <div className="mx-4 mb-4 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 rounded-2xl flex items-start gap-3 text-rose-700 dark:text-rose-400 text-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                        <div>
                            <p className="font-black uppercase tracking-tighter">Syntax Error</p>
                            <p className="font-mono mt-1 opacity-90 break-all">{error}</p>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-center mt-4 text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-[0.2em]">
                Local Client-Side Processing • No Data Collection
            </p>
        </ToolLayout>
    );
};

export default JsonFormatter;