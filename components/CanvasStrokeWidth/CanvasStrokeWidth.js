import { useState } from 'react';
import Slider from 'rc-slider';
import { BsCircleFill } from 'react-icons/bs';
import { CanvasButton } from '../';

const CanvasStrokeWidth = ({ useCanvas }) => {
    const [isPickingSW, setIsPickingSW] = useState(false);
    const { changeStrokeWidth, strokeWidth } = useCanvas();

    return (
        <div className="relative z-50 flex flex-col gap-0.5">
            <CanvasButton
                handleClick={() => setIsPickingSW(!isPickingSW)}
                label="Brush size"
                icon={<BsCircleFill style={{ width: `16px`, height: `16px`, margin: 'auto' }}/>}
            />
            { isPickingSW &&
                <div class="absolute z-30 left-[48px] top-0 w-[300px] p-3 bg-slate-100 rounded-md">
                    <div 
                        onMouseDown={() => setIsPickingSW(!isPickingSW)}
                        class="fixed inset-0"
                    ></div>
                    <Slider min={4} max={40} step={4} defaultValue={strokeWidth} onChange={changeStrokeWidth} />
                </div>
            }
        </div>
    )
}
export default CanvasStrokeWidth;