import React, { useState, useEffect } from "react";
import Profile from "./components/Profile";
import Skills from "./components/Skills";
import Certifications from "./components/Certifications";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Education from "./components/Education";
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
              entry.boundingClientRect.top - viewportFocusLine
            );

            if (!closest) return { entry, distance };
            return distance < closest.distance ? { entry, distance } : closest;
          }, null);

          if (!nearestToFocus) return;

          const nextActiveId = nearestToFocus.entry.target.id;
          setActiveSection((current) =>
            current === nextActiveId ? current : nextActiveId
          );
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-32% 0px -45% 0px",
      }
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
      "px-6 py-2 bg-linear-to-r from-purple-600 to-fuchsia-500 text-white rounded-full font-bold shadow-[0_0_15px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:scale-105 hover:opacity-90";
    const baseStyles =
      "font-semibold text-gray-200 hover:text-gray-300 transition-colors duration-300";

    if (isActive) return activeStyles;
    return baseStyles;
  };

  return (
    <div className="bg-black text-white min-h-screen font-poppins overflow-x-hidden">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/95 backdrop-blur-md border-b border-gray-800 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight">
            <span className="bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
              GK
            </span>
          </h1>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-5">
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
        {mobileMenuOpen && (
          <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 pb-4 border-t border-gray-800 bg-black/90">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${getNavItemClass(item.id)} text-lg text-center`}
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
        )}
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
      <footer className="relative bg-linear-to-t from-gray-900 to-black text-center py-12 border-t border-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>
        <div className="relative z-10 space-y-4">
          <p className="text-gray-400 font-semibold">
            © 2025 Geethanjana Karunarathna. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
