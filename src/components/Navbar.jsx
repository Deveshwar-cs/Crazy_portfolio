"use client";

import React, {useState} from "react";

const navLinks = [
  {label: "Work", href: "#work"},
  {label: "About", href: "#about"},
  {label: "Services", href: "#services"},
  {label: "Contact", href: "#contact"},
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleScroll = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({behavior: "smooth"});
  };

  return (
    <header className="relative z-20 w-full animate-fadeIn">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Logo */}
        <a href="#" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0b1a12] text-[#c7f0d8] shadow-md transition-transform duration-500 group-hover:rotate-6">
            ✨
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-semibold tracking-tight text-[#0b1a12]">
              Deveshwar
            </span>
            <span className="text-[11px] font-medium text-[#0b1a12]/50">
              MERN Developer
            </span>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 rounded-full glass-soft px-2 py-1.5 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#0b1a12]/70 transition-all duration-300 hover:bg-white hover:text-[#0b1a12]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={handleScroll}
            className="rounded-full bg-[#0b1a12] px-5 py-2 text-sm font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#12251a] active:scale-95"
          >
            Let&rsquo;s Talk
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded-full glass-soft text-xl md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-6 mb-4 rounded-2xl glass p-4 md:hidden">
          <div className="flex flex-col">
            {navLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-[#0b1a12]/80 transition-colors hover:bg-white"
              >
                {l.label}
              </a>
            ))}

            {/* Mobile CTA */}
            <button
              onClick={handleScroll}
              className="mt-2 rounded-xl bg-[#0b1a12] py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-[#12251a]"
            >
              Let&rsquo;s Talk
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
