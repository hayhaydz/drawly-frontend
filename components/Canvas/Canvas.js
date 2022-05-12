import { useEffect } from 'react';
import { useCanvas } from '../../context/CanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown,
        handleClick,
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