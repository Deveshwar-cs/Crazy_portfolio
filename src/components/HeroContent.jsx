"use client";
import {useEffect, useRef} from "react";
import "./HeroContent.css";

const text = `I build modern web applications using the MERN stack, focusing on performance, scalability, and clean architecture.
From responsive frontends to robust backend systems, every project is crafted with precision and purpose.
I value simplicity, continuous learning, and creating experiences that feel as good as they function.`;

export default function Manifesto() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const words = wordsRef.current;

      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // ✅ Slower + smoother scroll range
      const start = windowHeight * 0.8;
      const end = windowHeight * -0.4;

      let progress = (start - rect.top) / (start - end);
      progress = Math.max(0, Math.min(1, progress));

      // ✅ Smooth easing (premium feel)
      progress = progress * progress;

      const totalWords = words.length;
      const visibleWords = Math.floor(progress * totalWords);

      words.forEach((word, i) => {
        if (i < visibleWords) {
          word.classList.add("is-visible");
        } else {
          word.classList.remove("is-visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="block" id="studio" ref={containerRef}>
      <div className="section-label mono">
        <span>— 002 / Manifesto</span>
        <span>Scroll reveal</span>
      </div>

      <p className="reveal__text">
        {text.split(" ").map((word, i) => (
          <span
            key={i}
            ref={(el) => (wordsRef.current[i] = el)}
            className="reveal__word"
          >
            {word}&nbsp;
          </span>
        ))}
      </p>
    </section>
  );
}
