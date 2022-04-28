
export default class Paintbrush {
    constructor(canvas, context, isDrawing, setIsDrawing) {
        this.canvas = canvas;
        this.context = context;
        this.isDrawing = isDrawing;
        this.setIsDrawing = setIsDrawing;
    }

    setup() {

    }

    mouseDown() {
        this.context.beginPath();
        this.context.moveTo(offsetX, offsetY);
        this.setIsDrawing(true);
    }

    mouseUp() {
        this.context.closePath();
        this.setIsDrawing(false);
    }
}