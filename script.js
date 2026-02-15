/**
 * Fungsi untuk memeriksa PIN
 */
function checkPin() {
    const pin = document.getElementById('pin-input').value;
    // PIN disesuaikan dengan input awal: 170206
    if (pin === '170206') {
        document.getElementById('login-overlay').style.opacity = 0;
        
        // Memutar musik saat berhasil login
        const music = document.getElementById('bg-music');
        if (music) {
            music.play().catch(e => console.log("Audio play prevented by browser:", e));
        }

        setTimeout(() => {
            document.getElementById('login-overlay').style.display = 'none';
            document.getElementById('main-app').classList.add('unlocked');
        }, 800);
    } else {
        const input = document.getElementById('pin-input');
        const msg = document.getElementById('error-msg');
        msg.style.display = 'block';
        input.classList.add('shake');
        input.value = '';
        setTimeout(() => input.classList.remove('shake'), 300);
    }
}

// Support tombol Enter pada input PIN
document.getElementById('pin-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkPin();
});

/**
 * Logika Navigasi Slide
 */
let currentSlide = 1;
const totalSlides = 5;

function updateUI() {
    // Update visibilitas halaman dan dot navigasi
    for(let i=1; i<=totalSlides; i++) {
        const page = document.getElementById(`page${i}`);
        const dot = document.getElementById(`dot${i}`);
        
        if(i === currentSlide) {
            page.classList.add('active');
            dot.classList.add('active');
        } else {
            page.classList.remove('active');
            dot.classList.remove('active');
        }
    }
    
    const btnBack = document.getElementById('btn-back');
    const btnNext = document.getElementById('btn-next');
    
    // Sembunyikan tombol back di slide pertama
    if(currentSlide === 1) btnBack.classList.add('hidden');
    else btnBack.classList.remove('hidden');

    // Ubah tombol Next menjadi Replay di slide terakhir
    if(currentSlide === totalSlides) {
        btnNext.innerHTML = 'Replay <i class="fas fa-redo"></i>';
        btnNext.onclick = function() { location.reload(); };
        startFlowers(); // Jalankan efek bunga jatuh
    } else {
        btnNext.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        btnNext.onclick = nextSlide;
    }
}

function nextSlide() {
    if(currentSlide < totalSlides) {
        currentSlide++;
        updateUI();
    }
}

function prevSlide() {
    if(currentSlide > 1) {
        currentSlide--;
        updateUI();
    }
}

/**
 * Efek Visual (Sparkles & Flowers)
 */
function createSparkles() {
    const container = document.getElementById('sparkle-container');
    if (!container) return;
    
    for(let i=0; i<30; i++) {
        const el = document.createElement('div');
        el.classList.add('sparkle');
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 5 + 5) + 's';
        el.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(el);
    }
}

function startFlowers() {
    const container = document.getElementById('flower-container');
    if (!container) return;
    
    const flowers = ['🌸', '🌹', '🌻', '🌷', '💐'];
    // Interval pembuatan bunga
    const flowerInterval = setInterval(() => {
        // Berhenti membuat bunga jika slide berpindah (opsional)
        if (currentSlide !== totalSlides) {
            clearInterval(flowerInterval);
            return;
        }

        const el = document.createElement('div');
        el.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        el.style.position = 'absolute';
        el.style.fontSize = Math.random() * 20 + 20 + 'px';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = '-50px';
        el.style.zIndex = '10';
        el.style.animation = `fallFlower ${Math.random() * 3 + 3}s linear forwards`;
        
        container.appendChild(el);
        
        // Hapus elemen setelah jatuh agar tidak membebani memori
        setTimeout(() => el.remove(), 6000);
    }, 300);
}

// Inisialisasi efek saat file dimuat
createSparkles();

// Tambahkan Keyframes Animation secara dinamis melalui JS
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
    @keyframes fallFlower { to { transform: translateY(110vh) rotate(360deg); } }
    @keyframes floatCake { from { transform: translateY(0); } to { transform: translateY(-20px); } }
    .shake { animation: shake 0.3s ease-in-out; }
    @keyframes shake { 
        0%, 100% { transform: translateX(0); } 
        25% { transform: translateX(-10px); } 
        75% { transform: translateX(10px); } 
    }
`;
document.head.appendChild(styleSheet);