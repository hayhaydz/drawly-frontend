import {  CanvasTools, CanvasClearButton, CanvasColourSwatch, CanvasStrokeWidth } from '../';
import { useCanvas } from '../../context/CanvasContext';

const CanvasToolbar = () => {
    const { isDrawing } = useCanvas();

    return (
        <div className={"fixed top-4 left-4 flex flex-col gap-1 h-fit bg-slate-100 p-1 rounded-md transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <CanvasTools />
            <CanvasClearButton />
            <CanvasColourSwatch />
            <CanvasStrokeWidth />
        </div>
    )
}
export default CanvasToolbar;