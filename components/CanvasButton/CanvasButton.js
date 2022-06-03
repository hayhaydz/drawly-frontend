
const CanvasButton = ({ isActive, handleClick, label, icon }) => {
    return (
        <button 
            onClick={handleClick} 
            aria-label={label} 
            title={label} 
            className={'relative z-40 bg-slate-200 p-2 rounded-md text-slate-900 text-xl aspect-square hover:bg-slate-300 ' + (isActive ? 'bg-slate-300' : 'bg-slate-200')}
        >
            {icon}
        </button>
    )
}
export default CanvasButton;