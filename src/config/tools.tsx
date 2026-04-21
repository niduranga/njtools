import SvgConverter from '../components/tools/SvgConverter.tsx';
import { ImageIcon } from 'lucide-react';

export const TOOLS_CONFIG = [
    {
        id: 'svg-to-png',
        name: 'SVG to PNG Converter',
        desc: 'High-quality vector to image conversion.',
        component: <SvgConverter />,
        icon: <ImageIcon />,
        category: 'Media'
    },
];