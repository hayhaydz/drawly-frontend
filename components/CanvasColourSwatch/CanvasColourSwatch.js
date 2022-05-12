import { useCanvas } from '../../context/CanvasContext';

const CanvasColourSwatch = () => {
    const colours = [
        {name: 'WHITE', r: 255, g: 255, b: 255},
        {name: 'BLACK', r: 0, g: 0, b: 0},
        {name: 'RED', r: 255, g: 0, b: 0},
        {name: 'GREEN', r: 0, g: 255, b: 0},
        {name: 'BLUE', r: 0, g: 0, b: 255}
    ];
    
    const { changeColour, selectedColour } = useCanvas();

    return (
        <div className="flex flex-col gap-0.5">
            {
                colours.map((colour, i) => (
                    <button key={i} onClick={() => changeColour(colour)} className={'relative w-[36px] h-[36px] aspect-square rounded-md before:block before:absolute before:top-0 before:left-1 before:w-full before:h-full before:border-cyan-400 ' + (selectedColour === colour.name ? 'before:border-r-4' : 'before:border-r-0')} style={{ backgroundColor: `rgb(${colour.r}, ${colour.g}, ${colour.b})`}}></button>
                ))
            }
        </div>
    )
}
export default CanvasColourSwatch;