import { createContext, useContext, useState } from 'react'

const MainContext = createContext()

export const MainProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <MainContext.Provider value={{ name, room , setName, setRoom }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext)