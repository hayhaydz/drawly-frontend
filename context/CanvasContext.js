import { createContext, useContext, useState, useRef } from 'react';
import { Colours, Strokes, Tools } from '../constants';
import { PaintbrushHandler } from '../utils';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);
    const [selectedColour, setSelectedColour] = useState(Colours.BLACK);
    const [selectedStroke, setSelectedStroke] = useState(Strokes.SMALL);

    const [colour, setColour] = useState({});
    const [strokeWidth, setStrokeWidth] = useState(0);
    const coord = {x: 0, y: 0};

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvasRef.current.getContext('2d');
        context.scale(2, 2);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;
        contextRef.current = context;
    }

    const handleMouseDown = (event) => {
        if(selectedTool === Tools.PAINTBRUSH) {
            setIsDrawing(true);
            PaintbrushHandler.reposition(event, canvasRef, coord);
        }

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }

    const handleMouseMove = (event) => {
        PaintbrushHandler.draw(canvasRef, contextRef, event, coord);
    }

    const handleMouseUp = () => {
        if(selectedTool === Tools.PAINTBRUSH) {
            setIsDrawing(false);
        }

        console.log('cheese sticks');
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }

    const changeTool = (tool) => {
        setSelectedTool(Tools[tool]);
    }

    const changeColour = (c) => {
        contextRef.current.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
        setColour(c);
        setSelectedColour(Colours[c.name]);
    }

    const changeStrokeWidth = (sw) => {
        contextRef.current.lineWidth = sw.width;
        setStrokeWidth(sw.width);
        setSelectedStroke(Strokes[sw.name]);
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

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
                selectedStroke,
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);