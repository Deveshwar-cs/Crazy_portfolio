"use client";
import {useEffect, useRef, useState} from "react";
import "./GridSection.css";

const PROJECTS = [
  {
    title: "Bus Tracking System",
    meta: "Web App · 2025",
    img: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e",
  },
  {
    title: "E-commerce API",
    meta: "Backend · 2025",
    img: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
  },
  {
    title: "Portfolio Website",
    meta: "Frontend · 2024",
    img: "https://images.unsplash.com/photo-1514195037031-83d60ed3b448",
  },
  {
    title: "Vehicle Booking",
    meta: "Utility · 2024",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
  {
    title: "Hill Road Safety",
    meta: "Concept · 2024",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  },
];

export default function UltraMasonry() {
  const itemsRef = useRef([]);
  const [activeImg, setActiveImg] = useState(null);

  // 🔥 SCROLL REVEAL
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${i * 80}ms`;
            entry.target.classList.add("is-in");
          }
        });
      },
      {threshold: 0.15},
    );

    itemsRef.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 🔥 TILT EFFECT
  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -10;
    const rotateY = (x / rect.width - 0.5) * 10;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const resetTilt = (el) => {
    el.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <section className="block">
      <div className="section-label mono">
        <span>— 006 / Projects</span>
        <span>Ultra Masonry</span>
      </div>

      <div className="masonry">
        {PROJECTS.map((item, i) => (
          <div
            key={i}
            ref={(el) => (itemsRef.current[i] = el)}
            className="masonry__item"
            onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
            onMouseLeave={(e) => resetTilt(e.currentTarget)}
            onClick={() => setActiveImg(item.img)}
          >
            <img src={item.img} alt={item.title} loading="lazy" />

            <div className="overlay" />

            <div className="meta">
              <strong>{item.title}</strong>
              <span>{item.meta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {activeImg && (
        <div className="modal" onClick={() => setActiveImg(null)}>
          <img src={activeImg} alt="preview" />
        </div>
      )}
    </section>
  );
}
