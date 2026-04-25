"use client";
import {useEffect, useRef} from "react";
import "./HorizontalProjects.css";

const PROJECTS = [
  {
    title: "Bus Tracking System",
    tag: "Web App",
    year: "2025",
    desc: "Real-time bus timing platform with route filtering and search.",
    img: "https://images.unsplash.com/photo-1509749837427-ac94a2553d0e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "E-commerce API",
    tag: "Backend",
    year: "2025",
    desc: "RESTful API with authentication, products, and order management.",
    img: "https://plus.unsplash.com/premium_photo-1733259689019-1eaca0837aaf?q=80&w=652&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Portfolio Website",
    tag: "Frontend",
    year: "2024",
    desc: "Modern animated portfolio with smooth scroll and UI effects.",
    img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Vehicle Booking Contacts",
    tag: "Utility",
    year: "2024",
    desc: "Platform connecting users with drivers.",
    img: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Hill Road Safety",
    tag: "Idea",
    year: "2024",
    desc: "Concept system for managing traffic on hill roads.",
    img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
  },
];

export default function HorizontalProjects() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const setHeight = () => {
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      console.log(scrollWidth);
      console.log(viewportWidth);
      const totalScroll = scrollWidth - viewportWidth;
      // 🔥 THIS FIXES EVERYTHING
      section.style.height = `${totalScroll + window.innerHeight}px`;
    };

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;

      const totalScroll = scrollWidth - viewportWidth + 150;
      const sectionHeight = section.offsetHeight - window.innerHeight;

      let progress = -rect.top / sectionHeight;
      progress = Math.max(0, Math.min(1, progress));

      const translateX = -progress * totalScroll;
      track.style.transform = `translate3d(${translateX}px, 0, 0)`;
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <section className="horizontal" ref={sectionRef}>
      <div className="horizontal__sticky">
        <div className="horizontal__track" ref={trackRef}>
          {/* INTRO */}
          <div className="horizontal__intro">
            <span className="mono">— Projects / 005</span>
            <h2>
              Selected <em>projects</em> I've built.
            </h2>
            <p>Scroll vertically — explore my work horizontally.</p>
          </div>

          {/* PROJECTS */}
          {PROJECTS.map((item, i) => (
            <div className="horizontal__card" key={i}>
              <img src={item.img} alt={item.title} />

              <div className="horizontal__card__meta">
                <div>
                  <span className="card__title">{item.title}</span>
                  <p className="card__desc">{item.desc}</p>
                </div>

                <span className="card__tag">
                  {item.tag} · {item.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
