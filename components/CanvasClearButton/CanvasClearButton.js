import { MdDeleteForever } from 'react-icons/md';
import { CanvasButton } from '../';

const CanvasClearButton = ({ useCanvas }) => {
    const { clearCanvas } = useCanvas();

    return (
        <CanvasButton 
            handleClick={clearCanvas} 
            label="Clear" 
            icon={<MdDeleteForever/>} 
        />
    )
}
export default CanvasClearButton;