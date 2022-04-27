import { createContext, useContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL;
    const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocketContext = () => useContext(SocketContext)