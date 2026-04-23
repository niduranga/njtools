import SvgConverter from '../components/tools/meadia/SvgConverter.tsx';
import {
    Code2, FileCode,
    FileImage,
    FileSearch,
    FileText,
    ImageIcon, LayoutGrid,
    Maximize,
    Palette,
    QrCode,
    Ruler, ShieldCheck,
    Sparkles,
    Zap
} from 'lucide-react';
import PngToSvg from "../components/tools/meadia/PngToSvg.tsx";
import JsonFormatter from "../components/tools/developer/JsonFormatter.tsx";
import UnitConverter from "../components/tools/utility/UnitConverter.tsx";
import ImageMetadata from "../components/tools/meadia/ImageMetadata.tsx";
import BackgroundRemover from "../components/tools/meadia/BackgroundRemover.tsx";
import ImageCompressor from "../components/tools/meadia/ImageCompressor.tsx";
import PdfToImage from "../components/tools/meadia/PdfToImage.tsx";
import ImageToPdf from "../components/tools/meadia/ImageToPdf.tsx";
import QrGenerator from "../components/tools/meadia/QrGenerator.tsx";
import ImageResizer from "../components/tools/meadia/ImageResizer.tsx";
import ColorPaletteGenerator from "../components/tools/meadia/ColorPaletteGenerator.tsx";
import FaviconGenerator from "../components/tools/meadia/FaviconGenerator.tsx";
import InstagramGridMaker from "../components/tools/meadia/InstagramGridMaker.tsx";
import SafeAreaChecker from "../components/tools/meadia/SafeAreaChecker.tsx";

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
        id: 'image-resizer',
        name: 'Pro Image Resizer',
        desc: 'Change image dimensions with aspect ratio lock and high-quality scaling.',
        component: <ImageResizer />,
        icon: <Maximize className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'color-palette',
        name: 'Color Palette Generator',
        desc: 'Extract beautiful, harmonious color schemes from any photo instantly.',
        component: <ColorPaletteGenerator />,
        icon: <Palette className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'favicon-generator',
        name: 'Pro Favicon Generator',
        desc: 'Generate a complete set of favicon sizes and manifests in one ZIP file.',
        component: <FaviconGenerator />,
        icon: <FileCode className="w-6 h-6" />,
        category: 'Media'
    },
    {
        id: 'instagram-grid',
        name: 'Instagram Grid Maker',
        desc: 'Split any image into a perfect 3x3 high-resolution grid for your profile.',
        component: <InstagramGridMaker />,
        icon: <LayoutGrid className="w-6 h-6" />,
        category: 'Media',
        premium: false
    },
    {
        id: 'safe-area-checker',
        name: 'Safe-Area Checker',
        desc: 'Verify if your social media covers are obscured by profile pictures or UI elements.',
        component: <SafeAreaChecker />,
        icon: <ShieldCheck className="w-6 h-6" />,
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