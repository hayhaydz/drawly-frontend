import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import { ToastNotification } from '../';

const Login = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const { setUsers } = useUsersContext();
    const router = useRouter();
    const socket = useSocketContext();

    const [inputName, setInputName] = useState('');
    const [inputRoom, setInputRoom] = useState('');

    useEffect(() => {
        if(name !== '' && room !== '') {
            socket.emit('login', { name, room }, error => {
                if(error) {
                    console.log(error);
                    return toast.custom(t => (
                        <ToastNotification 
                            t={t}
                            title="Error"
                            message={error}
                        />
                    ));
                }
                router.push('/canvas');
                return toast.custom(t => (
                    <ToastNotification 
                        t={t}
                        title="Hey there"
                        message={`Welcome to room ${room}`}
                    />
                ));
            })
        }
    }, []);

    useEffect(() => {
        if(socket) {
            socket.on('users', users => {
                setUsers(users);
            })
        }
    }, [socket]);

    const handleSubmit = () => {
        socket.emit('login', { name: inputName, room: inputRoom }, error => {
            if(error) {
                console.log(error);
                return toast.custom(t => (
                    <ToastNotification 
                        t={t}
                        title="Error"
                        message={error}
                    />
                ));
            }
            setName(inputName);
            setRoom(inputRoom);
            router.push('/canvas');
            return toast.custom(t => (
                <ToastNotification 
                    t={t}
                    title="Hey there"
                    message={`Welcome to room ${room}`}
                />
            ));
        });
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="max-w-lg w-full max-h-lg h-96 bg-cyan-400 rounded p-6">
                <h1 className="text-lg font-bold mb-4">Drawly.io</h1>
                <div className="flex flex-col">
                    <input type="text" placeholder="User name" value={inputName} onChange={e => setInputName(e.target.value)} className="mb-2 p-2 rounded-md" />
                    <input type="text" placeholder="Room name" value={inputRoom} onChange={e => setInputRoom(e.target.value)} className="p-2 rounded-md" />
                    <button onClick={handleSubmit} className="flex items-center justify-center mt-4 border-2 border-gray-800 font-bold p-1">Join</button>
                </div>
            </div>
        </div>
    )
}
export default Login;