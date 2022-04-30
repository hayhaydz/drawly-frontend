import { createContext, useContext, useState, useRef } from 'react';
import { Colours, Strokes, Tools } from '../constants';
import { PaintbrushHandler, PanZoomHandler } from '../utils';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isPanning, setIsPanning] = useState(false);

    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);
    const [selectedColour, setSelectedColour] = useState(Colours.BLACK);
    const [selectedStroke, setSelectedStroke] = useState(Strokes.SMALL);

    const [colour, setColour] = useState({});
    const [strokeWidth, setStrokeWidth] = useState(0);
    const [zoomLevel, setZoomLevel] = useState(1);
    const MAX_ZOOM = 5;
    const MIN_ZOOM = 0.1;
    const SCROLL_SENSITIVITY = 0.0005;

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const paintbrush = new PaintbrushHandler(contextRef);
    const panZoom = new PanZoomHandler(contextRef);

    const prepareCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth ;
        canvas.height = window.innerHeight;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const context = canvasRef.current.getContext('2d');
        context.scale(1, 1);
        context.lineCap = "round";
        context.strokeStyle = "black";
        context.lineWidth = 5;

        contextRef.current = context;
    }

    const handleMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        switch(selectedTool) {
            case Tools.PAINTBRUSH:
                paintbrush.mouseDown(offsetX, offsetY);
                setIsDrawing(true);
                break;
            case Tools.PAN:
                panZoom.pointerDown();
                setIsPanning(true);
                break;
        }
    }

    const handleMouseUp = () => {
        switch(selectedTool) {
            case Tools.PAINTBRUSH:
                paintbrush.mouseUp(contextRef);
                setIsDrawing(false);
                break;
            case Tools.PAN:
                setIsPanning(false);
                break;
        }
    }

    const handleMouseMove = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        if(isDrawing) {
            paintbrush.mouseMove(offsetX, offsetY);
        } else if (isPanning) {
            PanZoom.pointerMove();
        }
    }

    const handleMouseLeave = () => {
        if(selectedTool === Tools.PAINTBRUSH) {
            paintbrush.mouseLeave(contextRef);
            setIsDrawing(false);
        }
    }

    const handleZoomIn = () => {
        console.log('zooming');
    }

    const handleZoomOut = () => {
        console.log('zoooooming out');
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
        contextRef.current.fillStyle = 'white';
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return (
        <CanvasContext.Provider
            value={{
                canvasRef,
                contextRef,
                prepareCanvas,
                handleMouseDown,
                handleMouseUp,
                handleMouseMove,
                handleMouseLeave,
                handleZoomIn,
                handleZoomOut,
                changeTool,
                changeColour,
                changeStrokeWidth,
                clearCanvas,
                isDrawing,
                isPanning,
                selectedTool,
                selectedColour,
                selectedStroke,
                zoomLevel,
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);