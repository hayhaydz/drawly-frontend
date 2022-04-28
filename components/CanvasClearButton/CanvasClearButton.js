import { MdDeleteForever } from 'react-icons/md';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasClearButton = () => {
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