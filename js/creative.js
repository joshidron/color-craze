const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let currentColor = '#000000'; // Default stroke color
let fillColor = '#FFFFFF'; // Default fill color
let brushSize = 2; // Default brush size (pencil)
let currentShape = 'none'; // Default to freehand drawing
let startX = 0, startY = 0; // Starting position for shapes
let shapes = []; // Store drawn shapes
let freehandPaths = []; // Store freehand drawing paths

// Update the selected stroke color
document.getElementById('colorPicker').addEventListener('input', (event) => {
    currentColor = event.target.value;
});

// Update the selected fill color
document.getElementById('fillColorPicker').addEventListener('input', (event) => {
    fillColor = event.target.value;
});

// Update the selected brush size
document.getElementById('brushSize').addEventListener('change', (event) => {
    brushSize = parseInt(event.target.value);
});

// Update the selected shape
document.getElementById('shapePicker').addEventListener('change', (event) => {
    currentShape = event.target.value;
});

// Start drawing
canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;

    if (currentShape === 'none') {
        ctx.beginPath(); // Start a new path for freehand drawing
        ctx.moveTo(startX, startY);
    }
});

// Stop drawing and finalize shape
canvas.addEventListener('mouseup', (event) => {
    if (drawing) {
        if (currentShape === 'none') {
            // Freehand drawing
            drawFreehand(event);
        } else {
            // Finalize the shape and save it to the shapes array
            const newShape = { shape: currentShape, startX, startY, endX: event.offsetX, endY: event.offsetY, color: currentColor, fillColor: fillColor, size: brushSize };
            shapes.push(newShape);
            drawShape(newShape); // Draw the new shape immediately
        }
    }
    drawing = false;
});

// Handle drawing when moving the mouse (for freehand and shapes)
canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    if (currentShape === 'none') {
        drawFreehand(event); // Freehand drawing
    } else {
        // Draw the shape temporarily while dragging
        drawTemporaryShape(event);
    }
});

// Function to draw the shape temporarily while dragging
function drawTemporaryShape(event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    // Redraw all previously drawn shapes
    shapes.forEach(shape => drawShape(shape));

    const tempShape = { shape: currentShape, startX, startY, endX: event.offsetX, endY: event.offsetY, color: currentColor, fillColor: fillColor, size: brushSize };
    drawShape(tempShape); // Draw the temporary shape
}

// Clear canvas
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = []; // Clear the shapes array as well
    freehandPaths = []; // Clear freehand paths
});

// Download canvas as an image
document.getElementById('downloadCanvas').addEventListener('click', () => {
    const tempCanvasForDownload = document.createElement('canvas');
    const tempCtx = tempCanvasForDownload.getContext('2d');
    tempCanvasForDownload.width = canvas.width;
    tempCanvasForDownload.height = canvas.height;

    // Fill the temporary canvas with white background
    tempCtx.fillStyle = '#FFFFFF'; // White background
    tempCtx.fillRect(0, 0, tempCanvasForDownload.width, tempCanvasForDownload.height);

    // Draw the existing drawing on the temporary canvas
    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = tempCanvasForDownload.toDataURL();
    link.click();
});

// Function to handle freehand drawing
function drawFreehand(event) {
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath(); // Begin a new path for continuous drawing
    ctx.moveTo(event.offsetX, event.offsetY);

    // Save the freehand path
    freehandPaths.push({ x: event.offsetX, y: event.offsetY, color: currentColor, size: brushSize });
}

// Function to draw shapes based on the selected option
function drawShape(shape) {
    ctx.lineWidth = shape.size;
    ctx.strokeStyle = shape.color;
    ctx.fillStyle = shape.fillColor; // Set fill color

    switch (shape.shape) {
        case 'rectangle':
            drawRectangle(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'circle':
            drawCircle(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'oval':
            drawOval(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'triangle':
            drawTriangle(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'line':
            drawLine(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'pentagon':
            drawPolygon(shape.startX, shape.startY, shape.endX, shape.endY, 5);
            break;
        case 'hexagon':
            drawPolygon(shape.startX, shape.startY, shape.endX, shape.endY, 6);
            break;
        case 'star':
            drawStar(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'heart':
            drawHeart(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'diamond':
            drawDiamond(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'arc':
            drawArc(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'crescent':
            drawCrescent(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'cloud':
            drawCloud(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        case 'spiral':
            drawSpiral(shape.startX, shape.startY, shape.endX, shape.endY);
            break;
        default:
            break;
    }
}

// Individual shape drawing functions
function drawRectangle(x1, y1, x2, y2) {
    const width = x2 - x1;
    const height = y2 - y1;
    ctx.fillRect(x1, y1, width, height); // Fill the rectangle
    ctx.strokeRect(x1, y1, width, height); // Stroke the rectangle
}

function drawCircle(x1, y1, x2, y2) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    ctx.beginPath();
    ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
    ctx.fill(); // Fill the circle
    ctx.stroke(); // Stroke the circle
}

function drawOval(x1, y1, x2, y2) {
    const radiusX = Math.abs(x2 - x1) / 2;
    const radiusY = Math.abs(y2 - y1) / 2;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
    ctx.fill(); // Fill the oval
    ctx.stroke(); // Stroke the oval
}

function drawTriangle(x1, y1, x2, y2) {
    const centerX = (x1 + x2) / 2;
    const height = Math.abs(y2 - y1);
    ctx.beginPath();
    ctx.moveTo(centerX, y1); // Top vertex
    ctx.lineTo(x1, y2); // Bottom left vertex
    ctx.lineTo(x2, y2); // Bottom right vertex
    ctx.closePath();
    ctx.fill(); // Fill the triangle
    ctx.stroke(); // Stroke the triangle
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function drawPolygon(x1, y1, x2, y2, sides) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
    const angle = (2 * Math.PI) / sides;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    ctx.beginPath();
    for (let i = 0; i <= sides; i++) {
        const x = centerX + radius * Math.cos(i * angle);
        const y = centerY + radius * Math.sin(i * angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill(); // Fill the polygon
    ctx.stroke(); // Stroke the polygon
}

function drawStar(x1, y1, x2, y2) {
    const outerRadius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
    const innerRadius = outerRadius / 2;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const points = 5;
    ctx.beginPath();
    for (let i = 0; i <= 2 * points; i++) {
        const angle = (Math.PI / points) * i;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill(); // Fill the star
    ctx.stroke(); // Stroke the star
}

function drawHeart(x1, y1, x2, y2) {
    const width = Math.abs(x2 - x1);
    const height = Math.abs(y2 - y1);
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY + height / 4);
    ctx.bezierCurveTo(centerX - width / 2, centerY - height / 4, centerX - width / 2, centerY + height / 2, centerX, centerY + height);
    ctx.bezierCurveTo(centerX + width / 2, centerY + height / 2, centerX + width / 2, centerY - height / 4, centerX, centerY + height / 4);
    ctx.closePath();
    ctx.fill(); // Fill the heart
    ctx.stroke(); // Stroke the heart
}

function drawDiamond(x1, y1, x2, y2) {
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, y1);
    ctx.lineTo(x2, centerY);
    ctx.lineTo(centerX, y2);
    ctx.lineTo(x1, centerY);
    ctx.closePath();
    ctx.fill(); // Fill the diamond
    ctx.stroke(); // Stroke the diamond
}

function drawArc(x1, y1, x2, y2) {
    const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) / 2;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI);
    ctx.fill(); // Fill the arc
    ctx.stroke(); // Stroke the arc
}

function drawCrescent(x1, y1, x2, y2) {
    const radius = Math.abs(x2 - x1) / 2;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0.2 * Math.PI, 1.8 * Math.PI, false);
    ctx.arc(centerX - radius / 2, centerY, radius, 0.8 * Math.PI, 1.2 * Math.PI, true);
    ctx.closePath();
    ctx.fill(); // Fill the crescent
    ctx.stroke(); // Stroke the crescent
}

function drawCloud(x1, y1, x2, y2) {
    const radius = Math.abs(x2 - x1) / 8;
    ctx.beginPath();
    ctx.arc(x1 + radius, y1 + radius, radius, 0, Math.PI * 2);
    ctx.arc(x1 + radius * 3, y1 + radius, radius, 0, Math.PI * 2);
    ctx.arc(x1 + radius * 5, y1 + radius * 1.5, radius * 1.5, 0, Math.PI * 2);
    ctx.arc(x1 + radius * 8, y1 + radius, radius, 0, Math.PI * 2);
    ctx.arc(x1 + radius * 6, y1 + radius * 1.5, radius * 1.2, 0, Math.PI * 2);
    ctx.fill(); // Fill the cloud
    ctx.stroke(); // Stroke the cloud
}

function drawSpiral(x1, y1, x2, y2) {
    const radius = Math.abs(x2 - x1) / 2;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const coils = 20;
    const angleStep = (2 * Math.PI) / coils;
    ctx.beginPath();
    for (let i = 0; i <= coils; i++) {
        const angle = i * angleStep;
        const currentRadius = (radius * i) / coils;
        const x = centerX + currentRadius * Math.cos(angle);
        const y = centerY + currentRadius * Math.sin(angle);
        ctx.lineTo(x, y);
    }
    ctx.stroke();
}

let drawingHistory = []; // History stack
let redoHistory = []; // Redo stack

// Function to save the current canvas state
function saveState() {
    drawingHistory.push(canvas.toDataURL());
    redoHistory = []; // Clear redo history after a new action
}

// Undo function
function undo() {
    if (drawingHistory.length > 1) { // Ensure at least one state remains
        redoHistory.push(drawingHistory.pop()); // Move the last state to redoHistory
        const lastState = drawingHistory[drawingHistory.length - 1];
        const img = new Image();
        img.src = lastState;
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } else {
        console.log("Nothing to undo");
    }
}

// Refined Redo function
function redo() {
    if (redoHistory.length > 0) {
        const lastRedoState = redoHistory.pop(); // Retrieve the last redo state
        drawingHistory.push(lastRedoState); // Push it back to the history stack
        const img = new Image();
        img.src = lastRedoState;
        img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
        };
    } else {
        console.log("Nothing to redo");
    }
}

// Save state on every drawing action
canvas.addEventListener('mousedown', () => {
    if (drawingHistory.length === 0) saveState(); // Save initial state
    saveState(); // Save state before starting a new action
});

// Save state on shape finalization
canvas.addEventListener('mouseup', () => saveState());

document.getElementById('clearCanvas').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the canvas?")) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        shapes = []; // Clear the shapes array as well
        freehandPaths = []; // Clear freehand paths
        drawingHistory = []; // Clear history for undo
        redoHistory = []; // Clear redo history
    }
});

// Event listeners for undo and redo buttons
document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);