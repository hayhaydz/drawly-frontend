
export default class PaintbrushHandler {
    constructor(context) {
        this.context = context;
    }

    mouseDown(x, y) {
        this.context.current.beginPath();
        this.context.current.moveTo(x, y);
    }

    mouseUp() {
        this.context.current.closePath();
    }

    mouseMove(x, y) {
        this.context.current.lineTo(x, y);
        this.context.current.stroke();
    }

    mouseLeave() {
        this.context.current.closePath();
    }
}