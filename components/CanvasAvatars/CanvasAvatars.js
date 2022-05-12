import {  useMemo } from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/croodles-neutral';
import { useCanvas} from '../../context/CanvasContext';


const CanvasAvatars = () => {
    const { isDrawing } = useCanvas();
    const avatar = useMemo(() => {
        return createAvatar(style, {
            dataUri: true,
            size: 128
        });
    }, []);

    return (
        <div className={"fixed top-4 right-4 flex gap-1 h-fit bg-slate-100 p-1 rounded-md transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <div className="relative bg-slate-200 rounded-full p-2 before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:border-4 before:border-cyan-400">
                <img src={avatar} alt="Custom avatar" className="w-[32px] h-[32px] aspect-square rounded-full"/>
            </div>
        </div>
    )
}
export default CanvasAvatars;