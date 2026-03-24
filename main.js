/* ===== THREE.JS HERO SCENE ===== */
(function initHero() {
  const canvas = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 5);

  // Ambient + directional lights
  scene.add(new THREE.AmbientLight(0x111133, 2));
  const dirLight = new THREE.DirectionalLight(0x00d4ff, 3);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  const purpleLight = new THREE.PointLight(0xa855f7, 4, 20);
  purpleLight.position.set(-4, 2, 2);
  scene.add(purpleLight);

  // Laptop group
  const laptopGroup = new THREE.Group();
  scene.add(laptopGroup);

  // Base (keyboard)
  const baseGeo = new THREE.BoxGeometry(3, 0.15, 2);
  const baseMat = new THREE.MeshPhongMaterial({ color: 0x1a1a2e, shininess: 80 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  laptopGroup.add(base);

  // Screen
  const screenGeo = new THREE.BoxGeometry(3, 2, 0.1);
  const screenMat = new THREE.MeshPhongMaterial({ color: 0x0d0d1a, shininess: 120 });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 1.1, -0.95);
  screen.rotation.x = -0.2;
  laptopGroup.add(screen);

  // Screen glow plane
  const glowGeo = new THREE.PlaneGeometry(2.7, 1.7);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00d4ff, transparent: true, opacity: 0.08
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, 1.1, -0.89);
  glow.rotation.x = -0.2;
  laptopGroup.add(glow);

  // Keyboard keys (grid of small boxes)
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 12; c++) {
      const keyGeo = new THREE.BoxGeometry(0.18, 0.04, 0.16);
      const keyMat = new THREE.MeshPhongMaterial({ color: 0x222244 });
      const key = new THREE.Mesh(keyGeo, keyMat);
      key.position.set(-1.1 + c * 0.2, 0.1, -0.6 + r * 0.22);
      laptopGroup.add(key);
    }
  }

  laptopGroup.position.set(0, -0.5, 0);
  laptopGroup.rotation.x = 0.2;

  // Floating particles
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({ color: 0x00d4ff, size: 0.04, transparent: true, opacity: 0.6 });
  scene.add(new THREE.Points(particleGeo, particleMat));

  // Circuit ring
  const ringGeo = new THREE.TorusGeometry(3.5, 0.02, 8, 80);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.3 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 2;
  scene.add(ring1);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.5, 0.015, 8, 80), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.2 }));
  ring2.rotation.x = Math.PI / 3;
  scene.add(ring2);

  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  let t = 0;
  function animate() {
    requestAnimationFrame(animate);
    t += 0.01;
    laptopGroup.rotation.y = mouseX * 0.3 + Math.sin(t * 0.5) * 0.1;
    laptopGroup.rotation.x = 0.2 - mouseY * 0.1;
    laptopGroup.position.y = -0.5 + Math.sin(t * 0.8) * 0.1;
    ring1.rotation.z += 0.003;
    ring2.rotation.z -= 0.002;
    glowMat.opacity = 0.06 + Math.sin(t * 2) * 0.03;
    renderer.render(scene, camera);
  }
  animate();
})();

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});
document.getElementById('hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.about-card, .service-card, .product-card, .review-card, .gallery-item, .contact-info, .map-wrap, .booking-form');
revealEls.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

/* ===== PRODUCTS DATA ===== */
const products = {
  budget: [
    { name: 'HP 15 Core i3', specs: 'Intel i3 10th Gen\n8GB RAM | 256GB SSD\n15.6" FHD Display', price: '₹14,500', icon: '💻' },
    { name: 'Dell Inspiron 3501', specs: 'Intel i3 11th Gen\n4GB RAM | 1TB HDD\n15.6" HD Display', price: '₹12,000', icon: '💻' },
    { name: 'Lenovo IdeaPad 3', specs: 'AMD Ryzen 3\n8GB RAM | 512GB SSD\n15.6" FHD Display', price: '₹13,500', icon: '💻' },
  ],
  business: [
    { name: 'Dell Latitude 5490', specs: 'Intel i5 8th Gen\n16GB RAM | 512GB SSD\n14" FHD IPS', price: '₹22,000', icon: '🖥️' },
    { name: 'HP EliteBook 840', specs: 'Intel i7 8th Gen\n16GB RAM | 512GB SSD\n14" FHD Touch', price: '₹28,000', icon: '🖥️' },
    { name: 'Lenovo ThinkPad T480', specs: 'Intel i5 8th Gen\n16GB RAM | 256GB SSD\n14" FHD IPS', price: '₹24,000', icon: '🖥️' },
  ],
  gaming: [
    { name: 'ASUS ROG Strix G15', specs: 'AMD Ryzen 7\n16GB RAM | 512GB SSD\nNVIDIA GTX 1650', price: '₹45,000', icon: '🎮' },
    { name: 'Lenovo Legion 5', specs: 'AMD Ryzen 5\n8GB RAM | 512GB SSD\nNVIDIA GTX 1650Ti', price: '₹38,000', icon: '🎮' },
    { name: 'HP Pavilion Gaming', specs: 'Intel i5 10th Gen\n8GB RAM | 512GB SSD\nNVIDIA GTX 1650', price: '₹35,000', icon: '🎮' },
  ]
};

function renderProducts(cat) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  products[cat].forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
      <div class="product-img">${p.icon}</div>
      <div class="product-body">
        <div class="product-badge">${cat.charAt(0).toUpperCase() + cat.slice(1)}</div>
        <h3>${p.name}</h3>
        <div class="product-specs">${p.specs.replace(/\n/g, '<br>')}</div>
        <div class="product-price">${p.price}</div>
      </div>
      <div class="product-overlay"><span style="color:#00d4ff;font-size:0.9rem;font-family:Orbitron">Enquire Now →</span></div>
    `;
    card.addEventListener('click', () => {
      window.open(`https://wa.me/918160384043?text=Hi%2C+I+am+interested+in+${encodeURIComponent(p.name)}`, '_blank');
    });
    grid.appendChild(card);
    observer.observe(card);
  });
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProducts(tab.dataset.cat);
  });
});
renderProducts('budget');

/* ===== REVIEWS SLIDER ===== */
const reviewCards = document.querySelectorAll('.review-card');
const dotsContainer = document.getElementById('slider-dots');
let currentReview = 0;

reviewCards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goToReview(i));
  dotsContainer.appendChild(dot);
});

function goToReview(idx) {
  reviewCards[currentReview].classList.remove('active');
  dotsContainer.children[currentReview].classList.remove('active');
  currentReview = idx;
  reviewCards[currentReview].classList.add('active');
  dotsContainer.children[currentReview].classList.add('active');
}

setInterval(() => goToReview((currentReview + 1) % reviewCards.length), 4000);

/* ===== GALLERY ===== */
const galleryItems = [
  { icon: '🖥️', label: 'Store Front' },
  { icon: '💻', label: 'Laptop Display' },
  { icon: '🔧', label: 'Repair Station' },
  { icon: '📦', label: 'Stock Room' },
  { icon: '⚙️', label: 'Hardware Lab' },
  { icon: '🖱️', label: 'Accessories' },
  { icon: '🔋', label: 'Battery Stock' },
  { icon: '📱', label: 'Devices' },
  { icon: '🛠️', label: 'Tools' },
  { icon: '💾', label: 'Storage' },
  { icon: '🖨️', label: 'Peripherals' },
  { icon: '🎮', label: 'Gaming Zone' },
];

const galleryGrid = document.getElementById('gallery-grid');
galleryItems.forEach(item => {
  const el = document.createElement('div');
  el.className = 'gallery-item reveal';
  el.innerHTML = `${item.icon}<div class="overlay">🔍</div>`;
  el.title = item.label;
  el.addEventListener('click', () => {
    document.getElementById('lb-img').src = '';
    document.getElementById('lb-img').alt = item.label;
    document.getElementById('lb-img').style.display = 'none';
    const lb = document.getElementById('lightbox');
    lb.classList.remove('hidden');
    lb.querySelector('#lb-close').focus();
    // Show emoji in lightbox as placeholder
    lb.style.fontSize = '8rem';
    lb.innerHTML = `<button id="lb-close" style="position:absolute;top:24px;right:32px;background:none;border:none;color:#fff;font-size:2rem;cursor:pointer">✕</button><div style="font-size:8rem">${item.icon}</div><p style="color:#94a3b8;margin-top:16px;font-size:1rem">${item.label}</p>`;
    document.getElementById('lb-close').addEventListener('click', () => lb.classList.add('hidden'));
  });
  galleryGrid.appendChild(el);
  observer.observe(el);
});

document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) {
    document.getElementById('lightbox').classList.add('hidden');
  }
});

/* ===== BOOKING FORM ===== */
document.getElementById('booking-form').addEventListener('submit', e => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input, select, textarea');
  let name = '', phone = '', service = '', msg = '';
  inputs.forEach(inp => {
    if (inp.placeholder === 'Your Name') name = inp.value;
    if (inp.placeholder === 'Phone Number') phone = inp.value;
    if (inp.tagName === 'SELECT') service = inp.value;
    if (inp.tagName === 'TEXTAREA') msg = inp.value;
  });
  const text = `Hi, I want to book an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${service}\nMessage: ${msg}`;
  window.open(`https://wa.me/918160384043?text=${encodeURIComponent(text)}`, '_blank');
});

/* ===== GSAP SCROLL ANIMATIONS (if loaded) ===== */
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('#about .section-title', { scrollTrigger: '#about', y: 40, opacity: 0, duration: 0.8 });
  gsap.from('#products .section-title', { scrollTrigger: '#products', y: 40, opacity: 0, duration: 0.8 });
  gsap.from('#services .section-title', { scrollTrigger: '#services', y: 40, opacity: 0, duration: 0.8 });
}
