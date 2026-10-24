/**
 * WATCH DOGS CYBERSECURITY PORTFOLIO — INTERACTIVE ENGINE
 * Laxitha Sridhar // Cybersecurity Specialist
 * 4K Scrollytelling & 3D Holographic Cyberpunk Background
 */

document.addEventListener('DOMContentLoaded', () => {
    initAudioEngine();
    initHeroScrollytelling();
    initHolographicCyberpunkBackground();
    initTerminalDispatch();
    initNavigationTracker();
    initResumeDock();
});

/* ==========================================================================
   1. AUDIO ENGINE — ARCHANGEL SOUNDTRACK & TACTICAL SFX
   ========================================================================== */

let audioCtx = null;
let audioPlaying = false;

function initAudioEngine() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    const bgAudio = document.getElementById('bg-audio');
    if (!toggleBtn || !bgAudio) return;

    bgAudio.volume = 0.5;

    toggleBtn.addEventListener('click', () => {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        if (!audioPlaying) {
            bgAudio.play().then(() => {
                audioPlaying = true;
                updateAudioBtnUI(true);
                playAccessTone();
            }).catch(err => {
                console.warn('Audio playback failed:', err);
            });
        } else {
            bgAudio.pause();
            audioPlaying = false;
            updateAudioBtnUI(false);
        }
    });

    function updateAudioBtnUI(isOn) {
        toggleBtn.classList.toggle('active', isOn);
        toggleBtn.innerHTML = isOn
            ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg> <span>AUDIO: ON</span>`
            : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg> <span>AUDIO: OFF</span>`;
    }

    // Interactive SFX blips on clickable elements
    document.querySelectorAll('a, button, .skill-pill, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', () => playTacticalHover());
        el.addEventListener('click', () => playTacticalClick());
    });
}

function playTacticalHover() {
    if (!audioPlaying || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.03);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {}
}

function playTacticalClick() {
    if (!audioPlaying || !audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(500, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1800, audioCtx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.04);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.04);
    } catch (e) {}
}

function playAccessTone() {
    if (!audioCtx) return;
    try {
        const now = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.linearRampToValueAtTime(0, now + 0.16);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
    } catch (e) {}
}

/* ==========================================================================
   2. HERO SCROLLYTELLING ENGINE (4K ULTRA-HIGH DEFINITION 240-FRAME SCRUBBING)
   Ultra-crisp 4K canvas rendering, completely unobstructed, smooth on scroll.
   ========================================================================== */

function initHeroScrollytelling() {
    const canvas = document.getElementById('hero-canvas');
    const video = document.getElementById('hero-video');
    const scrollContainer = document.querySelector('.hero-scroll-container');
    const heroIdentityTag = document.querySelector('.hero-identity-tag');
    const modeBtnScrub = document.getElementById('btn-mode-scrub');
    const modeBtnVideo = document.getElementById('btn-mode-video');

    if (!canvas || !scrollContainer) return;

    const ctx = canvas.getContext('2d');
    const TOTAL_FRAMES = 240;
    const images = [];
    let loadedCount = 0;
    let currentFrame = 1;
    let targetFrame = 1;
    let isVideoMode = false;

    // 4K Sharpness Scaling
    function resizeCanvas() {
        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        renderFrame(Math.round(currentFrame));
    }
    window.addEventListener('resize', resizeCanvas);

    function getFramePath(index) {
        const padded = String(index).padStart(3, '0');
        return `frames/ezgif-frame-${padded}.jpg`;
    }

    // Progressive loading of all 240 frames
    function loadFrames() {
        const firstImg = new Image();
        firstImg.src = getFramePath(1);
        firstImg.onload = () => {
            images[1] = firstImg;
            loadedCount++;
            resizeCanvas();
            renderFrame(1);
            preloadBatch(2, TOTAL_FRAMES);
        };
    }

    function preloadBatch(start, end) {
        for (let i = start; i <= end; i++) {
            const img = new Image();
            img.src = getFramePath(i);
            img.onload = () => {
                images[i] = img;
                loadedCount++;
            };
        }
    }

    // Draw frame onto canvas using 4K aspect-ratio cover
    function renderFrame(frameIdx) {
        frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, frameIdx));

        let img = images[frameIdx];
        if (!img || !img.complete) {
            for (let offset = 1; offset <= 30; offset++) {
                if (images[frameIdx - offset] && images[frameIdx - offset].complete) {
                    img = images[frameIdx - offset];
                    break;
                } else if (images[frameIdx + offset] && images[frameIdx + offset].complete) {
                    img = images[frameIdx + offset];
                    break;
                }
            }
        }

        if (!img || !img.naturalWidth) return;

        const cw = canvas.width;
        const ch = canvas.height;
        const iw = img.naturalWidth;
        const ih = img.naturalHeight;

        const hRatio = cw / iw;
        const vRatio = ch / ih;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (cw - iw * ratio) / 2;
        const centerShiftY = (ch - ih * ratio) / 2;

        ctx.clearRect(0, 0, cw, ch);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, iw, ih, centerShiftX, centerShiftY, iw * ratio, ih * ratio);
    }

    // Calculate frame from scroll position
    function calculateFrame() {
        const containerRect = scrollContainer.getBoundingClientRect();
        const scrollDist = -containerRect.top;
        const maxScroll = scrollContainer.offsetHeight - window.innerHeight;

        if (maxScroll <= 0) return 1;

        const progress = Math.max(0, Math.min(1, scrollDist / maxScroll));
        return Math.min(TOTAL_FRAMES, Math.max(1, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    }

    // Animation loop with smooth lerping
    function updateScrollytelling() {
        if (!isVideoMode) {
            targetFrame = calculateFrame();

            // Buttery frame interpolation
            currentFrame += (targetFrame - currentFrame) * 0.25;
            const displayFrame = Math.round(currentFrame);
            renderFrame(displayFrame);
        }

        // Subtly fade identity tag on deeper scroll so character is completely in focus
        if (heroIdentityTag) {
            const containerRect = scrollContainer.getBoundingClientRect();
            const scrollDist = -containerRect.top;
            const maxScroll = scrollContainer.offsetHeight - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrollDist / maxScroll));

            if (progress > 0.65) {
                const fade = 1 - (progress - 0.65) / 0.25;
                heroIdentityTag.style.opacity = Math.max(0.2, fade);
            } else {
                heroIdentityTag.style.opacity = 1;
            }
        }

        requestAnimationFrame(updateScrollytelling);
    }

    loadFrames();
    requestAnimationFrame(updateScrollytelling);

    // Mode Toggle: Scroll Scrub vs 4K Live Video
    if (modeBtnScrub && modeBtnVideo && video) {
        modeBtnScrub.addEventListener('click', () => {
            isVideoMode = false;
            video.style.display = 'none';
            video.pause();
            canvas.style.display = 'block';
            modeBtnScrub.classList.add('active');
            modeBtnVideo.classList.remove('active');
        });

        modeBtnVideo.addEventListener('click', () => {
            isVideoMode = true;
            canvas.style.display = 'none';
            video.style.display = 'block';
            video.play().catch(e => console.log('Video play policy:', e));
            modeBtnVideo.classList.add('active');
            modeBtnScrub.classList.remove('active');
        });
    }
}

/* ==========================================================================
   3. 3D HOLOGRAPHIC CYBERPUNK BACKGROUND (INSPIRED BY TUMBLR.GIF)
   Palette:
   - Deep wet obsidian tarmac: #03070a, #060d13
   - Electric neon cyan: #00f0ff
   - Hot neon magenta: #ff0055, #ff2a85
   - Warm lantern amber: #ff9d00
   Features:
   - Undulating 3D Holographic Koi / Bio-lattice swimming through space
   - Cyber Skyscraper Monoliths with glowing vertical billboard data lines
   - Wet obsidian holographic floor grid with forward rolling light waves
   - Floating holographic dust particles
   ========================================================================== */

function initHolographicCyberpunkBackground() {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03070a, 0.0022);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1200);
    camera.position.set(0, 20, 260);

    // --------------------------------------------------------------------------
    // A. 3D HOLOGRAPHIC CYBER-KOI (SWIMMING SINUOUS BIO-LATTICE)
    // --------------------------------------------------------------------------
    const koiGroup = new THREE.Group();
    scene.add(koiGroup);

    // Spine segments with articulated wireframe rib rings
    const SEGMENTS = 26;
    const bodyRings = [];
    const spinePoints = [];

    const cyanColor = new THREE.Color(0x00f0ff);
    const magentaColor = new THREE.Color(0xff2a85);
    const amberColor = new THREE.Color(0xff9d00);

    for (let i = 0; i < SEGMENTS; i++) {
        // Tapered radius: head -> body peak -> tail
        const t = i / (SEGMENTS - 1);
        let radius = Math.sin(t * Math.PI) * 16;
        if (i < 4) radius = 8 + i * 2; // Head taper
        if (i > 18) radius = (SEGMENTS - i) * 1.8; // Tail taper

        const ringGeom = new THREE.RingGeometry(radius * 0.7, radius, 16, 1);
        const ringMat = new THREE.MeshBasicMaterial({
            color: cyanColor,
            wireframe: true,
            transparent: true,
            opacity: 0.85,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeom, ringMat);
        ringMesh.position.z = -i * 9;
        koiGroup.add(ringMesh);
        bodyRings.push(ringMesh);
        spinePoints.push(new THREE.Vector3(0, 0, -i * 9));
    }

    // Longitudinal Wireframe Ribs connecting rings
    const longitudinalLinesGeom = new THREE.BufferGeometry();
    const LONG_COUNT = 8;
    const longLinePositions = new Float32Array(LONG_COUNT * (SEGMENTS - 1) * 6);
    longitudinalLinesGeom.setAttribute('position', new THREE.BufferAttribute(longLinePositions, 3));
    const longLinesMat = new THREE.LineBasicMaterial({
        color: cyanColor,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const longitudinalMesh = new THREE.LineSegments(longitudinalLinesGeom, longLinesMat);
    koiGroup.add(longitudinalMesh);

    // Glowing Holographic Fins (Pectoral Left, Right & Tail)
    function createFinGeometry(width, length, segments) {
        const geom = new THREE.PlaneGeometry(width, length, segments, segments);
        return geom;
    }

    const finMat = new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        wireframe: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
    });

    const leftFinGeom = createFinGeometry(24, 38, 8);
    const leftFin = new THREE.Mesh(leftFinGeom, finMat);
    leftFin.position.set(-14, 0, -35);
    leftFin.rotation.x = Math.PI / 4;
    leftFin.rotation.z = -Math.PI / 5;
    koiGroup.add(leftFin);

    const rightFinGeom = createFinGeometry(24, 38, 8);
    const rightFin = new THREE.Mesh(rightFinGeom, finMat);
    rightFin.position.set(14, 0, -35);
    rightFin.rotation.x = Math.PI / 4;
    rightFin.rotation.z = Math.PI / 5;
    koiGroup.add(rightFin);

    // Flowing Tail Fan
    const tailFanGeom = createFinGeometry(28, 48, 10);
    const tailFan = new THREE.Mesh(tailFanGeom, finMat);
    tailFan.position.set(0, 0, -(SEGMENTS * 9));
    tailFan.rotation.x = Math.PI / 2;
    koiGroup.add(tailFan);

    // Internal Bioluminescent Point Light
    const koiLight = new THREE.PointLight(0x00f0ff, 2.5, 200);
    koiLight.position.set(0, 0, -40);
    koiGroup.add(koiLight);

    // --------------------------------------------------------------------------
    // B. CYBER SKYSCRAPER MONOLITHS WITH VERTICAL NEON BILLBOARDS
    // --------------------------------------------------------------------------
    const cityGroup = new THREE.Group();
    scene.add(cityGroup);

    const buildingCount = 10;
    const buildingPositions = [
        [-240, -40, -180], [-310, 0, -320], [-190, 20, -420], [-270, -30, -560],
        [240, -40, -180], [310, 0, -320], [190, 20, -420], [270, -30, -560],
        [-150, 40, -680], [160, 40, -680]
    ];

    buildingPositions.forEach((pos, idx) => {
        const height = 400 + Math.random() * 250;
        const width = 60 + Math.random() * 40;
        const depth = 60 + Math.random() * 40;

        // Dark obsidian tower body
        const towerGeom = new THREE.BoxGeometry(width, height, depth);
        const towerMat = new THREE.MeshBasicMaterial({
            color: 0x050c12,
            wireframe: false
        });
        const tower = new THREE.Mesh(towerGeom, towerMat);
        tower.position.set(pos[0], pos[1] + height / 2 - 120, pos[2]);
        cityGroup.add(tower);

        // Tower Wireframe Edges
        const edgeGeom = new THREE.EdgesGeometry(towerGeom);
        const edgeMat = new THREE.LineBasicMaterial({
            color: 0x0c202d,
            transparent: true,
            opacity: 0.8
        });
        const edgeLines = new THREE.LineSegments(edgeGeom, edgeMat);
        tower.add(edgeLines);

        // Glowing Billboard Strip (Alternate Hot Magenta and Warm Amber)
        const isMagenta = idx % 2 === 0;
        const stripColor = isMagenta ? magentaColor : amberColor;
        const stripHeight = height * 0.55;
        const stripGeom = new THREE.PlaneGeometry(width * 0.65, stripHeight, 1, 12);
        const stripMat = new THREE.MeshBasicMaterial({
            color: stripColor,
            wireframe: true,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            side: THREE.DoubleSide
        });
        const billboard = new THREE.Mesh(stripGeom, stripMat);
        billboard.position.set(0, 0, depth / 2 + 1);
        tower.add(billboard);
    });

    // --------------------------------------------------------------------------
    // C. WET OBSIDIAN TARMAC HOLOGRAPHIC FLOOR GRID
    // --------------------------------------------------------------------------
    const floorGrid = new THREE.GridHelper(800, 40, 0x00f0ff, 0x071b26);
    floorGrid.position.y = -105;
    floorGrid.material.transparent = true;
    floorGrid.material.opacity = 0.55;
    scene.add(floorGrid);

    // Deep Obsidian Water/Tarmac Plane beneath grid
    const floorPlaneGeom = new THREE.PlaneGeometry(1000, 1000);
    const floorPlaneMat = new THREE.MeshBasicMaterial({
        color: 0x03070a,
        side: THREE.DoubleSide
    });
    const floorPlane = new THREE.Mesh(floorPlaneGeom, floorPlaneMat);
    floorPlane.rotation.x = -Math.PI / 2;
    floorPlane.position.y = -106;
    scene.add(floorPlane);

    // --------------------------------------------------------------------------
    // D. FLOATING HOLOGRAPHIC EMBER PARTICLES
    // --------------------------------------------------------------------------
    const particleCount = 220;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 600;
        particlePositions[i * 3 + 1] = -100 + Math.random() * 250;
        particlePositions[i * 3 + 2] = -400 + Math.random() * 500;

        const rand = Math.random();
        let c = cyanColor;
        if (rand > 0.6) c = magentaColor;
        else if (rand > 0.3) c = amberColor;

        particleColors[i * 3] = c.r;
        particleColors[i * 3 + 1] = c.g;
        particleColors[i * 3 + 2] = c.b;
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
        size: 3,
        vertexColors: true,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending
    });

    const emberParticles = new THREE.Points(particleGeom, particleMat);
    scene.add(emberParticles);

    // --------------------------------------------------------------------------
    // E. ANIMATION & SWIMMING DYNAMICS
    // --------------------------------------------------------------------------
    const clock = new THREE.Clock();

    function animateHologram() {
        requestAnimationFrame(animateHologram);

        const time = clock.getElapsedTime();

        // 1. Holographic Cyber-Koi Swimming Trajectory across 3D Space
        // Sinuous orbital figure-eight path through the city canyon
        const swimRadiusX = 140;
        const swimRadiusZ = 180;
        const swimSpeed = time * 0.45;

        const currentX = Math.sin(swimSpeed) * swimRadiusX;
        const currentZ = Math.cos(swimSpeed * 0.8) * swimRadiusZ - 120;
        const currentY = Math.sin(swimSpeed * 1.4) * 35 - 10;

        koiGroup.position.set(currentX, currentY, currentZ);

        // Heading angle tangent to path
        const nextX = Math.sin(swimSpeed + 0.05) * swimRadiusX;
        const nextZ = Math.cos((swimSpeed + 0.05) * 0.8) * swimRadiusZ - 120;
        const nextY = Math.sin((swimSpeed + 0.05) * 1.4) * 35 - 10;

        koiGroup.lookAt(nextX, nextY, nextZ);

        // Sinuous undulating wave along the articulated body rings
        for (let i = 0; i < SEGMENTS; i++) {
            const ring = bodyRings[i];
            const waveOffset = i * 0.28;
            const lateralSway = Math.sin(time * 3.2 - waveOffset) * (i * 0.55);
            const verticalSway = Math.cos(time * 2.2 - waveOffset) * (i * 0.25);

            ring.position.x = lateralSway;
            ring.position.y = verticalSway;

            // Slight rotational twist
            ring.rotation.z = Math.sin(time * 3.2 - waveOffset) * 0.15;
        }

        // Undulate Left and Right Pectoral Fins (Rippling Wings)
        const leftFinPos = leftFin.geometry.attributes.position;
        for (let j = 0; j < leftFinPos.count; j++) {
            const vx = leftFinPos.getX(j);
            leftFinPos.setZ(j, Math.sin(time * 4.5 + vx * 0.15) * 3.5);
        }
        leftFin.geometry.attributes.position.needsUpdate = true;

        const rightFinPos = rightFin.geometry.attributes.position;
        for (let j = 0; j < rightFinPos.count; j++) {
            const vx = rightFinPos.getX(j);
            rightFinPos.setZ(j, Math.sin(time * 4.5 - vx * 0.15) * 3.5);
        }
        rightFin.geometry.attributes.position.needsUpdate = true;

        // Tail fan flexible wave
        const tailPos = tailFan.geometry.attributes.position;
        for (let k = 0; k < tailPos.count; k++) {
            const vy = tailPos.getY(k);
            tailPos.setZ(k, Math.sin(time * 3.5 + vy * 0.12) * 5.5);
        }
        tailFan.geometry.attributes.position.needsUpdate = true;

        // 2. Rolling floor grid towards camera for dynamic wet street illusion
        floorGrid.position.z = (time * 25) % 20;

        // 3. Floating Holographic Ember Dust Drift
        const pPos = emberParticles.geometry.attributes.position;
        for (let p = 0; p < particleCount; p++) {
            let py = pPos.getY(p) + 0.35;
            if (py > 160) py = -100;
            pPos.setY(p, py);
        }
        emberParticles.geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animateHologram();

    // Window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ==========================================================================
   4. TERMINAL DISPATCH TRANSMITTER
   ========================================================================== */

function initTerminalDispatch() {
    const form = document.getElementById('terminal-dispatch-form');
    const sendBtn = document.getElementById('btn-dispatch-send');
    if (!form || !sendBtn) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const originalText = sendBtn.innerHTML;
        sendBtn.innerHTML = `<span>TRANSMITTING...</span>`;
        sendBtn.disabled = true;

        setTimeout(() => {
            sendBtn.innerHTML = `<span>TRANSMISSION CONFIRMED</span>`;
            sendBtn.style.background = 'var(--success-green)';
            sendBtn.style.borderColor = 'var(--success-green)';

            const nameInput = document.getElementById('dispatch-sender-name');
            const emailInput = document.getElementById('dispatch-sender-email');
            const msgInput = document.getElementById('dispatch-sender-msg');

            const mailtoLink = `mailto:laxitasridhar@gmail.com?subject=Inquiry from ${encodeURIComponent(nameInput.value)}&body=${encodeURIComponent(msgInput.value + '\n\nSender Email: ' + emailInput.value)}`;

            setTimeout(() => {
                window.location.href = mailtoLink;
                form.reset();
                sendBtn.innerHTML = originalText;
                sendBtn.disabled = false;
                sendBtn.style.background = '';
                sendBtn.style.borderColor = '';
            }, 1000);
        }, 600);
    });
}

/* ==========================================================================
   5. NAVIGATION TRACKER & MOBILE MENU
   ========================================================================== */

function initNavigationTracker() {
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section, .hero-scroll-container');
    const toggleBtn = document.querySelector('.nav-toggle-btn');
    const navMenu = document.querySelector('.nav-menu');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 120;
            const height = sec.offsetHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '62px';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'rgba(3, 7, 10, 0.98)';
            navMenu.style.padding = '20px 24px';
            navMenu.style.borderBottom = '1px solid var(--border-tactical)';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 992) {
                    navMenu.style.display = 'none';
                }
            });
        });
    }
}

/* ==========================================================================
   6. FLOATING RESUME DOCK CONTROLLER
   ========================================================================== */

function initResumeDock() {
    const dock = document.getElementById('floating-resume-dock');
    const toggleBtn = document.getElementById('dock-toggle-btn');
    if (!dock || !toggleBtn) return;

    if (window.innerWidth <= 768) {
        dock.classList.add('minimized');
    }

    toggleBtn.addEventListener('click', () => {
        dock.classList.toggle('minimized');
        playTacticalClick();
    });
}
