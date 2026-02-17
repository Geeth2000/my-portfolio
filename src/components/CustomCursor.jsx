import React, { useEffect, useRef, useState } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device has fine pointer (mouse)
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return;

    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setPosition({ x: mouseX, y: mouseY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Detect hoverable elements
    const handleElementHover = (e) => {
      const target = e.target;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovering(isInteractive);
    };

    // Smooth animation loop for outer ring
    const animate = () => {
      const speed = 0.1;
      smoothX += (mouseX - smoothX) * speed;
      smoothY += (mouseY - smoothY) * speed;
      setSmoothPosition({ x: smoothX, y: smoothY });
      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, []);

  // Don't render on touch devices
  if (
    typeof window !== "undefined" &&
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return null;
  }

  return (
    <>
      {/* Outer ring - follows slowly */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: smoothPosition.x,
          top: smoothPosition.y,
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-300 ease-out ${
            isHovering
              ? "w-16 h-16 border-cyan-400"
              : "w-12 h-12 border-cyan-500/60"
          }`}
          style={{
            boxShadow: isHovering
              ? "0 0 25px rgba(34, 211, 238, 0.5), 0 0 50px rgba(34, 211, 238, 0.25), inset 0 0 15px rgba(34, 211, 238, 0.15)"
              : "0 0 20px rgba(34, 211, 238, 0.35), 0 0 40px rgba(34, 211, 238, 0.15)",
            animation: "cursorPulse 2.5s ease-in-out infinite",
          }}
        />
      </div>

      {/* Inner ring - follows faster */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
        }}
      >
        <div
          className={`rounded-full border-2 transition-all duration-200 ease-out ${
            isHovering
              ? "w-5 h-5 border-cyan-300 bg-cyan-400/20"
              : "w-3 h-3 border-cyan-400/80"
          }`}
          style={{
            boxShadow:
              "0 0 12px rgba(34, 211, 238, 0.6), 0 0 25px rgba(34, 211, 238, 0.35)",
          }}
        />
      </div>

      {/* Hide default cursor & animations */}
      <style>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
        
        @keyframes cursorPulse {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(34, 211, 238, 0.35), 0 0 40px rgba(34, 211, 238, 0.15);
          }
          50% {
            opacity: 0.85;
            box-shadow: 0 0 30px rgba(34, 211, 238, 0.5), 0 0 60px rgba(34, 211, 238, 0.25);
          }
        }
      `}</style>
    </>
  );
}

export default CustomCursor;
