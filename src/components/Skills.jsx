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
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.length) return;
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 },
    );

    observer.observe(section);
    return () => observer.disconnect();
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
      className="relative py-24 sm:py-32 bg-[#030108] overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Section title */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-sky-500/10 rounded-full text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
            What I Work With
          </span>
          <h2
            className={`text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 transition-all ${
              isVisible ? "animate-slideUp" : "opacity-0 translate-y-6"
            }`}
          >
            My{" "}
            <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {skills.map(({ Icon, label, color }, i) => (
            <div
              key={i}
              className={`group relative p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5
                          transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04] hover:border-sky-500/20 ${
                            isVisible
                              ? "animate-slideUp"
                              : "opacity-0 translate-y-4"
                          }`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                <div className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300">
                  <Icon
                    size={36}
                    style={{ color }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="font-medium text-gray-300 text-sm sm:text-base">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
