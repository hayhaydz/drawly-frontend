
export default class PanZoomHandler {
    constructor() {
        this.ORIGIN = Object.freeze({ x: 0, y: 0 });
        this.ZOOM_SENSITIVITY = 500;
        this.ratio = 1;
    }

    diffPoints(p1, p2) {
        return { x: p1.x - p2.x, y: p1.y - p2.y };
    }

    addPoints(p1, p2) {
        return { x: p1.x + p2.x, y: p1.y + p2.y };
    }

    scalePoint(point, scale) {
        return { x: point.x / scale, y: point.y / scale };
    }

    // https://codepen.io/chengarda/pen/wRxoyB

}