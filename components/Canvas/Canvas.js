import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMainContext } from '../../context/MainContext';
import { useCanvas } from '../../context/CollaborativeCanvasContext';

const Canvas = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const router = useRouter();

    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown
    } = useCanvas();

    useEffect(() => { if(!name) router.push('/') }, [router, name]);

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