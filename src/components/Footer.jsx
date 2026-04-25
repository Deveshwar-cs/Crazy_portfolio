"use client";
import {useEffect, useState} from "react";
import "./Footer.css";

export default function Footer() {
  const [time, setTime] = useState("");

  // Gets the live local time in Mohali (IST timezone)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now) + " IST");
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll back to the top of the page
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  };

  return (
    <footer className="footer" id="contact">
      <div className="footer__main">
        <div className="footer__left">
          <h3>
            Let's make something <em className="glow-hover">slow</em>.
          </h3>
        </div>

        <div className="footer__right">
          <span className="footer__label">Contact</span>
          <a href="mailto:goboby744@gmail.com" className="hover-underline">
            goboby744@gmail.com
          </a>
          <a href="tel:+910000000000" className="hover-underline">
            +91 00000 00000
          </a>
          <span className="footer__location">
            Mohali, Punjab {time && `[${time}]`}
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__socials">
          <a href="#" className="hover-underline">
            Instagram
          </a>
          <a href="#" className="hover-underline">
            Twitter (X)
          </a>
          <a href="#" className="hover-underline">
            LinkedIn
          </a>
        </div>

        <p className="footer__copyright">
          © {new Date().getFullYear()} Studio Hollow.
        </p>

        <button onClick={scrollToTop} className="footer__back-to-top">
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
