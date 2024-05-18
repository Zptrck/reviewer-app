const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const prevShapes = [];

function randomColor() {
    return 'rgba(255, 255, 255, 0.1)';
}

function lerp(start, end, t) {
    return start * (1 - t) + end * t;
}

function drawShapeWithTransition(i) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 50 + 20;
    const color = randomColor();
    const rotation = Math.random() * Math.PI * 2;
    const prevX = lerp(x, prevShapes[i]?.x || x, 0.15); // Adjust the interpolation factor for slower animation
    const prevY = lerp(y, prevShapes[i]?.y || y, 0.15); // Adjust the interpolation factor for slower animation
    const prevSize = lerp(size, prevShapes[i]?.size || size, 0.10); // Adjust the interpolation factor for slower animation
    const prevRotation = lerp(rotation, prevShapes[i]?.rotation || rotation, 0.05); // Adjust the interpolation factor for slower animation
    ctx.save();
    ctx.translate(prevX, prevY);
    ctx.rotate(prevRotation);
    ctx.fillStyle = color;
    const shapeType = Math.random();
    if (shapeType < 0.5) {
        ctx.beginPath();
        ctx.arc(0, 0, prevSize, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillRect(-prevSize / 2, -prevSize / 2, prevSize, prevSize);
    }
    ctx.restore();
    prevShapes[i] = { x, y, size, rotation };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 8; i++) {
        drawShapeWithTransition(i);
    }
    // Stop the animation loop after a single iteration
    return;
}

animate();
