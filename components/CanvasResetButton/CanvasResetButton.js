import { GrPowerReset } from 'react-icons/gr';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';

const CanvasResetButton = () => {
    const { handleReset } = useCanvas();

    return (
        <CanvasButton 
            handleClick={handleReset}
            label="Reset" 
            icon={<GrPowerReset/>} 
        />
    )
}
export default CanvasResetButton;