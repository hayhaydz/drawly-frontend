import { BsCircleFill } from 'react-icons/bs';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasStrokeWidth = () => {
    const strokeWidths = [
        {name: 'SMALL', width: 5, label: 'Small stroke width'},
        {name: 'MEDIUM', width: 10, label: 'Medium stroke width'}, 
        {name: 'LARGE', width: 20, label: 'Large stroke width'}
    ];
    const { changeStrokeWidth, selectedStroke } = useCanvas();

    return (
        <div className="flex flex-col gap-0.5">
            {
                strokeWidths.map((sw, i) => (
                    <CanvasButton
                        isActive={selectedStroke === sw.name ? true : false}
                        handleClick={() => changeStrokeWidth(sw)}
                        label={sw.label}
                        icon={<BsCircleFill style={{ width: `${sw.width}px`, height: `${sw.width}px`, margin: 'auto' }}/>}
                        key={i}
                    />
                ))
            }

        </div>
    )
}
export default CanvasStrokeWidth;