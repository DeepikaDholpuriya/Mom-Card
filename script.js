let currentPage = 1;
const totalPages = 4;
const card = document.querySelector('.card');
const bgMusic = document.getElementById('bg-music');
const confettiCanvas = document.getElementById('confetti-canvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];

// Page elements
const pages = [
    document.getElementById('page1'),
    document.getElementById('page2'),
    document.getElementById('page3'),
    document.getElementById('page4')
];

function showNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        card.style.transform = `rotateY(${(currentPage - 1) * -90}deg)`;
    }
}

function showPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        card.style.transform = `rotateY(${(currentPage - 1) * -90}deg)`;
    }
}

pages.forEach((page, index) => {
    page.addEventListener('click', (event) => {
        if (event.target.classList.contains('back-button')) {
            showPreviousPage();
        } else if (currentPage === 1 && index === 0) {
            bgMusic.play();
            startConfetti();
            showNextPage();
        } else if (currentPage === index + 1) {
            showNextPage();
        }
    });
});

function startConfetti() {
    confettiParticles = Array.from({ length: 100 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 3 + 2,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`
    }));
    requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles.forEach(particle => {
        particle.y += particle.speed;
        if (particle.y > confettiCanvas.height) particle.y = -particle.size;
        ctx.fillStyle = particle.color;
        ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
    });
    requestAnimationFrame(updateConfetti);
}

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
