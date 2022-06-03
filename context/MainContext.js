import { createContext, useContext, useState, useEffect } from 'react'

const MainContext = createContext()

export const MainProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        if(localStorage.getItem("user_name")) setName(localStorage.getItem("user_name"));
        if(localStorage.getItem("user_room")) setRoom(localStorage.getItem("user_room"));
    }, []);

    useEffect(() => {
        if(name !== '' && room !== '') {
            localStorage.setItem("user_name", name);
            localStorage.setItem("user_room", room);
        }
    }, [name, room]);

    return (
        <MainContext.Provider value={{ name, room , setName, setRoom }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext)