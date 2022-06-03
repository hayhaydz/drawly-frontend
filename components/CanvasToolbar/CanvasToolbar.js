import {  CanvasTools, CanvasSaveImage, CanvasColourSwatch, CanvasStrokeWidth } from '../';
import { useCanvas } from '../../context/CollaborativeCanvasContext';

const CanvasToolbar = () => {
    const { isDrawing } = useCanvas();

    return (
        <div className={"fixed top-4 left-4 flex flex-col gap-1 h-fit bg-slate-100 p-1 rounded-md transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <CanvasTools useCanvas={useCanvas} />
            <CanvasSaveImage useCanvas={useCanvas} />
            <CanvasColourSwatch useCanvas={useCanvas} />
            <CanvasStrokeWidth useCanvas={useCanvas} />
        </div>
    )
}
export default CanvasToolbar;