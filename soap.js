// Place this in a new file or in a <script> tag after your bubbles in the HTML

// Settings
const NUM_BUBBLES = 3;
const BUBBLE_MIN_SIZE = 120;
const BUBBLE_MAX_SIZE = 200;
const SPEED_MIN = 0.4;
const SPEED_MAX = 1.2;

// Get viewport size
function getViewport() {
    return {
        width: window.innerWidth,
        height: window.innerHeight
    };
}

// Bubble logic
class Bubble {
    constructor(el) {
        this.el = el;
        this.size = Math.random() * (BUBBLE_MAX_SIZE - BUBBLE_MIN_SIZE) + BUBBLE_MIN_SIZE;
        this.x = Math.random() * (getViewport().width - this.size);
        this.y = Math.random() * (getViewport().height - this.size);
        this.angle = Math.random() * 2 * Math.PI;
        this.speed = Math.random() * (SPEED_MAX - SPEED_MIN) + SPEED_MIN;
        this.dx = Math.cos(this.angle) * this.speed;
        this.dy = Math.sin(this.angle) * this.speed;
        this.setStyle();
    }

    setStyle() {
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;
        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }

    move() {
        const vp = getViewport();
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off edges
        if (this.x <= 0 || this.x + this.size >= vp.width) this.dx *= -1;
        if (this.y <= 0 || this.y + this.size >= vp.height) this.dy *= -1;

        this.setStyle();
    }
}

// Initialize bubbles
document.addEventListener("DOMContentLoaded", () => {
    const bubbles = Array.from(document.querySelectorAll('.bubble'));
    const sizes = [200, 120, 80]; // Large, medium, small
    const speeds = [0.5, 0.7, 1.1]; // px per frame, different for each bubble
    const angles = [Math.PI / 4, Math.PI / 2, Math.PI / 3]; // initial directions

    // Set initial size and random position for each bubble
    bubbles.forEach((bubble, i) => {
        bubble.style.width = `${sizes[i]}px`;
        bubble.style.height = `${sizes[i]}px`;
        bubble.dataset.size = sizes[i];
        // Place randomly but fully inside viewport
        bubble.dataset.x = Math.random() * (window.innerWidth - sizes[i]);
        bubble.dataset.y = Math.random() * (window.innerHeight - sizes[i]);
        bubble.dataset.angle = angles[i] + Math.random();
    });

    function animate() {
        bubbles.forEach((bubble, i) => {
            let x = parseFloat(bubble.dataset.x);
            let y = parseFloat(bubble.dataset.y);
            let angle = parseFloat(bubble.dataset.angle);
            const size = parseFloat(bubble.dataset.size);

            // Move in a gentle circular path
            x += Math.cos(angle) * speeds[i];
            y += Math.sin(angle) * speeds[i];

            // Bounce off edges
            if (x < 0) { x = 0; bubble.dataset.angle = Math.PI - angle; }
            if (x + size > window.innerWidth) { x = window.innerWidth - size; bubble.dataset.angle = Math.PI - angle; }
            if (y < 0) { y = 0; bubble.dataset.angle = -angle; }
            if (y + size > window.innerHeight) { y = window.innerHeight - size; bubble.dataset.angle = -angle; }

            // Slowly change direction for organic movement
            bubble.dataset.angle = (parseFloat(bubble.dataset.angle) + (Math.random() - 0.5) * 0.03).toString();

            bubble.dataset.x = x;
            bubble.dataset.y = y;
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
        });
        requestAnimationFrame(animate);
    }
    animate();

    // Re-contain on resize
    window.addEventListener('resize', () => {
        bubbles.forEach((bubble, i) => {
            const size = parseFloat(bubble.dataset.size);
            bubble.dataset.x = Math.min(parseFloat(bubble.dataset.x), window.innerWidth - size);
            bubble.dataset.y = Math.min(parseFloat(bubble.dataset.y), window.innerHeight - size);
        });
    });
});