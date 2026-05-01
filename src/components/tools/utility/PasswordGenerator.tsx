import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { RefreshCw, Clipboard, Check, ShieldAlert, Lock } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    });
    const [entropy, setEntropy] = useState(0);
    const [copied, setCopied] = useState(false);

    const generatePassword = useCallback(() => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
        };

        let availableChars = '';
        if (options.uppercase) availableChars += charset.uppercase;
        if (options.lowercase) availableChars += charset.lowercase;
        if (options.numbers) availableChars += charset.numbers;
        if (options.symbols) availableChars += charset.symbols;

        if (!availableChars) {
            setPassword('');
            setEntropy(0);
            return;
        }

        // Using Crypto API for true randomness (Senior Dev Standard)
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            generatedPassword += availableChars[array[i] % availableChars.length];
        }

        setPassword(generatedPassword);

        // Entropy Calculation: E = log2(R^L) -> L * log2(R)
        const R = availableChars.length;
        const E = length * Math.log2(R);
        setEntropy(Math.round(E));
    }, [length, options]);

    useEffect(() => {
        generatePassword();
    }, [generatePassword]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getStrengthColor = () => {
        if (entropy < 40) return 'text-rose-500';
        if (entropy < 60) return 'text-amber-500';
        if (entropy < 80) return 'text-emerald-500';
        return 'text-blue-600';
    };

    return (
        <ToolLayout
            title="Strong Password Generator"
            description="Generate cryptographically secure passwords with real-time entropy calculation and strength analysis."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Cryptographic Randomness & Entropy</h2>
                        <p className="leading-relaxed text-sm">
                            Most online generators rely on predictable pseudo-random algorithms. NJTools leverages the <strong className="text-blue-600 dark:text-blue-400">Web Crypto API (CSPRNG)</strong> to produce strings with maximum entropy. By calculating bits of security in real-time, we provide a mathematical guarantee of your password's resistance to brute-force and dictionary attacks.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Entropy Scoring</h3>
                            <p className="text-sm leading-relaxed">
                                We use <strong className="text-slate-900 dark:text-white">Shannon entropy</strong> calculations to determine the complexity of your generated string. A score above <strong className="text-slate-900 dark:text-white">80 bits</strong> is considered "Fortress Level," making it practically impossible to crack with current computational power.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">CSPRNG Implementation</h3>
                            <p className="text-sm leading-relaxed">
                                Unlike <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs text-blue-600">Math.random()</code>, our generator utilizes system-level hardware noise via <strong className="text-slate-900 dark:text-white">Uint32Array</strong> buffers, ensuring that every character generated is statistically independent and non-deterministic.
                            </p>
                        </div>
                    </div>

                    <section className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Lock size={100} className="text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight uppercase">Zero-Data Retention Policy</h3>
                        <p className="text-sm text-blue-50 leading-relaxed max-w-2xl font-medium">
                            NJTools operates on a <strong className="text-white underline">Strict Local Execution</strong> model. Your passwords are generated in your browser's volatile memory and are never transmitted, stored, or logged on any server. Privacy is not a feature; it's our foundational architecture.
                        </p>
                    </section>

                    <section className="mt-10 border-t border-slate-100 pt-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">Frequently Asked Questions</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Is this password generator safe?</h4>
                                <p className="text-sm">Yes. NJTools uses client-side encryption. Your passwords never leave your browser.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">What is Password Entropy?</h4>
                                <p className="text-sm">Entropy measures the unpredictability of a password. Higher entropy (measured in bits) means a stronger password against brute-force attacks.</p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Strong Password Generator | High-Entropy Security Tool | NJTools</title>
                <meta name="description" content="Generate cryptographically secure passwords with NJTools. Features real-time entropy calculation, CSPRNG randomness, and 100% private local generation." />
                <meta name="keywords" content="strong password generator, secure password tool, cryptographic entropy calculator, random string generator, NJTools, Niduranga Jayarathna, secure auth tools" />
                <link rel="canonical" href="https://njtools.xyz/tools/password-generator/" />

                <meta property="og:title" content="Pro Password Generator | Cryptographic Entropy Analysis | NJTools" />
                <meta property="og:description" content="Generate uncrackable passwords using the Web Crypto API. Real-time strength analysis and zero server exposure." />
                <meta property="og:url" content="https://njtools.xyz/tools/password-generator/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Strong Password Generator",
                        "operatingSystem": "Web",
                        "applicationCategory": "SecurityApplication",
                        "offers": {
                            "@type": "Offer",
                            "price": "0"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        }
                    })}
                </script>
            </Helmet>

            <div className="max-w-4xl mx-auto space-y-8">
                {/* Result Display */}
                <div className="bg-white dark:bg-slate-950 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/40 dark:shadow-none flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 w-full overflow-hidden">
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Generated Password</div>
                        <div className="font-mono text-2xl md:text-3xl text-slate-900 dark:text-white break-all tracking-tight">
                            {password || 'Select options...'}
                        </div>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button onClick={generatePassword} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group">
                            <RefreshCw size={24} className="group-active:rotate-180 transition-transform duration-500" />
                        </button>
                        <button onClick={copyToClipboard} className="flex-1 md:flex-none px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest italic flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
                            {copied ? <Check size={20} /> : <Clipboard size={20} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Strength Meter */}
                <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className={`text-3xl font-black italic ${getStrengthColor()}`}>{entropy}</div>
                        <div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Bits of Entropy</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-tighter italic">
                                {entropy > 80 ? 'Fortress Level' : entropy > 60 ? 'Strong' : 'Moderate'}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-800 rounded-full max-w-md overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-out ${entropy > 80 ? 'bg-blue-600' : 'bg-emerald-500'}`}
                            style={{ width: `${Math.min(entropy, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Password Length: {length}</label>
                            </div>
                            <input
                                type="range" min="8" max="64" value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(options).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => setOptions(prev => ({ ...prev, [key]: !value }))}
                                    className={`p-4 rounded-2xl border-2 transition-all font-bold text-xs uppercase tracking-widest ${
                                        value
                                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/10 text-blue-600'
                                            : 'border-slate-100 dark:border-slate-800 text-slate-400 hover:border-slate-200'
                                    }`}
                                >
                                    {key}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-500 p-8 rounded-r-[2.5rem]">
                        <h4 className="text-amber-800 dark:text-amber-400 font-black uppercase text-xs tracking-[0.2em] mb-3 flex items-center gap-2">
                            <ShieldAlert size={16} /> Security Architecture
                        </h4>
                        <p className="text-xs italic text-amber-900/80 dark:text-amber-200/60 leading-relaxed font-medium">
                            We utilize the <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">Uint32Array</code> buffer with the system's underlying CSPRNG (Cryptographically Secure Pseudo-Random Number Generator). This ensures that each password generated is unique and statistically independent.
                        </p>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default PasswordGenerator;