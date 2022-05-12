import { useEffect, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import { useUsersContext } from '../../context/UsersContext';
import { useCanvas} from '../../context/CanvasContext';


const CanvasAvatars = () => {
    const { users } = useUsersContext();
    const { isDrawing } = useCanvas();

    return (
        <div className={"fixed top-4 right-4 h-fit bg-slate-100 p-1 rounded-md transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <ul className="flex gap-1">
                {
                    users && users.map(user => {
                        return (
                            <li key={user.id}>
                                <div data-tip={user.name} className="relative bg-slate-200 rounded-full p-2 before:block before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:border-4 before:border-cyan-400">
                                    <img src={user.avatar} alt="Custom avatar" className="w-[32px] h-[32px] aspect-square rounded-full"/>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <ReactTooltip place="bottom" effect="solid" className="bg-cyan-400" />
        </div>
    )
}
export default CanvasAvatars;