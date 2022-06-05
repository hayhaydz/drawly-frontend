import { useEffect } from 'react';
import { useCanvas } from '../../context/CollaborativeCanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown,
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return  (
        <canvas
            onMouseDown={handleMouseDown}
            ref={canvasRef}
        />
    )
}
export default Canvas;