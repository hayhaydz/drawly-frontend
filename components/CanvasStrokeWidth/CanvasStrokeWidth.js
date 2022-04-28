import { BsCircleFill } from 'react-icons/bs';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasStrokeWidth = () => {
    const strokeWidths = [{width: 5, label: 'Small stroke width'},{width: 10, label: 'Medium stroke width'}, {width: 20, label: 'Large stroke width'}];
    const { changeStrokeWidth } = useCanvas();

    return (
        <div className="flex flex-col gap-0.5">
            {
                strokeWidths.map((sw, i) => {
                    <CanvasButton 
                        handleClick={() => changeStrokeWidth(sw.width)}
                        label={sw.label}
                        icon={<BsCircleFill style={{ width: `${sw.width}px`, height: `${sw.width}px`, margin: 'auto' }}/>}
                        key={i}
                    />
                })
            }

        </div>
    )
}
export default CanvasStrokeWidth;