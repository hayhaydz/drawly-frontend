import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import { HiLightningBolt } from 'react-icons/hi';

const ToastNotification = ({
    t,
    bgColor,
    icon,
    title,
    message,
}) => {
    const handleDismiss = () => {
        toast.dismiss(t.id);
    }

    return (
        <div className="flex flex-row items-center justify-between w-96 bg-gray-900 px-4 py-6 text-white shadow-2xl hover:shadow-none transform-gpu translate-y-0 hover:translate-y-1 rounded-xl relative transition-all duration-500 ease-in-out">
            <div className="text-xl">
                <HiLightningBolt />
            </div>
            <div className="flex flex-col items-start justify-center ml-4 cursor-default">
                <h1 className="text-base text-gray-200 font-semibold leading-none tracking-wider">{title}</h1>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed tracking-wider">{message}</p>
            </div>
            <div onClick={handleDismiss} className="absolute top-2 right-2 cursor-pointer text-lg">
                <MdOutlineClose />
            </div>
        </div>
    )
}
export default ToastNotification;