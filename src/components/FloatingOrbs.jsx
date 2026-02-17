import React, { useEffect, useRef } from "react";

function FloatingOrbs() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Orb class
    class Orb {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseRadius = 30 + Math.random() * 80;
        this.radius = this.baseRadius;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.pulseSpeed = 0.005 + Math.random() * 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.opacity = 0.08 + Math.random() * 0.12;
        // Cyan color variations
        this.hue = 180 + Math.random() * 20; // 180-200 for cyan
        this.saturation = 70 + Math.random() * 30;
      }

      update(time) {
        // Move
        this.x += this.vx;
        this.y += this.vy;

        // Pulse effect
        this.radius =
          this.baseRadius +
          Math.sin(time * this.pulseSpeed + this.pulseOffset) * 10;

        // Wrap around edges
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }

      draw() {
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius,
        );

        gradient.addColorStop(
          0,
          `hsla(${this.hue}, ${this.saturation}%, 60%, ${this.opacity * 1.5})`,
        );
        gradient.addColorStop(
          0.4,
          `hsla(${this.hue}, ${this.saturation}%, 50%, ${this.opacity})`,
        );
        gradient.addColorStop(
          1,
          `hsla(${this.hue}, ${this.saturation}%, 40%, 0)`,
        );

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create orbs
    const orbCount = Math.min(6, Math.floor(window.innerWidth / 300));
    const orbs = Array.from({ length: orbCount }, () => new Orb());

    // Mouse interaction
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    document.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        // Subtle mouse attraction
        const dx = mouseX - orb.x;
        const dy = mouseY - orb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 400) {
          const force = ((400 - dist) / 400) * 0.02;
          orb.vx += (dx / dist) * force;
          orb.vy += (dy / dist) * force;

          // Limit velocity
          const speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy);
          if (speed > 1) {
            orb.vx = (orb.vx / speed) * 1;
            orb.vy = (orb.vy / speed) * 1;
          }
        }

        // Gradually slow down
        orb.vx *= 0.99;
        orb.vy *= 0.99;

        orb.update(time);
        orb.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}

export default FloatingOrbs;
