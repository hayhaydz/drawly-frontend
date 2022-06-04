import { GiPaintBrush } from 'react-icons/gi';
import { BsFillEraserFill } from 'react-icons/bs';
import { CanvasButton } from '../';

const CanvasTools = ({ useCanvas }) => {
    const tools = [
        {name: 'PAINTBRUSH', label: 'Paintbrush tool', icon: <GiPaintBrush />},
        {name: 'ERASER', label: 'Eraser tool', icon: <BsFillEraserFill />}
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