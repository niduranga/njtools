import { useParams } from 'react-router';
import { TOOLS_CONFIG } from '../config/tools';
import { Helmet } from "react-helmet-async";

export const DynamicToolWrapper = () => {
    const { toolId } = useParams();
    const tool = TOOLS_CONFIG.find(t => t.id === toolId);

    if (!tool) return <div>Tool Not Found</div>;

    return (
        <div className="tool-page">
            <Helmet>
                <title>{tool.name} | NJTools - Free Online Utility</title>
                <meta name="description" content={`${tool.desc} Fast, secure, and browser-based tool by NJTools.`} />
                <link rel="canonical" href={`https://njtools.xyz/tools/${tool.id}/`} />
            </Helmet>
            {tool.component}
        </div>
    );
};