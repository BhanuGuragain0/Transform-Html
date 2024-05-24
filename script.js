const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const boxes = [];

class Box {
    constructor(x, y, dx, dy, width, height, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.width = width;
        this.height = height;
        this.color = color;
        this.maxSpeed = 4;
    }

    draw() {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.height);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'white');
        ctx.fillStyle = gradient;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;

        if (this.x + this.width >= canvas.width || this.x <= 0) {
            this.dx = -this.dx;
            this.color = 'blue';
        }
        if (this.y + this.height >= canvas.height || this.y <= 0) {
            this.dy = -this.dy;
            this.color = 'yellow';
        }

        // Limiting speed
        this.dx = Math.min(Math.max(this.dx, -this.maxSpeed), this.maxSpeed);
        this.dy = Math.min(Math.max(this.dy, -this.maxSpeed), this.maxSpeed);

        this.draw();
    }
}

function init() {
    for (let i = 0; i < 5; i++) {
        const width = Math.random() * 100 + 50;
        const height = Math.random() * 100 + 50;
        const x = Math.random() * (canvas.width - width);
        const y = Math.random() * (canvas.height - height);
        const dx = (Math.random() - 0.5) * 4;
        const dy = (Math.random() - 0.5) * 4;
        const colorArray = ['#FF3CAC', '#CCFF00', '#FF9000', '#4BFF00', '#00BFFF'];
        const color = colorArray[Math.floor(Math.random() * colorArray.length)];
        boxes.push(new Box(x, y, dx, dy, width, height, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    boxes.forEach(box => {
        box.update();
    });
}

init();
animate();
