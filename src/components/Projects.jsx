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

  const titleRef = useRef(null);
  const [animateTitle, setAnimateTitle] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setAnimateTitle(true);
      },
      { threshold: 0.5 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
    };
  }, []);

  return (
    <section id="projects" className="bg-black relative">
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
          ref={titleRef}
          className={`text-center mb-20 transition-all duration-1000 ${
            animateTitle ? "animate-slide-in" : "opacity-0 translate-x-24"
          }`}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-transparent bg-linear-to-r from-purple-400 via-fuchsia-500 to-purple-700 bg-clip-text">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects in full-stack development, web design,
            and modern app creation.
          </p>
        </div>

        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative flex flex-col bg-linear-to-br from-[#1a002b]/80 to-black rounded-3xl 
                         border border-purple-600/40 hover:border-purple-400 
                         transition-all duration-500 hover:-translate-y-3 
                         hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] overflow-hidden"
              style={{
                animation: `fadeIn 0.8s ease-out ${index * 0.2}s backwards`,
              }}
            >
              {project.image && (
                <div className="overflow-hidden mx-4 mt-4 rounded-2xl border border-purple-800/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-700"
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
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideInFromRight 0.8s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

export default Projects;
