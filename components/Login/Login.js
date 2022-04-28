import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { RiArrowRightLine } from 'react-icons/ri';
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

    useEffect(() => {
        if(socket) {
            socket.on('users', users => {
                setUsers(users);
            })
        }
    }, [socket]);

    const handleSubmit = () => {
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
            router.push('/chat');
            return toast.custom(t => (
                <ToastNotification 
                    t={t}
                    title="Hey there"
                    message={`Welcome to ${room}`}
                />
            ));
        })
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="max-w-lg w-full max-h-lg h-96 bg-cyan-400 rounded p-6">
                <h1 className="text-lg font-bold mb-4">Drawly.io</h1>
                <div className="flex flex-col">
                    <input type="text" placeholder="User name" value={name} onChange={e => setName(e.target.value)} />
                    <input type="text" placeholder="Room name" value={room} onChange={e => setRoom(e.target.value)} />
                    <button onClick={handleSubmit}>Login <RiArrowRightLine/></button>
                </div>
            </div>
        </div>
    )
}
export default Login;