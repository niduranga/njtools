import React, { useState, type ChangeEvent } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { ShieldCheck, RefreshCw, Smartphone, User } from 'lucide-react';

type Platform = 'fb-cover' | 'li-cover' | 'yt-cover' | 'tw-header';

const SafeAreaChecker: React.FC = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [activePlatform, setActivePlatform] = useState<Platform>('fb-cover');

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const platforms = [
        { id: 'fb-cover', name: 'Facebook Cover', ratio: 'aspect-[16/6]', desc: 'Shows mobile vs desktop overlap' },
        { id: 'li-cover', name: 'LinkedIn Cover', ratio: 'aspect-[4/1]', desc: 'Check profile pic obstruction' },
        { id: 'yt-cover', name: 'YouTube Header', ratio: 'aspect-[16/9]', desc: 'TV, Desktop & Mobile safe zones' },
        { id: 'tw-header', name: 'Twitter/X Header', ratio: 'aspect-[3/1]', desc: 'Bottom-left profile avatar' },
    ];

    return (
        <ToolLayout
            title="Social Media Safe-Area Checker"
            description="Visualize how your cover photos will look across devices. Avoid critical content being hidden by profile pictures or UI elements."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">UX-Aware Design Validation</h2>
                        <p className="leading-relaxed text-sm">
                            Platform-specific UI elements often obscure critical parts of your branding assets. Our <strong className="text-blue-600 dark:text-blue-400">Social Media Safe-Area Checker</strong> provides a real-time high-fidelity overlay of profile picture placements and responsive cropping zones for Facebook, LinkedIn, YouTube, and X (Twitter).
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Responsive Bounds</h3>
                            <p className="text-sm leading-relaxed">
                                Visualize how "Mobile-Only" crops affect your horizontal compositions. We simulate the <strong className="text-slate-900 dark:text-white">viewport transitions</strong> that occur between desktop monitors and handheld devices.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[2rem]">
                            <h3 className="text-xs font-black uppercase text-blue-600 mb-3 tracking-[0.2em]">Avatar Obstruction</h3>
                            <p className="text-sm leading-relaxed">
                                Avoid "Logo Clipping" by checking the precise coordinates of circular profile avatars. Ensure your <strong className="text-slate-900 dark:text-white">Call-to-Action (CTA)</strong> text remains legible on all screens.
                            </p>
                        </div>
                    </div>

                    <section className="bg-slate-900 dark:bg-black p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <ShieldCheck size={100} className="text-white" />
                        </div>
                        <h3 className="text-lg font-black text-white mb-2 italic tracking-tight">Multi-Platform Precision:</h3>
                        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                            Our simulator handles complex templates like <strong className="text-blue-500 text-xs">YouTube TV vs. Mobile</strong> safe zones and the unique bottom-left offset of the <strong className="text-blue-500 text-xs">LinkedIn Profile Avatar</strong>, saving you hours of trial-and-error uploads.
                        </p>
                    </section>

                    <section className="mt-12 space-y-6 border-t border-slate-100 dark:border-slate-800 pt-10 text-sm">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">Precision Engineering for Visual Assets</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs">Responsive Viewport Simulation</h4>
                                <p className="leading-relaxed">
                                    NJTools utilizes <strong className="text-slate-900 dark:text-white">CSS Aspect-Ratio containers</strong> to accurately represent the varied dimensions of desktop and mobile viewports. This simulation ensures that your <strong className="text-blue-600">Visual Anchor Points</strong> are not lost during platform-level responsive cropping.
                                </p>
                            </div>
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs">Component-Level Mockups</h4>
                                <p className="leading-relaxed">
                                    By overlaying dynamic <strong className="text-slate-900 dark:text-white">Profile Avatar Placeholders</strong>, we calculate the exact obstruction zones. This prevent "Avatar Overlap" where your company's tagline or face is hidden by the user's profile picture.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Pro Engineering Note */}
                    <div className="mt-10 p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <div className="relative z-10">
                            <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase underline decoration-blue-600">Architectural Note</h3>
                            <p className="text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                                "Unlike standard image editors, NJTools provides an <strong className="text-white">On-Device UI Simulation</strong>. We use browser-native `URL.createObjectURL` to handle your high-res exports locally, ensuring that sensitive marketing assets never touch a remote server before they are ready for official release."
                            </p>
                        </div>
                        <div className="absolute -top-5 -right-5 opacity-10 rotate-12">
                            <ShieldCheck size={180} />
                        </div>
                    </div>
                </div>
            }
        >
            <Helmet>
                <title>Social Media Safe Area Checker | Cover Photo Preview | NJTools</title>
                <meta name="description" content="Test your Facebook, LinkedIn, and YouTube cover photos against UI overlays and profile picture obstructions. Optimize for mobile & desktop safe zones instantly." />
                <meta name="keywords" content="safe area checker, social media cover preview, facebook cover safe zone, linkedin header tester, youtube banner safe area, social media mockup tool, NJTools, Niduranga Jayarathna" />
                <link rel="canonical" href="https://njtools.xyz/tools/safe-area-checker/" />

                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://njtools.xyz/tools/safe-area-checker/" />
                <meta property="og:title" content="Social Media Safe Area Checker | UI Overlays | NJTools" />
                <meta property="og:description" content="Stop guessing! Preview your cover designs with live UI overlays for Facebook, LinkedIn, and YouTube." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://njtools.xyz/tools/safe-area-checker/" />
                <meta property="twitter:title" content="Social Media Safe Area Checker | UI Overlays | NJTools" />
                <meta property="twitter:description" content="Preview your cover designs with live UI overlays for Facebook, LinkedIn, and YouTube." />
                <meta property="twitter:image" content="https://njtools.xyz/og-image.png/" />

                {/* Software Application Schema */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Social Media Safe-Area Checker",
                        "operatingSystem": "Web",
                        "applicationCategory": "DesignApplication",
                        "featureList": [
                            "Facebook Cover Overlay",
                            "LinkedIn Header Safe-Zone",
                            "YouTube TV/Mobile Comparison",
                            "Twitter/X Header Preview"
                        ],
                        "offers": {
                            "@type": "Offer",
                            "price": "0",
                            "priceCurrency": "USD"
                        },
                        "author": {
                            "@type": "Person",
                            "name": "Niduranga Jayarathna"
                        }
                    })}
                </script>
            </Helmet>

            <div className="max-w-5xl mx-auto space-y-8">
                {/* Platform Selector */}
                <div className="flex flex-wrap justify-center gap-3">
                    {platforms.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setActivePlatform(p.id as Platform)}
                            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
                                activePlatform === p.id
                                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/30 scale-105'
                                    : 'bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>

                {!previewUrl ? (
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-24 text-center bg-white dark:bg-slate-950 transition-all hover:border-blue-500 group relative">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-6 bg-slate-900 dark:bg-blue-600 rounded-3xl text-white shadow-2xl group-hover:rotate-6 transition-transform">
                                <ShieldCheck size={40} />
                            </div>
                            <h3 className="text-2xl font-black dark:text-white uppercase italic tracking-tighter">Upload Your Design</h3>
                            <p className="text-slate-500 font-bold text-sm italic">Visualize UI overlaps before you publish</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Preview Container */}
                        <div className={`relative w-full max-w-4xl mx-auto overflow-hidden bg-slate-200 dark:bg-slate-800 rounded-[2.5rem] shadow-2xl border-8 border-white dark:border-slate-900 ${platforms.find(p => p.id === activePlatform)?.ratio}`}>
                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />

                            {/* DYNAMIC OVERLAYS BASED ON PLATFORM */}

                            {/* Facebook Cover Overlay */}
                            {activePlatform === 'fb-cover' && (
                                <>
                                    <div className="absolute bottom-4 left-8 w-40 h-40 rounded-full border-4 border-white dark:border-slate-900 bg-slate-500/20 backdrop-blur-sm flex items-center justify-center">
                                        <User className="text-white/50" size={48} />
                                    </div>
                                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-black/40 to-transparent flex items-end p-8">
                                        <div className="h-6 w-48 bg-white/30 rounded-lg backdrop-blur-md" />
                                    </div>
                                </>
                            )}

                            {/* LinkedIn Cover Overlay */}
                            {activePlatform === 'li-cover' && (
                                <div className="absolute -bottom-10 left-10 w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-slate-500/40 backdrop-blur-sm" />
                            )}

                            {/* Twitter/X Header Overlay */}
                            {activePlatform === 'tw-header' && (
                                <div className="absolute -bottom-12 left-8 w-36 h-36 rounded-full border-8 border-white dark:border-slate-900 bg-slate-500/40 backdrop-blur-md" />
                            )}

                            {/* YouTube Header Overlay (Safe Zones) */}
                            {activePlatform === 'yt-cover' && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-full h-1/3 border-y-2 border-dashed border-white/50 bg-white/5 flex items-center justify-center">
                                        <div className="w-1/2 h-full border-x-2 border-dashed border-white/50 flex items-center justify-center text-white/30 font-black text-[10px] uppercase tracking-[0.5em]">
                                            Mobile Safe Area
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            <button onClick={() => setPreviewUrl(null)} className="flex items-center gap-2 bg-slate-900 dark:bg-white dark:text-black text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                                <RefreshCw size={18} /> Re-upload
                            </button>
                        </div>

                        {/* Device Toggles Hint */}
                        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-4xl border border-blue-100 dark:border-blue-900/30 flex items-center gap-4">
                            <div className="p-3 bg-blue-600 rounded-2xl text-white">
                                <Smartphone size={24} />
                            </div>
                            <p className="text-sm font-bold text-blue-900 dark:text-blue-300">
                                <span className="block uppercase text-[10px] tracking-widest opacity-70">Designer Pro-tip:</span>
                                Always keep your logos and text within the center "Mobile Safe" zones to ensure visibility across all app versions.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default SafeAreaChecker;