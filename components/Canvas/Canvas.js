import { useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown,
        handleMouseUp,
        handleMouseMove,
        handleMouseLeave,
        selectedTool,
        isPanning
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return  (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={canvasRef}
            className={(selectedTool === 'PAN' ? (isPanning ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-auto')}
        />
    )
}
export default Canvas;