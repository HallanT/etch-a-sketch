// Select the elements on the page - canvas, shake button
const canvas = document.querySelector('#etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// Set up canvas for drawing
const { width, height } = canvas;

// Create random x and y starting points
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

let hue = 0;
ctx.beginPath(); // Start the drawing
ctx.moveTo(x, y); // Move the cursor
ctx.lineTo(x, y);
ctx.stroke();

// Draw function
function draw({ key }) {
        hue += 1;
        ctx.strokeStyle = `hsl(${hue}, 80%, 50%)`;
        ctx.beginPath();
        ctx.moveTo(x, y);
        switch (key) {
                case 'ArrowUp':
                        y -= MOVE_AMOUNT;
                        break;
                case 'ArrowDown':
                        y += MOVE_AMOUNT;
                        break;
                case 'ArrowLeft':
                        x -= MOVE_AMOUNT;
                        break;
                case 'ArrowRight':
                        x += MOVE_AMOUNT;
                        break;
                default:
                        break;
        }
        ctx.lineTo(x, y);
        ctx.stroke();
}
// Handler for the keys
function handleKey(e) {
        if (e.key.includes('Arrow')) {
                e.preventDefault(); // prevents scrolling of the screen
                draw({ key: e.key });
        }
}

// Clear/shake function
function clearCanvas() {
        canvas.classList.add('shake');
        ctx.clearRect(0, 0, width, height);
        canvas.addEventListener(
                'animationend',
                function() {
                        canvas.classList.remove('shake');
                },
                { once: true }
        );
}

// Listen for arrow keys
window.addEventListener('keydown', handleKey);
shakebutton.addEventListener('click', clearCanvas);
