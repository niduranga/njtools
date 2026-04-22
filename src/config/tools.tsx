import SvgConverter from '../components/tools/meadia/SvgConverter.tsx';
import {Code2, FileImage, FileSearch, FileText, ImageIcon, QrCode, Ruler, Sparkles, Zap} from 'lucide-react';
import PngToSvg from "../components/tools/meadia/PngToSvg.tsx";
import JsonFormatter from "../components/tools/developer/JsonFormatter.tsx";
import UnitConverter from "../components/tools/utility/UnitConverter.tsx";
import ImageMetadata from "../components/tools/meadia/ImageMetadata.tsx";
import BackgroundRemover from "../components/tools/meadia/BackgroundRemover.tsx";
import ImageCompressor from "../components/tools/meadia/ImageCompressor.tsx";
import PdfToImage from "../components/tools/meadia/PdfToImage.tsx";
import ImageToPdf from "../components/tools/meadia/ImageToPdf.tsx";
import QrGenerator from "../components/tools/meadia/QrGenerator.tsx";

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
        id: 'background-remover',
        name: 'AI Background Remover',
        desc: 'Remove image backgrounds instantly using on-device AI.',
        component: <BackgroundRemover />,
        icon: <Sparkles className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'image-metadata',
        name: 'Image Metadata Extractor',
        desc: 'Extract hidden EXIF data, camera settings, and GPS from photos.',
        component: <ImageMetadata />,
        icon: <FileSearch />,
        category: 'Media'
    },
    {
        id: 'image-compressor',
        name: 'Smart Image Compressor',
        desc: 'Reduce image file size locally without losing quality.',
        component: <ImageCompressor />,
        icon: <Zap className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'pdf-to-image',
        name: 'PDF to Image Converter',
        desc: 'Extract and convert PDF pages into high-quality PNG images.',
        component: <PdfToImage />,
        icon: <FileImage className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'image-to-pdf',
        name: 'Image to PDF Converter',
        desc: 'Combine multiple images into a single, high-quality PDF document.',
        component: <ImageToPdf />,
        icon: <FileText className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'qr-generator',
        name: 'QR Code Generator',
        desc: 'Generate professional QR codes with custom logos for your business.',
        component: <QrGenerator />,
        icon: <QrCode className="w-6 h-6" />,
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