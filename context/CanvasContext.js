import { createContext, useContext, useState, useRef } from 'react';
import { Colours, Strokes, Tools } from '../constants';
import { PaintbrushHandler, BucketFillHandler } from '../utils';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);
    const [selectedColour, setSelectedColour] = useState(Colours.BLACK);
    const [selectedStroke, setSelectedStroke] = useState(Strokes.SMALL);

    const [colour, setColour] = useState({});
    const [strokeWidth, setStrokeWidth] = useState(0);

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

    const handleMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if(selectedTool === Tools.PAINTBRUSH) {
            PaintbrushHandler.mouseDown(contextRef, offsetX, offsetY);
            setIsDrawing(true);
        }
    }

    const handleMouseUp = () => {
        if(selectedTool === Tools.PAINTBRUSH) {
            PaintbrushHandler.mouseUp(contextRef);
            setIsDrawing(false);
        }
    }

    const handleClick = () => {
        if(selectedTool === Tools.BUCKET_FILL) {
            BucketFillHandler.click(contextRef);
        }
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

    const draw = ({ nativeEvent }) => {
        if(isDrawing) {
            const { offsetX, offsetY } = nativeEvent;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
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
                handleMouseUp,
                handleClick,
                changeTool,
                changeColour,
                changeStrokeWidth,
                clearCanvas,
                draw,
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