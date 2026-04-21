import SvgConverter from '../components/tools/SvgConverter.tsx';
import {Code2, ImageIcon, Ruler} from 'lucide-react';
import PngToSvg from "../components/tools/PngToSvg.tsx";
import JsonFormatter from "../components/tools/JsonFormatter.tsx";
import UnitConverter from "../components/tools/UnitConverter.tsx";

export const TOOLS_CONFIG = [
    {
        id: 'svg-to-png',
        name: 'SVG to PNG Converter',
        desc: 'High-quality vector to image conversion.',
        component: <SvgConverter />,
        icon: <ImageIcon />,
        category: 'Media'
    },
    {
        id: 'png-to-svg',
        name: 'PNG to SVG Converter',
        desc: 'High-quality vector to image conversion.',
        component: <PngToSvg />,
        icon: <ImageIcon />,
        category: 'Media'
    },
    {
        id: 'json-formatter',
        name: 'JSON Formatter & Validator',
        desc: 'Prettify, validate, and minify your JSON code instantly.',
        component: <JsonFormatter />,
        icon: <Code2 />,
        category: 'Developer'
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        desc: 'Instant length and weight conversion with high precision.',
        component: <UnitConverter />,
        icon: <Ruler />,
        category: 'Utility'
    }
];