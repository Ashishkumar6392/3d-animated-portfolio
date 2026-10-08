import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Mail, Menu, X, Code2, Globe2, Sparkles, Layers3 } from 'lucide-react';
import OrbScene from './components/OrbScene.jsx';
import ProjectCard from './components/ProjectCard.jsx';
import { profile, projects, skills } from './data/portfolio.js';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sections = [ ['work','Work'], ['about','About'], ['skills','Skills'], ['contact','Contact'] ];

export default function App() {
  const root = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useGSAP(() => {
    if (reducedMotion) {
      gsap.set('.hero-reveal, .reveal', { opacity: 1, y: 0 });
      return;
    }
    gsap.from('.hero-reveal', { y: 48, opacity: 0, duration: 1.05, stagger: 0.14, ease: 'power3.out', delay: 0.12 });
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 44 }, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  }, { scope: root, dependencies: [reducedMotion], revertOnUpdate: true });

  const navigate = () => setMenuOpen(false);
  return (
    <div ref={root} className="site-shell" id="top">
      <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden="true" />
      <header className="site-header">
        <a className="logo" href="#top" onClick={navigate} aria-label="Go to top">AK<span className="logo-dot">.</span><span className="logo-sub">/dev</span></a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {sections.map(([id,label]) => <a key={id} href={`#${id}`} onClick={navigate}>{label}</a>)}
          <a className="nav-cta mobile-cta" href={`mailto:${profile.email}`} onClick={navigate}>Let's talk <ArrowUpRight size={15}/></a>
        </nav>
        <a className="nav-cta desktop-cta" href="#contact">Let's talk <ArrowUpRight size={15}/></a>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(value => !value)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="availability hero-reveal"><span className="pulse-dot"/> AVAILABLE FOR FREELANCE PROJECTS</div>
            <p className="eyebrow hero-reveal">HELLO WORLD, I'M ASHISH <span className="wave">✳</span></p>
            <h1 id="hero-title" className="hero-reveal">Crafting<br/><span className="gradient-text">digital</span><br/>experiences<span className="heading-period">.</span></h1>
            <p className="hero-desc hero-reveal">{profile.intro} <span>From idea to launch.</span></p>
            <div className="hero-actions hero-reveal"><a className="button-primary" href="#work">Explore my work <ArrowUpRight size={18}/></a><a className="button-secondary" href="#contact">Get in touch <ArrowRight size={18}/></a></div>
            <div className="hero-footer hero-reveal"><div className="avatar-mark">AK</div><div><strong>{profile.name}</strong><small>{profile.title} · {profile.location}</small></div><div className="hero-footer-line"/><span className="hero-index">01 / 04</span></div>
          </div>
          <div className="hero-art" aria-label="Interactive 3D abstract sculpture">
            <div className="art-glow"/>
            <OrbScene />
            <div className="orbit-note orbit-note-top"><Sparkles size={14}/> BUILD / CREATE / EXPLORE</div>
            <div className="orbit-note orbit-note-bottom"><span className="tiny-star">✳</span> INFINITE POSSIBILITIES</div>
            <div className="art-axis">INTERACTIVE 3D OBJECT <span>↗</span></div>
          </div>
          <a className="scroll-cue" href="#work">SCROLL TO EXPLORE <ArrowDown size={15}/></a>
        </section>

        <section className="ticker" aria-label="My focus areas"><div className="ticker-track">{Array.from({length: 4}, (_,i) => <span key={i}>FULL STACK DEVELOPMENT <b>✳</b> CREATIVE FRONTEND <b>✳</b> 3D WEB EXPERIENCES <b>✳</b> PRODUCT ENGINEERING <b>✳</b></span>)}</div></section>

        <section className="section container" id="work" aria-labelledby="work-title">
          <div className="section-heading reveal"><div><p className="section-kicker"><span>01 / SELECTED WORK</span> <span className="kicker-line"/></p><h2 id="work-title">Featured <em>projects.</em></h2></div><p>A small selection of products I've designed and developed, each made with care and curiosity.</p></div>
          <div className="projects-grid">{projects.map(project => <ProjectCard key={project.number} project={project}/>)}</div>
          <a className="text-link reveal" href={profile.github} target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={20}/></a>
        </section>

        <section className="about-section" id="about" aria-labelledby="about-title"><div className="container about-grid"><div className="about-art reveal"><div className="about-graphic"><span className="about-asterisk">✳</span><div className="about-graphic-ring"/><span className="about-graphic-caption">CODE IS MY CANVAS / 2026</span></div><span className="about-caption">THINK BIG. BUILD BETTER.</span></div><div className="about-copy reveal"><p className="section-kicker">02 / A LITTLE ABOUT ME</p><h2 id="about-title">Developer by logic.<br/><em>Creator by nature.</em></h2><p>I'm {profile.name}, a full-stack developer who enjoys turning ambitious ideas into real-world web applications. My work brings together clean engineering, visual storytelling and experiences that feel alive.</p><p>I've worked on institute-management platforms, productivity tools and AI-powered web apps. These days, I'm exploring the space where interactive 3D meets useful software.</p><div className="about-stats"><div><strong>3<span>+</span></strong><small>FEATURED PROJECTS</small></div><div><strong>∞</strong><small>IDEAS TO BUILD</small></div></div></div></div></section>

        <section className="section container skills-section" id="skills" aria-labelledby="skills-title"><div className="section-heading reveal"><div><p className="section-kicker">03 / MY TOOLKIT</p><h2 id="skills-title">Built with <em>curiosity.</em></h2></div><p>A mix of technologies I use to bring complex ideas to life.</p></div><div className="skills-layout"><div className="skill-intro reveal"><div className="skill-icons"><div><Code2/></div><div><Layers3/></div><div><Globe2/></div></div><h3>Always learning.<br/>Always creating.</h3><p>Great digital experiences are a result of sharp engineering and obsessive attention to detail.</p></div><div className="skills-cloud reveal">{skills.map((skill, i) => <span key={skill} className={i%4===0?'skill-pill featured':'skill-pill'}>{skill}<span className="skill-sparkle">✦</span></span>)}</div></div></section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title"><div className="container contact-inner reveal"><p className="section-kicker">04 / LET'S CONNECT</p><div className="contact-star">✳</div><h2 id="contact-title">Have an idea?<br/><span className="gradient-text">Let's make it real.</span></h2><p>Whether it's a new product, an interesting collaboration, or a simple hello — I'd love to hear from you.</p><a className="contact-button" href={`mailto:${profile.email}?subject=Let's%20build%20something`}>Let's start a conversation <ArrowUpRight size={23}/></a><div className="contact-links"><a href={profile.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a>{profile.linkedin && <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={16}/></a>}<a href={`mailto:${profile.email}`}><Mail size={18}/> Email</a></div></div></section>
      </main>
      <footer className="site-footer container"><span>© {new Date().getFullYear()} {profile.name}. Crafted with code and curiosity.</span><a href="#top">BACK TO TOP ↑</a></footer>
    </div>
  );
}
