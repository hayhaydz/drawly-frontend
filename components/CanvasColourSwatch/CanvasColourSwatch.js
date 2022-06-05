import { useState } from 'react';
import { PhotoshopPicker } from 'react-color';

const CanvasColourSwatch = ({ useCanvas }) => {
    const [isPickingColour, setIsPickingColour] = useState(false);
    const { changeColour, colour } = useCanvas();

    return (
        <div className="z-50 flex flex-col gap-0.5">
            <button 
                onClick={() => setIsPickingColour(!isPickingColour)}
                aria-label="Brush colour" 
                title="Brush colour"
                className="relative z-40 w-[36px] h-[36px] aspect-square rounded-md" 
                style={{ backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`}}
            >
            </button>
            { isPickingColour &&
                <div className="fixed z-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div 
                        onMouseDown={() => setIsPickingColour(!isPickingColour)}
                        onTouchStart={() => setIsPickingColour(!isPickingColour)}
                        className="fixed inset-0"
                    ></div>
                    <PhotoshopPicker color={colour} onChange={changeColour} triangle="hide" />
                </div>
            }
        </div>
    )
}
export default CanvasColourSwatch;