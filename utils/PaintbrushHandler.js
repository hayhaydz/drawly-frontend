
const mouseDown = (context, x, y) => {
    context.current.beginPath();
    context.current.moveTo(x, y);
}

const mouseUp = (context) => {
    context.current.closePath();
}

export default { mouseDown, mouseUp };