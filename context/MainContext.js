import { createContext, useContext, useState, useEffect } from 'react'

const MainContext = createContext()

export const MainProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    useEffect(() => {
        if(localStorage.getItem("user_name")) setName(localStorage.getItem("user_name"));
        if(localStorage.getItem("user_room")) setRoom(localStorage.getItem("user_room"));
        setIsLoggingOut(false);
    }, []);

    useEffect(() => {
        if(name !== '') localStorage.setItem("user_name", name);
        if(room !== '') localStorage.setItem("user_room", room);
    }, [name, room]);

    const logout = () => {
        setIsLoggingOut(true);
        setName('');
        setRoom('');
        if(localStorage.getItem("user_name")) localStorage.removeItem("user_name");
        if(localStorage.getItem("user_room")) localStorage.removeItem("user_room");
    }

    return (
        <MainContext.Provider value={{ name, room, setName, setRoom, logout, isLoggingOut }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext)