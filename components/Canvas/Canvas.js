import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import { useCanvas } from '../../context/CanvasContext';

const Canvas = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const { users } = useUsersContext();
    const socket = useSocketContext();
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