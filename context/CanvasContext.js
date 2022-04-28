import { createContext, useContext, useState, useRef } from 'react'

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const [isDrawing, setIsDrawing] = useState(false);
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
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    }

    const handleMouseUp = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    }

    const changeColour = (c) => {
        contextRef.current.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
        setColour(c);
    }

    const changeStrokeWidth = (sw) => {
        contextRef.current.lineWidth = sw;
        setStrokeWidth(sw);
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
                changeColour,
                changeStrokeWidth,
                clearCanvas,
                draw,
                isDrawing
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);