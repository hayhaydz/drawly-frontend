import { GiPaintBrush } from 'react-icons/gi';
import { FaHandPaper } from 'react-icons/fa';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasTools = () => {
    const tools = [
        {name: 'PAINTBRUSH', label: 'Paintbrush tool', icon: <GiPaintBrush />},
        {name: 'PAN', label: 'Panning tool', icon: <FaHandPaper />}
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