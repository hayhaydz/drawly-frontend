const reposition = (event, canvas, coord) => {
    coord.x = event.clientX - canvas.current.offsetLeft;
    coord.y = event.clientY - canvas.current.offsetTop;
}

const draw = (canvas, context, event, coord) => {
    context.current.beginPath();
    context.current.moveTo(coord.x, coord.y);
    reposition(event, canvas, coord);
    context.current.lineTo(coord.x, coord.y);
    context.current.stroke();
}

export default { reposition, draw };