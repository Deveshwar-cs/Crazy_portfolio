"use client";
import {useEffect, useRef} from "react";
import "./Skills.css";

const SKILLS = [
  {
    title: "Core Frontend",
    accent: "purple",
    symbol: "◈",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
    tags: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "DOM Manipulation",
      "Event Handling",
      "Fetch API",
      "Responsive Design",
    ],
  },
  {
    title: "React Ecosystem",
    accent: "blue",
    symbol: "⬡",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    tags: [
      "React.js",
      "useState / useEffect",
      "useNavigate",
      "Context API",
      "Tailwind CSS",
    ],
  },
  {
    title: "Project Skills",
    accent: "teal",
    symbol: "◎",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    tags: [
      "REST API Integration",
      "Authentication",
      "Cart & Payment",
      "Search & Filter",
      "Dynamic UI",
    ],
  },
  {
    title: "Tools & Workflow",
    accent: "amber",
    symbol: "◇",
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
    tags: [
      "Git & GitHub",
      "VS Code",
      "npm",
      "Browser DevTools",
      "Package Management",
    ],
  },
  {
    title: "Backend Basics",
    accent: "coral",
    symbol: "⊕",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    tags: ["Node.js", "Express.js", "MongoDB", "API Creation"],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const cardsRef = useRef([]);
  const cursorRef = useRef(null);

  useEffect(() => {
    let gsapInstance, STInstance;

    const init = async () => {
      const {gsap} = await import("gsap");
      const {ScrollTrigger} = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      STInstance = ScrollTrigger;

      // ── FIX: refresh after async load so positions are correct
      ScrollTrigger.refresh();

      // ── Label reveal
      gsap.fromTo(
        labelRef.current.children,
        {y: 24, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power4.out",
          scrollTrigger: {
            trigger: labelRef.current,
            start: "top 92%",
            // FIX: toggleActions ensures it plays forward if already visible on load
            toggleActions: "play none none none",
          },
        },
      );

      // ── Cards staggered entrance
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        {y: 70, opacity: 0},
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.13,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      // ── Parallax on each card image
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const img = card.querySelector(".sk-card__img");
        if (!img) return;
        gsap.fromTo(
          img,
          {yPercent: 0},
          {
            yPercent: -18,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.6,
            },
          },
        );
      });

      // ── Tags pop-in
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const tags = card.querySelectorAll(".sk-tag");
        gsap.fromTo(
          tags,
          {scale: 0.75, opacity: 0},
          {
            scale: 1,
            opacity: 1,
            duration: 0.45,
            stagger: 0.055,
            delay: i * 0.07,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // FIX: second refresh after all triggers registered
      setTimeout(() => ScrollTrigger.refresh(), 300);
    };

    init();

    // ── Magnetic cursor
    const cursor = cursorRef.current;
    let mouseX = 0,
      mouseY = 0,
      curX = 0,
      curY = 0,
      raf;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    const tick = () => {
      curX += (mouseX - curX) * 0.1;
      curY += (mouseY - curY) * 0.1;
      cursor.style.transform = `translate(${curX - 28}px, ${curY - 28}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.addEventListener("mouseenter", () =>
        cursor.classList.add("sk-cursor--active"),
      );
      card.addEventListener("mouseleave", () =>
        cursor.classList.remove("sk-cursor--active"),
      );
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      STInstance?.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${y * -9}deg) rotateY(${x * 9}deg) scale3d(1.03,1.03,1.03)`;
  };

  const handleMouseLeave = (el) => {
    el.style.transform =
      "perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  };

  return (
    <>
      <div className="sk-cursor" ref={cursorRef}>
        <span>VIEW</span>
      </div>

      <section className="sk-block" ref={sectionRef}>
        <div className="sk-section-label" ref={labelRef}>
          <span>— 006 / Skills</span>
          <span>Full Stack · 2025</span>
        </div>

        <div className="sk-masonry">
          {SKILLS.map((skill, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`sk-card sk-card--${skill.accent}`}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="sk-card__accent" />

              <div className="sk-card__img-wrap">
                <img
                  className="sk-card__img"
                  src={skill.img}
                  alt={skill.title}
                  loading="lazy"
                />
                <div className="sk-card__overlay" />
                <div className="sk-card__img-meta">
                  <span className="sk-card__symbol">{skill.symbol}</span>
                  <h3 className="sk-card__img-title">{skill.title}</h3>
                </div>
              </div>

              <div className="sk-card__body">
                <div className="sk-card__tags">
                  {skill.tags.map((tag, j) => (
                    <span key={j} className="sk-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
