import { GiPaintBrush } from 'react-icons/gi';
import { CanvasButton } from '../';

const CanvasPaintButton = () => {
    return (
        <CanvasButton 
            handleClick={() => console.log('paintbrush')}
            label="Paint"
            icon={<GiPaintBrush />}
        />
    )
}
export default CanvasPaintButton;