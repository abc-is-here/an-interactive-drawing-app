const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('color-picker');
const fillBtn = document.getElementById('fill');
const undoBtn = document.getElementById('undo');
const saveBtn = document.getElementById('save');
const title = document.getElementById('title');

let drawing = false;
let color = '#000000';
let fillMode = false;
let canvasHistory = [];
let undoIndex = -1;

canvas.addEventListener('mousedown', startDrawingOrFilling);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mousemove', draw);
clearBtn.addEventListener('click', clearCanvas);
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
    title.style.color = color;
});
fillBtn.addEventListener('click', () => {
    fillMode = !fillMode;
    fillBtn.textContent = fillMode ? 'Fill Mode On' : 'Fill Mode Off';
});
undoBtn.addEventListener('click', undoCanvas);
saveBtn.addEventListener('click', saveCanvas);

function saveState() {
    if (undoIndex < canvasHistory.length - 1) {
        canvasHistory = canvasHistory.slice(0, undoIndex + 1);
    }
    canvasHistory.push(canvas.toDataURL());
    undoIndex++;
}

function startDrawingOrFilling(e) {
    if (fillMode) {
        floodFill();
    } else {
        drawing = true;
        draw(e);
    }
}

function stopDrawing() {
    if (drawing) {
        saveState();
    }
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    saveState();
}

function floodFill() {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    saveState();
}

function undoCanvas() {
    if (undoIndex <= 0) {
        clearCanvas();
        return;
    }
    undoIndex--;
    const canvasPic = new Image();
    canvasPic.src = canvasHistory[undoIndex];
    canvasPic.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(canvasPic, 0, 0);
    };
}

function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
}

saveState();
