"use client";
import {useEffect, useRef, useState} from "react";
import "./Skills.css";

const STEPS = [
  {
    title: "Understand the problem",
    body: "Focus on real user needs before coding.",
    img: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Build & iterate",
    body: "Develop step-by-step and improve with feedback.",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Optimize & deploy",
    body: "Optimize performance and deploy scalable apps.",
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Skills() {
  const stepsRef = useRef([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // Intersection Observer is much more performant than a scroll listener
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Grab the index from the data attribute we add below
            const index = Number(entry.target.getAttribute("data-index"));
            setActive(index);
          }
        });
      },
      {
        // This creates a trigger line in the middle of the viewport
        rootMargin: "-45% 0px -45% 0px",
      },
    );

    const elements = stepsRef.current;
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  return (
    <section className="process-section">
      <div className="section-label mono">
        <span>— 003 / Process</span>
        <span>How I Work</span>
      </div>

      <div className="process-grid">
        {/* LEFT TEXT */}
        <div className="process-left">
          {STEPS.map((step, i) => (
            <div
              key={i}
              data-index={i} // Added for the observer to read
              ref={(el) => (stepsRef.current[i] = el)}
              className={`process-step ${i === active ? "is-active" : ""}`}
            >
              <span className="mono num">
                — {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="step_title">{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>

        {/* RIGHT IMAGE (STICKY MAGIC) */}
        <div className="process-right">
          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`process-img ${i === active ? "is-active" : ""}`}
            >
              <img src={step.img} alt={step.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
