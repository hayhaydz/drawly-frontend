import { useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown,
        handleMouseUp,
        draw
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return  (
        <canvas
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={draw}
            ref={canvasRef}
        />
    )
}
export default Canvas;