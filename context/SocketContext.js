import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL;
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketIO = io(ENDPOINT, { transports: ['websocket', 'polling'] });
        setSocket(socketIO);

        const cleanup = () => socketIO.disconnect();
        return cleanup;
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)