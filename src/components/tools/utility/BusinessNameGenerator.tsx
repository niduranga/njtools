import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from "react-helmet-async";
import ToolLayout from '../../layout/ToolLayout.tsx';
import { 
    Sparkles, 
    Globe, 
    CheckCircle2, 
    XCircle, 
    Loader2, 
    Copy, 
    Check, 
    ExternalLink, 
    Filter, 
    RotateCcw,
    Briefcase,
    AlertTriangle
} from 'lucide-react';

interface BusinessCategory {
    id: string;
    name: string;
    description: string;
    prefixes: string[];
    suffixes: string[];
    roots: string[];
}

const BUSINESS_CATEGORIES: BusinessCategory[] = [
    {
        id: 'tech-software',
        name: 'Tech & Software',
        description: 'Startups, SaaS, applications, and technology platforms.',
        prefixes: ['cyber', 'sync', 'tek', 'net', 'bit', 'byte', 'cloud', 'data', 'apex', 'nova', 'core', 'logic', 'quantum', 'intelli', 'meta', 'velo', 'zenith', 'vector'],
        suffixes: ['ly', 'ify', 'io', 'wave', 'hub', 'grid', 'stack', 'flow', 'pulse', 'labs', 'sys', 'tech', 'link', 'loop', 'nest', 'base', 'shift'],
        roots: ['dev', 'code', 'soft', 'app', 'node', 'scale', 'launch', 'path', 'flow', 'stack', 'byte', 'matrix']
    },
    {
        id: 'health-wellness',
        name: 'Health & Wellness',
        description: 'Fitness, clinics, organic products, and mental health.',
        prefixes: ['vital', 'pure', 'omni', 'bio', 'fit', 'life', 'zen', 'well', 'care', 'heal', 'aura', 'novo', 'eco', 'natura', 'sol', 'prime'],
        suffixes: ['ity', 'aura', 'well', 'life', 'spa', 'path', 'zen', 'vibe', 'bloom', 'root', 'mind', 'ease', 'fit', 'medic', 'clinic'],
        roots: ['heal', 'vital', 'life', 'body', 'mind', 'pure', 'green', 'leaf', 'breath', 'force', 'spirit', 'pulse']
    },
    {
        id: 'ecommerce-retail',
        name: 'E-commerce & Retail',
        description: 'Online shops, boutiques, retail stores, and marketplaces.',
        prefixes: ['cart', 'shop', 'deal', 'buy', 'trend', 'prime', 'smart', 'swift', 'lux', 'choice', 'snap', 'flash', 'merch', 'bold', 'direct', 'vogue'],
        suffixes: ['cart', 'mart', 'shop', 'hub', 'vault', 'box', 'spot', 'zone', 'avenue', 'bazaar', 'store', 'outlet', 'basket', 'lane'],
        roots: ['sale', 'deal', 'brand', 'trend', 'wear', 'market', 'shelf', 'pack', 'ship', 'box', 'rack', 'style']
    },
    {
        id: 'creative-agency',
        name: 'Creative & Agency',
        description: 'Marketing, design, branding, and copywriting services.',
        prefixes: ['muse', 'canvas', 'prism', 'craft', 'vivid', 'bold', 'epic', 'pixel', 'spark', 'neon', 'arc', 'echo', 'helix', 'phase', 'motif', 'nexus'],
        suffixes: ['creative', 'studio', 'design', 'media', 'agency', 'craft', 'work', 'lab', 'forge', 'draft', 'line', 'wave', 'collective', 'house'],
        roots: ['brand', 'design', 'spark', 'pixel', 'media', 'idea', 'ink', 'brush', 'lens', 'print', 'frame', 'sketch']
    },
    {
        id: 'finance-consulting',
        name: 'Finance & Consulting',
        description: 'Wealth advisory, investments, accounting, and legal services.',
        prefixes: ['apex', 'capital', 'trust', 'fort', 'valu', 'safe', 'ledger', 'asset', 'fin', 'equity', 'legal', 'pact', 'veritas', 'shield', 'vault', 'prime'],
        suffixes: ['cap', 'trust', 'fund', 'vest', 'guard', 'partners', 'group', 'advisor', 'smart', 'check', 'wise', 'assoc', 'consult', 'shield'],
        roots: ['wealth', 'fund', 'legal', 'pact', 'value', 'grow', 'audit', 'tax', 'plan', 'chart', 'shield', 'trust']
    },
    {
        id: 'food-hospitality',
        name: 'Food & Hospitality',
        description: 'Restaurants, cafes, hotels, catering, and travel guides.',
        prefixes: ['taste', 'bite', 'crave', 'fresh', 'sweet', 'savory', 'chef', 'dine', 'urban', 'wild', 'green', 'gold', 'table', 'vista', 'luxe'],
        suffixes: ['kitchen', 'cafe', 'bistro', 'grill', 'eats', 'table', 'house', 'inn', 'hotel', 'stay', 'escape', 'travel', 'voyage', 'dish'],
        roots: ['cook', 'bake', 'dish', 'plate', 'stay', 'trip', 'tours', 'spiced', 'grain', 'bean', 'roast', 'feast']
    }
];

interface NameStyle {
    id: string;
    name: string;
    description: string;
}

const NAME_STYLES: NameStyle[] = [
    { id: 'modern-blend', name: 'Modern Blend', description: 'Combines terms with stylish suffixes' },
    { id: 'compound', name: 'Compound Name', description: 'Glues two category keywords together' },
    { id: 'latinate', name: 'Latinate/Classical', description: 'Creates premium, classical-sounding roots' },
    { id: 'alternative', name: 'Alternative Spelling', description: 'Modern, playful spelling modifications' },
    { id: 'abstract', name: 'Abstract Brandable', description: 'Short, catchy, completely custom names' }
];

type DomainStatus = 'idle' | 'checking' | 'available' | 'taken' | 'error';

const checkDomainAvailability = async (domainName: string): Promise<DomainStatus> => {
    const cleanDomain = domainName.toLowerCase().trim();
    try {
        // Step 1: Query Verisign RDAP (Official, CORS-enabled for .com)
        const rdapUrl = `https://rdap.verisign.com/com/v1/domain/${encodeURIComponent(cleanDomain)}`;
        const rdapResponse = await fetch(rdapUrl);
        if (rdapResponse.status === 404) {
            return 'available';
        }
        if (rdapResponse.status === 200) {
            return 'taken';
        }
        throw new Error('RDAP status not conclusive');
    } catch {
        // Step 2: Fallback to Cloudflare DNS-over-HTTPS (DoH) JSON API
        try {
            const dohUrl = `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(cleanDomain)}&type=SOA`;
            const dohResponse = await fetch(dohUrl, {
                headers: {
                    'accept': 'application/dns-json'
                }
            });
            if (dohResponse.ok) {
                const json = await dohResponse.json();
                // Status 3 means NXDOMAIN (no DNS records at all -> likely unregistered)
                if (json.Status === 3) {
                    return 'available';
                }
                return 'taken';
            }
        } catch (dohErr) {
            console.error('DNS-over-HTTPS fallback check failed:', dohErr);
        }
        return 'error';
    }
};

const generateNames = (
    category: BusinessCategory,
    style: string,
    seed: string,
    count: number = 12
): string[] => {
    const names = new Set<string>();
    const seedWord = seed.trim().toLowerCase().replace(/[^a-z]/g, '');

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    const getRandomElement = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    const generateSyllableWord = (): string => {
        const onsets = ['b', 'c', 'd', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'z', 'ch', 'sh', 'th', 'sp', 'st', 'pr', 'br', 'tr', 'gl', 'fl', 'nix', 'vex', 'pyr'];
        const nuclei = ['a', 'e', 'i', 'o', 'u', 'ae', 'ea', 'io', 'ou', 'y'];
        const codas = ['x', 'z', 'n', 'l', 'r', 's', 't', 'd', 'g', 'k', 'm', 'p', 'ck', 'nt', 'rt', 'st', 'th', 'nd'];

        const s1_onset = getRandomElement(onsets);
        const s1_nucleus = getRandomElement(nuclei);
        const s1_coda = Math.random() > 0.3 ? getRandomElement(codas) : '';

        const s2_onset = getRandomElement(onsets);
        const s2_nucleus = getRandomElement(nuclei);
        const s2_coda = Math.random() > 0.4 ? getRandomElement(codas) : '';

        return s1_onset + s1_nucleus + s1_coda + s2_onset + s2_nucleus + s2_coda;
    };

    const getPrimaryWord = (): string => {
        if (seedWord) return seedWord;
        return getRandomElement(category.roots);
    };

    let attempts = 0;
    const maxAttempts = 300;

    while (names.size < count && attempts < maxAttempts) {
        attempts++;
        let name = '';
        const base = getPrimaryWord();

        if (attempts > 150) {
            const fallbackSuffixes = ['io', 'co', 'go', 'now', 'app', 'hq', 'lab', 'hub', 'link', 'space', 'web', 'net'];
            name = cap(base) + getRandomElement(fallbackSuffixes);
            if (names.has(name)) {
                name = cap(base) + getRandomElement(fallbackSuffixes) + Math.floor(Math.random() * 10);
            }
        } else {
            switch (style) {
                case 'modern-blend': {
                    const suffix = getRandomElement(category.suffixes);
                    const infixes = ['o', 'i', 'a', 'u', 'e', ''];
                    const infix = seedWord ? '' : getRandomElement(infixes);
                    name = cap(base) + infix + suffix;
                    break;
                }
                case 'compound': {
                    const customCompounds = [
                        'Forge', 'Grid', 'Pulse', 'Spire', 'Trellis', 'Crest', 'Ridge', 'Beacon', 'Canopy', 'Pinnacle',
                        'Vortex', 'Helix', 'Horizon', 'Vista', 'Nest', 'Vault', 'Cove', 'Oasis', 'Drift', 'Stride',
                        'Sentry', 'Hedge', 'Draft', 'Rift', 'Loom', 'Quarry', 'Flint', 'Apex', 'Sienna', 'Bramble'
                    ];
                    const second = getRandomElement(customCompounds.concat(category.suffixes));
                    
                    if (Math.random() > 0.5 && !seedWord) {
                        name = cap(getRandomElement(category.prefixes)) + cap(second.toLowerCase());
                    } else {
                        name = cap(base) + cap(second.toLowerCase());
                    }
                    break;
                }
                case 'latinate': {
                    const endings = ['ia', 'ica', 'us', 'ium', 'ex', 'is', 'a', 'ora', 'ara', 'ea', 'entia', 'aris', 'onix', 'isys', 'eos', 'aero', 'ux'];
                    const ending = getRandomElement(endings);
                    let truncated = base;
                    if (/[aeiou]$/.test(truncated)) {
                        truncated = truncated.slice(0, -1);
                    }
                    name = cap(truncated) + ending;
                    break;
                }
                case 'alternative': {
                    let altBase = base;
                    altBase = altBase.replace(/c([aeiou])/g, 'k$1');
                    altBase = altBase.replace(/c$/g, 'k');
                    altBase = altBase.replace(/([aeiou])s$/g, '$1z');
                    altBase = altBase.replace(/ph/g, 'f');
                    altBase = altBase.replace(/y/g, 'i');
                    altBase = altBase.replace(/sh/g, 'x');
                    altBase = altBase.replace(/oo/g, 'u');
                    
                    const endings = ['q', 'x', 'z', 'ix', 'ox', 'y', 'r'];
                    name = cap(altBase) + getRandomElement(endings);
                    break;
                }
                case 'abstract': {
                    const syllWord = generateSyllableWord();
                    if (seedWord) {
                        name = cap(seedWord.slice(0, Math.ceil(seedWord.length / 2))) + syllWord.slice(Math.floor(syllWord.length / 3));
                    } else {
                        name = cap(syllWord);
                    }
                    break;
                }
                default:
                    name = cap(base);
            }
        }

        name = name.replace(/([a-zA-Z])\1{2,}/g, '$1$1');
        name = name.replace(/([aeiou])\1/gi, '$1');
        
        const minLength = seedWord && seedWord.length < 4 ? 3 : 5;
        if (name.length >= minLength && name.length <= 15) {
            names.add(name);
        }
    }

    return Array.from(names);
};

const BusinessNameGenerator: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState('tech-software');
    const [seed, setSeed] = useState('');
    const [selectedStyleId, setSelectedStyleId] = useState('modern-blend');
    const [generatedNames, setGeneratedNames] = useState<string[]>(() => 
        generateNames(BUSINESS_CATEGORIES[0], 'modern-blend', '')
    );
    const [domainStatuses, setDomainStatuses] = useState<Record<string, DomainStatus>>({});
    const [copiedName, setCopiedName] = useState<string | null>(null);
    const [filterOnlyAvailable, setFilterOnlyAvailable] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const activeCategory = useMemo(() => {
        return BUSINESS_CATEGORIES.find(c => c.id === selectedCategoryId) || BUSINESS_CATEGORIES[0];
    }, [selectedCategoryId]);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Clear previous checks
        setDomainStatuses({});
        
        // Add a slight artificial delay for loading feedback
        setTimeout(() => {
            const names = generateNames(activeCategory, selectedStyleId, seed);
            setGeneratedNames(names);
            setIsGenerating(false);
        }, 300);
    };



    // Staggered checking loop for domain availability
    useEffect(() => {
        if (generatedNames.length === 0) return;

        let isCancelled = false;

        const checkAvailabilitySequentially = async () => {
            // Setup statuses to idle
            const initialStatuses: Record<string, DomainStatus> = {};
            generatedNames.forEach(name => {
                initialStatuses[name] = 'idle';
            });
            setDomainStatuses(initialStatuses);

            // Stagger check
            for (const name of generatedNames) {
                if (isCancelled) break;

                setDomainStatuses(prev => ({ ...prev, [name]: 'checking' }));
                
                const domain = `${name.toLowerCase()}.com`;
                const status = await checkDomainAvailability(domain);

                if (isCancelled) break;
                setDomainStatuses(prev => ({ ...prev, [name]: status }));

                // Delay next check by 200ms to preserve rate limits
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        };

        checkAvailabilitySequentially();

        return () => {
            isCancelled = true;
        };
    }, [generatedNames]);

    const copyToClipboard = (text: string, identifier: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedName(identifier);
            setTimeout(() => setCopiedName(null), 2000);
        }).catch(err => {
            console.error('Failed to copy name:', err);
        });
    };

    const filteredNames = useMemo(() => {
        if (!filterOnlyAvailable) return generatedNames;
        return generatedNames.filter(name => domainStatuses[name] === 'available');
    }, [generatedNames, domainStatuses, filterOnlyAvailable]);

    const isCheckingActive = useMemo(() => {
        return generatedNames.some(name => {
            const status = domainStatuses[name];
            return !status || status === 'idle' || status === 'checking';
        });
    }, [generatedNames, domainStatuses]);

    return (
        <ToolLayout
            title="Business Name Generator"
            description="Generate creative, memorable business name ideas tailored to your industry and instantly verify .com domain availability."
            seoContent={
                <div className="space-y-8 text-slate-700 dark:text-slate-300 font-medium">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 italic tracking-tight uppercase">How to Choose a Great Brand Name</h2>
                        <p className="leading-relaxed text-sm">
                            A powerful business name should be easy to pronounce, memorable, and available as a <strong className="text-indigo-600 dark:text-indigo-400">.com domain</strong>. This tool utilizes custom linguistics rules, merging prefixes, suffixes, and sector-specific roots to produce beautiful brand options.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl">
                            <h3 className="text-xs font-black uppercase text-indigo-600 mb-3 tracking-widest">Instant Domain Lookup</h3>
                            <p className="text-sm leading-relaxed">
                                Our tool conducts direct browser queries against the Verisign RDAP registry database. Unlike standard whois portals that trigger registrar domain front-running, our direct query process is secure, private, and client-side.
                            </p>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-3xl">
                            <h3 className="text-xs font-black uppercase text-indigo-600 mb-3 tracking-widest">Creative Name Blending</h3>
                            <p className="text-sm leading-relaxed">
                                Toggle between multiple naming architectures: choose Modern Blend for tech startups, Premium Latinate for classical services, or Compound for easy-to-understand brands.
                            </p>
                        </div>
                    </div>

                    <section className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-white">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Globe size={100} />
                        </div>
                        <h3 className="text-lg font-black mb-2 italic tracking-tight uppercase">Privacy Guarantee</h3>
                        <p className="text-sm text-indigo-100 leading-relaxed max-w-2xl font-medium">
                            We never log or store your generated names or search queries. Domain lookups are made directly from your browser to Cloudflare and Verisign, ensuring third-party squatters cannot hijack your domain ideas.
                        </p>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>Business Name Generator | Instant .com Domain Checker | NJTools</title>
                <meta name="description" content="Generate catchy business names and instantly verify .com domain availability using our secure client-side lookup. Perfect for startups, agencies, and SaaS." />
                <meta name="keywords" content="business name generator, brand name generator, domain lookup, check com domain, startup name finder, company name generator, free domain search, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/business-name-generator/" />

                <meta property="og:title" content="Business Name Generator & .com Domain Checker | NJTools" />
                <meta property="og:description" content="Instantly generate industry-focused brand names and check domain availability. 100% Client-side and secure." />
                <meta property="og:url" content="https://njtools.xyz/tools/business-name-generator/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "Business Name Generator",
                        "operatingSystem": "Web",
                        "applicationCategory": "BusinessApplication",
                        "featureList": [
                            "Linguistic-based name generation",
                            "Category-specific brand rules",
                            "Real-time .com domain checking via RDAP",
                            "Zero data logging/domain front-running protection"
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

            <div className="space-y-8 max-w-5xl mx-auto">
                {/* Configuration panel */}
                <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Category Selector */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                                <Briefcase size={14} />
                                <span>Business Type / Industry</span>
                            </label>
                            <select
                                value={selectedCategoryId}
                                onChange={(e) => setSelectedCategoryId(e.target.value)}
                                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm font-semibold"
                            >
                                {BUSINESS_CATEGORIES.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                {activeCategory.description}
                            </p>
                        </div>

                        {/* Keyword input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                Seed Keywords (Optional)
                            </label>
                            <input
                                type="text"
                                value={seed}
                                onChange={(e) => setSeed(e.target.value.toLowerCase().replace(/[^a-z]/g, ''))}
                                placeholder="e.g. cloud, smart, green (letters only)"
                                className="w-full px-4 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-sm"
                            />
                            <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                                Leave blank to generate pure, industry-themed brand names.
                            </p>
                        </div>
                    </div>

                    {/* Naming Style */}
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                            Naming Style Architecture
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                            {NAME_STYLES.map(style => (
                                <button
                                    key={style.id}
                                    onClick={() => setSelectedStyleId(style.id)}
                                    type="button"
                                    className={`p-3 rounded-2xl border-2 transition-all flex flex-col text-left gap-1 ${
                                        selectedStyleId === style.id
                                            ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400'
                                            : 'border-slate-100 dark:border-slate-900 text-slate-400 hover:border-slate-200 hover:text-slate-600 dark:hover:border-slate-800'
                                    }`}
                                >
                                    <span className="font-bold text-xs">{style.name}</span>
                                    <span className="text-[10px] opacity-75 font-normal line-clamp-2 leading-tight">
                                        {style.description}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generator button */}
                    <div className="flex pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition duration-300 shadow-lg shadow-indigo-500/20 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Sparkles className="w-5 h-5" />
                            )}
                            <span>{isGenerating ? 'Analyzing Linguistic Patterns...' : 'Generate Brand Names'}</span>
                        </button>
                    </div>
                </div>

                {/* Filter and disclaimer bar */}
                {generatedNames.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                        <button
                            onClick={() => setFilterOnlyAvailable(!filterOnlyAvailable)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                                filterOnlyAvailable 
                                    ? 'bg-emerald-600 text-white' 
                                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                            }`}
                        >
                            <Filter size={14} />
                            <span>{filterOnlyAvailable ? 'Showing Only Available' : 'Filter: Show All'}</span>
                        </button>
                        
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">
                            <AlertTriangle size={12} className="text-amber-500" />
                            <span>Verification queries run directly on the .com registry</span>
                        </div>
                    </div>
                )}

                {/* Results grid */}
                {filteredNames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNames.map(name => {
                            const domain = `${name.toLowerCase()}.com`;
                            const status = domainStatuses[name] || 'idle';
                            
                            return (
                                <div 
                                    key={name}
                                    className="bg-white dark:bg-slate-950 p-5 rounded-3xl border border-slate-100 dark:border-slate-850 hover:border-slate-200 dark:hover:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4 group"
                                >
                                    <div>
                                        <div className="flex items-start justify-between">
                                            <h3 className="text-xl font-black text-slate-950 dark:text-white tracking-tight">
                                                {name}
                                            </h3>
                                            <button
                                                onClick={() => copyToClipboard(name, `${name}-name`)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                                title="Copy Brand Name"
                                            >
                                                {copiedName === `${name}-name` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-mono">
                                            {domain}
                                        </p>
                                    </div>

                                    {/* Domain status indicator card */}
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-100/60 dark:border-slate-900">
                                        <div className="flex items-center gap-2">
                                            {status === 'checking' && (
                                                <>
                                                    <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                                                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Checking...</span>
                                                </>
                                            )}
                                            {status === 'available' && (
                                                <>
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Available</span>
                                                </>
                                            )}
                                            {status === 'taken' && (
                                                <>
                                                    <XCircle className="w-4 h-4 text-rose-500" />
                                                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-widest">Registered</span>
                                                </>
                                            )}
                                            {status === 'error' && (
                                                <>
                                                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                                                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">Check Failed</span>
                                                </>
                                            )}
                                            {status === 'idle' && (
                                                <>
                                                    <Globe className="w-4 h-4 text-slate-300 dark:text-slate-700" />
                                                    <span className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-widest">Pending</span>
                                                </>
                                            )}
                                        </div>

                                        {/* Actions */}
                                        {status === 'available' && (
                                            <a
                                                href={`https://www.namecheap.com/domains/registration/results/?domain=${domain}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 hover:underline"
                                            >
                                                <span>Buy</span>
                                                <ExternalLink size={10} />
                                            </a>
                                        )}
                                        {status === 'taken' && (
                                            <a
                                                href={`https://www.${domain}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                                            >
                                                <span>Visit</span>
                                                <ExternalLink size={10} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    generatedNames.length > 0 && (
                        isCheckingActive ? (
                            <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 p-8 text-center rounded-[2rem] space-y-3">
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
                                <h4 className="font-bold text-slate-900 dark:text-white">Checking domain availability...</h4>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                    Verifying .com domain registrations sequentially on the registry database. Please wait...
                                </p>
                            </div>
                        ) : (
                            <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800 p-8 text-center rounded-[2rem] space-y-3">
                                <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto" />
                                <h4 className="font-bold text-slate-900 dark:text-white">No available .com domains found in this batch.</h4>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                                    All generated names are registered. Try changing your style, categories, or keywords, and generate again!
                                </p>
                                <button
                                    onClick={handleGenerate}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition"
                                >
                                    Generate New Batch
                                </button>
                            </div>
                        )
                    )
                )}

                {/* Reset or trigger button */}
                {generatedNames.length > 0 && (
                    <div className="flex justify-center pt-4">
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-2"
                        >
                            <RotateCcw size={14} className={isGenerating ? 'animate-spin' : ''} />
                            <span>Generate New Names</span>
                        </button>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default BusinessNameGenerator;
