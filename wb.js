// Get canvas and context
const canvas = document.getElementById('whiteboardCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

// Store the drawing color
let color = "#000000";

// Set the initial drawing state
let drawing = false;
let lastX = 0;
let lastY = 0;

// Get elements
const clearBtn = document.getElementById('clearBtn');
const colorPicker = document.getElementById('colorPicker');

// Event listener for color picker
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

// Mouse down event to start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Mouse move event to draw
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const x = e.offsetX;
    const y = e.offsetY;

    draw(x, y, color, lastX, lastY);

    [lastX, lastY] = [x, y];
});

// Mouse up event to stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
});

// Clear button functionality
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Draw on canvas
function draw(x, y, color, lastX, lastY) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.stroke();
}
