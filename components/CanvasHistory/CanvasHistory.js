import { CgUndo, CgRedo } from 'react-icons/cg';
import { CanvasButton } from '../';

const CanvasHistory = () => {
    return (
        <>
            <CanvasButton 
                handleClick={() => console.log('undo step')}
                label="Undo"
                icon={<CgUndo />}
            />
            <CanvasButton 
                handleClick={() => console.log('redo step')}
                label="Redo"
                icon={<CgRedo />}
            />
        </>
    )
}
export default CanvasHistory;