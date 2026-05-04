"use client";
import {useEffect, useRef} from "react";
import "./Projects.css";
import OnTimeRoutes from "../assets/ProjectImg/OnTimeRoutes.png";
import AutoApiProject from "../assets/ProjectImg/AutoApiProject.png";
import TheaterBooking from "../assets/ProjectImg/TheaterBooking.png";

const PROJECTS = [
  {
    title: "Auto API Project",
    tag: "Full Stack",
    year: "2026",
    desc: "REST API based platform to manage data dynamically with CRUD operations, authentication, and structured backend architecture.",
    img: AutoApiProject,
    link: "https://auto-api-frontend-git-main-logic-lords.vercel.app/",
    accent: "teal",
    symbol: "⊕",
  },
  {
    title: "On Time Routes",
    tag: "Frontend",
    year: "2025",
    desc: "Real-time bus timing platform with route filtering, search functionality, and optimized data handling for transport systems.",
    img: OnTimeRoutes,
    link: "https://clinquant-pasca-7b9890.netlify.app/",
    accent: "blue",
    symbol: "◎",
  },
  {
    title: "Theater Booking",
    tag: "Frontend",
    year: "2024",
    desc: "Interactive UI for booking movie tickets with smooth animations, responsive design, and modern user experience.",
    img: TheaterBooking,
    link: "https://sensational-unicorn-4550d0.netlify.app/",
    accent: "coral",
    symbol: "◈",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const cursorRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // ── Height + horizontal scroll
    const setHeight = () => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      section.style.height = `${totalScroll + window.innerHeight}px`;
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const totalScroll = track.scrollWidth - window.innerWidth + 150;
      const sectionHeight = section.offsetHeight - window.innerHeight;
      let progress = Math.max(0, Math.min(1, -rect.top / sectionHeight));

      track.style.transform = `translate3d(${-progress * totalScroll}px, 0, 0)`;
      if (progressBarRef.current)
        progressBarRef.current.style.transform = `scaleX(${progress})`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();

    // ── GSAP
    const initGsap = async () => {
      const {gsap} = await import("gsap");
      const {ScrollTrigger} = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // FIX: refresh immediately after async load
      ScrollTrigger.refresh();

      // Intro elements
      const introEls = introRef.current?.querySelectorAll(
        ".proj__intro-mono, h2, .proj__intro-sub, .proj__intro-count",
      );
      if (introEls?.length) {
        gsap.fromTo(
          introEls,
          {y: 40, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Cards
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length) {
        gsap.fromTo(
          validCards,
          {y: 60, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.14,
            ease: "expo.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Image scale parallax per card
      validCards.forEach((card) => {
        const img = card.querySelector(".proj__card-img");
        if (!img) return;
        gsap.fromTo(
          img,
          {scale: 1},
          {
            scale: 1.12,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 2,
            },
          },
        );
      });

      // FIX: delayed second refresh after all triggers registered
      setTimeout(() => ScrollTrigger.refresh(), 300);
    };

    initGsap();

    // ── Magnetic cursor
    const cursor = cursorRef.current;
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const tick = () => {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      cursor.style.transform = `translate(${cx - 32}px, ${cy - 32}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () =>
        cursor.classList.add("proj__cursor--active"),
      );
      card.addEventListener("mouseleave", () =>
        cursor.classList.remove("proj__cursor--active"),
      );
    });

    return () => {
      window.removeEventListener("resize", setHeight);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = (el) => {
    el.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  return (
    <>
      <div className="proj__cursor" ref={cursorRef}>
        <span>OPEN</span>
      </div>

      <section className="proj__section" ref={sectionRef}>
        <div className="proj__progress">
          <div className="proj__progress-fill" ref={progressBarRef} />
        </div>

        <div className="proj__sticky">
          <div className="proj__track" ref={trackRef}>
            <div className="proj__intro" ref={introRef}>
              <span className="proj__intro-mono mono">— Projects / 005</span>
              <h2>
                Selected <em>projects</em>
                <br />
                I've built.
              </h2>
              <p className="proj__intro-sub">
                Scroll vertically — explore my work horizontally.
              </p>
              <div className="proj__intro-count">
                {PROJECTS.length.toString().padStart(2, "0")} projects
              </div>
            </div>

            {PROJECTS.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`proj__card proj__card--${item.accent}`}
                ref={(el) => (cardsRef.current[i] = el)}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <div className="proj__card-accent" />

                <div className="proj__card-img-wrap">
                  <img
                    className="proj__card-img"
                    src={item.img}
                    alt={item.title}
                  />
                  <div className="proj__card-overlay" />
                  <div className="proj__card-num">
                    {(i + 1).toString().padStart(2, "0")}
                  </div>
                  <div className="proj__card-hover-meta">
                    <span className="proj__card-symbol">{item.symbol}</span>
                    <span className="proj__card-hover-title">{item.title}</span>
                  </div>
                </div>

                <div className="proj__card-body">
                  <div className="proj__card-top">
                    <span className="proj__card-title">{item.title}</span>
                    <span
                      className={`proj__card-tag proj__card-tag--${item.accent}`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <p className="proj__card-desc">{item.desc}</p>
                  <div className="proj__card-footer">
                    <span className="proj__card-year">{item.year}</span>
                    <span className="proj__card-arrow">↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
