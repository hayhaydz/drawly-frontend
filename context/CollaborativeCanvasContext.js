import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useMainContext } from '../context/MainContext';
import { useSocketContext } from './SocketContext';
import { Tools } from '../constants';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);

    const [colour, setColour] = useState({r: 0, g: 0, b: 0, a: 1});
    const [strokeWidth, setStrokeWidth] = useState(4);
    const coord = {x: 0, y: 0};

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const socket = useSocketContext();
    const { name, room } = useMainContext();

    // Canvas Functions

    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvasRef.current.getContext('2d');
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = colour;
        context.lineWidth = strokeWidth;
        contextRef.current = context;
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const handleMouseDown = (event) => {
        if(selectedTool === Tools.PAINTBRUSH) {
            setIsDrawing(true);
            coord.x = event.clientX - canvasRef.current.offsetLeft;
            coord.y = event.clientY - canvasRef.current.offsetTop;
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (event) => {
        contextRef.current.lineWidth = strokeWidth;
        contextRef.current.strokeStyle = `rgba(${colour.r}, ${colour.g}, ${colour.b}, ${colour.a})`;

        contextRef.current.beginPath();
        contextRef.current.moveTo(coord.x, coord.y);
        socket.emit('startDrawing', { coord, c: colour, sw: strokeWidth });

        coord.x = event.clientX - canvasRef.current.offsetLeft;
        coord.y = event.clientY - canvasRef.current.offsetTop;

        contextRef.current.lineTo(coord.x, coord.y);
        contextRef.current.stroke();
        socket.emit('endDrawing', { coord });
    }

    const handleMouseUp = () => {
        if(selectedTool === Tools.PAINTBRUSH) {
            setIsDrawing(false);
        }

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    const changeTool = (tool) => {
        setSelectedTool(Tools[tool]);
    }

    const changeColour = (c) => {
        contextRef.current.strokeStyle = `rgba(${c.rgb.r}, ${c.rgb.g}, ${c.rgb.b}, ${c.rgb.a})`;
        setColour(c.rgb);
    }

    const changeStrokeWidth = (sw) => {
        contextRef.current.lineWidth = sw;
        setStrokeWidth(sw);
    }

    const saveCanvas = () => {
        const l = document.createElement('a');
        l.download = "drawly-canvas.jpg";
        l.href = canvasRef.current.toDataURL();
        l.click();
        l.delete;
    }

    // Handle websockets
    useEffect(() => {
        if(socket) {
            socket.emit('checkStrokeSave', { room: room });
        }
    }, []);

    useEffect(() => {
        if(socket) {
            socket.on('startDraw', data => {
                contextRef.current.lineWidth = data.sw;
                contextRef.current.strokeStyle = `rgba(${data.c.r}, ${data.c.g}, ${data.c.b}, ${data.c.a})`;
        
                contextRef.current.beginPath();
                contextRef.current.moveTo(data.coord.x, data.coord.y);
            })

            socket.on('endDraw', data => {
                contextRef.current.lineTo(data.coord.x, data.coord.y);
                contextRef.current.stroke();
            });
        }
    }, [socket]);


    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                handleMouseDown,
                changeTool,
                changeColour,
                changeStrokeWidth,
                isDrawing,
                selectedTool,
                saveCanvas,
                colour,
                strokeWidth
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);