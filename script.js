const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear');
const colorPicker = document.getElementById('color-picker');

let drawing = false;
let color = '#000000';

canvas.addEventListener('mousedown', () => {
    drawing = true;
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);
clearBtn.addEventListener('click', clearCanvas);
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

function draw(e) {
    if (!drawing) return;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
