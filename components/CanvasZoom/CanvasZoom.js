import { HiOutlineZoomIn, HiOutlineZoomOut } from 'react-icons/hi';
import { useCanvas } from '../../context/CanvasContext';
import { CanvasButton } from '../';


const CanvasZoom = () => {
    const { 
        handleZoomIn, 
        handleZoomOut, 
        isDrawing,
        zoomLevel
    } = useCanvas();

    return (
        <div className={"fixed bottom-4 left-4 flex items-center gap-1 bg-slate-100 p-1 rounded-md transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <span className="px-2" >{`${zoomLevel*100}`}%</span>
            <CanvasButton
                handleClick={handleZoomOut}
                label="Zoom out"
                icon={<HiOutlineZoomOut />}
            />
            <CanvasButton
                handleClick={handleZoomIn}
                label="Zoom in"
                icon={<HiOutlineZoomIn />}
            />
        </div>
    )
}
export default CanvasZoom;