
const CanvasButton = ({ handleClick, label, icon}) => {
    return (
        <button onClick={handleClick} aria-label={label} title={label} className="bg-slate-200 p-2 rounded-md text-slate-900 text-xl aspect-square hover:bg-slate-300">{icon}</button>
    )
}
export default CanvasButton;