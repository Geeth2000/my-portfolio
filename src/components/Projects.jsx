import React, { useEffect, useRef, useState } from "react";

function Projects() {
  const projects = [
    {
      title: "I-Computers E-Commerce Platform",
      description:
        "Full-stack online store for computers, laptops, and accessories with secure authentication, persistent carts, and streamlined order management.",
      technologies: "MongoDB, Express.js, React, Node.js, Tailwind CSS",
      github: "https://github.com/Geeth2000/i-computers",
      tag: "project 1",
      image: "https://via.placeholder.com/600x400?text=I-Computers",
    },
    {
      title: "Portfolio Website",
      description:
        "Personal portfolio crafted to showcase projects, skills, and experience with polished UI styling, smooth animations, and performance optimizations.",
      technologies: "React, Tailwind CSS, JavaScript",
      github: "https://github.com/Geeth2000/portfolio",
      tag: "project 2",
      image: "https://via.placeholder.com/600x400?text=Portfolio",
    },
    {
      title: "FOT Connect Mobile App",
      description:
        "Native Android application delivering faculty news, sports, and event updates with responsive screens based on Figma prototypes.",
      technologies: "Android Studio, Java, XML, Figma",
      github: "https://github.com/Geeth2000/fot-connect",
      tag: "project 3",
      image: "https://via.placeholder.com/600x400?text=FOT+Connect",
    },
    {
      title: "Student Mentoring System",
      description:
        "University mini-project enabling students and lecturers to schedule mentoring sessions, backed by REST APIs and GitHub-driven collaboration.",
      technologies: "MongoDB, Express.js, React, Node.js",
      github: "https://github.com/Geeth2000/student-mentoring-system",
      tag: "project 4",
      image: "https://via.placeholder.com/600x400?text=Mentoring",
    },
    {
      title: "Library Management System",
      description:
        "Web portal for managing library inventory, user accounts, and circulation tasks with responsive layouts and full CRUD workflows.",
      technologies: "PHP, HTML, CSS, JavaScript, MySQL",
      github: "https://github.com/Geeth2000/library-management",
      tag: "project 5",
      image: "https://via.placeholder.com/600x400?text=Library",
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
    <section ref={sectionRef} id="projects" className="bg-black relative">
      {/* subtle purple grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(168,85,247,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.15) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
      <div className="absolute inset-0 bg-linear-to-br from-[#1a002b]/60 via-[#20034d]/70 to-[#0b0014]/90"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10 py-16 sm:py-20">
        {/* Title */}
        <div
          className={`text-center mb-20 transition-all duration-1000 ease-out ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          <h2
            id="projects-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text"
          >
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects in full-stack development, web design,
            and modern app creation.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => {
            const isVisible = visibleProjects.includes(index);
            const direction = index % 2 === 0 ? "left" : "right";

            return (
              <div
                key={index}
                data-index={index}
                className={`project-card group relative flex flex-col bg-linear-to-br from-[#1a002b]/80 to-black rounded-3xl border border-purple-600/40 hover:border-purple-300 transition-all duration-1000 ease-out hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(168,85,247,0.45)] overflow-hidden ${
                  isVisible
                    ? "opacity-100 translate-y-0 md:translate-x-0"
                    : direction === "left"
                    ? "opacity-0 translate-y-10 md:-translate-x-24"
                    : "opacity-0 translate-y-10 md:translate-x-24"
                }`}
                style={{ transitionDelay: `${index * 0.12}s` }}
              >
                {project.image && (
                  <div className="overflow-hidden mx-4 mt-4 rounded-2xl border border-purple-800/40">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-56 sm:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  <h3 className="text-2xl sm:text-3xl font-bold mt-4 bg-linear-to-r from-purple-400 via-pink-500 to-purple-700 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                    {project.description}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-3">
                    <span className="font-semibold text-purple-300">
                      Tech Stack:{" "}
                    </span>
                    {project.technologies}
                  </p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-4 sm:mt-6 text-sm sm:text-base text-purple-300 hover:text-fuchsia-400 transition-colors font-semibold"
                  >
                    View Project →
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
