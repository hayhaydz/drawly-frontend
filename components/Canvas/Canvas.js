import { useEffect } from 'react';
import { useCanvas } from '../../context/CollaborativeCanvasContext';

const Canvas = () => {
    const {
        canvasRef,
        prepareCanvas,
        handleMouseDown
    } = useCanvas();

    useEffect(() => {
        prepareCanvas();
    }, []);

    return  (
        <canvas
            // style={{cursor: "url(data:text/html;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSItMjQxIDI0MyAxNiAxNiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojRkYwMDAwO30NCjwvc3R5bGU+DQo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNLTIyOS4yLDI0NGMtMS43LDAtMy4xLDEuNC0zLjgsMi44Yy0wLjctMS40LTIuMS0yLjgtMy44LTIuOGMtMi4zLDAtNC4yLDEuOS00LjIsNC4yYzAsNC43LDQuOCw2LDgsMTAuNg0KCWMzLjEtNC42LDgtNi4xLDgtMTAuNkMtMjI1LDI0NS45LTIyNi45LDI0NC0yMjkuMiwyNDRMLTIyOS4yLDI0NHoiLz4NCjwvc3ZnPg0K), auto;"}}
            onMouseDown={handleMouseDown}
            ref={canvasRef}
        />
    )
}
export default Canvas;