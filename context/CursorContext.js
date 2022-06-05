import { createContext, useContext, useState, useEffect, useRef } from 'react';

const CursorContext = createContext();

export const CursorProvider = ({ children }) => {
    const cursorRef = useRef(null);

    const handleMoveCursor = (e) => {
        cursorRef.current.style.top = e.clientY + 'px';
        cursorRef.current.style.left = e.clientX + 'px';
    }

    return (
        <CursorContext.Provider value={{ cursorRef, handleMoveCursor }}>
            {children}
        </CursorContext.Provider>
    )
}

export const useCursorContext = () => useContext(CursorContext);