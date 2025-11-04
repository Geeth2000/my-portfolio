import React, { useEffect, useRef, useState } from "react";
import {
  FaReact,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaFigma,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiTypescript,
  SiPostman,
} from "react-icons/si";

function Skills() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const skills = [
    { Icon: FaHtml5, label: "HTML", color: "#E34F26" },
    { Icon: FaCss3Alt, label: "CSS", color: "#1572B6" },
    { Icon: FaJs, label: "JavaScript", color: "#F7DF1E" },
    { Icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { Icon: FaReact, label: "React", color: "#61DBFB" },
    { Icon: SiTailwindcss, label: "TailwindCSS", color: "#38BDF8" },
    { Icon: FaJava, label: "Java", color: "#E76F00" },
    { Icon: FaPython, label: "Python", color: "#3776AB" },
    { Icon: SiMysql, label: "SQL", color: "#00A8E8" },
    { Icon: SiMongodb, label: "MongoDB", color: "#4DB33D" },
    { Icon: SiPostman, label: "Postman API", color: "#FF6C37" },
    { Icon: FaFigma, label: "Figma Tool", color: "#F24E1E" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-black overflow-hidden"
    >
      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(120,0,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(120,0,255,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        {/* Section title */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl sm:text-5xl font-extrabold tracking-tight text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text mb-3 transition-all ${
              isVisible ? "animate-fadeInUp" : "opacity-0 translate-y-6"
            }`}
          >
            My Skills
          </h2>
          <div
            className={`h-1 w-24 mx-auto bg-gradient-to-r from-purple-400 to-pink-500 transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map(({ Icon, label, color }, i) => (
            <div
              key={i}
              className={`relative group flex flex-col items-center justify-center p-8 rounded-xl 
                          border border-purple-600/20 bg-gradient-to-b from-[#1a002b]/60 to-[#0b0014]/60
                          transition-all duration-500 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] ${
                            isVisible
                              ? "animate-fadeInUp"
                              : "opacity-0 translate-y-4"
                          }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <Icon
                size={50}
                style={{ color }}
                className="drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] transition-transform duration-300 group-hover:scale-110"
              />
              <p className="mt-4 font-semibold text-gray-200">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes fadeInUp {
          0% {opacity:0;transform:translateY(20px);}
          100% {opacity:1;transform:translateY(0);}
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default Skills;
