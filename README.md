# Laxitha Sridhar // Cybersecurity Portfolio

> Final-year B.E. Computer Science Engineering (Cyber Security) · Embedded Systems, Firmware Validation, Application Security & Threat Operations

A cinematic, responsive developer portfolio inspired by the **Watch Dogs** franchise aesthetic and DedSec visual language.

---

## ⚡ Features

- **Watch Dogs / DedSec Visual System**: Custom CRT scanlines, 3D surveillance wireframe grid, ambient audio (`Archangel`), and glitch typography.
- **Dedicated Hacker Typography**: Pixelated DedSec typography (`Silkscreen`) with dynamic horizontal sliced glitch animations.
- **Liquid Gooey Marquee**: SVG threshold filter (`feGaussianBlur` + `feColorMatrix`) creating organic liquid marquee titles inside text cards.
- **Dual Visual Modes**:
  - **Scroll Scrub**: Interactive frame-by-frame scrubbing synchronized with page scroll across 240 4K UHD frames.
  - **Live Video Loop**: Continuous 4K cinematic video playback.
- **Complete Responsive Design**: Optimized across desktop, tablet, and mobile devices (down to 320px).
- **Persistent Resume Dock**: Always-accessible side dock with instant preview and download options for `Laxitha_Sridhar_Resume.pdf`.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), Modern JavaScript (ES6+)
- **Graphics & FX**: Three.js (WebGL Surveillance Grid), Canvas 2D frame rendering, SVG filters
- **Audio**: Web Audio API / HTML5 Audio

---

## 📂 Repository Structure

```text
├── index.html                 # Main website interface
├── css/
│   └── styles.css             # Design system, theme tokens, gooey filter, responsive queries
├── js/
│   ├── app.js                 # Scroll scrubbing, WebGL grid, HUD telemetry, audio controller
│   └── three.min.js           # Three.js 3D library
├── frames/                    # 4K UHD video scrub frames (240 frames)
├── hero-video.mp4             # 4K UHD continuous video loop
├── archangel.mp3              # Ambient soundtrack
└── Laxitha_Sridhar_Resume.pdf # Authentic verified resume
```

---

## 🚀 Local Development

Serve the repository with any local HTTP server:

```bash
# Python 3
python3 -m http.server 3000

# or Node.js / npx
npx serve .
```

Open `http://localhost:3000/` in your browser.

---

## 📬 Contact

- **Email**: laxitasridhar@gmail.com
- **GitHub**: [github.com/Laxitha](https://github.com/Laxitha)
- **LinkedIn**: [linkedin.com/in/laxitha-sridhar](https://www.linkedin.com/in/laxitha-sridhar)
