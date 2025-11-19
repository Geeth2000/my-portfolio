import React, { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";

function Profile() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  // Typing animation
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [speed, setSpeed] = useState(150);
  const words = [
    "<Full-Stack Web Developer/>",
    "<Problem Solver/>",
    "<Tech Enthusiast/>",
  ];

  useEffect(() => {
    const type = () => {
      const i = loopNum % words.length;
      const full = words[i];
      setText(
        isDeleting
          ? full.substring(0, text.length - 1)
          : full.substring(0, text.length + 1)
      );
      setSpeed(isDeleting ? 60 : 120);
      if (!isDeleting && text === full)
        setTimeout(() => setIsDeleting(true), 1000);
      else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const t = setTimeout(type, speed);
    return () => clearTimeout(t);
  }, [text, isDeleting, loopNum]);

  // Purple network background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let anim;
    let particles = [];
    const num = 70;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = 1.4 + Math.random() * 1.5;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168,85,247,0.75)";
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < num; i++) particles.push(new Particle());
    };

    const connect = () => {
      for (let i = 0; i < num; i++) {
        for (let j = i + 1; j < num; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const alpha = 1 - dist / 130;
            ctx.strokeStyle = `rgba(168,85,247,${alpha * 0.5})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(10,0,20,0.9)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.move();
        p.draw();
      });
      connect();
      anim = requestAnimationFrame(animate);
    };

    resize();
    init();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(anim);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // === 3D tilt effect for profile image ===
  useEffect(() => {
    const element = imageRef.current;
    if (!element) return;

    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersCoarsePointer) return;

    const handleMouseMove = (e) => {
      const { left, top, width, height } = element.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      const rotateY = x * 20;
      const rotateX = -y * 20;
      element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
      element.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="profile"
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-16 px-4 sm:px-6"
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ display: "block" }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-gray-900 via-black to-gray-900 opacity-60"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl mx-auto w-full">
        {/* Profile Image with 3D tilt */}
        <div
          ref={imageRef}
          className="relative group transition-transform duration-300 ease-out w-full max-w-[260px] sm:max-w-xs md:max-w-sm lg:max-w-md"
          style={{
            animation: "fadeInSmooth 1.2s ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          <img
            src="profile.png"
            alt="Geethanjana Karunarathna"
            className="relative w-full h-full rounded-full border-[6px] border-purple-500/40 object-cover shadow-[0_0_40px_rgba(168,85,247,0.8)]"
          />
        </div>

        {/* Text content */}
        <div className="w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col gap-6 px-2 sm:px-0">
          {/* Main Heading */}
          <h1
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold 
          tracking-tight text-transparent bg-linear-to-r 
               from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text"
          >
            Hi, I'm Geethanjana
          </h1>

          {/* Typing animation line */}
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-200 h-[60px] sm:h-[70px]">
            <span className="text-purple-300">{text}</span>
            <span className="animate-pulse text-fuchsia-500">▏</span>
          </h2>

          {/* About paragraph */}
          <p className="text-lg sm:text-xl text-gray-400">
            Full-stack web developer passionate about building modern, scalable,
            and user-focused web applications.
          </p>
          <p className="text-base sm:text-lg text-gray-500 italic">
            Currently pursuing B.ICT (Hons) at the University of Colombo.
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4 sm:gap-6">
            <a
              href="Geethanjana_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-linear-to-r from-purple-600 to-fuchsia-500 text-white font-semibold shadow-[0_0_20px_rgba(168,85,247,0.45)] transition-transform duration-300 hover:scale-105"
            >
              Download CV
            </a>

            <div className="flex items-center justify-center sm:justify-end gap-3">
              {[
                {
                  href: "https://github.com/Geeth2000",
                  label: "GitHub",
                  icon: <FaGithub className="text-xl" />,
                },
                {
                  href: "https://www.linkedin.com/in/geethanjana-karunarathna/",
                  label: "LinkedIn",
                  icon: <FaLinkedin className="text-xl" />,
                },
                {
                  href: "mailto:geethanjankaru123@gmail.com",
                  label: "Email",
                  icon: <FiMail className="text-xl" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 text-purple-200 transition-all duration-300 hover:text-fuchsia-400 hover:border-fuchsia-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
