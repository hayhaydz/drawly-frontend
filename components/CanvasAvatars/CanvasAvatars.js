import { useState, useEffect, useMemo } from 'react';
import ReactTooltip from 'react-tooltip';
import toast from 'react-hot-toast';
import { MdOutlineExitToApp } from 'react-icons/md';
import { HiOutlineShare } from 'react-icons/hi';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import { useCanvas } from '../../context/CollaborativeCanvasContext';
import { CanvasButton } from '../';
import { ToastNotification } from '../';

const CanvasAvatars = () => {
    const { room, logout } = useMainContext();
    const { users } = useUsersContext();
    const socket = useSocketContext();
    const { isDrawing } = useCanvas();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        setIsTooltipVisible(true);
    });

    const handleExit = () => {
        socket.emit('logout');
        logout();
    }

    const handleShare = () => {
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_LOCAL_URL}/canvas?r=${room}`);
        return toast.custom(t => (
            <ToastNotification 
                t={t}
                title="Sharing"
                message="Invite link copied to clipboard"
            />
        ));
    }

    return (
        <div className={"fixed top-4 right-4 flex h-fit transition-opacity " + (isDrawing ? 'opacity-0' : 'opacity-100')}>
            <ul className="flex gap-1">
                {
                    users && users.map(user => {
                        return (
                            <li key={user.id}>
                                <div 
                                    data-tip={user.name} 
                                    className="relative bg-slate-200 rounded-full"
                                    onMouseEnter={() => setIsTooltipVisible(true)}
                                    onMouseLeave={() => setIsTooltipVisible(false)}
                                >
                                    <img src={user.avatar} alt="Custom avatar" className="w-[44px] h-[44px] aspect-square rounded-full"/>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
            <div className="bg-slate-100 p-1 h-fit rounded-md ml-2">
                <CanvasButton
                    handleClick={handleShare}
                    label={'Share room'}
                    icon={<HiOutlineShare />}
                    style={{marginRight: '8px'}}
                />
                <CanvasButton
                    handleClick={handleExit}
                    label={'Leave room'}
                    icon={<MdOutlineExitToApp />}
                />
            </div>
            {isTooltipVisible &&
                <ReactTooltip place="bottom" effect="solid" delayHide={1} />
            }
        </div>
    )
}
export default CanvasAvatars;