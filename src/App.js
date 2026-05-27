import React, { useState, useEffect, useRef } from 'react';

const styles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --dark: #111010;
    --dark2: #1a1917;
    --dark3: #242220;
    --gold: #c8a96e;
    --gold-light: #dfc08a;
    --gold-dim: #8a7050;
    --cream: #f5f0e8;
    --cream-dim: #c9c3b8;
    --muted: #6b6560;
    --white: #ffffff;
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--dark);
    color: var(--cream);
    font-family: var(--font-body);
    font-weight: 300;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(17,16,16,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(200,169,110,0.15);
    transition: border-color 0.3s;
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--gold);
    letter-spacing: 0.02em;
    text-decoration: none;
  }
  .nav-links {
    display: flex;
    gap: 36px;
    list-style: none;
  }
  .nav-links a {
    font-size: 0.8rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--cream-dim);
    text-decoration: none;
    transition: color 0.2s;
  }
  .nav-links a:hover { color: var(--gold); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 120px 48px 80px;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 50%, rgba(200,169,110,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 80%, rgba(200,169,110,0.04) 0%, transparent 60%);
  }
  .hero-lines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg,
      transparent,
      transparent 79px,
      rgba(200,169,110,0.04) 79px,
      rgba(200,169,110,0.04) 80px
    );
  }
  .hero-content {
    position: relative;
    max-width: 720px;
  }
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 28px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.7s ease forwards 0.2s;
  }
  .hero-eyebrow::before {
    content: '';
    display: block;
    width: 32px;
    height: 1px;
    background: var(--gold);
  }
  .hero-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 7vw, 6rem);
    font-weight: 900;
    line-height: 0.95;
    color: var(--white);
    margin-bottom: 32px;
    opacity: 0;
    transform: translateY(24px);
    animation: fadeUp 0.8s ease forwards 0.35s;
  }
  .hero-title em {
    font-style: italic;
    color: var(--gold);
  }
  .hero-tagline {
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--cream-dim);
    line-height: 1.7;
    max-width: 500px;
    margin-bottom: 48px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.5s;
  }
  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeUp 0.8s ease forwards 0.65s;
  }
  .btn-primary {
    display: inline-block;
    padding: 14px 32px;
    background: var(--gold);
    color: var(--dark);
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover {
    background: var(--gold-light);
    transform: translateY(-1px);
  }
  .btn-secondary {
    display: inline-block;
    padding: 13px 32px;
    border: 1px solid rgba(200,169,110,0.4);
    color: var(--gold);
    font-family: var(--font-body);
    font-size: 0.82rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-secondary:hover {
    border-color: var(--gold);
    background: rgba(200,169,110,0.06);
  }
  .hero-scroll {
    position: absolute;
    bottom: 40px;
    left: 48px;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--muted);
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 1s;
  }
  .scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold-dim), transparent);
    animation: scrollLine 2s ease-in-out infinite;
  }
  @keyframes scrollLine {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50% { opacity: 1; transform: scaleY(0.7); }
  }

  /* ── SECTION BASE ── */
  section {
    padding: 100px 48px;
  }
  .section-inner {
    max-width: 1000px;
    margin: 0 auto;
  }
  .section-label {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 20px;
  }
  .section-label::before {
    content: '';
    display: block;
    width: 24px;
    height: 1px;
    background: var(--gold);
  }
  .section-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700;
    line-height: 1.1;
    color: var(--white);
    margin-bottom: 24px;
  }
  .section-title em {
    font-style: italic;
    color: var(--gold);
  }
  .section-body {
    font-size: 1rem;
    font-weight: 300;
    color: var(--cream-dim);
    line-height: 1.8;
    max-width: 600px;
  }

  /* ── ABOUT ── */
  .about { background: var(--dark2); }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
    margin-top: 60px;
  }
  .about-text p {
    font-size: 1rem;
    font-weight: 300;
    color: var(--cream-dim);
    line-height: 1.85;
    margin-bottom: 20px;
  }
  .about-text p:last-child { margin-bottom: 0; }
  .about-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
  }
  .stat {
    background: var(--dark3);
    padding: 32px 28px;
    position: relative;
    overflow: hidden;
    transition: background 0.2s;
  }
  .stat::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 100%; height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  .stat:hover::after { transform: scaleX(1); }
  .stat-num {
    font-family: var(--font-display);
    font-size: 2.8rem;
    font-weight: 900;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 8px;
  }
  .stat-label {
    font-size: 0.78rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--muted);
    text-transform: uppercase;
  }

  /* ── BLOG ── */
  .blog { background: var(--dark); }
  .blog-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 60px;
  }
  .post-card {
    background: var(--dark2);
    padding: 36px 32px;
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
    overflow: hidden;
  }
  .post-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 3px; height: 100%;
    background: var(--gold);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease;
  }
  .post-card:hover { background: var(--dark3); }
  .post-card:hover::before { transform: scaleY(1); }
  .post-tag {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold-dim);
    margin-bottom: 16px;
  }
  .post-title {
    font-family: var(--font-display);
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 14px;
  }
  .post-excerpt {
    font-size: 0.88rem;
    font-weight: 300;
    color: var(--muted);
    line-height: 1.7;
    margin-bottom: 24px;
  }
  .post-read {
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .post-read::after {
    content: '→';
    transition: transform 0.2s;
  }
  .post-card:hover .post-read::after { transform: translateX(4px); }
  .blog-coming-soon {
    margin-top: 40px;
    text-align: center;
    font-size: 0.82rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }

  /* ── EMAIL SIGNUP ── */
  .signup { background: var(--dark2); }
  .signup-inner {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  .signup-inner .section-label { justify-content: center; }
  .signup-inner .section-label::before { display: none; }
  .signup-inner .section-body {
    margin: 0 auto 40px;
    text-align: center;
  }
  .signup-form {
    display: flex;
    gap: 0;
    max-width: 480px;
    margin: 0 auto;
  }
  .signup-input {
    flex: 1;
    padding: 14px 20px;
    background: var(--dark3);
    border: 1px solid rgba(200,169,110,0.2);
    border-right: none;
    color: var(--cream);
    font-family: var(--font-body);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s;
  }
  .signup-input::placeholder { color: var(--muted); }
  .signup-input:focus { border-color: rgba(200,169,110,0.5); }
  .signup-btn {
    padding: 14px 28px;
    background: var(--gold);
    border: none;
    color: var(--dark);
    font-family: var(--font-body);
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
  }
  .signup-btn:hover { background: var(--gold-light); }
  .signup-note {
    margin-top: 16px;
    font-size: 0.75rem;
    color: var(--muted);
  }
  .signup-success {
    padding: 16px 24px;
    background: rgba(200,169,110,0.1);
    border: 1px solid rgba(200,169,110,0.3);
    color: var(--gold);
    font-size: 0.9rem;
    text-align: center;
  }

  /* ── CONTACT ── */
  .contact { background: var(--dark); }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    margin-top: 60px;
    align-items: start;
  }
  .contact-info p {
    font-size: 0.95rem;
    font-weight: 300;
    color: var(--cream-dim);
    line-height: 1.8;
    margin-bottom: 32px;
  }
  .contact-detail {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 0.88rem;
    color: var(--cream-dim);
  }
  .contact-item-label {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold-dim);
    min-width: 60px;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .form-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .form-label {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }
  .form-input, .form-textarea {
    padding: 12px 16px;
    background: var(--dark2);
    border: 1px solid rgba(200,169,110,0.15);
    color: var(--cream);
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-input::placeholder, .form-textarea::placeholder { color: var(--muted); }
  .form-input:focus, .form-textarea:focus {
    border-color: rgba(200,169,110,0.4);
  }
  .form-textarea { min-height: 120px; }
  .form-submit {
    padding: 14px;
    background: var(--gold);
    border: none;
    color: var(--dark);
    font-family: var(--font-body);
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s;
    align-self: flex-start;
    min-width: 160px;
  }
  .form-submit:hover { background: var(--gold-light); }

  /* ── FOOTER ── */
  footer {
    padding: 40px 48px;
    background: var(--dark2);
    border-top: 1px solid rgba(200,169,110,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .footer-logo {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--gold);
  }
  .footer-tagline {
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .footer-copy {
    font-size: 0.72rem;
    color: var(--muted);
  }

  /* ── DIVIDER ── */
  .gold-rule {
    width: 60px;
    height: 2px;
    background: var(--gold);
    margin: 32px 0;
  }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    nav { padding: 0 24px; }
    .nav-links { display: none; }
    section { padding: 70px 24px; }
    .hero { padding: 100px 24px 60px; }
    .hero-scroll { left: 24px; }
    .about-grid, .contact-grid { grid-template-columns: 1fr; gap: 48px; }
    .blog-grid { grid-template-columns: 1fr; }
    .about-stats { grid-template-columns: 1fr 1fr; }
    footer { flex-direction: column; gap: 12px; text-align: center; }
    .signup-form { flex-direction: column; }
    .signup-input { border-right: 1px solid rgba(200,169,110,0.2); }
  }
`;

const posts = [
  {
    tag: 'Build Log',
    title: 'Starting the Mahogany Single Cut — Timber Selection',
    excerpt: 'Finding the right body blank is half the battle. Here\'s what I look for when selecting mahogany for a set-neck build.',
    coming: true,
  },
  {
    tag: 'Technique',
    title: 'Carving a Neck Profile by Hand — Spokeshave to Sandpaper',
    excerpt: 'Power tools get you close. Your hands get you there. A walkthrough of my hand-carving process from rough to finished.',
    coming: true,
  },
  {
    tag: 'Tools & Setup',
    title: 'The Only Finishing Schedule You Need for Nitro',
    excerpt: 'Nitrocellulose is unforgiving if you rush it. The schedule I\'ve landed on after years of runs, blush, and starting over.',
    coming: true,
  },
];

export default function App() {
  const [email, setEmail] = useState('');
  const [signupDone, setSignupDone] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactDone, setContactDone] = useState(false);
  const fadeRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    fadeRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addFadeRef = el => { if (el && !fadeRefs.current.includes(el)) fadeRefs.current.push(el); };

  const handleSignup = e => {
    e.preventDefault();
    if (email) setSignupDone(true);
  };

  const handleContact = e => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) setContactDone(true);
  };

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <a href="#hero" className="nav-logo">Self Made Guitar</a>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#signup">Newsletter</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="hero-content">
          <div className="hero-eyebrow">Self Made Guitar</div>
          <h1 className="hero-title">
            Build it.<br />
            Play it.<br />
            <em>Own it.</em>
          </h1>
          <p className="hero-tagline">
            A home for guitarists who build their own instruments — guides, build logs, 
            tools, and honest talk about the craft.
          </p>
          <div className="hero-actions">
            <a href="#signup" className="btn-primary">Join the Newsletter</a>
            <a href="#blog" className="btn-secondary">Read the Blog</a>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          Scroll
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-inner">
          <div ref={addFadeRef} className="fade-in">
            <div className="section-label">About</div>
            <h2 className="section-title">27 years playing.<br /><em>Still building.</em></h2>
          </div>
          <div className="about-grid">
            <div ref={addFadeRef} className="about-text fade-in">
              <p>
                Self Made Guitar started because I couldn't find the resource I actually wanted — 
                honest, practical content written by someone who builds guitars in a real workshop, 
                not a factory.
              </p>
              <p>
                I've been playing for 27 years and building for long enough to have made most of 
                the mistakes worth making. I work in Kent, building guitars under the Self Made Guitar 
                name, and I write about the process as honestly as I can.
              </p>
              <p>
                If you build guitars, want to build guitars, or just want to understand what goes 
                into the instrument in your hands — you're in the right place.
              </p>
              <div className="gold-rule" />
              <a href="#signup" className="btn-primary">Follow the Journey</a>
            </div>
            <div ref={addFadeRef} className="about-stats fade-in">
              <div className="stat">
                <div className="stat-num">27</div>
                <div className="stat-label">Years Playing</div>
              </div>
              <div className="stat">
                <div className="stat-num">Kent</div>
                <div className="stat-label">Based in</div>
              </div>
              <div className="stat">
                <div className="stat-num">7</div>
                <div className="stat-label">Strings on Current Build</div>
              </div>
              <div className="stat">
                <div className="stat-num">∞</div>
                <div className="stat-label">Wood Shavings on Floor</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="blog" id="blog">
        <div className="section-inner">
          <div ref={addFadeRef} className="fade-in">
            <div className="section-label">Blog</div>
            <h2 className="section-title">From the <em>workshop.</em></h2>
            <p className="section-body">
              Build logs, technique breakdowns, honest tool reviews, and everything I wish 
              I'd known earlier. New posts coming soon.
            </p>
          </div>
          <div className="blog-grid" style={{ marginTop: '60px' }}>
            {posts.map((post, i) => (
              <div key={i} ref={addFadeRef} className="post-card fade-in" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="post-tag">{post.tag}</div>
                <div className="post-title">{post.title}</div>
                <div className="post-excerpt">{post.excerpt}</div>
                <div className="post-read">Coming soon</div>
              </div>
            ))}
          </div>
          <p className="blog-coming-soon">
            Sign up to the newsletter to be notified when posts go live.
          </p>
        </div>
      </section>

      {/* EMAIL SIGNUP */}
      <section className="signup" id="signup">
        <div className="signup-inner">
          <div ref={addFadeRef} className="fade-in">
            <div className="section-label">Newsletter</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Build notes, <em>direct.</em>
            </h2>
            <p className="section-body" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
              No filler. Just honest writing about guitar building — techniques, tools, 
              build logs, and the occasional product. Whenever I have something worth saying.
            </p>
          </div>
          {signupDone ? (
            <div className="signup-success">You're in. Talk soon.</div>
          ) : (
            <form className="signup-form" onSubmit={handleSignup}>
              <input
                className="signup-input"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <button className="signup-btn" type="submit">Subscribe</button>
            </form>
          )}
          <p className="signup-note">No spam. Unsubscribe any time.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="section-inner">
          <div ref={addFadeRef} className="fade-in">
            <div className="section-label">Contact</div>
            <h2 className="section-title">Get in <em>touch.</em></h2>
          </div>
          <div className="contact-grid">
            <div ref={addFadeRef} className="contact-info fade-in">
              <p>
                Questions about guitar building, the newsletter, or anything else — 
                feel free to get in touch. I read everything and reply to as much as I can.
              </p>
              <div className="contact-detail">
                <div className="contact-item">
                  <span className="contact-item-label">Email</span>
                  <span>hello@selfmadeguitar.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-item-label">Based</span>
                  <span>Kent, England</span>
                </div>
                <div className="contact-item">
                  <span className="contact-item-label">Site</span>
                  <span>selfmadeguitar.com</span>
                </div>
              </div>
            </div>
            <div ref={addFadeRef} className="contact-form fade-in">
              {contactDone ? (
                <div className="signup-success">Message sent. I'll be in touch.</div>
              ) : (
                <form onSubmit={handleContact}>
                  <div className="contact-form">
                    <div className="form-field">
                      <label className="form-label">Name</label>
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Your name"
                        value={contactForm.name}
                        onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email</label>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="your@email.com"
                        value={contactForm.email}
                        onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-textarea"
                        placeholder="What's on your mind?"
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        required
                      />
                    </div>
                    <button className="form-submit" type="submit">Send Message</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div>
          <div className="footer-logo">Self Made Guitar</div>
          <div className="footer-tagline" style={{ marginTop: '4px' }}>Build it. Play it. Own it.</div>
        </div>
        <div className="footer-copy">© {new Date().getFullYear()} Self Made Guitar. All rights reserved.</div>
      </footer>
    </>
  );
}
