import { useCanvas } from '../../context/CanvasContext';

const CanvasColourSwatch = () => {
    const colours = [
        {r: 255, g: 255, b: 255},
        {r: 0, g: 0, b: 0},
        {r: 255, g: 0, b: 0},
        {r: 0, g: 255, b: 0},
        {r: 0, g: 0, b: 255}
    ];
    const { changeColour } = useCanvas();

    return (
        <div className="flex flex-col gap-0.5">
            {
                colours.map((colour, i) => {
                    <button key={i} onClick={() => changeColour(colour)} className="w-36[px] h-[36px] aspect-square rounded-md" style={{ backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`}}></button>
                })
            }
        </div>
    )
}
export default CanvasColourSwatch;