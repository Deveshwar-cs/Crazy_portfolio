import {useEffect, useRef} from "react";
import "./Hero.css";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
const IMG = {
  hero1: img2,
  hero2: img3,
  hero3: img1,
};

export default function Hero() {
  const l1 = useRef(null);
  const l2 = useRef(null);
  const l3 = useRef(null);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (l1.current)
          l1.current.style.transform = `translateY(${y * -0.25}px)`;
        if (l2.current)
          l2.current.style.transform = `translateY(${y * -0.45}px)`;
        if (l3.current)
          l3.current.style.transform = `translateY(${y * -0.15}px)`;
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, {passive: true});
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <div className="nav__logo">Deveshwar</div>
        <ul className="mono">
          <li>
            <a href="#work">Work</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero__eyebrow mono">
          <span>© 2026 — Deveshwar</span>
          <span>MERN Stack Developer</span>
        </div>

        <div className="hero__layer hero__layer--1" ref={l1}>
          <img src={IMG.hero1} alt="" />
        </div>
        <div className="hero__layer hero__layer--2" ref={l2}>
          <img src={IMG.hero2} alt="" />
        </div>
        <div className="hero__layer hero__layer--3" ref={l3}>
          <img src={IMG.hero3} alt="" />
        </div>

        <div className="hero__name-block">
          <span className="hero__role">Full Stack Developer</span>
          <h1 className="hero__title">
            Building <em>real-world</em>
            <br />
            web experiences.
          </h1>
          <div className="hero__stack">
            {["React", "Node.js", "MongoDB", "Express", "REST APIs"].map(
              (s) => (
                <span key={s}>{s}</span>
              ),
            )}
          </div>
        </div>

        <div className="hero__meta">
          <p>
            Full Stack Developer with hands-on experience building web
            applications using React, Node.js, and MongoDB. Strong in problem
            solving, API development, and scalable backend solutions.
          </p>
          <div className="hero__meta-right">
            <span className="mono">↓ Available for work</span>
            <a href="#work" className="hero__cta">
              View Projects →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
