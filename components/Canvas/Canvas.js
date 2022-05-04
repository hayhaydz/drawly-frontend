import { useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';

const Canvas = () => {
    const {
        setCanvasSize,
        canvasSize,
        ratio,
        canvasRef,
        handleMouseDown,
        selectedTool,
        isPanning
    } = useCanvas();

    useEffect(() => {
        setCanvasSize((prevState) => ({...prevState, width: window.innerWidth, height: window.innerHeight }));
    }, []);

    return  (
        <canvas
            onMouseDown={handleMouseDown}
            ref={canvasRef}
            className={(selectedTool === 'PAN' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-auto')}
            width={canvasSize.width * ratio}
            height={canvasSize.height * ratio}
            style={{
                width: `${canvasSize.width}px`,
                height: `${canvasSize.height}px`
            }}
        />
    )
}
export default Canvas;