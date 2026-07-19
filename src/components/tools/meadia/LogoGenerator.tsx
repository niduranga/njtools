import React, { useState, useMemo, useRef, useCallback } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { removeBackground } from '@imgly/background-removal';
import { 
    Download, 
    Copy, 
    Check, 
    Type, 
    Layers, 
    Palette, 
    Sliders, 
    Sparkles, 
    Image as ImageIcon, 
    HelpCircle,
    Upload,
    Eraser,
    Loader2,
    X
} from 'lucide-react';

interface LogoStylePreset {
    id: string;
    name: string;
    desc: string;
    iconId: string;
    fontFamily: string;
    fontSize: number;
    taglineSize: number;
    colorThemeId: string;
    layout: 'top' | 'left' | 'badge';
    bgMode: 'dark' | 'light' | 'transparent' | 'gradient';
    iconSize: number;
}

const PRESETS: LogoStylePreset[] = [
    {
        id: 'gold-lux',
        name: 'Royal Gold & Black',
        desc: 'Luxurious, premium, and sophisticated brand identity.',
        iconId: 'crown',
        fontFamily: 'Cinzel',
        fontSize: 42,
        taglineSize: 14,
        colorThemeId: 'luxury-gold',
        layout: 'top',
        bgMode: 'dark',
        iconSize: 90
    },
    {
        id: 'neon-tech',
        name: 'Cyberpunk SaaS',
        desc: 'Futuristic, high-energy tech and developer vibe.',
        iconId: 'tech-cube',
        fontFamily: 'Space Mono',
        fontSize: 38,
        taglineSize: 12,
        colorThemeId: 'cyber-neon',
        layout: 'left',
        bgMode: 'dark',
        iconSize: 80
    },
    {
        id: 'eco-flora',
        name: 'Organic Wellness',
        desc: 'Clean, soothing, and nature-inspired aesthetic.',
        iconId: 'health-leaf',
        fontFamily: 'Outfit',
        fontSize: 40,
        taglineSize: 13,
        colorThemeId: 'emerald-mint',
        layout: 'top',
        bgMode: 'light',
        iconSize: 90
    },
    {
        id: 'crypto-cap',
        name: 'Venture Capital',
        desc: 'Trustworthy, solid, and modern corporate emblem.',
        iconId: 'finance-shield',
        fontFamily: 'Montserrat',
        fontSize: 36,
        taglineSize: 11,
        colorThemeId: 'ocean-blue',
        layout: 'badge',
        bgMode: 'transparent',
        iconSize: 100
    }
];

interface ColorTheme {
    id: string;
    name: string;
    start: string;
    end: string;
    textDark: string;
    textLight: string;
}

const COLOR_THEMES: ColorTheme[] = [
    { id: 'ocean-blue', name: 'Deep Ocean Gradient', start: '#2563eb', end: '#06b6d4', textDark: '#0f172a', textLight: '#ffffff' },
    { id: 'luxury-gold', name: 'Imperial Gold', start: '#fbbf24', end: '#d97706', textDark: '#1e1b4b', textLight: '#fef08a' },
    { id: 'cyber-neon', name: 'Electric Fuchsia', start: '#d946ef', end: '#8b5cf6', textDark: '#311042', textLight: '#fdf4ff' },
    { id: 'emerald-mint', name: 'Forest Emerald', start: '#059669', end: '#34d399', textDark: '#022c22', textLight: '#ecfdf5' },
    { id: 'sunset-crimson', name: 'Sunset Warmth', start: '#ea580c', end: '#e11d48', textDark: '#4c0519', textLight: '#fff1f2' },
    { id: 'monochrome', name: 'Classic Slate', start: '#475569', end: '#0f172a', textDark: '#020617', textLight: '#f8fafc' }
];

interface FontConfig {
    name: string;
    family: string;
    importUrl: string;
    style: 'sans-serif' | 'serif' | 'monospace' | 'display';
}

const FONTS: FontConfig[] = [
    { name: 'Montserrat (Modern Sans)', family: 'Montserrat', importUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&display=swap', style: 'sans-serif' },
    { name: 'Outfit (Sleek Geometric)', family: 'Outfit', importUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@700;900&display=swap', style: 'sans-serif' },
    { name: 'Playfair Display (Elegant)', family: 'Playfair Display', importUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap', style: 'serif' },
    { name: 'Cinzel (Royal Luxury)', family: 'Cinzel', importUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&display=swap', style: 'serif' },
    { name: 'Space Mono (Futuristic)', family: 'Space Mono', importUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap', style: 'monospace' },
    { name: 'Syne (Avant Garde)', family: 'Syne', importUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap', style: 'display' }
];

const LogoGenerator: React.FC = () => {
    // Basic settings
    const [companyName, setCompanyName] = useState('AuraTech');
    const [tagline, setTagline] = useState('INNOVATE NEXT');
    const [selectedIconId, setSelectedIconId] = useState('tech-cube');
    const [selectedFontFamily, setSelectedFontFamily] = useState('Outfit');
    const [selectedThemeId, setSelectedThemeId] = useState('ocean-blue');
    const [layout, setLayout] = useState<'top' | 'left' | 'badge' | 'icon-only' | 'text-only'>('top');
    const [bgMode, setBgMode] = useState<'dark' | 'light' | 'transparent' | 'gradient'>('dark');
    const [noCanvasPadding, setNoCanvasPadding] = useState(false);

    // Advanced adjustments
    const [iconSize, setIconSize] = useState(85);
    const [fontSize, setFontSize] = useState(38);
    const [taglineSize, setTaglineSize] = useState(13);
    const [iconOffset, setIconOffset] = useState(0);
    const [textOffset, setTextOffset] = useState(0);

    // Custom image upload
    const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
    const [bgRemovedImageUrl, setBgRemovedImageUrl] = useState<string | null>(null);
    const [bgRemovalStatus, setBgRemovalStatus] = useState<'idle' | 'processing' | 'done' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Clipboard/UI feedback
    const [copied, setCopied] = useState(false);
    const svgRef = useRef<SVGSVGElement | null>(null);

    const activeTheme = useMemo(() => {
        return COLOR_THEMES.find(t => t.id === selectedThemeId) || COLOR_THEMES[0];
    }, [selectedThemeId]);

    const activeFont = useMemo(() => {
        return FONTS.find(f => f.family === selectedFontFamily) || FONTS[0];
    }, [selectedFontFamily]);

    // Compute compact viewBox based on the layout and scale parameters
    const getViewBox = useCallback(() => {
        if (!noCanvasPadding) return "0 0 800 600";
        
        switch (layout) {
            case 'top': {
                const topY = Math.min(230 - iconSize / 2 + iconOffset, 300);
                const bottomY = tagline ? (425 + textOffset + taglineSize) : (380 + textOffset + fontSize / 2);
                const height = (bottomY - topY) + 50; 
                const width = Math.max(iconSize * 2.8, companyName.length * (fontSize * 0.75)) + 80;
                return `${400 - width / 2} ${topY - 25} ${width} ${height}`;
            }
            case 'left': {
                const iconLeft = 160 - iconSize / 2;
                const textRight = 190 + iconSize / 2 + companyName.length * (fontSize * 0.7);
                const width = (textRight - iconLeft) + 60;
                const topY = Math.min(300 - iconSize / 2 + iconOffset, 295 - fontSize);
                const bottomY = tagline ? (340 + textOffset + taglineSize) : (295 + textOffset + fontSize / 2);
                const height = (bottomY - topY) + 40;
                return `${iconLeft - 20} ${topY - 20} ${width} ${height}`;
            }
            case 'badge': {
                // Badge crest is bounds-fixed (x: 220 to 580, y: 90 to 540)
                return "200 80 400 480";
            }
            case 'icon-only': {
                const topY = 300 - iconSize / 2 + iconOffset;
                return `${400 - iconSize / 2 - 15} ${topY - 15} ${iconSize + 30} ${iconSize + 30}`;
            }
            case 'text-only': {
                const topY = 285 + textOffset - fontSize;
                const bottomY = tagline ? (340 + textOffset + taglineSize) : (285 + textOffset + fontSize / 2);
                const height = (bottomY - topY) + 30;
                const width = Math.max(160, companyName.length * (fontSize * 0.75) + 60);
                return `${400 - width / 2} ${topY - 15} ${width} ${height}`;
            }
            default:
                return "0 0 800 600";
        }
    }, [noCanvasPadding, layout, iconSize, iconOffset, tagline, textOffset, taglineSize, fontSize, companyName]);

    // Live preview dynamic canvas background selector styling
    const getPreviewBgStyle = useCallback(() => {
        if (bgMode === 'dark') return { backgroundColor: '#0f172a' };
        if (bgMode === 'light') return { backgroundColor: '#ffffff' };
        if (bgMode === 'gradient') return { background: `linear-gradient(135deg, ${activeTheme.start}, ${activeTheme.end})` };
        // transparent -> high fidelity checkerboard
        return {
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'><rect width='10' height='10' fill='%23cbd5e1' opacity='0.3'/><rect x='10' y='10' width='10' height='10' fill='%23cbd5e1' opacity='0.3'/></svg>")`,
            backgroundColor: '#f1f5f9'
        };
    }, [bgMode, activeTheme]);

    // Handle custom image upload
    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setCustomImageUrl(reader.result as string);
            setBgRemovedImageUrl(null);
            setBgRemovalStatus('idle');
            setSelectedIconId('custom-image');
        };
        reader.readAsDataURL(file);
    }, []);

    // Remove background from uploaded image
    const handleRemoveBg = useCallback(async () => {
        if (!customImageUrl) return;
        setBgRemovalStatus('processing');
        try {
            const response = await fetch(customImageUrl);
            const blob = await response.blob();
            const resultBlob = await removeBackground(blob);
            
            const reader = new FileReader();
            reader.onloadend = () => {
                setBgRemovedImageUrl(reader.result as string);
                setBgRemovalStatus('done');
            };
            reader.readAsDataURL(resultBlob);
        } catch (err) {
            console.error('Background removal failed:', err);
            setBgRemovalStatus('error');
        }
    }, [customImageUrl]);

    // Clear custom image
    const clearCustomImage = useCallback(() => {
        setCustomImageUrl(null);
        setBgRemovedImageUrl(null);
        setBgRemovalStatus('idle');
        setSelectedIconId('tech-cube');
        if (fileInputRef.current) fileInputRef.current.value = '';
    }, []);

    // Apply preset settings
    const applyPreset = (preset: LogoStylePreset) => {
        setSelectedIconId(preset.iconId);
        setSelectedFontFamily(preset.fontFamily);
        setFontSize(preset.fontSize);
        setTaglineSize(preset.taglineSize);
        setSelectedThemeId(preset.colorThemeId);
        setLayout(preset.layout);
        setBgMode(preset.bgMode);
        setIconSize(preset.iconSize);
        setIconOffset(0);
        setTextOffset(0);
    };

    // Vector SVG paths definition — note: custom-image is handled inline in render
    const renderIconGraphic = (id: string) => {
        if (id === 'custom-image') {
            const imgSrc = bgRemovedImageUrl ?? customImageUrl;
            if (!imgSrc) return null;
            return (
                <image
                    href={imgSrc}
                    x="0" y="0"
                    width="100" height="100"
                    preserveAspectRatio="xMidYMid meet"
                />
            );
        }
        switch (id) {
            case 'tech-cube':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M50 12 L88 34 V76 L50 98 L12 76 V34 Z" fill="url(#logoGrad)" />
                        <path d="M50 12 V55 L12 34 M50 55 L88 34 M50 55 L50 98" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.45" />
                        <circle cx="50" cy="55" r="10" fill="#ffffff" opacity="0.25" />
                    </g>
                );
            case 'tech-node':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <line x1="30" y1="30" x2="70" y2="30" stroke="url(#logoGrad)" strokeWidth="6" opacity="0.8" />
                        <line x1="30" y1="30" x2="50" y2="70" stroke="url(#logoGrad)" strokeWidth="6" opacity="0.8" />
                        <line x1="70" y1="30" x2="50" y2="70" stroke="url(#logoGrad)" strokeWidth="6" opacity="0.8" />
                        <circle cx="30" cy="30" r="14" fill="url(#logoGrad)" />
                        <circle cx="70" cy="30" r="14" fill="url(#logoGrad)" />
                        <circle cx="50" cy="70" r="18" fill="url(#logoGrad)" />
                        <circle cx="50" cy="70" r="8" fill="#ffffff" opacity="0.8" />
                    </g>
                );
            case 'health-leaf':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M50 10 C68 32, 78 52, 70 72 C62 90, 38 90, 30 72 C22 52, 32 32, 50 10 Z" fill="url(#logoGrad)" />
                        <path d="M50 10 C50 35, 45 55, 30 72" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.45" />
                    </g>
                );
            case 'health-sun':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <circle cx="50" cy="50" r="22" fill="url(#logoGrad)" />
                        <g stroke="url(#logoGrad)" strokeWidth="4" strokeLinecap="round">
                            {Array.from({ length: 8 }).map((_, i) => {
                                const angle = (i * 45 * Math.PI) / 180;
                                const x1 = 50 + 28 * Math.cos(angle);
                                const y1 = 50 + 28 * Math.sin(angle);
                                const x2 = 50 + 40 * Math.cos(angle);
                                const y2 = 50 + 40 * Math.sin(angle);
                                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                            })}
                        </g>
                    </g>
                );
            case 'finance-shield':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M50 12 L85 24 V55 C85 75, 50 90, 50 90 C50 90, 15 75, 15 55 V24 Z" fill="url(#logoGrad)" />
                        <path d="M50 20 L77 28 V53 C77 69, 50 81, 50 81 C50 81, 23 69, 23 53 V28 Z" fill="#ffffff" opacity="0.25" />
                        <path d="M50 30 L58 45 L74 48 L62 58 L65 74 L50 66 L35 74 L38 58 L26 48 L42 45 Z" fill="#ffffff" opacity="0.7" />
                    </g>
                );
            case 'finance-chart':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <rect x="20" y="55" width="12" height="25" rx="3" fill="url(#logoGrad)" />
                        <rect x="44" y="35" width="12" height="45" rx="3" fill="url(#logoGrad)" />
                        <rect x="68" y="15" width="12" height="65" rx="3" fill="url(#logoGrad)" />
                        <path d="M15 65 L38 45 L62 25 L85 10" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.6" />
                        <path d="M85 10 H75 M85 10 V20" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6" />
                    </g>
                );
            case 'retail-diamond':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M50 12 L82 38 L68 85 L32 85 L18 38 Z" fill="url(#logoGrad)" />
                        <path d="M50 12 L35 38 L50 85 L65 38 Z" fill="#ffffff" opacity="0.22" />
                        <path d="M18 38 H82 M32 85 L35 38 M68 85 L65 38" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />
                    </g>
                );
            case 'creative-star':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M50 12 C50 38, 38 50, 12 50 C38 50, 50 62, 50 88 C50 62, 62 50, 88 50 C62 50, 50 38, 50 12 Z" fill="url(#logoGrad)" />
                        <ellipse cx="50" cy="50" rx="36" ry="12" stroke="#ffffff" strokeWidth="3" fill="none" transform="rotate(-25 50 50)" opacity="0.55" strokeDasharray="6 4" />
                    </g>
                );
            case 'crown':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M20 75 L12 30 L38 50 L50 20 L62 50 L88 30 L80 75 Z" fill="url(#logoGrad)" />
                        <rect x="20" y="70" width="60" height="6" rx="2" fill="#ffffff" opacity="0.3" />
                        <circle cx="12" cy="27" r="3" fill="url(#logoGrad)" />
                        <circle cx="50" cy="17" r="3" fill="url(#logoGrad)" />
                        <circle cx="88" cy="27" r="3" fill="url(#logoGrad)" />
                    </g>
                );
            case 'infinity':
                return (
                    <g transform="translate(10, 10) scale(0.8)">
                        <path d="M25 50 C25 32, 40 32, 50 50 C60 68, 75 68, 75 50 C75 32, 60 32, 50 50 C40 68, 25 68, 25 50 Z" stroke="url(#logoGrad)" strokeWidth="8" fill="none" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="5" fill="url(#logoGrad)" />
                    </g>
                );
            default:
                return null;
        }
    };

    // Calculate bounding backgrounds
    const getBgColor = () => {
        if (bgMode === 'dark') return '#0f172a'; // slate-900
        if (bgMode === 'light') return '#ffffff';
        if (bgMode === 'gradient') return `url(#bgGrad)`;
        return 'none'; // transparent
    };

    const getTextColor = () => {
        if (bgMode === 'dark' || bgMode === 'gradient') return '#ffffff';
        if (bgMode === 'light') return '#0f172a';
        // transparent — use theme color so it stays visible on any background
        return activeTheme.start;
    };

    const getTaglineColor = () => {
        if (bgMode === 'dark' || bgMode === 'gradient') return '#94a3b8';
        if (bgMode === 'light') return '#64748b';
        return activeTheme.end;
    };

    const copySvgCode = () => {
        if (!svgRef.current) return;
        const svgString = new XMLSerializer().serializeToString(svgRef.current);
        navigator.clipboard.writeText(svgString).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const downloadSvg = () => {
        if (!svgRef.current) return;
        const svgString = new XMLSerializer().serializeToString(svgRef.current);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `${companyName.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
    };

    const downloadPng = () => {
        if (!svgRef.current) return;
        const svgString = new XMLSerializer().serializeToString(svgRef.current);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobUrl = URL.createObjectURL(svgBlob);

        const vb = getViewBox();
        const [, , vbWidth, vbHeight] = vb.split(' ').map(Number);
        const exportScale = 2; // high resolution scale
        const targetWidth = vbWidth * exportScale;
        const targetHeight = vbHeight * exportScale;

        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const context = canvas.getContext('2d');
            
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
                
                // Draw background manually
                if (bgMode === 'dark') {
                    context.fillStyle = '#0f172a';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                } else if (bgMode === 'light') {
                    context.fillStyle = '#ffffff';
                    context.fillRect(0, 0, canvas.width, canvas.height);
                } else if (bgMode === 'gradient') {
                    const grad = context.createLinearGradient(0, 0, canvas.width, canvas.height);
                    grad.addColorStop(0, activeTheme.start);
                    grad.addColorStop(1, activeTheme.end);
                    context.fillStyle = grad;
                    context.fillRect(0, 0, canvas.width, canvas.height);
                }

                context.drawImage(image, 0, 0, targetWidth, targetHeight);

                const pngUrl = canvas.toDataURL('image/png');
                const downloadLink = document.createElement('a');
                downloadLink.href = pngUrl;
                downloadLink.download = `${companyName.toLowerCase().replace(/\s+/g, '-')}-logo.png`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            }
            URL.revokeObjectURL(blobUrl);
        };
        image.src = blobUrl;
    };

    return (
        <ToolLayout
            title="Professional Logo Generator"
            description="Design stunning, international-grade vector logos client-side instantly. Select templates, customize typography, colors, and download print-ready SVGs."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">Premium Client-Side Vector Design</h2>
                        <p className="leading-relaxed text-sm">
                            Having a distinct brand identity is vital for modern startups and businesses. This tool renders custom geometry, load scalable Google Fonts, and lets you fine-tune layouts without sending metadata or queries to third-party databases.
                        </p>
                    </section>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl">
                            <h3 className="text-xs font-black uppercase text-indigo-600 mb-2 tracking-widest">SVG Vector Export</h3>
                            <p className="text-xs leading-relaxed">
                                Downloads are structured as fully compliant SVG vectors, which can be imported directly into Adobe Illustrator, Figma, or Canva for infinite scaling.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl">
                            <h3 className="text-xs font-black uppercase text-indigo-600 mb-2 tracking-widest">Dynamic Font Loading</h3>
                            <p className="text-xs leading-relaxed">
                                Integrates professional typography weights directly within the exported file definition so that headers and taglines look exactly as they do in the browser canvas.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl">
                            <h3 className="text-xs font-black uppercase text-indigo-600 mb-2 tracking-widest">100% Free & Local</h3>
                            <p className="text-xs leading-relaxed">
                                Processing executes entirely in-browser. Zero data transfers, zero memberships, and zero hidden costs.
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Helmet>
                <title>Professional Logo Generator | High-Res Vector SVG Exporter | NJTools</title>
                <meta name="description" content="Generate beautiful geometric company logos and tags locally. Select branding presets, adjust letter spacing, and download high-resolution PNG or SVG vectors." />
                <meta name="keywords" content="logo generator, free logo maker, business logo designer, svg logo creator, vector brand logo, download logo, local logo generator, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/logo-generator/" />
            </Helmet>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
                {/* Control Panel (7 cols) */}
                <div className="lg:col-span-7 bg-white dark:bg-slate-950 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 shadow-xl dark:shadow-none space-y-6">
                    
                    {/* Header */}
                    <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-900 pb-4">
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <h2 className="text-sm font-black uppercase tracking-wider text-slate-800 dark:text-white">Brand Configurator</h2>
                    </div>

                    {/* Quick Presets */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Quick Style Presets
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {PRESETS.map(preset => (
                                <button
                                    key={preset.id}
                                    onClick={() => applyPreset(preset)}
                                    type="button"
                                    className="p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-850 border border-slate-100 dark:border-slate-800 rounded-2xl text-left transition"
                                >
                                    <h4 className="text-xs font-bold text-slate-800 dark:text-white">{preset.name}</h4>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">{preset.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Type size={12} />
                                <span>Company / Brand Name</span>
                            </label>
                            <input
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="e.g. AuraTech"
                                maxLength={25}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Slogan / Tagline
                            </label>
                            <input
                                type="text"
                                value={tagline}
                                onChange={(e) => setTagline(e.target.value.toUpperCase())}
                                placeholder="e.g. INNOVATE NEXT"
                                maxLength={35}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm font-mono"
                            />
                        </div>
                    </div>

                    {/* Icon & Typography selectors */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Layers size={12} />
                                <span>Select Icon Mark</span>
                            </label>
                            <select
                                value={selectedIconId}
                                onChange={(e) => setSelectedIconId(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm"
                            >
                                <option value="tech-cube">Isometric Cube (Tech)</option>
                                <option value="tech-node">Connected Nodes (SaaS)</option>
                                <option value="health-leaf">Organic Leaf (Wellness)</option>
                                <option value="health-sun">Radiant Sun (Aesthetic)</option>
                                <option value="finance-shield">Heraldic Shield (Trust)</option>
                                <option value="finance-chart">Rising Chart (Investment)</option>
                                <option value="retail-diamond">Faceted Gem (Luxury)</option>
                                <option value="creative-star">Orbital Star (Agency)</option>
                                <option value="crown">Royal Crown (Prestige)</option>
                                <option value="infinity">Infinity Loops (Endless)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                                <Type size={12} />
                                <span>Typography Font</span>
                            </label>
                            <select
                                value={selectedFontFamily}
                                onChange={(e) => setSelectedFontFamily(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-750 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm"
                            >
                                {FONTS.map(f => (
                                    <option key={f.family} value={f.family}>
                                        {f.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Custom Image Upload */}
                    <div className="space-y-2 border border-slate-100 dark:border-slate-800 rounded-3xl p-4">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Upload size={12} />
                            <span>Upload Custom Logo Image</span>
                        </label>

                        {!customImageUrl ? (
                            <label className="flex flex-col items-center justify-center gap-2 py-5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl cursor-pointer hover:border-indigo-400 transition bg-slate-50/50 dark:bg-slate-900/50">
                                <Upload className="w-6 h-6 text-slate-400" />
                                <span className="text-xs text-slate-500 font-semibold">Click to upload PNG, JPG, WEBP</span>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                            </label>
                        ) : (
                            <div className="space-y-3">
                                {/* Image preview */}
                                <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22><rect width=%2210%22 height=%2210%22 fill=%22%23e2e8f0%22 opacity=%220.3%22/><rect x=%2210%22 y=%2210%22 width=%2210%22 height=%2210%22 fill=%22%23e2e8f0%22 opacity=%220.3%22/></svg>')]">
                                    <img
                                        src={bgRemovedImageUrl ?? customImageUrl}
                                        alt="Custom logo"
                                        className="w-full h-32 object-contain"
                                    />
                                    <button
                                        onClick={clearCustomImage}
                                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                                        title="Remove image"
                                    >
                                        <X size={12} />
                                    </button>
                                    {bgRemovalStatus === 'done' && (
                                        <span className="absolute bottom-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">BG Removed ✓</span>
                                    )}
                                </div>

                                {/* BG Removal actions */}
                                <div className="flex gap-2">
                                    {bgRemovalStatus !== 'done' && (
                                        <button
                                            onClick={handleRemoveBg}
                                            disabled={bgRemovalStatus === 'processing'}
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-xs font-bold rounded-xl transition"
                                        >
                                            {bgRemovalStatus === 'processing' ? (
                                                <><Loader2 className="w-4 h-4 animate-spin" /><span>Removing BG…</span></>
                                            ) : (
                                                <><Eraser className="w-4 h-4" /><span>Remove Background (AI)</span></>
                                            )}
                                        </button>
                                    )}
                                    <label className="flex items-center gap-1.5 py-2.5 px-3 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition">
                                        <Upload size={12} />
                                        <span>Change</span>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {bgRemovalStatus === 'error' && (
                                    <p className="text-xs text-red-500 font-semibold">AI removal failed. Please try another image.</p>
                                )}
                                {bgRemovalStatus === 'processing' && (
                                    <p className="text-[10px] text-slate-400">First-time use downloads a ~40MB AI model. Subsequent runs are fast.</p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Gradient Themes */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1">
                            <Palette size={12} />
                            <span>Branding Gradient Color Scheme</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {COLOR_THEMES.map(theme => (
                                <button
                                    key={theme.id}
                                    onClick={() => setSelectedThemeId(theme.id)}
                                    type="button"
                                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition ${
                                        selectedThemeId === theme.id 
                                            ? 'border-indigo-600 bg-indigo-50/20 dark:bg-indigo-950/20' 
                                            : 'border-slate-100 dark:border-slate-900 hover:border-slate-200'
                                    }`}
                                >
                                    <span 
                                        className="w-5 h-5 rounded-full block shrink-0" 
                                        style={{ background: `linear-gradient(135deg, ${theme.start}, ${theme.end})` }}
                                    />
                                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">{theme.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Layouts and Backgrounds */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Logo Layout Alignment
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {([
                                    { id: 'top',       label: 'Icon Top' },
                                    { id: 'left',      label: 'Icon Left' },
                                    { id: 'badge',     label: 'Badge' },
                                    { id: 'icon-only', label: 'Icon Only' },
                                    { id: 'text-only', label: 'Text Only' },
                                ] as const).map(({ id: mode, label }) => (
                                    <button
                                        key={mode}
                                        onClick={() => setLayout(mode)}
                                        type="button"
                                        className={`py-2 px-1 rounded-xl border text-[10px] font-bold uppercase transition truncate ${
                                            layout === mode 
                                                ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600 dark:text-indigo-400' 
                                                : 'border-slate-100 dark:border-slate-900 text-slate-400 hover:border-slate-200'
                                        }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Canvas Background Color
                            </label>
                            <div className="grid grid-cols-4 gap-1.5">
                                {(['dark', 'light', 'transparent', 'gradient'] as const).map(mode => (
                                    <button
                                        key={mode}
                                        onClick={() => setBgMode(mode)}
                                        type="button"
                                        className={`py-2 px-1 rounded-xl border text-[10px] font-bold uppercase transition truncate ${
                                            bgMode === mode 
                                                ? 'border-indigo-600 bg-indigo-50/30 text-indigo-600 dark:text-indigo-400' 
                                                : 'border-slate-100 dark:border-slate-900 text-slate-400 hover:border-slate-200'
                                        }`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tight Fit / Remove Canvas Padding */}
                    <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl">
                        <div>
                            <span className="text-xs font-bold text-slate-800 dark:text-white block">Tight Fit / Remove Canvas Padding</span>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500">Crop SVG/PNG viewBox directly to the icon and text boundaries</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={noCanvasPadding}
                                onChange={(e) => setNoCanvasPadding(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-650"></div>
                        </label>
                    </div>

                    {/* Fine adjustments */}
                    <div className="space-y-4 pt-2 border-t border-slate-150 dark:border-slate-900">
                        <div className="flex items-center gap-1.5">
                            <Sliders size={13} className="text-slate-400" />
                            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Scale Customizations</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                    <span>Icon Graphic Size</span>
                                    <span>{iconSize}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={50}
                                    max={140}
                                    value={iconSize}
                                    onChange={(e) => setIconSize(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                    <span>Brand Font Size</span>
                                    <span>{fontSize}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={20}
                                    max={65}
                                    value={fontSize}
                                    onChange={(e) => setFontSize(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                    <span>Tagline Font Size</span>
                                    <span>{taglineSize}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={8}
                                    max={24}
                                    value={taglineSize}
                                    onChange={(e) => setTaglineSize(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between text-xs font-semibold text-slate-500">
                                    <span>Icon Vertical Offset</span>
                                    <span>{iconOffset}px</span>
                                </div>
                                <input
                                    type="range"
                                    min={-60}
                                    max={60}
                                    value={iconOffset}
                                    onChange={(e) => setIconOffset(Number(e.target.value))}
                                    className="w-full accent-indigo-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Panel (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Rendered Container */}
                    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 flex flex-col items-center">
                        <div 
                            className="w-full aspect-[4/3] rounded-3xl relative overflow-hidden flex items-center justify-center border border-slate-100 dark:border-slate-900 shadow-inner"
                            style={getPreviewBgStyle()}
                        >
                            
                            {/* Live SVG Vector Rendering */}
                            <svg
                                id="njtools-logo-svg"
                                ref={svgRef}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox={getViewBox()}
                                className="w-full h-full object-contain"
                            >
                                <defs>
                                    <style>
                                        {`@import url('${activeFont.importUrl}');`}
                                    </style>
                                    <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor={activeTheme.start} />
                                        <stop offset="100%" stopColor={activeTheme.end} />
                                    </linearGradient>
                                    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#0f172a" />
                                        <stop offset="100%" stopColor="#1e1e38" />
                                    </linearGradient>
                                </defs>

                                {/* Background */}
                                {bgMode !== 'transparent' && (() => {
                                    const [x, y, w, h] = getViewBox().split(' ').map(Number);
                                    return <rect x={x} y={y} width={w} height={h} fill={getBgColor()} />;
                                })()}

                                 {/* Main graphic components */}
                                 {layout === 'top' && (
                                     <g>
                                         {/* Icon */}
                                         <g transform={`translate(${400 - iconSize / 2}, ${230 - iconSize / 2 + iconOffset})`}>
                                             <svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
                                                 {renderIconGraphic(selectedIconId)}
                                             </svg>
                                         </g>
                                         {/* Text */}
                                         <text
                                             x="400"
                                             y={380 + textOffset}
                                             textAnchor="middle"
                                             fill={getTextColor()}
                                             fontFamily={activeFont.family}
                                             fontSize={fontSize}
                                             fontWeight="900"
                                             letterSpacing="1"
                                         >
                                             {companyName}
                                         </text>
                                         {/* Tagline */}
                                         {tagline && (
                                             <text
                                                 x="400"
                                                 y={425 + textOffset}
                                                 textAnchor="middle"
                                                 fill={getTaglineColor()}
                                                 fontFamily="Montserrat"
                                                 fontSize={taglineSize}
                                                 fontWeight="700"
                                                 letterSpacing="5"
                                             >
                                                 {tagline}
                                             </text>
                                         )}
                                     </g>
                                 )}
 
                                 {layout === 'left' && (
                                     <g transform="translate(10, 0)">
                                         {/* Icon */}
                                         <g transform={`translate(${160 - iconSize / 2}, ${300 - iconSize / 2 + iconOffset})`}>
                                             <svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
                                                 {renderIconGraphic(selectedIconId)}
                                             </svg>
                                         </g>
                                         {/* Company Name */}
                                         <text
                                             x={190 + iconSize / 2}
                                             y={295 + textOffset}
                                             textAnchor="start"
                                             fill={getTextColor()}
                                             fontFamily={activeFont.family}
                                             fontSize={fontSize}
                                             fontWeight="900"
                                             letterSpacing="0.5"
                                             dominantBaseline="middle"
                                         >
                                             {companyName}
                                         </text>
                                         {/* Tagline */}
                                         {tagline && (
                                             <text
                                                 x={192 + iconSize / 2}
                                                 y={340 + textOffset}
                                                 textAnchor="start"
                                                 fill={getTaglineColor()}
                                                 fontFamily="Montserrat"
                                                 fontSize={taglineSize}
                                                 fontWeight="700"
                                                 letterSpacing="4"
                                             >
                                                 {tagline}
                                             </text>
                                         )}
                                     </g>
                                 )}
 
                                 {layout === 'badge' && (
                                     <g>
                                         {/* Outer crest frame */}
                                         <path 
                                             d="M400 90 L580 150 V370 C580 470, 400 540, 400 540 C400 540, 220 470, 220 370 V150 Z" 
                                             fill="none" 
                                             stroke="url(#logoGrad)" 
                                             strokeWidth="6" 
                                             opacity="0.85" 
                                         />
                                         <g transform={`translate(${400 - iconSize / 2}, ${240 - iconSize / 2 + iconOffset})`}>
                                             <svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
                                                 {renderIconGraphic(selectedIconId)}
                                             </svg>
                                         </g>
                                         <text
                                             x="400"
                                             y={380 + textOffset}
                                             textAnchor="middle"
                                             fill={getTextColor()}
                                             fontFamily={activeFont.family}
                                             fontSize={fontSize - 4}
                                             fontWeight="900"
                                             letterSpacing="1"
                                         >
                                             {companyName}
                                         </text>
                                         {tagline && (
                                             <text
                                                 x="400"
                                                 y={420 + textOffset}
                                                 textAnchor="middle"
                                                 fill={getTaglineColor()}
                                                 fontFamily="Montserrat"
                                                 fontSize={taglineSize - 2}
                                                 fontWeight="700"
                                                 letterSpacing="5"
                                             >
                                                 {tagline}
                                             </text>
                                         )}
                                     </g>
                                 )}

                                 {/* Icon Only — no text at all */}
                                 {layout === 'icon-only' && (
                                     <g transform={`translate(${400 - iconSize / 2}, ${300 - iconSize / 2 + iconOffset})`}>
                                         <svg width={iconSize} height={iconSize} viewBox="0 0 100 100">
                                             {renderIconGraphic(selectedIconId)}
                                         </svg>
                                     </g>
                                 )}

                                 {/* Text Only — no icon at all */}
                                 {layout === 'text-only' && (
                                     <g>
                                         <text
                                             x="400"
                                             y={285 + textOffset}
                                             textAnchor="middle"
                                             fill={getTextColor()}
                                             fontFamily={activeFont.family}
                                             fontSize={fontSize + 8}
                                             fontWeight="900"
                                             letterSpacing="2"
                                         >
                                             {companyName}
                                         </text>
                                         {tagline && (
                                             <text
                                                 x="400"
                                                 y={340 + textOffset}
                                                 textAnchor="middle"
                                                 fill={getTaglineColor()}
                                                 fontFamily="Montserrat"
                                                 fontSize={taglineSize + 2}
                                                 fontWeight="700"
                                                 letterSpacing="8"
                                             >
                                                 {tagline}
                                             </text>
                                         )}
                                     </g>
                                 )}
                            </svg>
                        </div>
                    </div>

                     {/* Exporters and copy actions */}
                    <div className="bg-white dark:bg-slate-950 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl dark:shadow-none space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">Export Brand Assets</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                                onClick={downloadSvg}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-indigo-500/10 text-sm"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download SVG Vector</span>
                            </button>
                            <button
                                onClick={downloadPng}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/10 text-sm"
                            >
                                <ImageIcon className="w-4 h-4" />
                                <span>Download High-Res PNG</span>
                            </button>
                        </div>

                        {/* Download BG-removed image separately */}
                        {bgRemovedImageUrl && (
                            <a
                                href={bgRemovedImageUrl}
                                download="logo-icon-no-bg.png"
                                className="w-full flex items-center justify-center gap-2 py-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl transition text-sm"
                            >
                                <Download className="w-4 h-4" />
                                <span>Download Icon (Transparent BG)</span>
                            </a>
                        )}

                        <button
                            onClick={copySvgCode}
                            className="w-full border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 dark:text-slate-300 py-3 rounded-2xl flex items-center justify-center gap-2 transition text-xs font-bold"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    <span className="text-green-500">SVG Code Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    <span>Copy Clean SVG Vector Code</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Design tip box */}
                    <div className="bg-slate-50 dark:bg-slate-900/30 p-5 rounded-3xl border border-slate-100 dark:border-slate-900 flex gap-3 text-xs text-slate-500 leading-relaxed">
                        <HelpCircle className="w-5 h-5 text-indigo-500 shrink-0" />
                        <div>
                            <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Design Recommendation</span>
                            Use high contrast backgrounds for presentation (like Dark Mode) but export using the <strong className="text-indigo-600 dark:text-indigo-400">Transparent</strong> canvas options when inserting your logo into websites or pitch decks.
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
};

export default LogoGenerator;
