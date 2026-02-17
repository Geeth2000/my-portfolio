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
          : full.substring(0, text.length + 1),
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

  // Sky blue network background
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
        ctx.fillStyle = "rgba(14,165,233,0.75)";
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
            ctx.strokeStyle = `rgba(14,165,233,${alpha * 0.5})`;
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
      className="relative min-h-screen flex items-center justify-center bg-[#030108] overflow-hidden py-20 px-4 sm:px-6"
      ref={containerRef}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{ display: "block" }}
      />

      {/* Subtle gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030108]/50 to-[#030108]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 max-w-6xl mx-auto w-full">
        {/* Profile Image with 3D tilt */}
        <div
          ref={imageRef}
          className="relative group transition-transform duration-500 ease-out w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] lg:max-w-[360px]"
          style={{
            animation: "fadeInSmooth 1.2s ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 via-cyan-500 to-sky-600 rounded-full opacity-60 blur-xl group-hover:opacity-80 transition-opacity duration-500"></div>

          <img
            src="profile.png"
            alt="Geethanjana Karunarathna"
            className="relative w-full aspect-square rounded-full border-2 border-white/10 object-cover shadow-2xl"
          />

          {/* Status indicator */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#030108]/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-300 font-medium">Available</span>
          </div>
        </div>

        {/* Text content */}
        <div className="w-full max-w-2xl mx-auto lg:mx-0 text-center lg:text-left flex flex-col gap-5 px-2 sm:px-0">
          {/* Greeting badge */}
          <div className="flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-sm text-gray-400">
              <span className="text-lg">👋</span> Welcome to my portfolio
            </span>
          </div>

          {/* Main Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold 
          tracking-tight text-white leading-[1.1]"
          >
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent">
              Geethanjana
            </span>
          </h1>

          {/* Typing animation line */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 h-[50px] sm:h-[60px]">
            <span className="text-sky-400">{text}</span>
            <span className="animate-pulse text-sky-500">|</span>
          </h2>

          {/* About paragraph */}
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl">
            Full-stack web developer passionate about building modern, scalable,
            and user-focused web applications.
          </p>
          <p className="text-sm sm:text-base text-gray-500">
            🎓 Currently pursuing B.ICT (Hons) at the University of Colombo
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mt-2">
            <a
              href="Geethanjana_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-semibold shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-sky-500/40 hover:-translate-y-0.5"
            >
              Download CV
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </a>

            <div className="flex items-center justify-center lg:justify-start gap-3">
              {[
                {
                  href: "https://github.com/Geeth2000",
                  label: "GitHub",
                  icon: <FaGithub className="text-lg" />,
                },
                {
                  href: "https://www.linkedin.com/in/geethanjana-karunarathna2000?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
                  label: "LinkedIn",
                  icon: <FaLinkedin className="text-lg" />,
                },
                {
                  href: "mailto:geethanjankaru123@gmail.com",
                  label: "Email",
                  icon: <FiMail className="text-lg" />,
                },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 hover:text-sky-400 hover:bg-sky-500/10 hover:border-sky-500/30"
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
