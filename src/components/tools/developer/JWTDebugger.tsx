import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { ShieldAlert, Unlock, Clipboard, Check, AlertCircle, Code2 } from 'lucide-react';

const JWTDebugger: React.FC = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState<any>(null);
    const [payload, setPayload] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const decodeToken = (input: string) => {
        setError(null);
        if (!input.trim()) {
            setHeader(null);
            setPayload(null);
            return;
        }

        try {
            const parts = input.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid JWT format. A JWT must have 3 parts separated by dots.");
            }

            const base64Decode = (str: string) => {
                const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
                return JSON.parse(decodeURIComponent(atob(base64).split('').map(c =>
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                ).join('')));
            };

            setHeader(base64Decode(parts[0]));
            setPayload(base64Decode(parts[1]));
        } catch (err: any) {
            setHeader(null);
            setPayload(null);
            setError(err.message || "Failed to decode token");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        decodeToken(token);
    }, [token]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(JSON.stringify(text, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout
            title="JWT Debugger"
            description="Securely decode and inspect JSON Web Tokens locally. Inspect headers, payloads, and claims instantly."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Stateless Token Inspection</h2>
                        <p className="leading-relaxed text-sm">
                            JSON Web Tokens (JWT) act as the backbone of modern decentralized authentication. Our <strong className="text-blue-600 dark:text-blue-400">Pro JWT Debugger</strong> provides a high-fidelity interface to parse <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs text-blue-600">JOSE</code> headers and claims without ever exposing your sensitive <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs text-blue-600">Base64URL</code> encoded data to a remote server.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Algorithm Verification</h3>
                            <p className="text-sm leading-relaxed">
                                Instantly identify the cryptographic signing algorithm in use, whether it is symmetric <strong className="text-slate-900 dark:text-white">HMAC (HS256)</strong> or asymmetric <strong className="text-slate-900 dark:text-white">RSA/ECDSA (RS256, ES256)</strong>, ensuring your integration adheres to strict security protocols.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Zero-Trust Architecture</h3>
                            <p className="text-sm leading-relaxed">
                                By utilizing browser-native <strong className="text-slate-900 dark:text-white">atob()</strong> and <strong className="text-slate-900 dark:text-white">UTF-8</strong> decoding buffers, NJTools isolates the entire debug lifecycle to your local machine, mitigating the risk of man-in-the-middle (MITM) interceptions.
                            </p>
                        </div>
                    </div>

                    <section className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-6 rounded-r-4xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldAlert size={80} className="text-amber-600" />
                        </div>
                        <h3 className="text-amber-800 dark:text-amber-400 font-black uppercase text-xs tracking-[0.2em] mb-2 flex items-center gap-2">
                            <ShieldAlert size={16} /> Privacy-First Debugging
                        </h3>
                        <p className="text-sm italic text-amber-900/80 dark:text-amber-200/60 leading-relaxed max-w-2xl">
                            JWTs often contain sensitive identity claims or PII. NJTools performs all transformations in a client-side sandbox. Your production tokens never touch our network—guaranteed security for enterprise development.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>JWT Debugger | Inspect & Decode JSON Web Tokens Privately | NJTools</title>
                <meta name="description" content="Decode JWT tokens instantly. Inspect headers, payloads, and claims with 100% private client-side decoding. Supports HS256, RS256 and more." />
                <meta name="keywords" content="jwt debugger, decode jwt online, json web token inspector, jwt parser, rs256 decoder, hs256 decoder, auth debug tool, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/jwt-debugger" />

                <meta property="og:title" content="Pro JWT Debugger | Stateless Token Inspection | NJTools" />
                <meta property="og:description" content="Securely parse and inspect your JSON Web Tokens locally. Zero server calls, total privacy for your auth data." />
                <meta property="og:url" content="https://njtools.xyz/tools/jwt-debugger" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://njtools.xyz/og-image.png" />
            </Helmet>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-2">
                            <Unlock size={14} /> Encoded Token
                        </label>
                    </div>
                    <textarea
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Paste your JWT here (header.payload.signature)..."
                        className="w-full h-125 p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600 focus:ring-0 dark:text-blue-400 font-mono text-sm shadow-inner transition-all leading-relaxed break-all"
                    />
                    {error && (
                        <div className="flex items-center gap-2 text-rose-500 bg-rose-50 dark:bg-rose-900/10 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/30 text-xs font-bold">
                            <AlertCircle size={16} /> {error}
                        </div>
                    )}
                </div>

                {/* Output Section */}
                <div className="space-y-6">
                    {/* Header Block */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Header: Algorithm & Token Type</span>
                            <button onClick={() => header && copyToClipboard(header)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                {copied ? <Check size={16} className="text-green-500" /> : <Clipboard size={16} />}
                            </button>
                        </div>
                        <pre className="p-6 text-sm font-mono text-rose-500 overflow-auto max-h-40 no-scrollbar">
                            {header ? JSON.stringify(header, null, 2) : '// Header will appear here'}
                        </pre>
                    </div>

                    {/* Payload Block */}
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Payload: Data / Claims</span>
                            <button onClick={() => payload && copyToClipboard(payload)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Clipboard size={16} />
                            </button>
                        </div>
                        <pre className="p-6 text-sm font-mono text-blue-600 dark:text-blue-400 overflow-auto max-h-[300px] no-scrollbar">
                            {payload ? JSON.stringify(payload, null, 2) : '// Payload will appear here'}
                        </pre>
                    </div>

                    <div className="p-6 bg-blue-600 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 flex items-start gap-4">
                        <Code2 size={24} className="shrink-0" />
                        <div>
                            <h4 className="font-black italic uppercase text-xs tracking-tighter">Senior Dev Tip:</h4>
                            <p className="text-[11px] font-medium leading-relaxed opacity-90 mt-1">
                                Check the <code className="bg-white/20 px-1 rounded">exp</code> claim to verify token lifetime. JWTs are encoded, not encrypted—never store passwords or sensitive PII inside the payload.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default JWTDebugger;