import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useSocketContext } from './SocketContext';
import { Colours, Strokes, Tools } from '../constants';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);
    const [selectedColour, setSelectedColour] = useState(Colours.BLACK);
    const [selectedStroke, setSelectedStroke] = useState(Strokes.SMALL);

    const [colour, setColour] = useState({r: 0, g: 0, b: 0});
    const [strokeWidth, setStrokeWidth] = useState(5);
    const coord = {x: 0, y: 0};

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const socket = useSocketContext();

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
        contextRef.current.strokeStyle = `rgb(${colour.r}, ${colour.g}, ${colour.b})`;

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
        contextRef.current.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
        socket.emit('changeColour', c);
        setColour(c);
        setSelectedColour(Colours[c.name]);
    }

    const changeStrokeWidth = (sw) => {
        contextRef.current.lineWidth = sw.width;
        socket.emit('changeStrokeWidth', sw);
        setStrokeWidth(sw.width);
        setSelectedStroke(Strokes[sw.name]);
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Handle websockets
    useEffect(() => {
        if(socket) {
            socket.on('startDraw', data => {
                contextRef.current.lineWidth = data.sw;
                contextRef.current.strokeStyle = `rgb(${data.c.r}, ${data.c.g}, ${data.c.b})`;
        
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
                clearCanvas,
                isDrawing,
                selectedTool,
                selectedColour,
                selectedStroke
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);