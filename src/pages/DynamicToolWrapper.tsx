import { useParams } from 'react-router';
import { TOOLS_CONFIG } from '../config/tools';

export const DynamicToolWrapper = () => {
    const { toolId } = useParams();
    const tool = TOOLS_CONFIG.find(t => t.id === toolId);

    if (!tool) return <div>Tool Not Found</div>;

    return (
        <div className="tool-page">
            {tool.component}
        </div>
    );
};