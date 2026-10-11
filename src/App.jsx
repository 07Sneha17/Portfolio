import React, { useEffect, useRef, useState } from 'react';
import PremiumEffects from './PremiumEffects.jsx';
import ContactForm from './ContactForm.jsx';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Github, Linkedin, Mail,
  Menu, X, Code2, Layers3, Sparkles, Monitor, ExternalLink, MapPin, Sun, Moon, FileText, Download
} from 'lucide-react';

const skills = [
  { title: 'Frontend', items: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap'], icon: Monitor },
  { title: 'Tools & workflow', items: ['Git', 'GitHub', 'VS Code', 'React Router'], icon: Code2 },
  { title: 'Programming & data', items: ['Java', 'Python', 'PHP', 'SQL', 'Node.js'], icon: Layers3 },
];

const projects = [
  {
    number: '01',
    name: 'NidrAlert',
    type: 'AI · Safety technology',
    description: 'A drowsiness detection interface designed to help make driving safer through webcam-based monitoring and alert notifications.',
    tags: ['React.js', 'Tailwind CSS', 'JavaScript', 'EAR / MAR'],
    accent: 'mint',
    visual: 'nidr',
    live: '',
    code: 'https://github.com/07Sneha17/NidrAlert',
    note: 'Add your live demo URL when the project is deployed'
  },
  

  {
    number: '02',
    name: 'Coding Ninjas Clone',
    type: 'Frontend · Responsive web',
    description: 'A multi-page website recreation focused on responsive layouts, reusable React components, and smooth page navigation.',
    tags: ['React.js', 'Tailwind CSS', 'React Router'],
    accent: 'violet',
    visual: 'code',
    live: '',
    code: 'https://github.com/07Sneha17/coding-Ninjas-Clone',
    note: 'Add your live demo URL when the project is deployed'
  },
  {
    number: '03',
    name: 'Portfolio Website',
    type: 'Personal brand · Web',
    description: 'A home for my work, technical growth, and experiments — built to make it easy to explore what I create.',
    tags: ['React', 'CSS', 'Responsive design'],
    accent: 'orange',
    visual: 'portfolio',
    live: '',
    code: 'https://github.com/07Sneha17/07Sneha17',
    note: 'Add the portfolio repository URL after pushing it to GitHub'
  },
];

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span className="label-line" />{children}</div>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const menuButtonRef = useRef(null);
  const closeMenu = () => setMenuOpen(false);
  const focusContactForm = () => {
    window.setTimeout(() => {
      document.getElementById('contact-form')?.focus({ preventScroll: true });
    }, 0);
  };
  const navItems = [['About', '#about'], ['Skills', '#skills'], ['Experience', '#experience'], ['Projects', '#projects'], ['Contact', '#contact']];

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <div className={`site-shell ${theme === 'light' ? 'light-theme' : ''}`}>
      <PremiumEffects />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu} aria-label="Sneha Singh home"><span className="brand-mark">S.</span><span>SNEHA SINGH<span className="brand-dot">.</span></span></a>
        <div className="header-controls"><button type="button" className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}</button><button ref={menuButtonRef} type="button" className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button></div>
        <nav id="primary-navigation" className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Primary navigation">
          {navItems.map(([label, href]) => <a key={label} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let's talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="status-dot" /> OPEN TO INTERNSHIPS & COLLABORATIONS</div>
            <p className="eyebrow">HELLO, I'M SNEHA <span className="wave">✳</span></p>
            <h1>I build digital<br />experiences that<br /><span className="gradient-text">feel effortless.</span></h1>
            <p className="hero-description">Web developer and MCA student who loves turning ideas into clean, responsive, and meaningful web experiences.</p>
            <div className="hero-actions">
              <a className="button button-primary" data-magnetic href="#projects">Explore my work <ArrowDownRight size={18} /></a>
              <a className="button button-quiet" href="#contact">Get in touch <ArrowUpRight size={17} /></a>
            </div>
            <div className="resume-actions"><a href="/resume.pdf" target="_blank" rel="noreferrer"><FileText size={15} /> View resume</a><a href="/resume.pdf" download="Sneha-Singh-Resume.pdf"><Download size={15} /> Download PDF</a></div>
            <div className="hero-meta"><span><MapPin size={15} /> Uttar Pradesh, India</span><span className="meta-separator" /><span>Currently pursuing MCA</span></div>
          </div>
          <div className="hero-art" aria-label="Abstract developer illustration">
            <div className="orbit orbit-a" /><div className="orbit orbit-b" />
            <div className="art-grid" />
            <div className="code-window spotlight-card" data-spotlight>
              <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><span>hello-world.jsx</span><span className="window-menu">•••</span></div>
              <div className="code-content">
                <div><span className="line-no">01</span><span className="syntax-purple">const</span> <span className="syntax-blue">developer</span> = {'{'}</div>
                <div><span className="line-no">02</span>&nbsp;&nbsp;name: <span className="syntax-green">'Sneha Singh'</span>,</div>
                <div><span className="line-no">03</span>&nbsp;&nbsp;focus: <span className="syntax-green">'Full-Stack'</span>,</div>
                <div><span className="line-no">04</span>&nbsp;&nbsp;curiosity: <span className="syntax-orange">Infinity</span>,</div>
                <div><span className="line-no">05</span>&nbsp;&nbsp;build: <span className="syntax-blue">() =&gt;</span> <span className="syntax-green">'Something great'</span></div>
                <div><span className="line-no">06</span>{'}'};</div>
                <div className="code-gap"><span className="line-no">07</span><span className="syntax-purple">export default</span> developer;</div>
              </div>
              <div className="window-footer"><span className="footer-pulse" /> Ready to build <span className="footer-right">UTF-8&nbsp; · &nbsp;JSX</span></div>
            </div>
            <div className="float-card float-card-top"><Sparkles size={16} /><span>Curious by nature</span></div>
            <div className="portrait-card"><div className="portrait-frame"><img src="/profile.png" alt="Sneha Singh" onError={(e) => { e.currentTarget.style.display = 'none'; }} /><span className="portrait-fallback">SS</span></div><div><strong>Sneha Singh</strong><small>Web Developer</small></div></div><div className="float-card float-card-bottom"><span className="mini-check">✓</span><span>Responsive by default</span></div>
            <div className="art-caption">DESIGN MINDFUL. CODE CURIOUS.</div>
          </div>
          <a className="scroll-cue" href="#about"><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDownRight size={14} /></a>
        </section>

        <section className="section-wrap about-section" id="about">
          <SectionLabel number="01">A LITTLE ABOUT ME</SectionLabel>
          <div className="about-grid" data-reveal>
            <h2>Good design catches the eye.<br /><span className="muted-heading">Great experiences keep you there.</span></h2>
            <div className="about-copy"><p>I'm Sneha, a web developer and MCA student who enjoys building intuitive interfaces and bringing ideas to life on the web. I care about the details — from responsive layouts to reusable components.</p><p>I've explored real-world development through internships and personal projects, and I'm always looking for the next problem to solve and skill to sharpen.</p><a className="text-link" href="#experience">More about my journey <ArrowRight size={16} /></a></div>
          </div>
          <div className="stats-row" data-reveal>
            <div className="stat spotlight-card spotlight-tilt" data-spotlight data-tilt><strong>02<span>+</span></strong><small>Internship experiences</small></div>
            <div className="stat spotlight-card spotlight-tilt" data-spotlight data-tilt><strong>03<span>+</span></strong><small>Projects to explore</small></div>
            <div className="stat spotlight-card spotlight-tilt" data-spotlight data-tilt><strong>∞</strong><small>Things to learn</small></div>
            <div className="stat stat-note spotlight-card spotlight-tilt" data-spotlight data-tilt><Sparkles size={17} /><small>Learning. Building.<br />Getting better every day.</small></div>
          </div>
        </section>

        <section className="section-wrap skills-section" id="skills">
          <SectionLabel number="02">MY TOOLKIT</SectionLabel>
          <div className="section-heading-row" data-reveal><h2>Tools I use to<br /><span className="muted-heading">turn ideas into reality.</span></h2><p>My toolkit keeps evolving. These are the technologies and tools I've worked with across projects and internships.</p></div>
          <div className="skill-grid">{skills.map(({ title, items, icon: Icon }, i) => <article className="skill-card spotlight-card spotlight-tilt" data-reveal data-spotlight data-tilt key={title}><div className="skill-card-top"><span className="skill-icon"><Icon size={20} /></span><span className="skill-index">0{i + 1}</span></div><h3>{title}</h3><div className="skill-tags">{items.map(item => <span key={item}>{item}</span>)}</div></article>)}</div>
        </section>

        <section className="section-wrap experience-section" id="experience">
          <SectionLabel number="03">WHERE I'VE GROWN</SectionLabel>
          <div className="section-heading-row" data-reveal><h2>Learning by<br /><span className="muted-heading">building for real.</span></h2><p>Every experience has helped me become more thoughtful about how I write code, build interfaces, and work through problems.</p></div>
          <div className="timeline">
            <article className="timeline-item spotlight-card spotlight-tilt" data-reveal data-spotlight data-tilt><div className="timeline-marker" /><div className="timeline-date">JUN 2026 — JUL 2026 <span>REMOTE</span></div><div className="timeline-content"><div className="timeline-title"><h3>Front-End Development Intern</h3><span className="company">Qskill</span></div><p>Built reusable React components, created a responsive Coding Ninjas website clone with Tailwind CSS, and implemented multi-page navigation with React Router.</p><div className="skill-tags"><span>React.js</span><span>Tailwind CSS</span><span>React Router</span><span>GitHub</span></div></div></article>
            <article className="timeline-item spotlight-card spotlight-tilt" data-reveal data-spotlight data-tilt><div className="timeline-marker" /><div className="timeline-date">MAY 2025 — JUL 2025 <span>MEERUT</span></div><div className="timeline-content"><div className="timeline-title"><h3>Web Developer Intern</h3><span className="company">Designing Solutions</span></div><p>Developed responsive websites using HTML, CSS, and JavaScript, and built user interfaces with Bootstrap and reusable components.</p><div className="skill-tags"><span>HTML</span><span>CSS</span><span>JavaScript</span><span>Bootstrap</span></div></div></article>
          </div>
        </section>

        <section className="section-wrap projects-section" id="projects">
          <SectionLabel number="04">SELECTED WORK</SectionLabel>
          <div className="section-heading-row" data-reveal><h2>A few things<br /><span className="muted-heading">I've been creating.</span></h2><p>A selection of projects that reflect my curiosity, frontend skills, and interest in building useful digital products.</p></div>
          <div className="project-list">{projects.map(project => <article className={`project-card spotlight-card spotlight-tilt ${project.accent}`} data-reveal data-spotlight data-tilt key={project.number}>
            <div className="project-visual">
              <div className="visual-topline"><span>PROJECT / {project.number}</span><span>✳</span></div>
              {project.visual === 'nidr' && <div className="mock-dashboard"><div className="mock-side"><b>N.</b><span /><span /><span /></div><div className="mock-main"><div className="mock-label">DRIVER STATUS</div><div className="mock-status"><span className="mock-pulse" /> Monitoring active</div><div className="mock-eye"><span>◉</span><span>◉</span></div><div className="mock-bars"><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="mock-small-row"><span /><span /><span /></div></div></div>}
              {project.visual === 'code' && <div className="mock-browser"><div className="browser-bar"><i /><i /><i /><span>codingninjas.com</span></div><div className="browser-content"><div className="browser-logo">Coding<span>Ninjas</span></div><div className="browser-title">Learn to code.<br /><em>Build your future.</em></div><div className="browser-cta">Explore courses ↗</div><div className="browser-shape" /></div></div>}
              {project.visual === 'portfolio' && <div className="mock-portfolio"><div className="mock-port-nav">SNEHA <span>ABOUT&nbsp;&nbsp; WORK&nbsp;&nbsp; CONTACT</span></div><div className="mock-port-body"><small>FRONTEND DEVELOPER</small><strong>Ideas into<br /><i>experiences.</i></strong><div className="mock-port-pill">VIEW SELECTED WORK ↗</div></div><div className="mock-port-orb" /></div>}
            </div>
            <div className="project-info"><div className="project-meta"><span>{project.type}</span><span>{project.number} / 03</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="skill-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-links">{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live project <ExternalLink size={15} /></a>}<a href={project.code} target="_blank" rel="noreferrer" aria-label={`${project.name} source code`}>View source <Github size={15} /></a></div></div>
          </article>)}</div>
          <p className="project-hint"><span>✳</span> Before publishing, replace the placeholder project links with your actual GitHub repositories and live demos.</p>
        </section>

        <section className="contact-section section-wrap" id="contact">
          <div className="contact-panel">
            <div className="contact-glow" />
            <div className="contact-copy" data-reveal>
              <SectionLabel number="05">LET'S CONNECT</SectionLabel>
              <h2>Have an idea?<br /><span className="gradient-text">Let's build it.</span></h2>
              <p>I'm open to internship opportunities, collaborative projects, and conversations with people who love creating useful things.</p>
              <a className="button button-primary contact-button" data-magnetic href="#contact-form" onClick={focusContactForm}>Say hello <ArrowUpRight size={18} /></a>
              <div className="contact-email"><Mail size={16} /><a href="mailto:snehasingh79067@gmail.com">snehasingh79067@gmail.com</a></div>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer section-wrap"><a className="brand footer-brand" href="#home"><span className="brand-mark">S.</span><span>SNEHA SINGH<span className="brand-dot">.</span></span></a><p>Designed with intention. Built with curiosity.</p><div className="social-links"><a href="https://github.com/07Sneha17" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="https://www.linkedin.com/in/sneha-singh-5840a32b1/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="mailto:snehasingh79067@gmail.com" aria-label="Email"><Mail size={17} /></a></div><span className="copyright">© {new Date().getFullYear()} SNEHA SINGH</span></footer>
    </div>
  );
}

export default App;