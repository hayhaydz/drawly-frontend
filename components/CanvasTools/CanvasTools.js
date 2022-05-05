import { GiPaintBrush } from 'react-icons/gi';
import { GoPaintcan } from 'react-icons/go';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasTools = () => {
    const tools = [
        {name: 'PAINTBRUSH', label: 'Paintbrush tool', icon: <GiPaintBrush />},
        {name: 'BUCKET_FILL', label: 'Bucket fill tool', icon: <GoPaintcan/>}
    ]

    const { changeTool, selectedTool } = useCanvas();

    return (
        <>
            {
                tools.map((tool, i) => (
                    <CanvasButton
                        isActive={selectedTool === tool.name ? true : false}
                        handleClick={() => changeTool(tool.name)}
                        label={tool.label}
                        icon={tool.icon}
                        key={i}
                    />
                ))
            }
        </>
    )
}
export default CanvasTools;