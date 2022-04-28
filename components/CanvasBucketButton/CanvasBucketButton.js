import { GoPaintcan } from 'react-icons/go';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasBucketButton = () => {
    // const { clearCanvas } = useCanvas();

    return (
        <CanvasButton
            handleClick={() => console.log('paint bucket tool')}
            label="Paint bucket"
            icon={<GoPaintcan/>}
        />
    )
}
export default CanvasBucketButton;