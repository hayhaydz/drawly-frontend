import { useEffect } from 'react';
import { useCanvas } from '../../context/CollaborativeCanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown,
        handleTouchStart
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return  (
        <canvas
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            ref={canvasRef}
        />
    )
}
export default Canvas;