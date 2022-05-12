import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiList } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import { RiSendPlaneFill } from 'react-icons/ri';
import toast from 'react-hot-toast';
import { useMainContext } from '../../context/MainContext';
import { useUsersContext } from '../../context/UsersContext';
import { useSocketContext } from '../../context/SocketContext';
import './Chat.module.scss';

const Chat = () => {
    const { name, setName, room, setRoom } = useMainContext();
    const { users } = useUsersContext();
    const router = useRouter();
    const socket = useSocketContext();

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    

    useEffect(() => {
        window.onpopstate = e => logout();
    }, []);

    useEffect(() => { if(!name) router.push('/') }, [router, name]);

    useEffect(() => {
        if(socket) {
            socket.on('message', msg => {
                setMessages(messages => [...messages, msg]);
            });
    
            socket.on('notification', notif => {
                return toast.custom(t => (
                    <ToastNotification 
                        t={t}
                        title={notif?.title}
                        message={notif?.description}
                    />
                ));
            })
        }
    }, [socket, toast]);

    const handleSendMessage = () => {
        socket.emit('sendMessage', message, () => setMessage(''));
        setMessage('');
    }

    const logout = () => {
        setName('');
        setRoom('');
        router.push('/');
    }

    return (
        <div>
            <h1>
                <div>
                    <div>
                        <ul>
                            {
                                users && users.map(user => {
                                    return (
                                        <li key={user.id}>
                                            <p>{user.name}</p>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div>
                        <h1>{room.slice(0, 1).toUpperCase() + room.slice(1)}</h1>
                        <div>
                            <p>{name}</p>
                            <span>active</span>
                        </div>
                    </div>
                    <button onClick={logout}>Logout</button>
                </div>
            </h1>

            <div>
                {messages.length > 0 ?
                    messages.map((msg, i) => 
                        (<div key={i}>
                            <p>{msg.user}</p>
                            <p>{msg.text}</p>
                        </div>)
                    )
                    :
                    <div>
                        <span>-----</span>
                        <BiMessageDetail />
                        <p>No messages</p>
                        <div>-----</div>
                    </div>
                }
            </div>
            <div className="form">
                <input type="text" className="input" placeholder="Enter message" value={message} onChange={e => setMessage(e.target.value)} />
                <button onClick={handleSendMessage} disabled={message === '' ? true : false}><RiSendPlaneFill /></button>
            </div>
        </div>
    )
}
export default Chat;