"use client";
import "./Marquee.css";

export default function Marquee({
  text = "Available for new work, Spring 2026 • Available for new work, Spring 2026 • ",
}) {
  return (
    // Changed to 'section' and added aria-label for better semantics
    <section className="marquee" aria-label="Announcement marquee">
      <div className="marquee__track">
        <span>{text}</span>
        {/* aria-hidden prevents screen readers from reading the duplicate text */}
        <span aria-hidden="true">{text}</span>
      </div>
    </section>
  );
}
