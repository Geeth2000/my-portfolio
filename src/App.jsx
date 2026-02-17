import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Education from "./components/Education";
import CustomCursor from "./components/CustomCursor";
import FloatingOrbs from "./components/FloatingOrbs";
import { FaBars, FaTimes } from "react-icons/fa";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const navItems = [
    { label: "Profile", id: "profile" },
    { label: "Skills", id: "skills" },
    { label: "Certifications", id: "certifications" },
    { label: "Education", id: "education" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let animationFrame = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (animationFrame) cancelAnimationFrame(animationFrame);

        animationFrame = requestAnimationFrame(() => {
          const intersecting = entries.filter((entry) => entry.isIntersecting);
          if (!intersecting.length) return;

          const viewportFocusLine = window.innerHeight * 0.38;

          const nearestToFocus = intersecting.reduce((closest, entry) => {
            const distance = Math.abs(
              entry.boundingClientRect.top - viewportFocusLine,
            );

            if (!closest) return { entry, distance };
            return distance < closest.distance ? { entry, distance } : closest;
          }, null);

          if (!nearestToFocus) return;

          const nextActiveId = nearestToFocus.entry.target.id;
          setActiveSection((current) =>
            current === nextActiveId ? current : nextActiveId,
          );
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-32% 0px -45% 0px",
      },
    );

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const getNavItemClass = (itemId) => {
    const isActive = activeSection === itemId;
    const activeStyles =
      "px-5 py-2 bg-gradient-to-r from-sky-600/90 to-cyan-600/90 text-white rounded-full font-medium text-sm shadow-lg shadow-sky-500/25 transition-all duration-300 transform hover:shadow-sky-500/40";
    const baseStyles =
      "px-4 py-2 font-medium text-sm text-gray-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/5";

    if (isActive) return activeStyles;
    return baseStyles;
  };

  return (
    <div className="bg-[#030108] text-white min-h-screen overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Floating Orbs Background */}
      <FloatingOrbs />

      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#030108]/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center max-w-7xl">
          <a href="#profile" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent hidden sm:block">
              Geethanjana
            </span>
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-1 bg-white/[0.02] backdrop-blur-sm rounded-full p-1.5 border border-white/5">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={getNavItemClass(item.id)}
                  onClick={() => setActiveSection(item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-[#030108]/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-2 py-6 px-4">
            {navItems.map((item) => (
              <li key={item.id} className="w-full max-w-xs">
                <a
                  href={`#${item.id}`}
                  className={`block text-center py-3 px-6 rounded-xl transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-sky-600/90 to-cyan-600/90 text-white font-medium shadow-lg shadow-sky-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Profile />
        <Skills />
        <Certifications />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="relative bg-[#030108] text-center py-16 border-t border-white/5 overflow-hidden">
        {/* Subtle gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sky-600/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <span className="text-white font-bold text-xl">G</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-sm text-gray-500 hover:text-sky-400 transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Divider */}
          <div className="w-full max-w-md mx-auto h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Geethanjana Karunarathna. Crafted with
            passion.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
