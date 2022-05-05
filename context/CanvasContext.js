import { 
    createContext, 
    useContext, 
    useState, 
    useRef,
    useEffect,
    useCallback
} from 'react';
import { Colours, Strokes, Tools } from '../constants';
import { PaintbrushHandler, PanZoomHandler } from '../utils';
import useLayoutEffect from '../utils/useIsomorphicLayoutEffect';

const CanvasContext = createContext();

export const CanvasProvider = ({ children }) => {
    const canvasRef = useRef(null);
    const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
    const [context, setContext] = useState(null);

    // const paintbrush = new PaintbrushHandler(context);
    const panZoom = new PanZoomHandler();

    const [isDrawing, setIsDrawing] = useState(false);
    const [isPanning, setIsPanning] = useState(false);

    const [selectedTool, setSelectedTool] = useState(Tools.PAINTBRUSH);
    const [selectedColour, setSelectedColour] = useState(Colours.BLACK);
    const [selectedStroke, setSelectedStroke] = useState(Strokes.SMALL);

    const [colour, setColour] = useState({});
    const [strokeWidth, setStrokeWidth] = useState(0);
    const [scale, setScale] = useState(1);

    const [offset, setOffset] = useState(panZoom.ORIGIN);
    const [mousePos, setMousePos] = useState(panZoom.ORIGIN);
    const [viewportTopLeft, setViewportTopLeft] = useState(panZoom.ORIGIN);
    const isResetRef = useRef(false);
    const lastMousePosRef = useRef(panZoom.ORIGIN);
    const lastOffsetRef = useRef(panZoom.ORIGIN);

    // update last offset
    useEffect(() => {
        lastOffsetRef.current = offset;
    }, [offset]);

    // reset
    const reset = useCallback((context) => {
        if(context && !isResetRef.current) {
            context.canvas.width = canvasSize.width * panZoom.ratio;
            context.canvas.height = canvasSize.height * panZoom.ratio;
            context.scale(panZoom.ratio, panZoom.ratio);

            // context.lineCap = "round";
            // context.strokeStyle = "black";
            // context.lineWidth = 5;
    
            setContext(context);
            setScale(1);
            setOffset(panZoom.ORIGIN);
            setMousePos(panZoom.ORIGIN);
            setViewportTopLeft(panZoom.ORIGIN);
            lastOffsetRef.current = panZoom.ORIGIN;
            lastMousePosRef.current = panZoom.ORIGIN;
            
            isResetRef.current = true;
        }
    }, [canvasSize.width, canvasSize.height]);

    const handleReset = () => {
        if(context) reset(context);
    }

    // mouse functions
    const mouseMove = useCallback((event) => {
        if(context) {
            switch(selectedTool) {
                case Tools.PAINTBRUSH:
                    context.lineTo(event.offsetX, event.offsetY);
                    context.stroke();
                    break;
                case Tools.PAN:
                    const lastMousePos = lastMousePosRef.current;
                    const currentMousePos = { x: event.pageX, y: event.pageY };
                    lastMousePosRef.current = currentMousePos;
        
                    const mouseDiff = panZoom.diffPoints(currentMousePos, lastMousePos);
                    setOffset((prevOffset) => panZoom.addPoints(prevOffset, mouseDiff));
                    break;
            }
        }
    }, [context, selectedTool]);

    const mouseUp = useCallback(() => {
        if(selectedTool === Tools.PAINTBRUSH) {
            context.closePath();
        }

        document.removeEventListener("mousemove", mouseMove);
        document.removeEventListener("mouseup", mouseUp);
    }, [context, selectedTool, mouseMove]);

    const handleMouseDown = useCallback((event) => {

        lastMousePosRef.current = { x: event.pageX, y: event.pageY };

        if(selectedTool === Tools.PAINTBRUSH) {
            context.beginPath();
            context.moveTo(event.offsetX, event.offsetY);
        }

        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
    }, [context, selectedTool, mouseMove, mouseUp]);

    // setup the canvas and context
    useLayoutEffect(() => {
        if(canvasRef.current) {
            const renderCtx = canvasRef.current.getContext('2d');

            if(renderCtx) {
                reset(renderCtx);
            }
        }
    }, [reset, canvasSize.width, canvasSize.height]);

    // pan when the offset or scale changes
    useLayoutEffect(() => {
        if(context && lastOffsetRef.current) {
            let offsetDiff = panZoom.scalePoint(panZoom.diffPoints(offset, lastOffsetRef.current), scale);
            context.translate(offsetDiff.x, offsetDiff.y);
            setViewportTopLeft((prevVal) => panZoom.diffPoints(prevVal, offsetDiff));
            isResetRef.current = false;
        }
    }, [context, offset, scale]);

    // draw on the canvas
    useLayoutEffect(() => {
        if(context) {
            const squareSize = 20;
            const storedTransform = context.getTransform();
            context.canvas.width = context.canvas.width;
            context.setTransform(storedTransform);

            context.fillRect(
                canvasSize.width / 2 - squareSize / 2,
                canvasSize.height / 2 - squareSize / 2,
                squareSize,
                squareSize
            );
            context.arc(viewportTopLeft.x, viewportTopLeft.y, 5, 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
        }
    }, [canvasSize.width, canvasSize.height, context, scale, offset, viewportTopLeft]);

    // event listener on the canvas for mouse position
    useEffect(() => {
        const canvasElem = canvasRef.current;
        if(canvasElem === null) return;

        const handleUpdateMouse = (event) => {
            event.preventDefault();
            if(canvasRef.current) {
                const viewportMousePos = { x: event.clientX, y: event.clientY };
                const topLeftCanvasPos = {
                    x: canvasRef.current.offsetLeft,
                    y: canvasRef.current.offsetTop
                };
                setMousePos(panZoom.diffPoints(viewportMousePos, topLeftCanvasPos));
            }
        }

        canvasElem.addEventListener("mousemove", handleUpdateMouse);
        canvasElem.addEventListener("wheel", handleUpdateMouse);
        return () => {
            canvasElem.removeEventListener("mousemove", handleUpdateMouse);
            canvasElem.removeEventListener("wheel", handleUpdateMouse);
        };
    }, []);

    // event listener on canvas for zoom / mouse wheel
    useEffect(() => {
        const canvasElem = canvasRef.current;
        if(canvasElem === null) return;

        const handleWheel = (event) => {
            event.preventDefault();
            if(context) {
                const zoom = 1 - event.deltaY / panZoom.ZOOM_SENSITIVITY;
                const viewportTopLeftDelta = {
                    x: (mousePos.x / scale) * (1 - 1 / zoom),
                    y: (mousePos.y / scale) * (1 - 1 / zoom)
                };
                const newViewportTopLeft = panZoom.addPoints(viewportTopLeft, viewportTopLeftDelta);

                context.translate(viewportTopLeft.x, viewportTopLeft.y);
                context.scale(zoom, zoom);
                context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

                setViewportTopLeft(newViewportTopLeft);
                setScale(scale * zoom);
                isResetRef.current = false;
            }
        }

        canvasElem.addEventListener("wheel", handleWheel);
        return () => canvasElem.removeEventListener("wheel", handleWheel);
    }, [context, mousePos.x, mousePos.y, viewportTopLeft, scale]);

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
        context.strokeStyle = `rgb(${c.r}, ${c.g}, ${c.b})`;
        setColour(c);
        setSelectedColour(Colours[c.name]);
    }

    const changeStrokeWidth = (sw) => {
        context.lineWidth = sw.width;
        setStrokeWidth(sw.width);
        setSelectedStroke(Strokes[sw.name]);
    }

    const clearCanvas = () => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }

    return (
        <CanvasContext.Provider
            value={{
                setCanvasSize,
                canvasSize,
                ratio: panZoom.ratio,
                canvasRef,
                context,
                handleReset,
                handleMouseDown,
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
                scale,
            }}
        >
            {children}
        </CanvasContext.Provider>
    )
}

export const useCanvas = () => useContext(CanvasContext);