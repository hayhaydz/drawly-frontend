import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import { ToastNotification } from '../';

const Login = () => {
    const { name, setName, room, setRoom, logout } = useMainContext();
    const { setUsers } = useUsersContext();
    const router = useRouter();
    const socket = useSocketContext();

    const [inputName, setInputName] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const LoginMethod = (data) => {
        setIsLoggedIn(true);
        socket.emit('login', data, (res, error) => {            
            if(error) {
                console.log(error);
                logout();
                return toast.custom(t => (
                    <ToastNotification 
                        t={t}
                        title="Error"
                        message={error}
                    />
                ));
            }
            setName(res.name);
            setRoom(res.room);
            router.push({
                pathname: '/canvas',
                query: { r: res.room }
            });
            return toast.custom(t => (
                <ToastNotification 
                    t={t}
                    title="Hey there"
                    message={`Welcome to room ${res.room}`}
                />
            ));
        });
    }

    useEffect(() => {
        if(name !== '' && room !== '' && !isLoggedIn) {
            LoginMethod({ name, room });
        }
    }, [name, room]);

    useEffect(() => {
        if(socket) {
            socket.on('users', users => {
                setUsers(users);
            })
        }
    }, [socket]);

    const handleSubmit = () => {
        LoginMethod({ name: inputName, room });
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="relative max-w-lg w-full max-h-lg bg-slate-200 rounded p-6">
                <h1 className="text-xl font-bold mb-6">Drawly.io</h1>
                { room !== '' &&
                    <span className="absolute top-6 right-6 text-slate-500">Room ID: {room}</span>
                }
                <div className="flex flex-col">
                    <input type="text" placeholder="User name" value={inputName} onChange={e => setInputName(e.target.value)} className="mb-2 p-2 rounded-md" />
                    <button onClick={handleSubmit} className="flex items-center justify-center mt-4 border-2 border-gray-800 font-bold p-1 rounded transition-color hover:bg-gray-800 hover:text-slate-100">
                        { room !== '' ? 'Join Room' : 'Create Room'}
                        
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login;