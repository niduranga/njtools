import fs from 'fs';
import path from 'path';

const distDir = './dist';

// Static base pages
const basePaths = [
    'about',
    'contact',
    'privacy-policy',
    'terms-of-service',
    'tools'
];

// Read tools from config to be dynamic
const toolsData = fs.readFileSync('./src/config/tools.tsx', 'utf-8');
const toolIds = [...toolsData.matchAll(/id:\s*['"]([^'"]+)['"]/g)].map(m => `tools/${m[1]}`);

const allPaths = [...basePaths, ...toolIds];
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

allPaths.forEach(p => {
    const fullPath = path.join(distDir, p);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
    fs.writeFileSync(path.join(fullPath, 'index.html'), indexHtml);
    console.log(`Generated static path: ${p}`);
});

console.log(`Static path generation complete! Total paths: ${allPaths.length}`);
