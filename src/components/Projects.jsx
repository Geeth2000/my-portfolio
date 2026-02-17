import React, { useEffect, useRef, useState } from "react";
import icmImg from "../assets/icm.png";
import portfolioImg from "../assets/portfolio.png";
import smsImg from "../assets/sms.png";
import libraryImg from "../assets/library.png";
import fotImg from "../assets/fot.png";

function Projects() {
  const projects = [
    {
      title: "I-Computers E-Commerce Platform",
      description:
        "Full-stack online store for computers, laptops, and accessories with secure authentication, persistent carts, and streamlined order management.",
      technologies: "MongoDB, Express.js, React, Node.js, Tailwind CSS",
      github: "https://github.com/Geeth2000/i-computers",
      tag: "project 1",
      image: icmImg,
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio crafted to showcase projects, skills, and experience with polished UI styling, smooth animations, and performance optimizations.",
      technologies: "React, Tailwind CSS, JavaScript",
      github: "https://github.com/Geeth2000/my-portfolio.git",
      tag: "project 2",
      image: portfolioImg,
    },
    {
      title: "FOT Connect Mobile App",
      description:
        "Native Android application delivering faculty news, sports, and event updates with responsive screens based on Figma prototypes.",
      technologies: "Android Studio, Java, XML, Figma",
      github: "https://github.com/Geeth2000/Fotconnect.git",
      tag: "project 3",
      image: fotImg,
    },
    {
      title: "Student Mentoring System",
      description:
        "University mini-project enabling students and lecturers to schedule mentoring sessions, backed by REST APIs and GitHub-driven collaboration.",
      technologies: "MongoDB, Express.js, React, Node.js",
      github: "https://github.com/Geeth2000/student-mentoring-system",
      tag: "project 4",
      image: smsImg,
    },
    {
      title: "Library Management System",
      description:
        "Web portal for managing library inventory, user accounts, and circulation tasks with responsive layouts and full CRUD workflows.",
      technologies: "PHP, HTML, CSS, JavaScript, MySQL",
      github: "https://github.com/DhanukaND1/library_system.git",
      tag: "project 5",
      image: libraryImg,
    },
  ];

  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const titleEl = section.querySelector("#projects-title");
    const cardEls = section.querySelectorAll(".project-card");

    const titleObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.length) return;
        const entry = entries[0];
        setTitleVisible(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            setVisibleProjects((prev) =>
              prev.includes(index) ? prev : [...prev, index]
            );
          } else {
            setVisibleProjects((prev) => prev.filter((idx) => idx !== index));
          }
        });
      },
      { threshold: 0.25 }
    );

    if (titleEl) titleObserver.observe(titleEl);
    cardEls.forEach((card) => cardObserver.observe(card));

    return () => {
      titleObserver.disconnect();
      cardObserver.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-[#030108] relative py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Title */}
        <div
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <span className="inline-block px-4 py-1.5 bg-sky-500/10 rounded-full text-sky-400 text-sm font-medium mb-4 border border-sky-500/20">
            My Work
          </span>
          <h2
            id="projects-title"
            className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Featured <span className="bg-gradient-to-r from-sky-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore my latest work in full-stack development and modern app creation
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isVisible = visibleProjects.includes(index);
            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <div
                key={index}
                data-index={index}
                className={`project-card group relative flex flex-col bg-white/[0.02] rounded-2xl border border-white/5 transition-all duration-500 hover:bg-white/[0.04] hover:border-sky-500/20 hover:-translate-y-1 overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-y-0 md:translate-x-0"
                    : direction === "left"
                    ? "opacity-0 translate-y-10 md:-translate-x-12"
                    : "opacity-0 translate-y-10 md:translate-x-12"
                }`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {project.image && (
                  <div className="overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-sky-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.split(', ').slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 bg-white/5 rounded-lg text-xs text-gray-400 border border-white/5">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors font-medium"
                  >
                    View on GitHub
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Projects;