import React, { useState } from 'react';
import ToolLayout from '../../layout/ToolLayout.tsx';
import { Helmet } from "react-helmet-async";
import { 
    Download, 
    Link as LinkIcon, 
    Play, 
    Music, 
    Heart, 
    MessageCircle, 
    Share2, 
    Eye, 
    AlertCircle, 
    Copy, 
    Check, 
    ClipboardList,
    Sparkles,
    Film,
    RefreshCw
} from 'lucide-react';

interface TikTokAuthor {
    id: string;
    unique_id: string;
    nickname: string;
    avatar: string;
}

interface TikTokMusicInfo {
    id: string;
    title: string;
    play: string;
    cover: string;
    author: string;
    duration: number;
}

interface TikTokVideoData {
    id: string;
    title: string;
    cover: string;
    play: string;
    wmplay: string;
    size?: number;
    wm_size?: number;
    music: string;
    music_info: TikTokMusicInfo;
    play_count: number;
    digg_count: number;
    comment_count: number;
    share_count: number;
    download_count: number;
    author: TikTokAuthor;
}

interface RawTikTokAuthor {
    id?: unknown;
    unique_id?: unknown;
    nickname?: unknown;
    avatar?: unknown;
}

interface RawTikTokMusicInfo {
    id?: unknown;
    title?: unknown;
    play?: unknown;
    cover?: unknown;
    author?: unknown;
    duration?: unknown;
}

interface RawTikTokVideoData {
    id?: unknown;
    title?: unknown;
    cover?: unknown;
    play?: unknown;
    wmplay?: unknown;
    size?: unknown;
    wm_size?: unknown;
    music?: unknown;
    music_info?: RawTikTokMusicInfo;
    play_count?: unknown;
    digg_count?: unknown;
    comment_count?: unknown;
    share_count?: unknown;
    download_count?: unknown;
    author?: RawTikTokAuthor;
}

const validateAndNormalizeResponse = (data: unknown): TikTokVideoData | null => {
    if (!data || typeof data !== 'object') return null;

    const raw = data as RawTikTokVideoData;

    // Required fields check
    if (typeof raw.id !== 'string' || !raw.id) return null;
    if (typeof raw.play !== 'string' || !raw.play) return null;

    // Safe normalization of author details
    const author: TikTokAuthor = {
        id: typeof raw.author?.id === 'string' ? raw.author.id : '',
        unique_id: typeof raw.author?.unique_id === 'string' ? raw.author.unique_id : 'unknown',
        nickname: typeof raw.author?.nickname === 'string' ? raw.author.nickname : 'TikTok Creator',
        avatar: typeof raw.author?.avatar === 'string' ? raw.author.avatar : ''
    };

    // Safe normalization of music info
    const music_info: TikTokMusicInfo = {
        id: typeof raw.music_info?.id === 'string' ? raw.music_info.id : '',
        title: typeof raw.music_info?.title === 'string' ? raw.music_info.title : 'Original Sound',
        play: typeof raw.music_info?.play === 'string' ? raw.music_info.play : '',
        cover: typeof raw.music_info?.cover === 'string' ? raw.music_info.cover : '',
        author: typeof raw.music_info?.author === 'string' ? raw.music_info.author : '',
        duration: typeof raw.music_info?.duration === 'number' ? raw.music_info.duration : 0
    };

    return {
        id: raw.id,
        title: typeof raw.title === 'string' ? raw.title : '',
        cover: typeof raw.cover === 'string' ? raw.cover : '',
        play: raw.play,
        wmplay: typeof raw.wmplay === 'string' ? raw.wmplay : raw.play,
        size: typeof raw.size === 'number' ? raw.size : undefined,
        wm_size: typeof raw.wm_size === 'number' ? raw.wm_size : undefined,
        music: typeof raw.music === 'string' ? raw.music : '',
        music_info,
        play_count: typeof raw.play_count === 'number' ? raw.play_count : 0,
        digg_count: typeof raw.digg_count === 'number' ? raw.digg_count : 0,
        comment_count: typeof raw.comment_count === 'number' ? raw.comment_count : 0,
        share_count: typeof raw.share_count === 'number' ? raw.share_count : 0,
        download_count: typeof raw.download_count === 'number' ? raw.download_count : 0,
        author
    };
};

const isValidTikTokUrl = (urlStr: string): boolean => {
    try {
        const parsed = new URL(urlStr.trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return false;
        }
        const hostname = parsed.hostname.toLowerCase();
        return hostname === 'tiktok.com' || hostname.endsWith('.tiktok.com');
    } catch {
        return false;
    }
};

const TikTokDownloader: React.FC = () => {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [videoData, setVideoData] = useState<TikTokVideoData | null>(null);
    const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
    const [downloadingKey, setDownloadingKey] = useState<string | null>(null);
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            const cleanText = text.trim();
            if (isValidTikTokUrl(cleanText)) {
                setUrl(cleanText);
                setError(null);
            } else {
                setError('Clipboard content does not look like a valid TikTok URL.');
            }
        } catch {
            setError('Clipboard permission denied or unsupported. Please paste manually.');
        }
    };

    const fetchVideoData = async (targetUrl = url) => {
        if (!targetUrl) {
            setError('Please enter or paste a valid TikTok video URL.');
            return;
        }

        const cleanUrl = targetUrl.trim();
        if (!isValidTikTokUrl(cleanUrl)) {
            setError('Invalid URL. Please enter a valid TikTok link.');
            return;
        }

        setLoading(true);
        setError(null);
        setVideoData(null);
        setDownloadProgress({});
        setDownloadingKey(null);

        try {
            const response = await fetch('https://www.tikwm.com/api/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    url: cleanUrl,
                    hd: '1'
                })
            });

            if (!response.ok) {
                throw new Error('API server returned an error.');
            }

            const resJson = await response.json();
            
            if (resJson.code === 0 && resJson.data) {
                const validatedData = validateAndNormalizeResponse(resJson.data);
                if (validatedData) {
                    setVideoData(validatedData);
                } else {
                    setError('API returned an invalid or malformed response structure.');
                }
            } else {
                setError(resJson.msg || 'Failed to fetch video data. Please verify the URL.');
            }
        } catch (err) {
            console.error(err);
            setError('Network error occurred. Please check your internet connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (mediaUrl: string, filename: string, key: string) => {
        if (downloadingKey) return;

        // Security check: Validate URL protocol
        try {
            const parsedUrl = new URL(mediaUrl);
            if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
                setError('Download blocked: Unsupported URL protocol.');
                return;
            }
        } catch {
            setError('Download blocked: Malformed URL.');
            return;
        }

        setDownloadingKey(key);
        setDownloadProgress(prev => ({ ...prev, [key]: 0 }));

        try {
            const response = await fetch(mediaUrl);
            if (!response.ok) throw new Error('Network response was not ok');

            const contentLength = response.headers.get('content-length');
            const parsedLength = contentLength ? parseInt(contentLength, 10) : 0;
            const totalBytes = Number.isFinite(parsedLength) && parsedLength > 0 ? parsedLength : 0;

            if (totalBytes === 0) {
                // Fallback direct download if length is missing or malformed
                const blob = await response.blob();
                triggerDownload(blob, filename);
                return;
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error('ReadableStream is not supported');

            let loadedBytes = 0;
            const chunks: BlobPart[] = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                if (value) {
                    chunks.push(value as unknown as BlobPart);
                    loadedBytes += value.length;
                }
                
                const percentage = Math.round((loadedBytes / totalBytes) * 100);
                setDownloadProgress(prev => ({ ...prev, [key]: percentage }));
            }

            const blob = new Blob(chunks);
            triggerDownload(blob, filename);
        } catch (err) {
            console.error('Download error:', err);
            // Security check: Validate URL protocol before opening window fallback
            try {
                const parsedUrl = new URL(mediaUrl);
                if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
                    setError('Direct download blocked or failed. Opening the media URL securely in a new tab...');
                    const fallbackWindow = window.open(mediaUrl, '_blank', 'noopener,noreferrer');
                    if (fallbackWindow) {
                        fallbackWindow.opener = null;
                    }
                } else {
                    setError('Fallback download blocked: Unsupported URL protocol.');
                }
            } catch {
                setError('Fallback download blocked: Malformed URL.');
            }
        } finally {
            setDownloadingKey(null);
        }
    };

    const triggerDownload = (blob: Blob, filename: string) => {
        const downloadUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(downloadUrl);
    };

    const copyToClipboard = (text: string, key: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        }).catch((err) => {
            console.error('Copy failed:', err);
        });
    };

    const formatNumber = (num: number): string => {
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1_000) {
            return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return num.toString();
    };

    const formatSize = (bytes?: number): string => {
        if (!bytes) return '';
        const mb = bytes / (1024 * 1024);
        return `(${mb.toFixed(2)} MB)`;
    };

    const loadExample = (exampleUrl: string) => {
        setUrl(exampleUrl);
        fetchVideoData(exampleUrl);
    };

    return (
        <ToolLayout
            title="TikTok Video Downloader"
            description="Download TikTok videos without watermarks for free. Save high-quality MP4 videos and MP3 music tracks instantly."
            seoContent={
                <div className="space-y-6 text-slate-700 dark:text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No Watermark TikTok Downloader</h2>
                        <p className="leading-relaxed">
                            Looking to save your favorite social media clips? Our <strong className="text-indigo-600 dark:text-indigo-400">TikTok Video Downloader</strong> provides an elegant and fast browser-based utility that extracts high-quality direct links. Extract the video without watermarks or grab the backing audio track as an MP3 file with one click.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Key Features</h3>
                        <ul className="list-disc ml-6 space-y-1">
                            <li><strong className="text-slate-900 dark:text-white">Without Watermark:</strong> Extract clean MP4 files perfect for archival or editing.</li>
                            <li><strong className="text-slate-900 dark:text-white">With Watermark:</strong> Keep the original branding and creator tag.</li>
                            <li><strong className="text-slate-900 dark:text-white">Extract MP3 Audio:</strong> Easily download the background music track of any post.</li>
                            <li><strong className="text-slate-900 dark:text-white">No Registration Required:</strong> The service is completely free, secure, and unlimited.</li>
                        </ul>
                    </section>

                    <section className="bg-indigo-600 dark:bg-indigo-900 p-6 rounded-xl shadow-lg border border-indigo-500/30 text-white">
                        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                            <Sparkles className="w-5 h-5" /> 100% Free & Browser-Based
                        </h3>
                        <p className="text-sm leading-relaxed text-indigo-50 opacity-90">
                            NJTools executes downloads client-side and acts as a safe helper for scraping metadata. We never store your downloaded files or search history, ensuring maximum privacy while downloading.
                        </p>
                    </section>

                    <section className="mt-12 space-y-6 border-t border-slate-100 dark:border-slate-800 pt-10 text-sm">
                        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-4 italic uppercase">Frequently Asked Questions</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-indigo-600 uppercase tracking-widest text-xs">How do I download a TikTok video?</h4>
                                <p className="leading-relaxed">
                                    Simply open the TikTok app or website, copy the share link of the video, paste it in the box above, and click "Fetch Video". Once retrieved, select your preferred download option.
                                </p>
                            </div>
                            <div className="space-y-2 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                                <h4 className="font-bold text-indigo-600 uppercase tracking-widest text-xs">Does it work on Android and iOS?</h4>
                                <p className="leading-relaxed">
                                    Yes! NJTools runs entirely in modern web browsers (Chrome, Safari, Firefox, Edge). It is fully compatible with mobile browsers on iOS and Android devices without requiring additional software.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            }
        >
            <Helmet>
                <title>TikTok Video Downloader | Download TikTok Without Watermark Free | NJTools</title>
                <meta name="description" content="Free online TikTok Downloader without watermarks. Save TikTok videos in high-quality MP4 format or extract MP3 audio files instantly. Mobile-friendly and no registration required." />
                <meta name="keywords" content="tiktok downloader, tiktok video download, download tiktok without watermark, tiktok audio extractor, save tiktok mp3, free tiktok downloader, online video downloader, NJTools" />
                <link rel="canonical" href="https://njtools.xyz/tools/tiktok-downloader/" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://njtools.xyz/tools/tiktok-downloader/" />
                <meta property="og:title" content="TikTok Video Downloader (No Watermark) | NJTools" />
                <meta property="og:description" content="Download TikTok videos and audio tracks instantly. 100% Free, secure, and client-side processing." />
                <meta property="og:image" content="https://njtools.xyz/og-image.png/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SoftwareApplication",
                        "name": "TikTok Video Downloader",
                        "operatingSystem": "Web",
                        "applicationCategory": "MultimediaApplication",
                        "featureList": [
                            "Download without watermark",
                            "Download original with watermark",
                            "Extract MP3/audio tracks",
                            "Direct browser downloading"
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

            <div className="space-y-8">
                {/* Search Bar / Input Area */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                                <LinkIcon size={20} />
                            </span>
                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && fetchVideoData()}
                                className="w-full pl-12 pr-28 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-white text-base"
                                placeholder="Paste TikTok URL here (e.g. https://www.tiktok.com/@...)"
                            />
                            <button
                                onClick={handlePaste}
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition"
                                title="Paste from Clipboard"
                            >
                                <ClipboardList size={14} />
                                <span>Paste</span>
                            </button>
                        </div>

                        <button
                            onClick={() => fetchVideoData()}
                            disabled={loading}
                            className="bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 shadow-lg shadow-indigo-500/20"
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="w-5 h-5 animate-spin" />
                                    <span>Fetching...</span>
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    <span>Fetch Video</span>
                                </>
                            )}
                        </button>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-950/20 p-4 rounded-2xl border border-red-200/50 dark:border-red-900/30 text-sm">
                            <AlertCircle size={18} className="shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Example URLs for test */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400 dark:text-slate-500 font-medium">Examples:</span>
                        <button
                            onClick={() => loadExample('https://www.tiktok.com/@giaerra/video/7577398554101058824')}
                            className="px-3 py-1 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-lg transition"
                        >
                            Sample Video
                        </button>
                    </div>
                </div>

                {/* Video Info Display */}
                {videoData && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-slate-100 dark:border-slate-800">
                        {/* Video Card Preview */}
                        <div className="lg:col-span-5 flex flex-col items-center">
                            <div className="relative w-full max-w-[320px] aspect-[9/16] bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800 group">
                                <video
                                    src={videoData.play}
                                    poster={videoData.cover}
                                    controls
                                    className="w-full h-full object-cover"
                                    playsInline
                                />
                            </div>
                        </div>

                        {/* Metadata and Downloads */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Author Info */}
                            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <img
                                    src={videoData.author.avatar}
                                    alt={videoData.author.nickname}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-indigo-500"
                                />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">
                                        {videoData.author.nickname}
                                    </h4>
                                    <a
                                        href={`https://www.tiktok.com/@${videoData.author.unique_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-indigo-500 hover:underline font-semibold"
                                    >
                                        @{videoData.author.unique_id}
                                    </a>
                                </div>
                            </div>

                            {/* Description / Caption */}
                            <div>
                                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-2">Description</h3>
                                <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-900/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                    {videoData.title || "No description provided."}
                                </p>
                            </div>

                            {/* Metrics grid */}
                            <div className="grid grid-cols-4 gap-4 text-center">
                                <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <Heart size={16} className="text-red-500 mx-auto mb-1" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{formatNumber(videoData.digg_count)}</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <MessageCircle size={16} className="text-blue-500 mx-auto mb-1" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{formatNumber(videoData.comment_count)}</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <Share2 size={16} className="text-green-500 mx-auto mb-1" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{formatNumber(videoData.share_count)}</span>
                                </div>
                                <div className="p-3 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                                    <Eye size={16} className="text-purple-500 mx-auto mb-1" />
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{formatNumber(videoData.play_count)}</span>
                                </div>
                            </div>

                            {/* Downloads Section */}
                            <div className="space-y-4">
                                <h3 className="text-xs uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">Download Media</h3>
                                
                                <div className="flex flex-col gap-3">
                                    {/* Video No Watermark */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleDownload(
                                                videoData.play, 
                                                `${videoData.author.unique_id}_${videoData.id}_no_wm.mp4`, 
                                                'no-wm'
                                            )}
                                            disabled={!!downloadingKey}
                                            className="flex-1 flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-5 py-4 rounded-2xl font-bold transition disabled:opacity-50 relative overflow-hidden group shadow-md"
                                        >
                                            <div className="relative z-10 flex items-center gap-2">
                                                <Film className="w-5 h-5 shrink-0" />
                                                <span>Download Video (No Watermark)</span>
                                                <span className="text-xs font-normal opacity-85">{formatSize(videoData.size)}</span>
                                            </div>
                                            
                                            {downloadingKey === 'no-wm' ? (
                                                <span className="relative z-10 text-sm font-black bg-black/20 px-2.5 py-1 rounded-lg">
                                                    {downloadProgress['no-wm']}%
                                                </span>
                                            ) : (
                                                <Download size={18} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                                            )}

                                            {/* Progress Bar overlay */}
                                            {downloadingKey === 'no-wm' && (
                                                <div 
                                                    className="absolute inset-0 bg-indigo-800 dark:bg-indigo-700 transition-all duration-300"
                                                    style={{ width: `${downloadProgress['no-wm']}%` }}
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(videoData.play, 'no-wm-link')}
                                            className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-2xl transition shrink-0"
                                            title="Copy direct video link"
                                        >
                                            {copiedKey === 'no-wm-link' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                        </button>
                                    </div>

                                    {/* Video With Watermark */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => handleDownload(
                                                videoData.wmplay, 
                                                `${videoData.author.unique_id}_${videoData.id}_wm.mp4`, 
                                                'wm'
                                            )}
                                            disabled={!!downloadingKey}
                                            className="flex-1 flex items-center justify-between bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white px-5 py-4 rounded-2xl font-bold transition disabled:opacity-50 relative overflow-hidden group shadow-md"
                                        >
                                            <div className="relative z-10 flex items-center gap-2">
                                                <Film className="w-5 h-5 shrink-0" />
                                                <span>Download Video (With Watermark)</span>
                                                <span className="text-xs font-normal opacity-85">{formatSize(videoData.wm_size)}</span>
                                            </div>

                                            {downloadingKey === 'wm' ? (
                                                <span className="relative z-10 text-sm font-black bg-black/20 px-2.5 py-1 rounded-lg">
                                                    {downloadProgress['wm']}%
                                                </span>
                                            ) : (
                                                <Download size={18} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                                            )}

                                            {/* Progress Bar overlay */}
                                            {downloadingKey === 'wm' && (
                                                <div 
                                                    className="absolute inset-0 bg-slate-950 dark:bg-slate-850 transition-all duration-300"
                                                    style={{ width: `${downloadProgress['wm']}%` }}
                                                />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => copyToClipboard(videoData.wmplay, 'wm-link')}
                                            className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-2xl transition shrink-0"
                                            title="Copy watermarked video link"
                                        >
                                            {copiedKey === 'wm-link' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                        </button>
                                    </div>

                                    {/* Audio track */}
                                    {videoData.music && (
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => handleDownload(
                                                    videoData.music, 
                                                    `${videoData.author.unique_id}_${videoData.id}_audio.mp3`, 
                                                    'music'
                                                )}
                                                disabled={!!downloadingKey}
                                                className="flex-1 flex items-center justify-between bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-5 py-4 rounded-2xl font-bold transition disabled:opacity-50 relative overflow-hidden group shadow-md"
                                            >
                                                <div className="relative z-10 flex items-center gap-2">
                                                    <Music className="w-5 h-5 shrink-0" />
                                                    <span>Download MP3 Audio Track</span>
                                                    <span className="text-xs font-normal opacity-85">
                                                        ({videoData.music_info.title ? `${videoData.music_info.title.substring(0, 20)}...` : 'Audio'})
                                                    </span>
                                                </div>

                                                {downloadingKey === 'music' ? (
                                                    <span className="relative z-10 text-sm font-black bg-black/20 px-2.5 py-1 rounded-lg">
                                                        {downloadProgress['music']}%
                                                    </span>
                                                ) : (
                                                    <Download size={18} className="relative z-10 group-hover:translate-y-0.5 transition-transform" />
                                                )}

                                                {/* Progress Bar overlay */}
                                                {downloadingKey === 'music' && (
                                                    <div 
                                                        className="absolute inset-0 bg-teal-800 dark:bg-teal-700 transition-all duration-300"
                                                        style={{ width: `${downloadProgress['music']}%` }}
                                                    />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(videoData.music, 'music-link')}
                                                className="p-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-2xl transition shrink-0"
                                                title="Copy direct audio link"
                                            >
                                                {copiedKey === 'music-link' ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
};

export default TikTokDownloader;
