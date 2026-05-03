import fs from 'fs';
import path from 'path';

const distDir = './dist';
const baseUrl = 'https://njtools.xyz';

// Map of page IDs to their component file paths (relative to root)
const componentPaths = {
    'about': './src/pages/AboutUs.tsx',
    'privacy-policy': './src/pages/PrivacyPolicy.tsx',
    'terms-of-service': './src/pages/TermsOfService.tsx',
    'contact': './src/pages/ContactUs.tsx',
    'tools': './src/pages/AllTools.tsx'
};

const defaultConfig = {
    title: 'NJTools - High-Performance Web Utilities',
    description: 'Fast, secure, and browser-based tools for developers and creators. SVG to PNG, JSON Formatter, Unit Converter and more. 100% Privacy Focused.',
    keywords: 'developer tools, web utilities, svg to png, json formatter, image converter, privacy tools',
    url: `${baseUrl}/`,
    seoContent: '<h1>NJTools - High-Performance Web Utilities</h1><p>Fast, secure, and browser-based tools for developers and creators.</p>'
};

const basePages = {
    'about': {
        title: 'About NJTools - Privacy-Focused Web Utilities',
        description: 'Learn about NJTools and our commitment to privacy. All our tools run entirely in your web browser, ensuring your data never leaves your device.',
        keywords: 'about njtools, browser-based tools, privacy-focused utilities',
        url: `${baseUrl}/about/`,
        seoContent: `
            <h1>About NJTools</h1>
            <p>NJTools is a suite of high-performance web utilities engineered to help developers and designers work smarter, without compromising privacy.</p>
            <h2>Our Mission</h2>
            <p>We believe privacy is a fundamental right. Unlike typical online tools, NJTools processes everything locally in your browser. Your data never touches a server—ever.</p>
            <ul>
                <li>High Performance: Optimized using Web Workers and modern algorithms.</li>
                <li>Clean Engineering: Adhering to SOLID principles and Clean Architecture.</li>
                <li>100% Private: All processing happens on your device.</li>
            </ul>
        `
    },
    'contact': {
        title: 'Contact Us - NJTools',
        description: 'Get in touch with the NJTools team for feedback, feature requests, or support.',
        keywords: 'contact njtools, feedback, support',
        url: `${baseUrl}/contact/`,
        seoContent: `
            <h1>Contact NJTools</h1>
            <p>Get in touch with the NJTools team for feedback, feature requests, or support. We are always looking to improve our tools for the developer community.</p>
            <p>You can reach out to us via LinkedIn or GitHub to report issues or suggest new utilities.</p>
        `
    },
    'privacy-policy': {
        title: 'Privacy Policy - NJTools',
        description: 'Read the NJTools privacy policy. We prioritize your data security and privacy by processing everything client-side.',
        keywords: 'privacy policy, data security, client-side processing',
        url: `${baseUrl}/privacy-policy/`,
        seoContent: `
            <h1>Privacy Policy</h1>
            <p>At NJTools, we take your privacy seriously. Our tools are designed to work entirely within your browser using client-side technologies like JavaScript and WebAssembly.</p>
            <h2>No Data Collection</h2>
            <p>We do not collect, store, or transmit any of the data you process through our tools. All image conversions, code formatting, and utility calculations happen on your local machine.</p>
        `
    },
    'terms-of-service': {
        title: 'Terms of Service - NJTools',
        description: 'Read the terms of service for using NJTools web utilities.',
        keywords: 'terms of service, legal',
        url: `${baseUrl}/terms-of-service/`,
        seoContent: `
            <h1>Terms of Service</h1>
            <p>By using NJTools, you agree to use our utilities for lawful purposes. Our tools are provided as-is without any warranties.</p>
        `
    },
    'tools': {
        title: 'All Tools - NJTools',
        description: 'Browse our full collection of high-performance web utilities for developers, designers, and creators.',
        keywords: 'web tools, developer utilities, all tools',
        url: `${baseUrl}/tools/`,
        seoContent: `
            <h1>All Web Utilities</h1>
            <p>Explore our comprehensive directory of developer and media tools. From AI background removal to JSON formatting, NJTools provides professional-grade utilities that run 100% in your browser.</p>
            <ul>
                <li>Media Tools: SVG to PNG, Background Remover, Image Compressor.</li>
                <li>Developer Tools: JSON Formatter, JWT Debugger, JSON to CSV.</li>
                <li>Utility Tools: Unit Converter, Password Generator.</li>
            </ul>
        `
    }
};

// Function to extract and clean SEO content from a TSX file
const extractSeoContent = (filePath) => {
    try {
        if (!fs.existsSync(filePath)) return '';
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Improved regex to handle various spacing and newlines
        const seoMatch = content.match(/seoContent=\{([\s\S]*?)\n?\s*\}\s*>/);
        if (!seoMatch) return '';

        let jsx = seoMatch[1].trim();

        // Basic JSX to HTML conversion
        let html = jsx
            .replace(/className="[^"]*"/g, (match) => match.replace('className', 'class'))
            .replace(/\{['"]([^'"]+)['"]\}/g, '$1') // { "text" } -> text
            .replace(/\{([^{}]+)\}/g, '') // Remove nested JS blocks for safety
            .replace(/<([A-Z][a-zA-Z0-9]*)[^>]*\/>/g, '') // Remove custom React components
            .replace(/<([A-Z][a-zA-Z0-9]*)[^>]*>([\s\S]*?)<\/\1>/g, '$2'); // Unwrap custom tags

        return html;
    } catch (e) {
        console.error(`Error extracting SEO from ${filePath}:`, e);
        return '';
    }
};

// Read tools from config to be dynamic
const toolsFileContent = fs.readFileSync('./src/config/tools.tsx', 'utf-8');

// Capture tool metadata and their component imports
const toolRegex = /id:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"],\s*desc:\s*['"]([^'"]+)['"],\s*component:\s*<([^/\s>]+)/g;
const dynamicTools = {};

// Map component names to their relative paths
const importRegex = /import\s+([^\s]+)\s+from\s+['"]([^'"]+)['"]/g;
const componentImportPaths = {};
let importMatch;
while ((importMatch = importRegex.exec(toolsFileContent)) !== null) {
    componentImportPaths[importMatch[1]] = importMatch[2].replace('../', './src/');
}

let match;
while ((match = toolRegex.exec(toolsFileContent)) !== null) {
    const [_, id, name, desc, componentName] = match;
    const componentPath = componentImportPaths[componentName];
    
    dynamicTools[`tools/${id}`] = {
        title: `${name} - NJTools`,
        description: desc,
        keywords: `${name.toLowerCase()}, ${id.replace(/-/g, ' ')}, njtools, web tool`,
        url: `${baseUrl}/tools/${id}/`,
        seoContent: componentPath ? extractSeoContent(componentPath) : ''
    };
}

const allPaths = { ...basePages, ...dynamicTools };

// 1. Read the template with placeholders from dist/index.html
const rootIndexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(rootIndexHtmlPath)) {
    console.error('dist/index.html not found! Run npm run build first.');
    process.exit(1);
}

const rawTemplate = fs.readFileSync(rootIndexHtmlPath, 'utf-8');

// Function to inject config into template
const injectSEO = (template, config) => {
    return template
        .replace(/{{TITLE}}/g, config.title || '')
        .replace(/{{DESCRIPTION}}/g, config.description || '')
        .replace(/{{KEYWORDS}}/g, config.keywords || '')
        .replace(/{{URL}}/g, config.url || '')
        .replace(/{{SEO_CONTENT}}/g, config.seoContent || '');
};

// 2. Update the main index.html in dist/
const rootHtml = injectSEO(rawTemplate, defaultConfig);
fs.writeFileSync(rootIndexHtmlPath, rootHtml);
console.log('✅ Updated root index.html');

// 3. Generate sub-pages
Object.entries(allPaths).forEach(([p, config]) => {
    const fullPath = path.join(distDir, p);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    
    const pageHtml = injectSEO(rawTemplate, config);

    fs.writeFileSync(path.join(fullPath, 'index.html'), pageHtml);
    console.log(`✅ Generated: /${p}/`);
});

// 4. Generate Sitemap (compact, only loc + lastmod — matching Blogspot format)
const now = new Date();
const lastmod = now.toISOString().replace(/\.\d{3}Z$/, 'Z');

const buildUrlEntry = (loc) =>
    `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;

const urlEntries = [
    buildUrlEntry(`${baseUrl}/`),
    ...Object.values(allPaths).map(config => buildUrlEntry(config.url))
];

// IMPORTANT: No leading newline before <?xml - must be the very first character
const sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urlEntries.join('') +
    '</urlset>';

fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
fs.writeFileSync(path.join('public', 'sitemap.xml'), sitemapContent);
console.log('✅ Generated sitemap.xml in dist and public');

console.log(`\nStatic path generation complete! Total paths: ${Object.keys(allPaths).length + 1}`);

