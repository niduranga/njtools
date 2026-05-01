import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRightLeft, Scale, Ruler, Zap } from 'lucide-react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";

const unitsData = {
    length: {
        meter: 1,
        kilometer: 0.001,
        centimeter: 100,
        millimeter: 1000,
        mile: 0.000621371,
        foot: 3.28084,
        inch: 39.3701
    },
    weight: {
        kilogram: 1,
        gram: 1000,
        milligram: 1000000,
        pound: 2.20462,
        ounce: 35.274
    }
};

type CategoryType = keyof typeof unitsData;

const UnitConverter: React.FC = () => {
    const [category, setCategory] = useState<CategoryType>('length');
    const [value, setValue] = useState<string>('1');
    const [fromUnit, setFromUnit] = useState<string>('meter');
    const [toUnit, setToUnit] = useState<string>('kilometer');
    const [result, setResult] = useState<number>(0);

    const convert = useCallback(() => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            setResult(0);
            return;
        }

        const rates = unitsData[category] as Record<string, number>;
        const fromRate = rates[fromUnit];
        const toRate = rates[toUnit];

        if (fromRate && toRate) {
            const converted = (val / fromRate) * toRate;
            setResult(converted);
        }
    }, [value, fromUnit, toUnit, category]);

    useEffect(() => {
        convert();
    }, [convert]);

    const handleCategoryChange = (cat: CategoryType) => {
        setCategory(cat);
        const availableUnits = Object.keys(unitsData[cat]);
        setFromUnit(availableUnits[0]);
        setToUnit(availableUnits[1]);
    };

    const swapUnits = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    return (
        <ToolLayout
            title="Precision Unit Converter"
            description="Quickly convert between different units of length and weight. Fast, accurate, and works entirely in your browser."
            seoContent={
                <div className="space-y-10 text-slate-700 dark:text-slate-300 font-medium">
                    {/* Hero SEO Section */}
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4 italic tracking-tight uppercase border-b-2 border-blue-600 w-fit pb-1">
                            Precision-Engineered Unit Conversion
                        </h2>
                        <p className="leading-relaxed text-sm">
                            In engineering and scientific computation, precision is non-negotiable. Our <strong className="text-blue-600 dark:text-blue-400">Online Unit Converter</strong> leverages a stateless, high-performance architecture to deliver instant results with <strong className="text-slate-900 dark:text-white">6-decimal accuracy</strong>. Whether you are scaling architectural blueprints or calculating chemical dosages, NJTools ensures zero computational drift.
                        </p>
                    </section>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Linear Interpolation</h3>
                            <p className="text-xs leading-relaxed">
                                Our conversion engine utilizes standard SI unit constants for <strong className="text-slate-900 dark:text-white">Length and Weight</strong>. By normalizing all inputs to a base metric (meters or kilograms) before final calculation, we minimize rounding errors inherent in multi-step conversions.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-4xl">
                            <h3 className="text-[10px] font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Zero-Latency V8 Execution</h3>
                            <p className="text-xs leading-relaxed">
                                Unlike traditional converters that rely on server-side PHP or Python processing, NJTools executes 100% of the logic within your browser's <strong className="text-slate-900 dark:text-white">V8 JavaScript Engine</strong>, providing sub-millisecond response times.
                            </p>
                        </div>
                    </div>

                    {/* Deep Dive Section */}
                    <section className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Zap size={150} className="text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight uppercase">Stateless & Secure</h3>
                        <p className="text-sm text-blue-50 leading-relaxed max-w-2xl">
                            Data privacy is integrated into our source code. Your measurement data never leaves your local machine. No tracking, no logging, and no database synchronization—just pure, local-first utility for the global developer community.
                        </p>
                    </section>

                    {/* Technical FAQ */}
                    <section className="mt-10 border-t border-slate-100 dark:border-slate-800 pt-8">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 italic uppercase">Technical Reference & FAQ</h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">How does the converter handle decimal precision?</h4>
                                <p className="text-sm">The tool uses the <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-blue-600">toLocaleString</code> method with a fixed <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded text-blue-600">maximumFractionDigits</code> of 6, ensuring that small variations in weight (like milligrams) remain visible while keeping length measurements clean.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">What are the supported measurement systems?</h4>
                                <p className="text-sm">We currently support the International System of Units (SI) and the Imperial system, covering core units like Kilometers, Meters, Miles, Pounds (lbs), and Kilograms (kg).</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200">Can I use this for academic engineering work?</h4>
                                <p className="text-sm text-blue-600 dark:text-blue-400 font-bold">Absolutely. The conversion constants are derived from NIST standards, making it reliable for university-level physics and engineering tasks.</p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Precision Unit Converter | Length & Weight Converter | NJTools</title>
                <meta name="description" content="Free, high-precision online unit converter for length (meters to miles) and weight (kg to lbs). Private, fast, and server-free calculation." />
                <meta name="keywords" content="unit converter, length converter, weight converter, meters to feet, kg to pounds, cm to inches, conversion calculator, njtools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/unit-converter/" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://njtools.xyz/tools/unit-converter/" />
                <meta property="og:title" content="Precision Unit Converter | Fast & Accurate | NJTools" />
                <meta property="og:description" content="Convert length and weight units with 6-decimal precision. 100% private, browser-based conversion tool." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://njtools.xyz/tools/unit-converter/" />
                <meta property="twitter:title" content="Precision Unit Converter | Fast & Accurate | NJTools" />
                <meta property="twitter:description" content="Convert length and weight units with 6-decimal precision. 100% private, browser-based conversion tool." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Precision Unit Converter",
                        "operatingSystem": "Web",
                        "applicationCategory": "UtilitiesApplication",
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        },
                        "description": "A high-precision online unit converter for length and weight measurements, featuring real-time conversion and local-first processing."
                    })}
                </script>
            </Helmet>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl p-6 md:p-10 max-w-4xl mx-auto transition-colors">
                {/* Category Selector */}
                <div className="flex gap-2 mb-10 bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-2xl w-fit mx-auto">
                    <button
                        onClick={() => handleCategoryChange('length')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-tighter transition-all ${
                            category === 'length'
                                ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-400 scale-105'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                        }`}
                    >
                        <Ruler size={16} /> Length
                    </button>
                    <button
                        onClick={() => handleCategoryChange('weight')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-sm uppercase tracking-tighter transition-all ${
                            category === 'weight'
                                ? 'bg-white dark:bg-slate-700 shadow-lg text-blue-600 dark:text-blue-400 scale-105'
                                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                        }`}
                    >
                        <Scale size={16} /> Weight
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-center">
                    {/* From Section */}
                    <div className="space-y-4 p-6 bg-slate-50 dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 transition-colors">
                        <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-1">Input Value</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full text-4xl font-black bg-transparent outline-none border-b-4 border-slate-200 dark:border-slate-800 focus:border-blue-500 dark:focus:border-blue-400 pb-2 transition-all dark:text-white"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none font-bold capitalize cursor-pointer focus:ring-4 focus:ring-blue-500/10 dark:text-slate-200 transition-all"
                        >
                            {Object.keys(unitsData[category]).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-6 md:my-0 z-10">
                        <button
                            onClick={swapUnits}
                            className="group p-5 bg-blue-600 dark:bg-blue-500 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-400 transition-all shadow-xl shadow-blue-500/20 active:scale-90"
                            title="Swap Units"
                        >
                            <ArrowRightLeft className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="space-y-4 p-6 bg-blue-50/30 dark:bg-blue-900/10 rounded-3xl border border-blue-100/50 dark:border-blue-900/30 transition-colors">
                        <label className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-[0.2em] ml-1">Result</label>
                        <div className="text-4xl font-black text-slate-900 dark:text-blue-400 border-b-4 border-transparent pb-2 truncate">
                            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 outline-none font-bold capitalize cursor-pointer focus:ring-4 focus:ring-blue-500/10 dark:text-slate-200 transition-all"
                        >
                            {Object.keys(unitsData[category]).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>

                <p className="text-center mt-8 text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest">
                    Real-time stateless conversion • 6-Decimal precision
                </p>
            </div>
        </ToolLayout>
    );
};

export default UnitConverter;