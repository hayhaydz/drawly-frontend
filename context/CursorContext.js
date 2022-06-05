import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { isTouchDevice } from '../utils/functions';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const cursorRef = useRef(null);

    useEffect(() => {
        if(isTouchDevice()) {
            cursorRef.current.style.display = "none";
        }
    }, []);

    const handleMoveCursor = (e) => {
        if(!isTouchDevice()) {
            cursorRef.current.style.top = e.clientY + 'px';
            cursorRef.current.style.left = e.clientX + 'px';
        }
    }

    return (
        <CursorContext.Provider value={{ cursorRef, handleMoveCursor }}>
            {children}
        </CursorContext.Provider>
    )
}

export const useCursorContext = () => useContext(CursorContext);