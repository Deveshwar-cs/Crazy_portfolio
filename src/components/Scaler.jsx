"use client";
import {useEffect, useRef} from "react";
import "./Scaler.css";

export default function Scaler() {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const img = imgRef.current;
      const text = textRef.current;

      if (!container || !img || !text) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // 🔥 progress tied to full section scroll
      let progress = (windowHeight - rect.top) / (windowHeight + rect.height);
      progress = Math.max(0, Math.min(1, progress));

      // 🔥 smooth easing
      progress = Math.pow(progress, 1.5); // 🔥 dynamic scale (fit to screen width)
      const imgWidth = img.offsetWidth;
      const screenWidth = window.innerWidth;
      const maxScale = screenWidth / imgWidth;

      const scale = 1 + progress * (maxScale - 1);

      // 🔥 border radius
      const radius = 24 - progress * 24;

      img.style.transform = `scale(${scale})`;
      img.style.borderRadius = `${radius}px`;

      // 🔥 TEXT CONTROL (appears later)
      const textStart = 0.4; // delay appearance
      const textProgress = Math.max(
        0,
        Math.min(1, (progress - textStart) / (1 - textStart)),
      );

      text.style.opacity = textProgress;
      text.style.transform = `translateY(${40 - textProgress * 40}px)`;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="scaler" ref={containerRef}>
      <div className="scaler__inner">
        {/* IMAGE */}
        <div className="scaler__img" ref={imgRef}>
          <img
            src="https://images.unsplash.com/photo-1496670013738-4f730477bfdb?q=80&w=1740&auto=format&fit=crop"
            alt="Project preview"
          />
        </div>

        {/* 🔥 TEXT OVERLAY */}
        <div className="scaler__overlay" ref={textRef}>
          <h2>
            Built for <span className="special_text">performance.</span>
            <br />
            Engineered to scale.{" "}
          </h2>
        </div>
      </div>
    </section>
  );
}
