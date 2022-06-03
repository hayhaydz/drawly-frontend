import { MdSaveAlt } from 'react-icons/md';
import { CanvasButton } from '../';

const CanvasSaveImage = ({ useCanvas }) => {
    const { saveCanvas } = useCanvas();

    return (
        <>
            <CanvasButton
                handleClick={saveCanvas}
                label="Save as image"
                icon={<MdSaveAlt />}
            />
        </>
    )
}
export default CanvasSaveImage;