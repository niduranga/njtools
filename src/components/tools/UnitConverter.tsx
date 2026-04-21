import React, { useState, useEffect } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import ToolLayout from '../layout/ToolLayout';
import { Helmet } from "react-helmet-async";

// Units definition with strict typing
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

    const convert = () => {
        const val = parseFloat(value);
        if (isNaN(val)) {
            setResult(0);
            return;
        }

        const rates = unitsData[category] as Record<string, number>;
        const fromRate = rates[fromUnit];
        const toRate = rates[toUnit];

        if (fromRate && toRate) {
            // Convert to base (e.g., meter/kilogram) then to target
            const converted = (val / fromRate) * toRate;
            setResult(converted);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        convert();
    }, [value, fromUnit, toUnit, category, convert]);

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
            title="Unit Converter"
            description="Quickly convert between different units of length and weight. Fast, accurate, and works entirely in your browser."
            seoContent={
                <>
                    <h2 className="text-xl font-bold text-slate-800">Precision Unit Conversion</h2>
                    <p className="mt-2 text-slate-600">
                        Whether you are a developer calculating pixels or an engineer working with metric units,
                        NJTools provides an instant way to switch between systems without any server lag.
                        <strong> All calculations are performed locally for maximum privacy.</strong>
                    </p>
                </>
            }
        >
            <Helmet>
                <title>Free Online Unit Converter | Length & Weight | NJTools</title>
                <meta name="description" content="Instant unit converter for length and weight. Convert meters, kilometers, miles, kilograms, and pounds accurately online." />
                <meta name="keywords" content="unit converter, length converter, weight converter, meters to miles, kg to lbs, online converter, njtools, engineering tools" />
                <link rel="canonical" href="https://njtools.xyz/tools/unit-converter" />
            </Helmet>

            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8 max-w-4xl mx-auto">
                {/* Category Selector */}
                <div className="flex gap-4 mb-10 bg-slate-50 p-2 rounded-2xl w-fit mx-auto md:mx-0">
                    {(Object.keys(unitsData) as CategoryType[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-8 py-2.5 rounded-xl font-bold capitalize transition-all duration-200 ${
                                category === cat
                                    ? 'bg-white shadow-md text-blue-600 scale-105'
                                    : 'text-slate-500 hover:text-slate-800'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-12 items-center">
                    {/* From Section */}
                    <div className="space-y-4 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Input Value</label>
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="w-full text-3xl font-bold bg-transparent outline-none border-b-2 border-slate-200 focus:border-blue-500 pb-2 transition-all"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="w-full p-3 bg-white rounded-xl border border-slate-200 outline-none font-semibold capitalize cursor-pointer focus:ring-2 focus:ring-blue-500/20"
                        >
                            {Object.keys(unitsData[category]).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>

                    {/* Swap Button */}
                    <div className="flex justify-center -my-4 md:my-0">
                        <button
                            onClick={swapUnits}
                            className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-90 hover:rotate-180 duration-500"
                        >
                            <ArrowRightLeft className="w-6 h-6" />
                        </button>
                    </div>

                    {/* To Section */}
                    <div className="space-y-4 p-6 bg-blue-50/30 rounded-3xl border border-blue-100/50">
                        <label className="text-xs font-bold text-blue-400 uppercase tracking-widest ml-1">Converted Result</label>
                        <div className="text-3xl font-bold text-slate-900 border-b-2 border-transparent pb-2 truncate">
                            {result.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="w-full p-3 bg-white rounded-xl border border-slate-200 outline-none font-semibold capitalize cursor-pointer focus:ring-2 focus:ring-blue-500/20"
                        >
                            {Object.keys(unitsData[category]).map(u => <option key={u} value={u}>{u}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default UnitConverter;