import { useState } from 'react';
import { BlockPicker } from 'react-color';

const CanvasColourSwatch = ({ useCanvas }) => {
    const [isPickingColour, setIsPickingColour] = useState(false);
    const { changeColour, colour } = useCanvas();

    return (
        <div className="relative z-50 flex flex-col gap-0.5">
            <button 
                onClick={() => setIsPickingColour(!isPickingColour)}
                aria-label="Brush colour" 
                title="Brush colour"
                className="relative z-40 w-[36px] h-[36px] aspect-square rounded-md" 
                style={{ backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`}}
            >
            </button>
            { isPickingColour &&
                <div class="absolute z-30 left-[48px] top-0">
                    <div 
                        onMouseDown={() => setIsPickingColour(!isPickingColour)}
                        class="fixed inset-0"
                    ></div>
                    <BlockPicker color={colour} onChange={changeColour} triangle="hide" />
                </div>
            }
        </div>
    )
}
export default CanvasColourSwatch;