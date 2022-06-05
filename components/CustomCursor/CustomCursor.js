import { useCursorContext } from '../../context/CursorContext';

const CustomCursor = () => {
    const { cursorRef } = useCursorContext();

    return (
        <div
            ref={cursorRef}
            style={{
                width: '12px',
                height: '12px',
                backgroundColor: 'black',
                borderRadius: '100%',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
            }}
        ></div>
    )
}
export default CustomCursor;