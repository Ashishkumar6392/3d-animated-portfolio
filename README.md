# Ashish Kumar — 3D Animated Portfolio

A ready-to-customize React + Vite personal portfolio featuring a real interactive WebGL 3D object, GSAP scroll animations, project showcase, responsive design and accessible fallback for devices without WebGL.

## Requirements
- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the localhost URL displayed by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```
`dist/` is the deployable output.

## File structure
```
ashish-3d-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── README.md
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles.css
    ├── data/
    │   └── portfolio.js
    └── components/
        ├── OrbScene.jsx
        └── ProjectCard.jsx
```

## Edit your details
1. Open `src/data/portfolio.js`.
2. Replace `your-email@example.com` with your real contact email, and optionally supply `linkedin`.
3. Replace or expand the `projects` array with your own working live URLs and GitHub repos. The sample projects are editable; check links and descriptions before public launch.
4. Change colors and fonts in `src/styles.css`.
5. The interactive 3D sculpture lives in `src/components/OrbScene.jsx`. It uses procedural geometries, so no external `.glb` assets are needed.
6. Update title and description in `index.html`.

## Deploy
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Vercel**: framework `Vite`, build command `npm run build`, output directory `dist`.
- **GitHub**: commit project files but never commit `node_modules` or `dist`.

## Used technology
- React 19 + Vite
- Three.js, React Three Fiber, Drei
- GSAP ScrollTrigger, @gsap/react
- Lucide React icons
- Plain responsive CSS

## Performance and accessibility
3D renders at limited DPR, falls back to a CSS visual if WebGL is unavailable, and CSS motion honors the OS reduced-motion preference. For very low-powered devices you can also conditionally disable the 3D canvas.

## Important
The contact button uses `mailto:` rather than a backend form. Set your email address before publishing. No secret keys or backend are needed.
